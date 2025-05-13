import Particles from "@/components/magicui/particles";
import Logo from "./_components/logo";
import Link from "next/link";
import ShimmerButton from "@/components/magicui/shimmer-button";
import { auth } from "@clerk/nextjs/server";
import { ChevronRight, SquareArrowOutUpRight } from "lucide-react";
import WordPullUp from "@/components/magicui/word-pull-up";
import TypingAnimation from "@/components/magicui/typing-animation";
import Marquee from "@/components/magicui/marquee";
import { AnimatedList } from "@/components/magicui/animated-list";
import SparklesText from "@/components/magicui/sparkles-text";
import { Notification } from "./_components/notification";
import { ReviewCard } from "./_components/review-card";
import { BorderBeam } from "@/components/magicui/border-beam";

let notifications = [
  {
    name: "Step One",
    description: "Go to browse page.",
    icon: "🔍",
    color: "#3767d7",
  },
  {
    name: "Step Two",
    description: "Select course that you want to learn.",
    icon: "📖",
    color: "#FF3D71",
  },
  {
    name: "Step Three",
    description: "Click enroll button to purchase course.",
    icon: "💸",
    color: "#00C9A7",
  },
  {
    name: "Step Four",
    description: "Start learning your courses.",
    icon: "🔥",
    color: "#FFB800",
  },
];

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
];
 
const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

export default async function LandingPage() {
  const { userId } = auth();
  
  return (
    <div className="h-[360vh] w-full relative">
      <Particles
        className="absolute inset-0"
        quantity={720}
        ease={80}
        color="#000000"
        refresh
      />
      <div className="flex justify-between p-6">
        <Logo />
        <div className="flex gap-x-2 ml-auto">
          {!userId ? (
            <Link href="/sign-up">
              <ShimmerButton>
                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                  Sign Up
                </span>
              </ShimmerButton>
            </Link>
          ) : (
            <Link href="/home">
              <ShimmerButton>
                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                  Home
                </span>
                <SquareArrowOutUpRight className="ml-2 h-4 w-4" />
              </ShimmerButton>
            </Link>
          )}
        </div>
      </div>
      <div className="h-[90vh] relative flex flex-col items-center justify-center overflow-hidden rounded-lg">
        <WordPullUp
          words="simpLeMS"
          className="pointer-events-none whitespace-pre-wrap bg-primary bg-clip-text text-center text-8xl font-semibold leading-[1.5]"
        />
        <TypingAnimation
          text="Learning experience simplified."
          duration={60}
          className="pointer-events-none whitespace-pre-wrap bg-primary bg-clip-text text-center text-xl font-medium leading-[1.5]"
        />
        <Link href="/home" className="p-4">
          <ShimmerButton>
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
              Get Started 🎉
            </span>
            <ChevronRight className="ml-1 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </ShimmerButton>
        </Link>
      </div>
      <SparklesText
        text="Our Features"
        className="pointer-events-none whitespace-pre-wrap bg-primary bg-clip-text text-center text-8xl font-semibold leading-[1.5] mb-24"
      />
      <div className="flex justify-center h-[300px] w-full flex-col gap-8 lg:h-[300px] lg:flex-row">
        <div className="relative w-[20vw] flex flex-col items-center justify-center pl-6 pr-6 overflow-hidden rounded-lg border bg-background">
          <span className="pointer-events-none whitespace-pre-wrap bg-primary bg-clip-text text-center text-3xl font-medium leading-[1.5]">
          Online Payment
          </span>
          <p className="pointer-events-none whitespace-pre-wrap bg-primary bg-clip-text text-center pt-5 text-sm font-medium leading-[1.5]">
          simpLeMS uses Xendit as payment gateway that enables students to enroll courses quickly and securely.
          </p>
          <BorderBeam size={250} duration={12} delay={9} />
        </div>
        <div className="relative w-[20vw] flex flex-col items-center justify-center pl-6 pr-6 overflow-hidden rounded-lg border bg-background">
          <span className="pointer-events-none whitespace-pre-wrap bg-primary bg-clip-text text-center text-3xl font-medium leading-[1.5]">
            One-time purchase
          </span>
          <p className="pointer-events-none whitespace-pre-wrap bg-primary bg-clip-text text-center pt-5 text-sm font-medium leading-[1.5]">
            Students will have lifetime access over courses that they purchase.
          </p>
          <BorderBeam size={250} duration={12} delay={9} />
        </div>
        <div className="relative w-[20vw] flex flex-col items-center justify-center pl-6 pr-6 overflow-hidden rounded-lg border bg-background">
          <span className="pointer-events-none whitespace-pre-wrap bg-primary bg-clip-text text-center text-3xl font-medium leading-[1.5]">
            Progress Tracking
          </span>
          <p className="pointer-events-none whitespace-pre-wrap bg-primary bg-clip-text text-center pt-5 text-sm font-medium leading-[1.5]">
            There is progress bar for each course that the students can use to track their progress.
          </p>
          <BorderBeam size={250} duration={12} delay={9} />
        </div>
      </div>
      <SparklesText
        text="Using simpLeMS"
        className="pointer-events-none whitespace-pre-wrap bg-primary bg-clip-text text-center text-8xl font-semibold leading-[1.5] mt-48"
      />
      <TypingAnimation
        text="4 easy step to use simpLeMS."
        duration={60}
        className="pointer-events-none whitespace-pre-wrap bg-primary bg-clip-text text-center text-xl font-medium leading-[1.5] mb-24"
      />
      <div
        className="relative flex h-[500px] w-full flex-col p-6 overflow-hidden rounded-lg bg-transparent"
      >
        <AnimatedList>
          {notifications.map((item, idx) => (
            <Notification {...item} key={idx} />
          ))}
        </AnimatedList>
      </div>
      <SparklesText
        text="Reviews"
        className="pointer-events-none whitespace-pre-wrap bg-primary bg-clip-text text-center text-8xl font-semibold leading-[1.5]"
      />
      <TypingAnimation
        text="Look what other students say about simpLeMS."
        duration={60}
        className="pointer-events-none whitespace-pre-wrap bg-primary bg-clip-text text-center text-xl font-medium leading-[1.5]"
      />
      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-transparent">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
      </div>
      <footer className="mt-20 w-full bg-neutral-100 py-24">
        <div className="container flex flex-col gap-6">
          <Logo />
          <p className="text-neutral-500">© 2025 PT simpLeMS. All rights reserved.</p>
          <p className="text-neutral-500"> Created with ❤️ by <a href="https://www.linkedin.com/in/afifihsanmaulana">Afif Ihsan Maulana</a></p>
        </div>
      </footer>
    </div>
  );
}
