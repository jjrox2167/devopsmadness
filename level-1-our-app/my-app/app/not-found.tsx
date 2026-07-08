import Link from 'next/link';
import { Button } from '@/components/ui/button'; // assuming you have shadcn/ui installed
import { Home, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: '404 - Page Not Found',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center">
        {/* Big 404 Illustration */}
        <div className="mb-8">
          <div className="text-[180px] font-black text-zinc-800 tracking-tighter leading-none select-none">
            404
          </div>
          <div className="mt-[-50px] text-6xl font-bold text-white">Whoops!</div>
        </div>

        <h1 className="text-4xl font-semibold text-white mb-3">
          Something went wrong
        </h1>
        
        <p className="text-zinc-400 text-lg mb-10">
          The page you&apos;re looking for isn&apos;t found. 
          We suggest you head back to the home page.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="text-base">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="text-base">
            <Link href="/admin/dashboard">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go to Dashboard
            </Link>
          </Button>
        </div>

        {/* Optional subtle illustration / SVG */}
        <div className="mt-12 opacity-30">
          <svg
            className="mx-auto w-48 h-48 text-zinc-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1v-5m10-10l2 2m-2-2v10a1 1 0 01-1 1v-5m-6 0a1 1 0 001-1v5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}