import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";

export default function Landing() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Ace Your Next Interview with AI
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Prepare for your next software engineering interview with
                    our AI-powered mock interview platform. Get personalized
                    questions, real-time feedback, and sample answers to help
                    you shine.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/main"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Start Mock Interview 🤖
                  </Link>
                </div>
              </div>
              <Image
                height={300}
                width={300}
                src="/hero1.png"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Prepare for Your Next Interview with Confidence
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our AI-powered mock interview platform provides personalized
                  questions, real-time feedback, and sample answers to help you
                  ace your next software engineering interview.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Image
                height={0}
                width={0}
                src="/hero2.png"
                alt="Image"
                sizes="100vw"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">
                        AI-Generated Interview Questions
                      </h3>
                      <p className="text-muted-foreground">
                        Get personalized interview questions based on your job
                        position, tech stack, and years of experience.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">
                        AI-Powered Answer Evaluation
                      </h3>
                      <p className="text-muted-foreground">
                        Receive real-time feedback on your answers, including
                        strengths, weaknesses, and areas for improvement.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">
                        AI-Generated Feedback and Sample Answers
                      </h3>
                      <p className="text-muted-foreground">
                        Get personalized feedback and sample answers to help you
                        prepare for your next interview.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  What Our Users Say
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from software engineers who have used our AI-powered mock
                  interview platform to prepare for their next job opportunity.
                </p>
              </div>
              <div className="grid max-w-5xl gap-6 sm:grid-cols-2 md:grid-cols-3">
                <Card className="bg-background p-6 shadow-sm">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium leading-none">
                          John Doe
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Software Engineer
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <blockquote className="text-muted-foreground">
                      &quot;The AI-powered mock interview platform helped me\n
                      tremendously in preparing for my next job interview. The\n
                      personalized questions and feedback were invaluable.&quot;
                    </blockquote>
                  </CardContent>
                </Card>
                <Card className="bg-background p-6 shadow-sm">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>SA</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium leading-none">
                          Sarah Anderson
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Software Engineer
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <blockquote className="text-muted-foreground">
                      &quot;I was able to identify and improve on my
                      weaknesses\n thanks to the AI-generated feedback and
                      sample answers.\n Highly recommended!&quot;
                    </blockquote>
                  </CardContent>
                </Card>
                <Card className="bg-background p-6 shadow-sm">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>MR</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium leading-none">
                          Michael Roberts
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Software Engineer
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <blockquote className="text-muted-foreground">
                      &quot;The AI-generated interview questions were spot on
                      and\n really helped me prepare for the actual interview.
                      I\n landed the job!&quot;
                    </blockquote>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 AI Mock Interview. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy Policy
          </Link>
          <Link
            href="https://linkedin.com/in/changwhi/"
            target="_blank"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Linked In
          </Link>
          <Link
            href="https://github.com/Changwhi"
            target="_blank"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            GitHub
          </Link>
          <Link
            href="https://changwhi.xyz"
            target="_blank"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            My portfolio
          </Link>
        </nav>
      </footer>
    </div>
  );
}
