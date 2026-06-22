import Link from 'next/link';
import { ArrowRight, BookOpen, Heart, Shield, Star, Users, Award, PlayCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center relative overflow-hidden w-full">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-screen overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-rose-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[60%] bg-emerald-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      {/* 1. Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white mb-8 shadow-sm animate-fade-in-up">
          <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
          <span className="text-slate-700 font-bold text-sm tracking-wide">Rated #1 Preschool in Sunshine Valley</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tight text-slate-800 mb-8 leading-tight max-w-5xl">
          Where little minds take <br className="hidden md:block"/>
          <span className="relative inline-block">
            <span className="relative z-10 gradient-text">giant leaps.</span>
            <svg className="absolute w-full h-4 -bottom-1 left-0 text-amber-400 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round"/>
            </svg>
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed mb-12">
          A premium early childhood experience fostering growth, endless curiosity, and pure joy through play-based learning.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 w-full justify-center items-center">
          <Link href="/admissions" className="group relative inline-flex items-center justify-center px-8 py-5 font-bold text-white transition-all duration-300 bg-violet-600 rounded-2xl hover:bg-violet-500 hover:scale-105 shadow-xl shadow-violet-500/30">
            <span className="text-lg">Apply for 2026-2027</span>
            <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1.5 transition-transform" />
          </Link>
          <button className="group inline-flex items-center justify-center px-8 py-5 font-bold text-slate-700 transition-all duration-300 bg-white border-2 border-slate-100 rounded-2xl hover:bg-slate-50 hover:border-violet-200 hover:scale-105 shadow-md">
            <PlayCircle className="mr-3 h-6 w-6 text-violet-500 group-hover:text-violet-600" />
            <span className="text-lg">Take a Virtual Tour</span>
          </button>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="w-full bg-white/40 backdrop-blur-lg border-y border-white/50 py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center space-y-2">
              <span className="text-4xl md:text-5xl font-black text-violet-600">15+</span>
              <span className="text-slate-600 font-bold uppercase tracking-wider text-sm">Years Experience</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <span className="text-4xl md:text-5xl font-black text-rose-500">500+</span>
              <span className="text-slate-600 font-bold uppercase tracking-wider text-sm">Happy Kids</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <span className="text-4xl md:text-5xl font-black text-amber-500">1:8</span>
              <span className="text-slate-600 font-bold uppercase tracking-wider text-sm">Teacher Ratio</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <span className="text-4xl md:text-5xl font-black text-emerald-500">50+</span>
              <span className="text-slate-600 font-bold uppercase tracking-wider text-sm">Extracurriculars</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Features Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-slate-800">Why Parents Love Us</h2>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">We provide a holistic environment tailored to your child's developmental needs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="glass-panel p-10 rounded-[2rem] flex flex-col items-start transform transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:shadow-violet-200 border-t-4 border-t-violet-400">
            <div className="bg-violet-100 p-5 rounded-2xl mb-8">
              <Heart className="h-10 w-10 text-violet-600" />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-4">Nurturing Care</h3>
            <p className="text-slate-600 font-medium leading-relaxed">A loving environment where every child feels safe, valued, and completely encouraged to express their true selves.</p>
          </div>
          
          {/* Card 2 */}
          <div className="glass-panel p-10 rounded-[2rem] flex flex-col items-start transform transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:shadow-rose-200 border-t-4 border-t-rose-400 mt-0 md:mt-8">
            <div className="bg-rose-100 p-5 rounded-2xl mb-8">
              <BookOpen className="h-10 w-10 text-rose-500" />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-4">Play-Based Learning</h3>
            <p className="text-slate-600 font-medium leading-relaxed">Curriculum designed to spark innate curiosity through highly engaging, hands-on activities and exploration.</p>
          </div>
          
          {/* Card 3 */}
          <div className="glass-panel p-10 rounded-[2rem] flex flex-col items-start transform transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:shadow-emerald-200 border-t-4 border-t-emerald-400 mt-0 md:mt-16">
            <div className="bg-emerald-100 p-5 rounded-2xl mb-8">
              <Shield className="h-10 w-10 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-4">Top-Tier Safety</h3>
            <p className="text-slate-600 font-medium leading-relaxed">State-of-the-art security, strict authorized pick-up verifications, and comprehensive health protocols.</p>
          </div>
        </div>
      </section>

      {/* 4. CTA Banner */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="relative overflow-hidden rounded-[3rem] p-12 md:p-16 text-center gradient-bg shadow-2xl">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black opacity-10 rounded-full -translate-x-1/2 translate-y-1/2 blur-2xl"></div>
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-6xl font-black text-white">Ready to join our family?</h2>
            <p className="text-xl text-white/90 font-medium max-w-2xl mx-auto">
              Spaces for the upcoming academic year are filling up fast. Secure your child's spot today.
            </p>
            <div className="pt-4">
              <Link href="/admissions" className="inline-flex items-center justify-center px-10 py-5 font-black text-violet-700 bg-white rounded-2xl hover:bg-slate-50 transition-transform transform hover:scale-105 shadow-xl">
                Start Enrollment
                <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
