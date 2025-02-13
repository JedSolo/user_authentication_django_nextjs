import Link from 'next/link';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Full Auth | Home',
  description: 'Full Authentication home page',
};

export default function Page() {
  return (
    <main className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
              Authentication System Application
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              This is an application build with Django as backend and Next.js as frontend with Tailwind for styling. Enjoy!!...
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/api/login"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log into your account
              </Link>
              <Link href="/api/register" className="text-sm/6 font-semibold text-gray-900">
                Or create new account <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
