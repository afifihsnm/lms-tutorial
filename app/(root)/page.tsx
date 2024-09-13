
import { cn } from "@/lib/utils";
import Particles from "@/components/magicui/particles";
import Logo from "./_components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ShimmerButton from "@/components/magicui/shimmer-button";
import { auth } from "@clerk/nextjs/server";
import { SquareArrowOutUpRight } from "lucide-react";

export default async function LandingPage() {
  const { userId } = auth();
  
  return (
    <div className="h-[250vh] w-full relative">
      <Particles
        className="absolute inset-0"
        quantity={600}
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
      <div className="h-[80vh] relative flex flex-col items-center justify-center overflow-hidden rounded-lg">
        <span className="pointer-events-none whitespace-pre-wrap bg-primary bg-clip-text text-center text-8xl font-semibold leading-none text-transparent">
          LMS
        </span>
        <Link href="/home" className="p-4">
          <ShimmerButton>
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
              Get Started  🎉
            </span>
            {/* <SquareArrowOutUpRight className="ml-2 h-4 w-4" /> */}
          </ShimmerButton>
        </Link>
      </div>
    </div>
  );
}
