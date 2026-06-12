"use client";

import { useState, useEffect } from 'react';
import { Users, GraduationCap, Calendar, Wallet, UserCheck, Cake, Clock, AlertTriangle, FileText, Image as ImageIcon, HeartPulse, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function DashboardOverview() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/stats`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard stats', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return <div className="p-12 text-center text-slate-500 font-medium">Loading Dashboard...</div>;
  }

  // ==========================================
  // PARENT PORTAL UI
  // ==========================================
  if (stats?.isParentPortal) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Parent Portal</h1>
          <p className="text-slate-500 mt-1">Welcome! Here is your child's recent activity and updates.</p>
        </div>

        {stats.error ? (
          <div className="bg-amber-50 text-amber-700 p-6 rounded-2xl border border-amber-200 shadow-sm font-medium">
            {stats.error} Please contact the school administration to link your child to this account.
          </div>
        ) : (
          <>
            {/* My Children Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stats.myChildren?.map((child: any) => (
                <div key={child._id} className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-3xl p-6 shadow-md text-white relative overflow-hidden group">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:bg-white/20 transition-all"></div>
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-black border-2 border-white/30">
                      {child.firstName[0]}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{child.firstName} {child.lastName}</h2>
                      <p className="text-indigo-100 font-medium text-sm mt-0.5">{child.className} - Section {child.section}</p>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-between items-end border-t border-white/20 pt-4">
                    <div>
                      <p className="text-xs text-indigo-200 uppercase tracking-wider font-bold">Admission No.</p>
                      <p className="font-medium">{child.admissionNumber}</p>
                    </div>
                    <div>
                      <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">Active</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="space-y-6 lg:col-span-2">
                {/* Daily Activity / Daycare */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8">
                  <h2 className="text-xl font-bold text-slate-800 flex items-center mb-6">
                    <Clock className="w-5 h-5 mr-2 text-indigo-500" /> Recent Daily Activity
                  </h2>
                  {stats.recentDaycareLogs?.length === 0 ? (
                    <p className="text-slate-500 italic">No recent activity logs found.</p>
                  ) : (
                    <div className="space-y-4">
                      {stats.recentDaycareLogs?.map((log: any) => (
                        <div key={log._id} className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                          <div className="flex justify-between items-center mb-2 border-b border-slate-200 pb-2">
                            <span className="font-bold text-slate-700">{new Date(log.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                            <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">In: {log.checkInTime || '-'} • Out: {log.checkOutTime || '-'}</div>
                          </div>
                          <div className="text-sm text-slate-600 space-y-1">
                            {log.foodTracking && <p><span className="font-medium text-slate-400">Food:</span> {log.foodTracking}</p>}
                            {log.sleepTracking && <p><span className="font-medium text-slate-400">Sleep:</span> {log.sleepTracking}</p>}
                            {log.notes && <p><span className="font-medium text-slate-400">Notes:</span> {log.notes}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recent Photos / Albums */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8">
                  <h2 className="text-xl font-bold text-slate-800 flex items-center mb-6">
                    <ImageIcon className="w-5 h-5 mr-2 text-pink-500" /> Latest Gallery Albums
                  </h2>
                  {stats.recentAlbums?.length === 0 ? (
                    <p className="text-slate-500 italic">No recent albums available.</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {stats.recentAlbums?.map((album: any) => (
                        <div key={album._id} className="border border-slate-100 rounded-2xl overflow-hidden group">
                          <div className="h-32 bg-slate-100 relative">
                            {album.mediaUrls && album.mediaUrls.length > 0 ? (
                              <img src={album.mediaUrls[0]} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-300">
                                <ImageIcon className="h-8 w-8" />
                              </div>
                            )}
                          </div>
                          <div className="p-4 bg-white">
                            <h3 className="font-bold text-slate-800 truncate">{album.title}</h3>
                            <p className="text-xs text-slate-400 font-medium mt-1">{new Date(album.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Fee Status */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8">
                  <h2 className="text-xl font-bold text-slate-800 flex items-center mb-6">
                    <Wallet className="w-5 h-5 mr-2 text-amber-500" /> Fee Reminders
                  </h2>
                  {stats.feesDue?.length === 0 ? (
                    <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl border border-emerald-100 font-bold flex items-center">
                      <CheckCircle2 className="w-5 h-5 mr-2" /> All fees are cleared!
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {stats.feesDue?.map((fee: any) => (
                        <div key={fee._id} className="p-4 bg-rose-50 rounded-xl border border-rose-100">
                          <p className="font-bold text-slate-800">{fee.feeType}</p>
                          <p className="text-xs font-bold text-rose-500 uppercase tracking-wider mt-0.5">Due {new Date(fee.dueDate).toLocaleDateString()}</p>
                          <div className="mt-3 flex justify-between items-center">
                            <p className="font-black text-rose-700 text-lg">₹{(fee.totalAmount - fee.amountPaid).toLocaleString()}</p>
                            <button className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors">Pay Now</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Upcoming Events */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8">
                  <h2 className="text-xl font-bold text-slate-800 flex items-center mb-6">
                    <Calendar className="w-5 h-5 mr-2 text-indigo-500" /> Upcoming Events
                  </h2>
                  {stats.upcomingEvents?.length === 0 ? (
                    <p className="text-slate-500 italic">No upcoming events scheduled.</p>
                  ) : (
                    <div className="space-y-4">
                      {stats.upcomingEvents?.map((event: any) => (
                        <div key={event._id} className="flex space-x-4 items-start">
                          <div className="flex flex-col items-center justify-center bg-indigo-50 w-12 h-12 rounded-xl border border-indigo-100 flex-shrink-0">
                            <span className="text-[10px] font-bold text-indigo-400 uppercase">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                            <span className="text-base font-black text-indigo-700">{new Date(event.date).getDate()}</span>
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 leading-tight">{event.title}</p>
                            <p className="text-xs font-medium text-slate-500 mt-1 line-clamp-2">{event.description || 'No additional details.'}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // ==========================================
  // STAFF / ADMIN UI
  // ==========================================
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Main KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center space-x-4 transition-transform hover:-translate-y-1">
          <div className="p-4 bg-indigo-100 rounded-2xl flex-shrink-0">
            <Users className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Total Students</p>
            <p className="text-3xl font-black text-slate-800">
              {stats?.totalStudents || 0}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center space-x-4 transition-transform hover:-translate-y-1">
          <div className="p-4 bg-amber-100 rounded-2xl flex-shrink-0">
            <Clock className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Pending Admissions</p>
            <p className="text-3xl font-black text-slate-800">
              {stats?.pendingAdmissions || 0}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center space-x-4 transition-transform hover:-translate-y-1">
          <div className="p-4 bg-emerald-100 rounded-2xl flex-shrink-0">
            <GraduationCap className="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">New Admissions</p>
            <p className="text-3xl font-black text-slate-800">
              {stats?.newAdmissions || 0}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center space-x-4 transition-transform hover:-translate-y-1">
          <div className="p-4 bg-blue-100 rounded-2xl flex-shrink-0">
            <Wallet className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Fees Collected</p>
            <p className="text-3xl font-black text-slate-800">
              ₹{(stats?.feeCollectionSummary || 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Attendance & Fees Due) */}
        <div className="space-y-6 lg:col-span-2">
          {/* Attendance Summary */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800 flex items-center">
                <UserCheck className="w-5 h-5 mr-2 text-indigo-500" /> Today's Attendance
              </h2>
              <Link href="/dashboard/attendance" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors">
                Mark Attendance
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <p className="text-slate-500 font-bold mb-1">Students Present</p>
                <div className="flex items-end space-x-2">
                  <span className="text-4xl font-black text-indigo-600">{stats?.attendanceSummary?.studentsPresent || 0}</span>
                  <span className="text-slate-400 font-medium pb-1">/ {stats?.totalStudents || 0}</span>
                </div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <p className="text-slate-500 font-bold mb-1">Staff Present</p>
                <div className="flex items-end space-x-2">
                  <span className="text-4xl font-black text-emerald-600">{stats?.attendanceSummary?.staffPresent || 0}</span>
                  <span className="text-slate-400 font-medium pb-1">Total</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fee Due List */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-rose-500" /> Fee Due List
              </h2>
              <Link href="/dashboard/fees" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors">
                View All
              </Link>
            </div>
            
            {stats?.feesDue?.length === 0 ? (
              <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl border border-emerald-100 font-bold flex items-center">
                All fees are cleared!
              </div>
            ) : (
              <div className="space-y-3">
                {stats?.feesDue?.map((fee: any) => (
                  <div key={fee._id} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <p className="font-bold text-slate-800">{fee.studentId ? `${fee.studentId.firstName} ${fee.studentId.lastName}` : 'Unknown Student'}</p>
                      <p className="text-xs font-bold text-rose-500 uppercase tracking-wider mt-0.5">{fee.feeType} • Due {new Date(fee.dueDate).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-slate-800">₹{(fee.totalAmount - fee.amountPaid).toLocaleString()}</p>
                      <span className="text-[10px] font-bold bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">{fee.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (Events & Birthdays) */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-indigo-500" /> Upcoming Events
              </h2>
            </div>
            
            {stats?.upcomingEvents?.length === 0 ? (
              <p className="text-slate-500 text-sm font-medium italic">No upcoming events scheduled.</p>
            ) : (
              <div className="space-y-4">
                {stats?.upcomingEvents?.map((event: any) => (
                  <div key={event._id} className="flex space-x-4">
                    <div className="flex flex-col items-center justify-center bg-indigo-50 w-14 h-14 rounded-xl border border-indigo-100 flex-shrink-0">
                      <span className="text-xs font-bold text-indigo-400 uppercase">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                      <span className="text-lg font-black text-indigo-700">{new Date(event.date).getDate()}</span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 leading-tight">{event.title}</p>
                      <p className="text-xs font-bold text-slate-400 mt-1">{event.type} • {event.audience}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Birthday Reminders */}
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl border border-indigo-500 shadow-lg p-6 md:p-8 text-white">
            <div className="flex items-center mb-6">
              <Cake className="w-6 h-6 mr-3 text-pink-300" />
              <h2 className="text-xl font-bold">Birthday Reminders</h2>
            </div>
            
            {stats?.birthdays?.length === 0 ? (
              <p className="text-indigo-200 text-sm font-medium">No birthdays this month.</p>
            ) : (
              <div className="space-y-4">
                {stats?.birthdays?.map((bday: any) => {
                  const bDate = new Date(bday.date);
                  const isToday = bDate.getDate() === new Date().getDate();
                  
                  return (
                    <div key={bday._id} className={`flex items-center justify-between p-3 rounded-xl backdrop-blur-sm ${isToday ? 'bg-white/20 border border-white/30' : 'bg-black/10'}`}>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                          {bday.name[0]}
                        </div>
                        <div>
                          <p className="font-bold">{bday.name}</p>
                          <p className="text-xs font-medium text-indigo-200 opacity-90">
                            {isToday ? '🎉 Today!' : bDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
