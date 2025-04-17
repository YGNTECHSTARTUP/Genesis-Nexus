import { Hono } from 'hono'
import { env } from 'hono/adapter'
import { clients, freelancers, freelancerSkills, projectTimelines, skills, users } from '../schema';
import { eq } from 'drizzle-orm';
import { db } from '../db';

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
    const content = c.req.query('q');
    const ai = c.get('AIs');
  
    const messages = [
      { role: 'system', content: 'You are a helpful and friendly AI assistant who gives accurate and clear responses.' },
      {
        role: 'user',
        content: `${content}`,
      },
    ];
  
    const aiResponse = await ai.run("@hf/thebloke/openhermes-2.5-mistral-7b-awq", {
      messages,
      temperature: 0.3,
      top_p: 0.9,
      stream: false,
    });
  
    // Get the response string from the object
    let text = '';
    if (aiResponse instanceof ReadableStream) {
      text = await readAIResponse(aiResponse);
    } else if (aiResponse?.response) {
      text = aiResponse.response;
    }
    text = text.replace(/[\n\v]+/g, ' ').trim();
  
    return c.json({ response: text });
  });
  
  
  ais.post('/best-three', async (c) => {
    const ai = c.get('AIs'); // AI instance
  
    const { requirement } = await c.req.json();
  
    if (!requirement) {
      return c.json({ error: 'Requirement is missing' }, 400);
    }
  
    try {
      // Step 1: Fetch all freelancers
      const freelancerUsers = await db.select().from(users).where(eq(users.userType, 'freelancer'));
      const freelancerData = await db.select().from(freelancers);
  
      // Step 2: Fetch freelancer skills
      const skillMap = await db
        .select({
          userId: freelancerSkills.userId,
          skillName: skills.name,
        })
        .from(freelancerSkills)
        .leftJoin(skills, eq(freelancerSkills.skillId, skills.id));
  
      const skillsByUser: Record<string, string[]> = {};
      skillMap.forEach(({ userId, skillName }) => {
        if (!userId) return;
  
        if (!skillsByUser[userId]) skillsByUser[userId] = [];
        skillsByUser[userId].push(skillName as '');
      });
  
      // Step 3: Combine all data
      const freelancer = freelancerUsers.map((user) => {
        const details = freelancerData.find((f) => f.userId === user.id);
        return {
          userId: user.id,
          name: user.fullName,
          skills: skillsByUser[user.id] || [],
          experience: `${details?.experienceYears || 0} years`,
        };
      });
  
      // Optionally limit the number of freelancers sent to AI
      const trimmedFreelancer = freelancer.slice(0, 30); // you can increase or decrease this
  
      // Step 4: Generate AI prompt
      const prompt = `
  You are an expert recruiter AI. A client provided the following requirement:
  "${requirement}"
  
  Here is a list of freelancers:
  ${trimmedFreelancer
    .map(
      (f, i) => `${i + 1}. Name: ${f.name}
     Skills: ${f.skills.join(', ') || 'None'}
     Experience: ${f.experience}
     ID: ${f.userId}`
    )
    .join('\n\n')}
  
  Based on the above, analyze and return only the top 3 most suitable freelancers as a valid JSON array in the following format:
  
  [
    {
      "bestFreelancer": "Name",
      "reason": "Short explanation"
    },
    ...
  ]
  
  Only return the JSON — do not include any explanation or markdown. Do not include extra commentary.
  `;
  
      // Step 5: Run AI
      const result = await ai.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
        messages: [{ role: 'user', content: prompt }],
      });
  
      const rawText = await parseAIResponse(result);
  
      try {
        const parsed = typeof rawText === 'string' ? JSON.parse(rawText) : rawText;
        return c.json({ topFreelancers: parsed });
      } catch (err) {
        return c.json({ error: 'AI did not return valid JSON', raw: rawText }, 500);
      }
    } catch (err: any) {
      console.error('AI error:', err);
      return c.json({ error: 'AI call failed', details: err.message || err.toString() }, 500);
    }
  });
  
  
  
  // Helper function (renamed)
  async function parseAIResponse(result: any): Promise<string> {
    try {
      if (typeof result?.getReader === 'function') {
        const reader = result.getReader();
        const decoder = new TextDecoder();
        let text = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          text += decoder.decode(value);
        }
        return text;
      }
  
      if (result?.response) return result.response;
      if (typeof result === 'string') return result;
      if (typeof result === 'object') return JSON.stringify(result, null, 2);
  
      return String(result);
    } catch (err) {
      return `ERROR_READING_RESPONSE: ${err}`;
    }
  }
  
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
  ais.post('/generate-proposal', async (c) => { //return json
    const ai = c.get('AIs')
    const { project, portfolio, tone } = await c.req.json()
  
    if (!project || !portfolio) {
      return c.json({ error: 'Missing required fields' }, 400)
    }
  
    const result = await ai.run('@cf/meta/llama-2-7b-chat-int8', {
      messages: [
        {
          role: 'system',
          content: `
          Respond ONLY with this format:
          
          {
            "proposal": "..."
          }
          
          Do NOT add any commentary or explanation.
          
          Project:
          ${project}
          
          Portfolio:
          ${portfolio}
          
          Tone: "${tone || 'professional'}"
          `
        }
      ]
    })
  
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
  
    // Try to parse JSON from AI
    try {
      const parsed = JSON.parse(text)
      if (parsed.proposal) {
        return c.json(parsed)
      } else {
        return c.json({ error: 'Missing "proposal" field in AI response', raw: text }, 400)
      }
    } catch (err) {
      return c.json({ error: 'AI returned invalid JSON', raw: text }, 400)
    }
  })
  //return json
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
  export async function saveProjectTimeline(projectId: string, timeline: any[]) {
    try {
      const validTasks = timeline.filter(t => t.task && t.durationDays && t.startDate && t.endDate);
  
      const rows: {
        projectId: string;
        task: any;
        durationDays: any;
        startDate: Date;
        endDate: Date;
    }[] = validTasks.map((t) => ({
        projectId,
        task: t.task,
        durationDays: t.durationDays,
        startDate: new Date(t.startDate),
        endDate: new Date(t.endDate),
      }));
  
      await db.insert(projectTimelines).values(rows as []);
      return { success: true };
    } catch (error) {
      console.error('Error saving timeline:', error);
      return { success: false, error };
    }
  }
  ais.post('/generate-timeline', async (c) => {
    const ai = c.get('AIs');
    const { project, experienceLevel, startDate, projectId } = await c.req.json();
  
    if (!project || !projectId) {
      return c.json({ error: 'Project description and projectId are required.' }, 400);
    }
  
    const result = await ai.run('@cf/meta/llama-2-7b-chat-int8', {
      messages: [
        {
          role: 'system',
          content: `You are a project planning assistant.
  Return ONLY valid JSON, strictly formatted as:
  [
    { "task": "Task 1", "durationDays": 2 },
    ...
  ]
  Do NOT include explanations, headers, or comments. Just raw JSON.
  Assume the freelancer is ${experienceLevel || 'mid-level'}.`
        },
        {
          role: 'user',
          content: `Project: ${project}`
        }
      ]
    });
  
    const text = await readAIResponse(result);
  
    try {
      const parsed = JSON.parse(text);
      const baseDate = startDate || new Date().toISOString().split('T')[0];
      const timeline = addTimeline(parsed, baseDate);
  
      const saveResult = await saveProjectTimeline(projectId, timeline);
      if (!saveResult.success) {
        return c.json({ error: 'Failed to save timeline', details: saveResult.error }, 500);
      }
  
      return c.json({ tasks: timeline });
    } catch (e) {
      return c.json({ error: 'AI returned invalid JSON', raw: text }, 500);
    }
  });
  
  ais.post('/generate-trust-score/:type', async (c) => {
    const ai = c.get('AIs');
    const userId=c.req.query("id");
    const body = await c.req.json();
    const userType: string = c.req.param('type');
  
    if (!userType || (userType !== 'client' && userType !== 'freelancer')) {
      return c.json({ error: 'Invalid or missing userType (must be "client" or "freelancer")' }, 400);
    }
  
    if (!userId) {
      return c.json({ error: 'Missing userId' }, 400);
    }
  
    try {
      let userProfile;
  
      if (userType === 'freelancer') {
        // JOIN freelancer + user base profile
        const [freelancerData] = await db
          .select()
          .from(freelancers)
          .innerJoin(users, eq(freelancers.userId, users.id))
          .where(eq(freelancers.userId, typeof userId === 'string' ? userId : ''));
  
        if (!freelancerData) return c.json({ error: 'Freelancer not found' }, 404);
  
        userProfile = {
          ...freelancerData.users,
          ...freelancerData.freelancers,
        };
      } else if (userType === 'client') {
        const [clientData] = await db
          .select()
          .from(clients)
          .innerJoin(users, eq(clients.userId, users.id))
          .where(eq(clients.userId, typeof userId === 'string' ? userId : String(userId)));
  
        if (!clientData) return c.json({ error: 'Client not found' }, 404);
  
        userProfile = {
          ...clientData.users,
          ...clientData.clients,
        };
      }
  
      const prompt = `
  You are a trust score evaluator for a freelancing platform.
  
  User type: ${userType.toUpperCase()}
  
  Analyze the following behavioral data and Return ONLY valid JSON, strictly formatted as:
  {
    "trustScore": number (0 to 100),
    "explanation": string (summary of why they received this score)
  }
  
  If the user is a freelancer, prioritize communication, reliability, and ratings.
  If the user is a client, prioritize payment history, clarity, and fairness.
  
  DATA:
  ${JSON.stringify(userProfile, null, 2)}
  `;
  
      const result = await ai.run('@cf/meta/llama-2-7b-chat-int8', {
        messages: [
          { role: 'system', content: 'You are an expert reputation evaluator.' },
          { role: 'user', content: prompt },
        ],
      });
  
      const text = await readAIResponse(result);
  
      try {
        const parsed = JSON.parse(text);
        return c.json(parsed);
      } catch (err) {
        return c.json({ error: 'AI returned invalid JSON', raw: text }, 500);
      }
    } catch (err) {
      console.error('[TrustScore Error]', err);
      return c.json({ error: 'Server error while generating trust score' }, 500);
    }
  });
  
ais.post('/generate-question',async(c)=>{
  const ai = c.get('AIs');
  const {role,level,techstack,type,amount,requirement} = await c.req.json();
  console.log(requirement);
  try{
    const prompt =` You are an AI assistant that generates job interview questions.

    Generate a list of questions for a job interview based on the following parameters:
    
    - Job role: ${role}
    - Experience level: ${level}
    - Tech stack: ${techstack}
    - Question focus: ${type} (e.g., technical, behavioral, or balanced)
    - Number of questions: ${amount}
    
    The questions should be:
    
    - Clear, concise, and suitable for a spoken format (used by a voice assistant).
    - Free of special characters like "/", "*", "\", quotes, or anything that may break a speech engine.
    - Strictly in English.
    - Tailored to the specified tech stack and experience level.
    - Balanced according to the specified question type (technical or behavioral).
    
    Return ONLY a single valid JSON array, like this:
    
    ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5"]
    
    Do not include any explanation or formatting outside of the array.
    
    Thank you ❤️`
    
      const result = await ai.run('@cf/meta/llama-3.2-3b-instruct',{
   
        messages: [{ role: 'user', content: prompt }],
      })
      // const { response } = result;
      // const interview={
      //   role,type,level,
      //   techstack:techstack.split(','),
      //   questions:JSON.parse(response),
       
      // }
      try {
        const parsed = JSON.parse(result.response);
        return c.json(parsed);
      } catch (e) {
        console.error("Failed to parse response:", result.response);
        return c.json({ success: false, error: "Invalid JSON format in AI response" }, { status: 500 });
      }
      
      //status
  }
  catch(error){
    console.error(error);
    return c.json({success:false,error},{status:500})
  }
})
ais.get('/generate-learning-path', async (c) => {
  const ai = c.get('AIs');
  const { goal } = await c.req.json();

  if (!goal) {
    return c.json({ error: 'Learning goal is required.' }, 400);
  }

  const result = await ai.run('@cf/meta/llama-2-7b-chat-int8', {
    messages: [
      {
        role: 'system',
        content: `You are a learning path generator.
Return ONLY valid JSON, strictly formatted like:
[
  { "module": "Introduction to Java", "estimatedDays": 3 },
  { "module": "OOP in Java", "estimatedDays": 5 },
  ...
]
NO explanations. Just JSON.
Keep the structure compact, modular, and beginner-friendly.`
      },
      {
        role: 'user',
        content: goal
      }
    ]
  });

  const text = await readAIResponse(result);

  try {
    const parsed = JSON.parse(text);
    return c.json({ learningPath: parsed });
  } catch (e) {
    return c.json({ error: 'AI returned invalid JSON', raw: text }, 500);
  }
});
// src/routes/ai.ts


ais.post('/ai/generate-lesson', async (c) => {
  const ai = c.get('AIs');
  const { topic } = await c.req.json();

  if (!topic) {
    return c.json({ error: 'Topic is required' }, 400);
  }

  const messages = [
    {
      role: 'system',
      content: `You are an expert instructor.

Respond ONLY with valid JSON using this strict format:

{
  "lesson": "One-paragraph explanation of the topic syntax and example. No markdown, no special characters, no line breaks.",
  "quiz": [
    {
      "question": "A clear multiple choice question?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Correct option (must match one of the above exactly)"
    }
  ]
}

Do not include any text outside the JSON. Output must start with '{' and end with '}'.
Never use markdown, code blocks, or extra quotation marks.`,
    },
    {
      role: 'user',
      content: `Generate a concise lesson and quiz for the topic: "${topic}"`,
    },
  ];

  const result = await ai.run('@cf/meta/llama-2-7b-chat-int8', {
    messages,
    temperature: 0.3,
    stream: false,
  });

  let raw = result?.response?.trim();

  try {
    const parsed = JSON.parse(raw);
    if (parsed.lesson && Array.isArray(parsed.quiz)) {
      return c.json(parsed);
    } else {
      throw new Error('Invalid structure: lesson or quiz missing.');
    }
  } catch (err) {
    return c.json({
      error: 'Failed to parse lesson content',
      raw,
      details: err.message,
    }, 500);
  }
});
ais.post('/submit-codes', async (c) => {
  const ai = c.get('AIs'); // use correct binding
  const { githubUrl } = await c.req.json();

  // Convert GitHub URL to raw content
  const rawUrl = convertToRawGitHubUrl(githubUrl);
  const codeRes = await fetch(rawUrl);
  if (!codeRes.ok) return c.json({ error: 'Failed to fetch code' }, 400);

  // Get the code from the GitHub URL
  const code = await codeRes.text();

  // Step 1: Review code
  const reviewResult = await ai.run('@cf/meta/llama-2-7b-chat-int8', {
    messages: [
      {
        role: 'system',
        content: 'You are a code review AI. Score code from 0–100 based on quality and best practices.',
      },
      {
        role: 'user',
        content: `Review this code:\n\n${code}`,
      },
    ],
  });

  let reviewText = '';
  if (reviewResult instanceof ReadableStream) {
    reviewText = await streamToText(reviewResult);
  } else if (reviewResult?.response) {
    reviewText = reviewResult.response;
  } else if (typeof reviewResult === 'string') {
    reviewText = reviewResult;
  } else {
    reviewText = JSON.stringify(reviewResult);
  }

  // Extract score from review
  const score = extractScore(reviewText);

  // Step 2: Generate verification questions
  const questionPrompt = `
    You are a code reviewer AI trying to verify if someone actually wrote a piece of code. The code is:

    ${code}

    Now, generate 5 short, technical questions that only the actual author of the code would be able to answer easily. Output as a plain JSON array like:

    [
      "Question 1?",
      "Question 2?",
      "Question 3?",
      "Question 4?",
      "Question 5?"
    ]
  `;

  const questionResult = await ai.run('@cf/meta/llama-2-7b-chat-int8', {
    messages: [
      { role: 'user', content: questionPrompt },
    ],
  });

  let questions: string[] = [];

  try {
    const questionText = typeof questionResult === 'string' ? questionResult : questionResult?.response || '';
    questions = JSON.parse(questionText);
  } catch (err) {
    // Fallback questions in case AI doesn't return valid JSON
    questions = [
      "What is the purpose of the main function in this code?",
      "Why did you choose to use a specific loop structure (e.g., for, while) in your implementation?",
      "Explain how error handling is implemented in the code.",
      "Why did you structure your functions and file layout the way you did?",
      "What would break if you removed or changed the logic inside the helper function named ___?"
    ];
  }

  // Return the response with code score, review, and verification questions
  return c.json({
    score,
    review: reviewText,
    verificationQuestions: questions,
  });
});








export default ais;