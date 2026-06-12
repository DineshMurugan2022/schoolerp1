"use client";

import { useState, useEffect } from 'react';
import { CalendarHeart, ShieldCheck, Download, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function PortalDashboard() {
  const [user, setUser] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [diaries, setDiaries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
      fetchPortalData();
    }
  }, []);

  const fetchPortalData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      // Fetch associated students
      const studentRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/students`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      let fetchedStudents = [];
      if (studentRes.ok) {
        fetchedStudents = await studentRes.json();
        setStudents(fetchedStudents);
      }

      // Fetch today's diary
      const today = new Date().toISOString().split('T')[0];
      const diaryRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/daily-diary?date=${today}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (diaryRes.ok) {
        setDiaries(await diaryRes.json());
      }
    } catch (error) {
      console.error('Failed to fetch portal data', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20 text-indigo-600">
        <div className="animate-spin h-10 w-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full"></div>
      </div>
    );
  }

  const role = user?.role || 'Parent';

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-3xl p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/2"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-black mb-2">Hello, {user?.firstName}! 👋</h1>
          <p className="text-indigo-100 text-lg max-w-xl font-medium">
            {role === 'Parent' 
              ? "Welcome to your Parent Portal. Here is the latest update on your child's journey." 
              : "Welcome to your Student Portal. Here is your latest dashboard."}
          </p>
        </div>
      </div>

      {students.length === 0 ? (
        <div className="bg-white p-10 rounded-3xl border border-slate-200 text-center">
          <ShieldCheck className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-800">No Linked Profiles Found</h3>
          <p className="text-slate-500 mt-2">Please contact the school administration to link a student profile to your account.</p>
        </div>
      ) : (
        students.map((student) => {
          // Find diary for this specific student
          const diary = diaries.find(d => d.studentId?._id === student._id);

          return (
            <div key={student._id} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column - Diary Snapshot */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h2 className="text-2xl font-black text-slate-800">{student.firstName}'s Daily Diary</h2>
                      <p className="text-slate-500 font-medium">Grade: {student.grade}</p>
                    </div>
                    <Link href="/portal/diary" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-4 py-2 rounded-xl transition-colors">
                      View Full History
                    </Link>
                  </div>
                  
                  {diary ? (
                    <>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mb-8">
                        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                          <span className="text-3xl mb-2 block">🍽️</span>
                          <p className="text-xs font-black text-emerald-800 uppercase tracking-wider mb-1">Meals</p>
                          <p className="text-sm font-bold text-slate-800">{diary.meals || 'N/A'}</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                          <span className="text-3xl mb-2 block">😴</span>
                          <p className="text-xs font-black text-blue-800 uppercase tracking-wider mb-1">Nap</p>
                          <p className="text-sm font-bold text-slate-800">{diary.napTime || 'N/A'}</p>
                        </div>
                        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                          <span className="text-3xl mb-2 block">🎨</span>
                          <p className="text-xs font-black text-amber-800 uppercase tracking-wider mb-1">Mood</p>
                          <p className="text-sm font-bold text-slate-800">{diary.mood || 'N/A'}</p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100">
                          <span className="text-3xl mb-2 block">⭐</span>
                          <p className="text-xs font-black text-purple-800 uppercase tracking-wider mb-1">Activities</p>
                          <p className="text-sm font-bold text-slate-800">{diary.activities?.length || 0} tasks</p>
                        </div>
                      </div>
                      
                      {diary.notes && (
                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 relative">
                          <div className="absolute top-6 left-6 text-slate-200 text-4xl font-serif leading-none">"</div>
                          <p className="text-slate-700 font-medium italic relative z-10 pl-8 pr-4">
                            {diary.notes}
                          </p>
                          {diary.teacherId && (
                            <p className="text-xs font-bold text-slate-400 mt-3 text-right uppercase tracking-wider">
                              — {diary.teacherId.firstName} {diary.teacherId.lastName} (Teacher)
                            </p>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                      <CalendarHeart className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500 font-bold">No diary entry for today yet.</p>
                      <p className="text-sm text-slate-400">Check back later when the teacher updates the system.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Status */}
              <div className="space-y-6">
                {/* Profile Status */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
                  <h2 className="text-lg font-black text-slate-800 mb-6">Profile Status</h2>
                  
                  <div className="flex items-center justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-500 font-bold text-sm">Enrollment</span>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-black rounded-lg uppercase tracking-wider">{student.status}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-500 font-bold text-sm">Blood Group</span>
                    <span className="font-bold text-slate-800 text-sm">{student.bloodGroup || 'Not Specified'}</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-slate-500 font-bold text-sm">Joined</span>
                    <span className="font-bold text-slate-800 text-sm">{new Date(student.enrollmentDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Report Card */}
                <div className="bg-gradient-to-br from-indigo-50 to-white rounded-3xl border border-indigo-100 shadow-sm p-8">
                  <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center mb-4 text-indigo-600">
                    <Download className="h-6 w-6" />
                  </div>
                  <h2 className="text-lg font-black text-slate-800 mb-2">Academics & Reports</h2>
                  <p className="text-sm text-slate-500 font-medium mb-6">View latest assessment reports and progress tracks.</p>
                  <button className="w-full bg-white border-2 border-indigo-100 hover:border-indigo-600 hover:text-indigo-600 text-slate-700 font-bold py-3 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center">
                    Download Latest Report
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
