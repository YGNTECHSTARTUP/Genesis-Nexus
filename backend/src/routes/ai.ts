import { Hono } from 'hono'
import { env } from 'hono/adapter'

const ais = new Hono()

declare module "hono"  {
    interface ContextVariableMap {
      AIs: Ai;
    }
  }
  ais.use("*",async(c,next)=>{
    const { AI } = env<{ AI: Ai }>(c);
    c.set('AIs',AI);
    await next();
  })
ais.get('/assistant', async (c) => {

    const ai = c .get('AIs')
  
    const messages = [
      { role: 'system', content: 'You are a friendly assistant to help freelancer ' },
      {
        role: 'user',
        content: 'What are the trending technologies now',
      },
    ];
  
    const stream = await ai.run("@cf/deepseek-ai/deepseek-r1-distill-qwen-32b", {
      messages,
      stream: true,
    });
  
    if (stream instanceof ReadableStream) {
      const reader = stream.getReader();
      let result = '';
      let done = false;
  
      while (!done) {
        const { value, done: streamDone } = await reader.read();
        done = streamDone;
        if (value) {
          result += new TextDecoder().decode(value);
        }
      }
  
      console.log(result);
      return c.json({ response: result });
    } else {
      console.error("Unexpected stream type:", stream);
      return c.json({ error: "Unexpected stream type" });
    }
  });
ais.get('/best-three',async (c)=>{
    const ai = c.get('AIs')
    const {freelancers,requirement}= await c.req.json();
    const prompt= `
    You are an expert recruiter AI. A client provided the following requirement:
    "${requirement}"Here is a list of freelancers:
  ${freelancers?.map((f: { name: string; skills: [string]; experience: any; }, i: number) => `${i + 1}. Name: ${f.name}\n   Skills: ${f.skills}\n   Experience: ${f.experience}`).join('\n\n')}
  
  and give the code for as JSON format with the top 3 objects  Return the result in JSON like:
  {
    "bestFreelancer": "Name",
    "reason": "Short explanation why this person is best."
  }
  {
    "bestFreelancer": "Name",
    "reason": "Short explanation why this person is best."
  }
  {
    "bestFreelancer": "Name",
    "reason": "Short explanation why this person is best."
  }
  `
  try {
    const result = await ai.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", {
      messages: [{ role: "user", content: prompt }]
    })
  
    // const response = result.message?.content || ''
    // return c.json({ response })
    return c.json({ response: result });
  
  } catch (err: any) {
    console.error("AI error:", err)
    return c.json({ error: "AI call failed", details: err.message || err.toString() }, 500)
  }
  
  })
  ais.post('/submit-code', async (c) => {
    const ai = c.get('AIs') // use correct binding name
    const { githubUrl } = await c.req.json()
  
    // Convert GitHub URL to raw content
    const rawUrl = convertToRawGitHubUrl(githubUrl)
  
    // Fetch the code from GitHub
    const codeRes = await fetch(rawUrl)
    if (!codeRes.ok) return c.json({ error: 'Failed to fetch code' }, 400)
  
    const code = await codeRes.text()
  
    // Send code to Workers AI for review
    const result = await ai.run('@cf/meta/llama-2-7b-chat-int8', {
      messages: [
        {
          role: 'system',
          content: 'You are a code review AI. Score code from 0–100 based on quality and best practices.',
        },
        {
          role: 'user',
          content: `Review this code:\n\n${code}`,
        }
      ]
    })
  
    let content = ''
  
    if (result instanceof ReadableStream) {
      content = await streamToText(result)
    } else if (result?.response) {
      content = result.response
    } else if (typeof result === 'string') {
      content = result
    } else {
      content = JSON.stringify(result)
    }
  
    const score = extractScore(content)
  
    return c.json({ score, review: content })
  })
  function convertToRawGitHubUrl(url: string): string {
    // Example: https://github.com/user/repo/blob/main/file.js
    return url
      .replace('github.com', 'raw.githubusercontent.com')
      .replace('/blob/', '/')
  }
  
  function extractScore(text: string): number {
    const match = text.match(/score\s*[:\-]?\s*(\d{1,3})/i)
    return match ? parseInt(match[1]) : 50
  }
  async function streamToText(stream: ReadableStream): Promise<string> {
    const reader = stream.getReader()
    let result = ''
    const decoder = new TextDecoder()
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      result += decoder.decode(value)
    }
    return result
  }
  ais.post('/generate-proposal', async (c) => {
    const ai = c.get('AIs')
    const { project, portfolio, tone } = await c.req.json()
  
    if (!project || !portfolio) {
      return c.json({ error: 'Missing required fields' }, 400)
    }
  
    const result = await ai.run('@cf/meta/llama-2-7b-chat-int8', {
      messages: [
        {
          role: 'system',
          content: `You are a helpful freelancer assistant who writes winning proposals. Keep the tone "${tone || 'professional'}".`,
        },
        {
          role: 'user',
          content: `
  A freelancer is aislying to the following project:
  
  ---
  ${project}
  ---
  
  Here is the freelancer's portfolio:
  ${portfolio}
  
  Write a personalized, concise, and compelling proposal to submit.
          `,
        }
      ]
    })
  
    // Handle response
    let text = ''
    if (result instanceof ReadableStream) {
      const reader = result.getReader()
      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        text += decoder.decode(value)
      }
    } else if (result?.response) {
      text = result.response
    } else {
      text = JSON.stringify(result)
    }
  
    return c.json({ proposal: text })
  })
export async function readAIResponse(result: any): Promise<string> {
    try {
      if (typeof result?.getReader === 'function') {
        const reader = result.getReader()
        const decoder = new TextDecoder()
        let text = ''
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          text += decoder.decode(value)
        }
        return text
      }
  
      if (result?.response) return result.response
      if (typeof result === 'string') return result
      if (typeof result === 'object') return JSON.stringify(result, null, 2)
  
      return String(result)
    } catch (err) {
      return `ERROR_READING_RESPONSE: ${err}`
    }
  }
  function addTimeline(tasks: { task: string; durationDays: number }[], startFrom: string) {
    const updatedTasks = []
    let current = new Date(startFrom)
  
    for (const task of tasks) {
      const startDate = new Date(current)
      const endDate = new Date(current)
      endDate.setDate(endDate.getDate() + task.durationDays - 1)
  
      updatedTasks.push({
        ...task,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
      })
  
      current.setDate(current.getDate() + task.durationDays)
    }
  
    return updatedTasks
  }
  
  ais.post('/estimate-tasks', async (c) => {
    const ai = c.get('AIs')
    const { project, experienceLevel, startDate } = await c.req.json()
  
    if (!project) return c.json({ error: 'Project description is required.' }, 400)
  
    const result = await ai.run('@cf/meta/llama-2-7b-chat-int8', {
      messages: [
        {
          role: 'system',
          content: `You are a project planning assistant. Break the given project into tasks and estimate the time required. 
  Return only raw JSON in this format:
  [
    { "task": "Do something", "durationDays": 2 },
    ...
  ]
  
  Assume the freelancer has ${experienceLevel || 'mid-level'} experience.`
        },
        {
          role: 'user',
          content: `Project: ${project}`
        }
      ]
    })
  
    // Read result (handle streaming or direct response)
    let text=readAIResponse(result);
  
    try {
      const parsed = JSON.parse(await text);
      const baseDate = startDate || new Date().toISOString().split('T')[0]
      const timeline = addTimeline(parsed, baseDate)
      return c.json({ tasks: timeline })
    } catch (e) {
      return c.json({ error: 'AI returned invalid JSON', raw: text }, 500)
    }
  })
  ais.post('/generate-trust-score', async (c) => {
    const ai = c.get('AIs') // Assumes AI instance is injected via middleware
  
    const body = await c.req.json()
    const { userType, ...userProfile } = body
  
    if (!userType || (userType !== 'client' && userType !== 'freelancer')) {
      return c.json({ error: 'Invalid or missing userType (must be "client" or "freelancer")' }, 400)
    }
  
    if (!userProfile || Object.keys(userProfile).length === 0) {
      return c.json({ error: 'Missing user profile data' }, 400)
    }
  
    const prompt = `
  You are a trust score evaluator for a freelancing platform.
  
  User type: ${userType.toUpperCase()}
  
  Analyze the following behavioral data and return:
  {
    "trustScore": number (0 to 100),
    "explanation": string (summary of why they received this score)
  }
  
  If the user is a freelancer, prioritize communication, reliability, and ratings.
  If the user is a client, prioritize payment history, clarity, and fairness.
  
  DATA:
  ${JSON.stringify(userProfile, null, 2)}
  `
  
    const result = await ai.run('@cf/meta/llama-2-7b-chat-int8', {
      messages: [
        { role: 'system', content: 'You are an expert reputation evaluator.' },
        { role: 'user', content: prompt }
      ]
    })
  
    const text = await readAIResponse(result)
  
    try {
      const parsed = JSON.parse(text)
      return c.json(parsed)
    } catch (err) {
      return c.json({ error: 'AI returned invalid JSON', raw: text }, 500)
    }
  })
export default ais