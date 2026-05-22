import React, { useState, useCallback, useMemo } from 'react';
import {
  Calendar,
  Plus,
  LogOut,
  Bell,
  Moon,
  Sun,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Eye,
  Users,
  Clock,
  MapPin,
  Link as LinkIcon
} from 'lucide-react';

// ============ DUMMY DATA ============
const DUMMY_USERS = [
  { id: 1, name: 'Admin User', email: 'admin@company.com', password: 'admin123', role: 'admin', avatar: 'AU', division: 'IT', position: 'Manager' },
  { id: 2, name: 'Budi Santoso', email: 'budi@company.com', password: 'staff123', role: 'staff', avatar: 'BS', division: 'IT', position: 'Developer' },
  { id: 3, name: 'Siti Nurhaliza', email: 'siti@company.com', password: 'staff123', role: 'staff', avatar: 'SN', division: 'HR', position: 'Manager' },
  { id: 4, name: 'Ahmad Hidayat', email: 'ahmad@company.com', password: 'staff123', role: 'staff', avatar: 'AH', division: 'Marketing', position: 'Specialist' },
  { id: 5, name: 'Dewi Lestari', email: 'dewi@company.com', password: 'staff123', role: 'staff', avatar: 'DL', division: 'Finance', position: 'Officer' }
];

const DUMMY_MEETINGS = [
  {
    id: 1,
    title: 'Q2 Planning Session',
    description: 'Strategic planning untuk Q2 2024',
    meetingDate: '2024-05-25',
    startTime: '09:00',
    endTime: '11:00',
    room: 'Meeting Room A',
    onlineLink: 'https://meet.google.com/abc-defg-hij',
    organizerId: 2,
    status: 'scheduled',
    participants: [2, 3, 4],
    notes: null
  },
  {
    id: 2,
    title: 'Operations Meeting - Finance & Logistics',
    description: 'Meeting operasional membahas Finance Ops, Deployment, Routing, Maintenance, dan Dashboard Monitoring',
    meetingDate: '2026-05-20',
    startTime: '13:30',
    endTime: '15:00',
    room: 'Meeting Room A',
    onlineLink: 'https://meet.google.com/ops-meeting-2026',
    organizerId: 3,
    status: 'completed',
    participants: [2, 3, 4, 5],
    notes: {
      id: 2,
      summary: 'Meeting operasional membahas status Finance Ops, Deployment Warisan Kopi, Routing JABODETABEK, Tim Maintenance, dan rencana implementasi Dashboard baru untuk monitoring operasional yang lebih efisien.',
      discussionPoints: [
        'Finance Ops - Dashboard akan membantu operasional Recharge, dengan selisih data Flazz Rp2.200',
        'Deployment Warisan Kopi - Kesalahan di sisi Marketing, PKS belum clear',
        'Routing JABODETABEK - Deploy kosong hingga Jumat, menunggu info posisi mesin',
        'Tim Maintenance - Mesin Recharge Balai Kota (kendala akses, offline)',
        'Dashboard Monitoring - GSheet tidak akan digunakan lagi'
      ],
      decisions: [
        'Dashboard Finance Ops dilanjutkan dengan target penyelesaian maksimal jam 17:00',
        'Deployment Warisan Kopi akan diselesaikan setelah PKS clear',
        'GSheet akan dihentikan dan diganti dengan Dashboard baru',
        'Daily report summary warehouse akan mengikuti rules yang sudah ditetapkan'
      ],
      actionItems: [
        { task: 'Selesaikan selisih data Flazz Rp2.200', pic: 2, deadline: '2026-05-20' },
        { task: 'Clear PKS dari Marketing', pic: 3, deadline: '2026-05-22' },
        { task: 'Follow-up info posisi mesin ke Sales', pic: 4, deadline: '2026-05-21' }
      ]
    }
  }
];

// ============ COMPONENTS ============

// Login Page
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('budi@company.com');
  const [password, setPassword] = useState('staff123');
  const [role, setRole] = useState('staff');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = DUMMY_USERS.find(u => u.email === email && u.password === password && u.role === role);
    if (user) {
      onLogin(user);
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-indigo-800 px-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600 mb-2">MeetingHub</h1>
          <p className="text-gray-600">Meeting Management Platform</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="admin@company.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
          <p className="font-semibold mb-2">Demo Credentials:</p>
          <p>Admin: admin@company.com / admin123</p>
          <p>Staff: budi@company.com / staff123</p>
        </div>
      </div>
    </div>
  );
}

// Sidebar Navigation
function Sidebar({ currentPage, onNavigate, user }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'calendar', label: 'Calendar', icon: '📅' },
    { id: 'book-meeting', label: 'Book Meeting', icon: '➕' },
    { id: 'history', label: 'History', icon: '⏰' },
    { id: 'participants', label: 'Participants', icon: '👥' },
    { id: 'reports', label: 'Reports', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-6 h-screen overflow-y-auto">
      <div className="flex items-center gap-3 mb-8 font-bold text-xl text-indigo-600">
        <div className="w-8 h-8 bg-indigo-600 rounded text-white flex items-center justify-center">M</div>
        <span>MeetingHub</span>
      </div>

      <div className="mb-8">
        <div className="text-xs font-bold uppercase text-gray-500 mb-4">Main</div>
        {navItems.slice(0, 3).map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg mb-2 transition ${
              currentPage === item.id
                ? 'bg-indigo-100 text-indigo-600 font-medium'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="mb-8">
        <div className="text-xs font-bold uppercase text-gray-500 mb-4">Management</div>
        {navItems.slice(3, 6).map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg mb-2 transition ${
              currentPage === item.id
                ? 'bg-indigo-100 text-indigo-600 font-medium'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="mb-8">
        <div className="text-xs font-bold uppercase text-gray-500 mb-4">Other</div>
        <button
          onClick={() => onNavigate('settings')}
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg mb-2 transition ${
            currentPage === 'settings'
              ? 'bg-indigo-100 text-indigo-600 font-medium'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <span>⚙️</span>
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
}

// Header
function Header({ currentPage, user, onToggleDarkMode, darkMode, onLogout }) {
  const pageLabels = {
    dashboard: 'Dashboard',
    calendar: 'Calendar',
    'book-meeting': 'Book Meeting',
    history: 'History',
    participants: 'Participants',
    reports: 'Reports',
    settings: 'Settings'
  };

  const today = new Date();
  const dateStr = today.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-40">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{pageLabels[currentPage]}</h1>
        <p className="text-sm text-gray-500">{dateStr}</p>
      </div>
      <div className="flex items-center gap-6">
        <button className="text-gray-600 hover:text-gray-900">
          <Bell size={20} />
        </button>
        <button onClick={onToggleDarkMode} className="text-gray-600 hover:text-gray-900">
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg text-white flex items-center justify-center font-semibold text-sm">
            {user.avatar}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.role === 'admin' ? 'Administrator' : 'Staff'}</p>
          </div>
        </div>
        <button onClick={onLogout} className="text-gray-600 hover:text-red-600">
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
}

// Dashboard Page
function DashboardPage({ meetings, users }) {
  const today = new Date().toISOString().split('T')[0];
  const todayMeetings = meetings.filter(m => m.meetingDate === today);
  const upcomingMeetings = meetings.filter(m => m.meetingDate > today && m.status === 'scheduled');
  const completedMeetings = meetings.filter(m => m.status === 'completed');

  const StatCard = ({ icon, title, value, color }) => (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-indigo-300 transition">
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-4 ${
        color === 'primary' ? 'bg-indigo-100 text-indigo-600' :
        color === 'success' ? 'bg-green-100 text-green-600' :
        color === 'warning' ? 'bg-amber-100 text-amber-600' :
        'bg-red-100 text-red-600'
      }`}>
        {icon}
      </div>
      <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon="📊" title="Total Meetings" value={meetings.length} color="primary" />
        <StatCard icon="🗓️" title="Today" value={todayMeetings.length} color="success" />
        <StatCard icon="⏰" title="Upcoming" value={upcomingMeetings.length} color="warning" />
        <StatCard icon="✅" title="Completed" value={completedMeetings.length} color="danger" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Today's Meetings</h3>
          {todayMeetings.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No meetings today</p>
          ) : (
            <div className="space-y-3">
              {todayMeetings.map(m => (
                <div key={m.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                  <p className="font-semibold text-gray-900 text-sm">{m.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{m.startTime} - {m.endTime}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming Meetings</h3>
          {upcomingMeetings.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No upcoming meetings</p>
          ) : (
            <div className="space-y-3">
              {upcomingMeetings.slice(0, 5).map(m => (
                <div key={m.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                  <p className="font-semibold text-gray-900 text-sm">{m.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{new Date(m.meetingDate).toLocaleDateString('id-ID')}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// History Page
function HistoryPage({ meetings, users }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filteredMeetings = useMemo(() => {
    return meetings.filter(m => {
      const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !filterStatus || m.status === filterStatus;
      return matchesSearch && matchesStatus;
    }).sort((a, b) => new Date(b.meetingDate) - new Date(a.meetingDate));
  }, [meetings, searchTerm, filterStatus]);

  const getUserName = (id) => users.find(u => u.id === id)?.name || 'Unknown';

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Meeting History</h3>
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search meetings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Time</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Organizer</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredMeetings.map(m => (
              <tr key={m.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-semibold text-gray-900">{m.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{new Date(m.meetingDate).toLocaleDateString('id-ID')}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{m.startTime} - {m.endTime}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{getUserName(m.organizerId)}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold gap-1 ${
                    m.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                    m.status === 'ongoing' ? 'bg-green-100 text-green-700' :
                    m.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${
                      m.status === 'scheduled' ? 'bg-blue-700' :
                      m.status === 'ongoing' ? 'bg-green-700 animate-pulse' :
                      m.status === 'completed' ? 'bg-emerald-700' :
                      'bg-red-700'
                    }`}></span>
                    {m.status.charAt(0).toUpperCase() + m.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Calendar Page
function CalendarPage({ meetings }) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 20)); // May 20, 2026

  const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const monthName = currentDate.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

  const days = [];
  for (let i = 0; i < firstDayOfMonth(currentDate); i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth(currentDate); i++) {
    days.push(i);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-900">{monthName}</h3>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-medium bg-gray-100 rounded-lg hover:bg-gray-200">← Prev</button>
            <button className="px-4 py-2 text-sm font-medium bg-gray-100 rounded-lg hover:bg-gray-200">Next →</button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-xs font-bold text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day, idx) => {
            const dateStr = day ? `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : null;
            const hasMeeting = day && meetings.some(m => m.meetingDate === dateStr);
            const isToday = day && dateStr === '2026-05-20';

            return (
              <div
                key={idx}
                className={`aspect-square flex items-center justify-center rounded-lg border transition ${
                  !day ? 'bg-gray-50' :
                  isToday ? 'bg-indigo-100 border-indigo-500 font-bold' :
                  hasMeeting ? 'bg-indigo-50 border-indigo-300' :
                  'bg-white border-gray-200 hover:border-indigo-300'
                }`}
              >
                {day && (
                  <div className="flex flex-col items-center justify-center">
                    {day}
                    {hasMeeting && <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-1"></div>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4">Upcoming Events</h3>
        <div className="space-y-3">
          {meetings.filter(m => new Date(m.meetingDate) >= currentDate).slice(0, 5).map(m => (
            <div key={m.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
              <p className="font-semibold text-gray-900 text-sm">{m.title}</p>
              <p className="text-xs text-gray-500 mt-1">{m.startTime}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Reports Page
function ReportsPage({ meetings }) {
  const totalMeetings = meetings.length;
  const scheduledMeetings = meetings.filter(m => m.status === 'scheduled').length;
  const ongoingMeetings = meetings.filter(m => m.status === 'ongoing').length;
  const completedMeetings = meetings.filter(m => m.status === 'completed').length;
  const cancelledMeetings = meetings.filter(m => m.status === 'cancelled').length;

  const StatCard = ({ icon, title, value }) => (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center gap-4">
        <div className="text-4xl">{icon}</div>
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <StatCard icon="📊" title="Total" value={totalMeetings} />
        <StatCard icon="⏳" title="Scheduled" value={scheduledMeetings} />
        <StatCard icon="🟢" title="Ongoing" value={ongoingMeetings} />
        <StatCard icon="✅" title="Completed" value={completedMeetings} />
        <StatCard icon="❌" title="Cancelled" value={cancelledMeetings} />
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Export Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
            <Download size={18} />
            Export PDF
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
            <Download size={18} />
            Export Excel
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
            <Download size={18} />
            Export Attendance
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Completed Meetings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Participants</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Notes</th>
              </tr>
            </thead>
            <tbody>
              {meetings.filter(m => m.status === 'completed').map(m => (
                <tr key={m.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">{m.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{new Date(m.meetingDate).toLocaleDateString('id-ID')}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{m.participants.length} people</td>
                  <td className="px-6 py-4">
                    {m.notes ? (
                      <button className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm">View</button>
                    ) : (
                      <button className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm">Create</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Main App
export default function MeetingHubApp() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [meetings, setMeetings] = useState(DUMMY_MEETINGS);
  const [users] = useState(DUMMY_USERS);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      setCurrentUser(null);
      setCurrentPage('dashboard');
    }
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigate} user={currentUser} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          currentPage={currentPage}
          user={currentUser}
          onLogout={handleLogout}
          onToggleDarkMode={() => {}}
          darkMode={false}
        />
        <div className="flex-1 overflow-auto p-8">
          {currentPage === 'dashboard' && <DashboardPage meetings={meetings} users={users} />}
          {currentPage === 'calendar' && <CalendarPage meetings={meetings} />}
          {currentPage === 'history' && <HistoryPage meetings={meetings} users={users} />}
          {currentPage === 'reports' && <ReportsPage meetings={meetings} />}
          {currentPage !== 'dashboard' && currentPage !== 'calendar' && currentPage !== 'history' && currentPage !== 'reports' && (
            <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
              <p className="text-gray-600 text-lg">Page under construction</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
