import Link from 'next/link';
import { ArrowRight, BookOpen, Heart, Shield } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 lg:p-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[40%] h-[40%] bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

      <div className="z-10 max-w-5xl w-full flex flex-col items-center text-center space-y-12">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Welcome to <span className="gradient-text">Garden Guru</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-light">
            Where little minds take giant leaps. A modern pre-school experience fostering growth, curiosity, and joy.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link href="/admissions" className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-indigo-600 font-pj rounded-xl hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 shadow-lg hover:shadow-indigo-500/30">
            Apply for Admission
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/login" className="group inline-flex items-center justify-center px-8 py-4 font-bold text-slate-700 transition-all duration-200 bg-white border border-slate-200 font-pj rounded-xl hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-200 shadow-sm hover:shadow-md">
            Admin Portal
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-16">
          <div className="glass-panel p-8 rounded-2xl flex flex-col items-center text-center transform transition-transform hover:-translate-y-2 cursor-pointer">
            <div className="bg-pink-100 p-4 rounded-full mb-6">
              <Heart className="h-8 w-8 text-pink-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Nurturing Care</h3>
            <p className="text-slate-500">A loving environment where every child feels safe, valued, and encouraged to express themselves.</p>
          </div>
          
          <div className="glass-panel p-8 rounded-2xl flex flex-col items-center text-center transform transition-transform hover:-translate-y-2 cursor-pointer">
            <div className="bg-indigo-100 p-4 rounded-full mb-6">
              <BookOpen className="h-8 w-8 text-indigo-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Play-Based Learning</h3>
            <p className="text-slate-500">Curriculum designed to spark curiosity through engaging, hands-on activities and exploration.</p>
          </div>
          
          <div className="glass-panel p-8 rounded-2xl flex flex-col items-center text-center transform transition-transform hover:-translate-y-2 cursor-pointer">
            <div className="bg-amber-100 p-4 rounded-full mb-6">
              <Shield className="h-8 w-8 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Top-Tier Safety</h3>
            <p className="text-slate-500">State-of-the-art security, authorized pick-up verifications, and strict health protocols.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
