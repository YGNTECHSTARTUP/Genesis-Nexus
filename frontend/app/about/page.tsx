
import { PageHeader } from "../components/page-header"
import {Card,CardContent} from "@/freelancer-platform/components/ui/card"
import { Avatar,AvatarFallback,AvatarImage } from "@/freelancer-platform/components/ui/avatar"
export const metadata = {
  title: "About Us | FreelancerHub",
  description: "Learn about our mission to connect businesses with top freelance talent",
}

export default function AboutPage() {
  const team = [
    {
      name: "MarkZukerBerg",
      role: "Founder & CEO",
      image: "/markzukerberg.jpeg",
      bio: "Former freelancer with a passion for creating better opportunities for independent professionals.",
    },
    {
      name: "Natarajan Chandrasekaran",
      role: "CEO of TCS",
      image: "/Natarajan.jpeg",
      bio: "Tech leader with 15+ years of experience building marketplace platforms.",
    },
    {
      name: "Jeff Bezos",
      role: "CEO of Amazon",
      image: "/jeffBezos.jpeg",
      bio: "Dedicated to creating a supportive environment for freelancers to thrive and grow.",
    },
    {
      name: "Narayan Gangadhar",
      role: "Angel Broking CEO",
      image: "/Narayan.jpeg",
      bio: "Marketing expert focused on connecting businesses with the right talent.",
    },
  ]

  return (
    <main className="container mx-auto py-8 px-4 mt-16">
      <PageHeader
        title="About FreelancerHub"
        description="Our mission is to empower freelancers and businesses to work together seamlessly"
      />

      <section className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              FreelancerHub was founded in 2020 with a simple mission: to create a platform where talented freelancers
              could connect with quality clients in a transparent, efficient way.
            </p>
            <p className="text-muted-foreground mb-4">
              Our founder, Alex Morgan, experienced firsthand the challenges of freelancing – finding reliable clients,
              getting paid on time, and building a reputation. These experiences inspired the creation of FreelancerHub.
            </p>
            <p className="text-muted-foreground">
              Today, we&apos;re proud to have helped thousands of freelancers build successful careers and businesses find
              the perfect talent for their projects.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img src="/freelancer-logo.png" alt="FreelancerHub team" className="w-full h-auto" />
          </div>
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-2xl font-bold mb-4 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-3">Trust & Transparency</h3>
              <p className="text-muted-foreground">
                We believe in creating a marketplace built on honesty and transparency. Our reputation system ensures
                accountability for both freelancers and clients.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-3">Quality Over Quantity</h3>
              <p className="text-muted-foreground">
                We focus on connecting businesses with the right talent, not just any talent. Our platform is designed
                to highlight skills and expertise that matter.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-3">Empowering Independence</h3>
              <p className="text-muted-foreground">
                We&apos;re committed to giving freelancers the tools and support they need to build sustainable independent
                careers on their own terms.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Trusted Partners</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <Card key={member.name} className="text-center">
              <CardContent className="pt-6">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-teal-600 dark:text-teal-400 mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}
