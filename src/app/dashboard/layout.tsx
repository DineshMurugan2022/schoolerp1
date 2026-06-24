"use client";

import Link from 'next/link';
import { 
  LayoutDashboard, Users, UserCheck, GraduationCap, 
  CalendarHeart, DollarSign, BookOpen, Clock, 
  Megaphone, Bus, HeartPulse, Image as ImageIcon, 
  WalletCards, BarChart3, Settings, LogOut, 
  FileText, Activity, Gift
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const parsed = JSON.parse(userStr);
        setUser(parsed);
      } catch (e) {}
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const roleStr = typeof user?.role === 'string' ? user.role : (user?.role?.name || '');
  const r = roleStr.toLowerCase();
  
  const isSuperAdmin = r === 'superadmin' || r === 'admin';
  const isPrincipal = r === 'principal' || isSuperAdmin;
  const isTeacher = r === 'teacher' || isSuperAdmin;
  const isAccountant = r === 'accountant' || isSuperAdmin;
  const isReceptionist = r === 'receptionist' || isSuperAdmin;
  
  const portalName = isSuperAdmin ? 'Super Admin Portal' 
    : r === 'principal' ? 'Principal Portal'
    : r === 'teacher' ? 'Teacher Portal'
    : r === 'accountant' ? 'Accounts Portal'
    : 'Staff Portal';

  const initial = user?.firstName ? user.firstName[0].toUpperCase() : 'A';

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="flex h-16 shrink-0 items-center gap-x-3 px-6 bg-slate-900/50 backdrop-blur-xl border-b border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <span className="text-xl font-bold gradient-text">E.A.S. Academy School ERP</span>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <Link href="/dashboard" className="flex items-center px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-lg group transition-colors">
            <LayoutDashboard className="h-5 w-5 mr-3 text-slate-400 group-hover:text-indigo-600" />
            Dashboard
          </Link>
          
          {(isSuperAdmin || isReceptionist) && (
            <Link href="/dashboard/admissions" className="flex items-center px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-lg group transition-colors">
              <FileText className="h-5 w-5 mr-3 text-slate-400 group-hover:text-indigo-600" />
              Admissions
            </Link>
          )}

          {(isPrincipal || isTeacher) && (
            <Link href="/dashboard/students" className="flex items-center px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-lg group transition-colors">
              <GraduationCap className="h-5 w-5 mr-3 text-slate-400 group-hover:text-indigo-600" />
              Student Mgmt
            </Link>
          )}

          {(isPrincipal || isReceptionist) && (
            <Link href="/dashboard/parents" className="flex items-center px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-lg group transition-colors">
              <Users className="h-5 w-5 mr-3 text-slate-400 group-hover:text-indigo-600" />
              Parent Mgmt
            </Link>
          )}

          {(isPrincipal || isTeacher) && (
            <Link href="/dashboard/attendance" className="flex items-center px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-lg group transition-colors">
              <UserCheck className="h-5 w-5 mr-3 text-slate-400 group-hover:text-indigo-600" />
              Attendance
            </Link>
          )}

          {(isAccountant || isPrincipal) && (
            <Link href="/dashboard/fees" className="flex items-center px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-lg group transition-colors">
              <DollarSign className="h-5 w-5 mr-3 text-slate-400 group-hover:text-indigo-600" />
              Fee Mgmt
            </Link>
          )}

          {(isPrincipal) && (
            <Link href="/dashboard/teachers" className="flex items-center px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-lg group transition-colors">
              <BookOpen className="h-5 w-5 mr-3 text-slate-400 group-hover:text-indigo-600" />
              Teacher Mgmt
            </Link>
          )}

          {(isSuperAdmin) && (
            <Link href="/dashboard/classes" className="flex items-center px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-lg group transition-colors">
              <LayoutDashboard className="h-5 w-5 mr-3 text-slate-400 group-hover:text-indigo-600" />
              Class Mgmt
            </Link>
          )}

          {(isPrincipal || isTeacher) && (
            <Link href="/dashboard/daily-activity" className="flex items-center px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-lg group transition-colors">
              <Activity className="h-5 w-5 mr-3 text-slate-400 group-hover:text-indigo-600" />
              Daily Activity
            </Link>
          )}

          {(isPrincipal || isReceptionist) && (
            <Link href="/dashboard/communication" className="flex items-center px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-lg group transition-colors">
              <Megaphone className="h-5 w-5 mr-3 text-slate-400 group-hover:text-indigo-600" />
              Communication
            </Link>
          )}

          {(isPrincipal) && (
            <Link href="/dashboard/events" className="flex items-center px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-lg group transition-colors">
              <Gift className="h-5 w-5 mr-3 text-slate-400 group-hover:text-indigo-600" />
              Events
            </Link>
          )}

          {(isSuperAdmin || isReceptionist) && (
            <Link href="/dashboard/transport" className="flex items-center px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-lg group transition-colors">
              <Bus className="h-5 w-5 mr-3 text-slate-400 group-hover:text-indigo-600" />
              Transport
            </Link>
          )}

          {(isSuperAdmin || isTeacher) && (
            <Link href="/dashboard/daycare" className="flex items-center px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-lg group transition-colors">
              <Clock className="h-5 w-5 mr-3 text-slate-400 group-hover:text-indigo-600" />
              Day Care
            </Link>
          )}

          {(isSuperAdmin || isReceptionist) && (
            <Link href="/dashboard/health" className="flex items-center px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-lg group transition-colors">
              <HeartPulse className="h-5 w-5 mr-3 text-slate-400 group-hover:text-indigo-600" />
              Health Records
            </Link>
          )}

          {(isSuperAdmin || isTeacher) && (
            <Link href="/dashboard/gallery" className="flex items-center px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-lg group transition-colors">
              <ImageIcon className="h-5 w-5 mr-3 text-slate-400 group-hover:text-indigo-600" />
              Gallery
            </Link>
          )}

          {(isSuperAdmin) && (
            <Link href="/dashboard/payroll" className="flex items-center px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-lg group transition-colors">
              <WalletCards className="h-5 w-5 mr-3 text-slate-400 group-hover:text-indigo-600" />
              Staff Payroll
            </Link>
          )}

          {(isPrincipal || isAccountant) && (
            <Link href="/dashboard/reports" className="flex items-center px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-lg group transition-colors">
              <BarChart3 className="h-5 w-5 mr-3 text-slate-400 group-hover:text-indigo-600" />
              Reports
            </Link>
          )}
        </nav>
        <div className="p-4 border-t border-slate-200 space-y-1 shrink-0">
          <Link href="/dashboard/settings" className="flex items-center px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-lg group transition-colors">
            <Settings className="h-5 w-5 mr-3 text-slate-400 group-hover:text-indigo-600" />
            Settings
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center px-3 py-2 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-lg group transition-colors">
            <LogOut className="h-5 w-5 mr-3 text-slate-400 group-hover:text-red-600" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-slate-800">{portalName}</h2>
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
              {initial}
            </div>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
