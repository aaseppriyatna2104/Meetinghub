# MeetingHub - Dokumentasi Lengkap

![MeetingHub](https://img.shields.io/badge/MeetingHub-v1.0-blue)
![Status](https://img.shields.io/badge/Status-Production%20Ready-green)
![License](https://img.shields.io/badge/License-MIT-green)

## 📋 Daftar Isi

1. [Overview](#overview)
2. [Fitur Utama](#fitur-utama)
3. [Instalasi & Setup](#instalasi--setup)
4. [Panduan Penggunaan](#panduan-penggunaan)
5. [Database Schema](#database-schema)
6. [API Documentation](#api-documentation)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

---

## Overview

MeetingHub adalah platform manajemen meeting internal yang modern, responsif, dan mudah digunakan. Aplikasi ini dirancang untuk membantu perusahaan dalam:

- ✅ Booking dan scheduling meeting
- ✅ Manajemen peserta meeting
- ✅ Pembuatan dan penyimpanan notulen
- ✅ Tracking action items
- ✅ Reporting dan analytics
- ✅ Notifikasi dan reminder

### Tech Stack

**Frontend:**
- React / Next.js (Component-based)
- Tailwind CSS (Modern styling)
- Lucide Icons (Beautiful icons)
- Chart.js (Data visualization)

**Backend:**
- Node.js + Express.js
- PostgreSQL (Database)
- JWT Authentication
- RESTful API

**Deployment:**
- Docker
- AWS / Heroku / DigitalOcean

---

## Fitur Utama

### 1. Authentication & Authorization
- **Login/Logout**: Secure authentication dengan JWT
- **Role-based Access**: Admin dan Staff roles
- **Session Management**: Automatic session timeout
- **Password Reset**: Email verification

Demo Credentials:
```
Admin:
Email: admin@company.com
Password: admin123

Staff:
Email: budi@company.com
Password: staff123
```

### 2. Dashboard
Tampilan overview dengan:
- **Quick Stats**: Total meetings, meetings hari ini, upcoming, completed
- **Meeting Today**: Daftar meeting hari ini dengan jam dan lokasi
- **Upcoming Meetings**: 5 meeting berikutnya
- **Statistics Chart**: Grafik meeting per bulan (12 bulan terakhir)
- **Recent Activity**: Update terbaru

### 3. Calendar View
- **Monthly View**: Kalender dengan event indicator
- **Event Detail**: Klik tanggal untuk melihat meeting di hari tersebut
- **Color Coding**: Warna berbeda untuk status meeting
- **Navigation**: Previous/Next month

### 4. Booking Meeting
Form lengkap untuk membuat meeting baru:

**Fields:**
- Judul meeting (required)
- Tanggal meeting (required)
- Jam mulai & selesai (required)
- Ruangan/Lokasi (required)
- Link online (optional)
- Deskripsi meeting
- Multi-select peserta

**Validasi:**
- Conflict detection: Cek bentrok jadwal ruangan
- Time validation: End time > Start time
- Auto-add organizer sebagai peserta

### 5. Manajemen Peserta
- **Add Participants**: Multi-select dari daftar user
- **Remove Participant**: Hapus peserta dari meeting
- **Attendance Status**: Hadir / Tidak Hadir / Pending
- **Import CSV**: Upload daftar peserta
- **Participant History**: Track kehadiran user

### 6. Notulen Meeting
Setelah meeting selesai, buat notulen dengan:

**Sections:**
- Ringkasan meeting (summary)
- Poin pembahasan (discussion points)
- Keputusan meeting (decisions)
- Action items dengan PIC & deadline

**Features:**
- Rich text editor
- Auto-save draft setiap 30 detik
- Upload file lampiran
- Upload foto meeting
- Export PDF
- Share via email
- Print notulen

### 7. History & Search
- **Filter by**: Date, Month, Status, Participant, Organizer
- **Search**: Full-text search pada title & description
- **Sorting**: Terbaru/Terlama, A-Z, Duration
- **Pagination**: Load 10 meetings per page
- **Quick Actions**: View, Edit, Delete, Export

### 8. Reports & Analytics
- **Summary Report**: Total, scheduled, ongoing, completed, cancelled
- **Statistics**: Chart 12 bulan terakhir
- **Export Options**:
  - Export PDF (notulen + detail)
  - Export Excel (meeting list + participants)
  - Export Attendance List
- **Metrics**:
  - Meeting frequency
  - Participant attendance
  - Action item completion rate

### 9. Notification System
- **Meeting Reminder**: 1 jam sebelum meeting
- **Daily Reminder**: H-1 meeting
- **Action Item Overdue**: Notifikasi deadline terlewat
- **Email Notification**: Integrasi email
- **In-app Notification**: Bell icon with badge

### 10. Settings
- **Dark Mode**: Toggle dark/light theme
- **Notification Preferences**: Enable/disable notifications
- **Profile Management**: Update profile info
- **Password Reset**: Change password
- **Data Export**: Download personal data

---

## Instalasi & Setup

### Versi HTML (Standalone)
```bash
# Buka file di browser
open meetinghub.html

# Atau gunakan live server
python -m http.server 8000
# Buka http://localhost:8000
```

### Versi React
```bash
# Install dependencies
npm install

# Gunakan component dari MeetingHub-React.jsx
import MeetingHubApp from './MeetingHub-React'

# Setup Tailwind CSS di project Anda
npm install -D tailwindcss
npx tailwindcss init

# Run development server
npm run dev
```

### Backend Setup
```bash
# Install dependencies
npm install

# Setup PostgreSQL database
createdb meetinghub
psql meetinghub < database.sql

# Configure .env file
cp .env.example .env

# Run migrations
npm run migrate

# Start server
npm start
```

---

## Panduan Penggunaan

### Login
1. Buka aplikasi
2. Masukkan email dan password
3. Pilih role (Admin/Staff)
4. Klik "Login"

### Membuat Meeting
1. Klik "Book Meeting" di sidebar
2. Isi form meeting details
3. Pilih peserta dari list
4. Klik "Buat Meeting"
5. Meeting akan muncul di calendar & history

### Menambah Peserta
1. Buka meeting yang ingin diubah
2. Klik "Add Participant"
3. Pilih peserta dari daftar
4. Peserta akan menerima notifikasi

### Membuat Notulen
1. Buka meeting yang sudah completed
2. Klik "Buat Notulen"
3. Isi setiap section:
   - Ringkasan: Deskripsi singkat hasil meeting
   - Poin Pembahasan: List topik yang dibahas
   - Keputusan: List keputusan yang diambil
   - Action Items: Task dengan PIC & deadline
4. Klik "Simpan"
5. Automatic save draft setiap 30 detik

### Mencari Meeting
1. Klik "History" di sidebar
2. Gunakan search box untuk cari keyword
3. Gunakan filter untuk status, tanggal, dll
4. Hasil akan di-filter realtime

### Export Data
1. Klik "Reports" di sidebar
2. Pilih export type:
   - PDF: Notulen lengkap
   - Excel: Meeting list
   - Attendance: Daftar hadir
3. File akan di-download otomatis

---

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- bcrypt hashed
    role ENUM('admin', 'staff') DEFAULT 'staff',
    division VARCHAR(100),
    position VARCHAR(100),
    avatar VARCHAR(10),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Meetings Table
```sql
CREATE TABLE meetings (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    meeting_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    room VARCHAR(100) NOT NULL,
    online_link VARCHAR(500),
    organizer_id INTEGER NOT NULL REFERENCES users(id),
    status ENUM('scheduled','ongoing','completed','cancelled') DEFAULT 'scheduled',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_meetings_date ON meetings(meeting_date);
CREATE INDEX idx_meetings_status ON meetings(status);
```

### Participants Table
```sql
CREATE TABLE participants (
    id SERIAL PRIMARY KEY,
    meeting_id INTEGER NOT NULL REFERENCES meetings(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id),
    attendance_status ENUM('hadir','tidak_hadir','pending') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(meeting_id, user_id)
);

CREATE INDEX idx_participants_meeting ON participants(meeting_id);
```

### Meeting Notes Table
```sql
CREATE TABLE meeting_notes (
    id SERIAL PRIMARY KEY,
    meeting_id INTEGER UNIQUE REFERENCES meetings(id) ON DELETE CASCADE,
    summary TEXT,
    discussion_points TEXT[],
    decisions TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Action Items Table
```sql
CREATE TABLE action_items (
    id SERIAL PRIMARY KEY,
    meeting_id INTEGER REFERENCES meetings(id) ON DELETE CASCADE,
    notes_id INTEGER REFERENCES meeting_notes(id),
    task VARCHAR(500) NOT NULL,
    pic_id INTEGER REFERENCES users(id),
    deadline DATE NOT NULL,
    status ENUM('pending','in_progress','completed','overdue') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_action_items_deadline ON action_items(deadline);
```

---

## API Documentation

### Authentication Endpoints

**POST /api/auth/login**
```json
Request:
{
  "email": "budi@company.com",
  "password": "staff123",
  "role": "staff"
}

Response (200):
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 2,
    "name": "Budi Santoso",
    "email": "budi@company.com",
    "role": "staff",
    "avatar": "BS"
  }
}
```

**POST /api/auth/logout**
```json
Response (200):
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Meeting Endpoints

**GET /api/meetings**
```
Query Parameters:
- status: scheduled|ongoing|completed|cancelled
- date: YYYY-MM-DD
- search: keyword
- page: 1
- limit: 10

Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Q2 Planning",
      "meetingDate": "2026-05-25",
      "startTime": "09:00",
      "endTime": "11:00",
      "status": "scheduled",
      "room": "Meeting Room A"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 24
  }
}
```

**POST /api/meetings**
```json
Request:
{
  "title": "New Meeting",
  "description": "Meeting description",
  "meetingDate": "2026-05-25",
  "startTime": "09:00",
  "endTime": "11:00",
  "room": "Meeting Room A",
  "onlineLink": "https://meet.google.com/...",
  "participants": [2, 3, 4]
}

Response (201):
{
  "success": true,
  "data": {
    "id": 5,
    "title": "New Meeting",
    ...
  }
}
```

**GET /api/meetings/:id**
```json
Response:
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Q2 Planning",
    "description": "...",
    "meetingDate": "2026-05-25",
    "startTime": "09:00",
    "endTime": "11:00",
    "room": "Meeting Room A",
    "onlineLink": "...",
    "organizerId": 2,
    "status": "scheduled",
    "participants": [
      {
        "id": 2,
        "name": "Budi Santoso",
        "email": "budi@company.com",
        "attendanceStatus": "pending"
      }
    ],
    "notes": null
  }
}
```

**PUT /api/meetings/:id**
```json
Request: Same as POST
Response: Updated meeting object
```

**DELETE /api/meetings/:id**
```json
Response (200):
{
  "success": true,
  "message": "Meeting deleted successfully"
}
```

### Notes Endpoints

**POST /api/meetings/:id/notes**
```json
Request:
{
  "summary": "Meeting summary...",
  "discussionPoints": [
    "Point 1",
    "Point 2"
  ],
  "decisions": [
    "Decision 1",
    "Decision 2"
  ],
  "actionItems": [
    {
      "task": "Complete task",
      "pic": 2,
      "deadline": "2026-05-28"
    }
  ]
}

Response (201):
{
  "success": true,
  "data": {
    "id": 1,
    "meetingId": 1,
    "summary": "...",
    ...
  }
}
```

**GET /api/meetings/:id/notes/export/pdf**
```
Response: PDF file download
```

**POST /api/meetings/:id/notes/send-email**
```json
Request:
{
  "recipients": ["email@company.com"],
  "subject": "Meeting Notes - Q2 Planning",
  "message": "Please find attached the meeting notes..."
}

Response (200):
{
  "success": true,
  "message": "Email sent successfully"
}
```

---

## Best Practices

### Meeting Planning
1. **Tentukan tujuan**: Apa yang ingin dicapai?
2. **Tentukan peserta**: Siapa saja yang perlu hadir?
3. **Tentukan durasi**: Berapa lama meeting dibutuhkan?
4. **Siapkan agenda**: Apa topik yang akan dibahas?
5. **Share agenda**: Sampaikan ke peserta H-1

### Meeting Execution
1. **Mulai tepat waktu**: Hormati waktu peserta
2. **Follow agenda**: Jangan keluar topik
3. **Record decisions**: Catat keputusan saat meeting
4. **Assign actions**: Tentukan PIC untuk setiap task
5. **Set deadlines**: Tentukan deadline yang realistis

### Notulen Creation
1. **Buatlah segera**: Jangan tunda sampai esok hari
2. **Ringkas & clear**: Gunakan bullet points
3. **Lengkap**: Jangan ada keputusan yang terlewat
4. **Action items detail**: Jelas task, PIC, dan deadline
5. **Share untuk review**: Minta feedback sebelum finalisasi

### Action Item Management
1. **Specific**: Task harus jelas dan spesifik
2. **Measurable**: Ada KPI atau success criteria
3. **Assignable**: Ada PIC yang jelas
4. **Realistic**: Deadline bisa dicapai
5. **Time-bound**: Ada deadline yang jelas

---

## Troubleshooting

### Issue: Login gagal dengan "Invalid credentials"

**Cause**: Email, password, atau role salah

**Solution**:
- Cek spelling email dan password
- Pastikan role sesuai (admin/staff)
- Gunakan demo credentials untuk testing
- Reset password jika lupa

### Issue: Meeting tidak muncul di calendar

**Cause**: Date format salah atau timezone issue

**Solution**:
- Gunakan format YYYY-MM-DD
- Cek timezone server & browser
- Reload halaman browser
- Clear browser cache

### Issue: Notifikasi tidak terkirim

**Cause**: Email configuration atau SMTP error

**Solution**:
- Cek SMTP settings di .env
- Verify email account credentials
- Check firewall/security groups
- Lihat email spam folder

### Issue: Database connection error

**Cause**: PostgreSQL tidak running atau credentials salah

**Solution**:
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Start PostgreSQL
sudo systemctl start postgresql

# Test connection
psql -U postgres -h localhost
```

### Issue: Slow performance

**Cause**: Database query tidak optimal atau missing indexes

**Solution**:
```bash
# Create missing indexes
npm run create-indexes

# Check query performance
EXPLAIN ANALYZE SELECT * FROM meetings WHERE date > NOW();

# Implement caching
npm install redis
```

---

## Performance Tips

1. **Database Optimization**
   - Gunakan indexes untuk frequently queried columns
   - Paginate large result sets
   - Use connection pooling

2. **Frontend Optimization**
   - Lazy load calendar
   - Virtualize long lists
   - Memoize expensive computations
   - Use code splitting

3. **API Optimization**
   - Implement caching (Redis)
   - Use pagination
   - Compress responses (gzip)
   - Rate limiting

4. **Server Optimization**
   - Load balancing
   - CDN for static files
   - Enable compression
   - Monitor resource usage

---

## Security Guidelines

1. **Authentication**
   - Always use HTTPS in production
   - Implement rate limiting on login
   - Hash passwords with bcrypt
   - Use strong JWT secrets

2. **Authorization**
   - Validate user permissions on every request
   - Check meeting ownership before update/delete
   - Implement role-based access control

3. **Data Protection**
   - Use SQL parameterized queries
   - Validate all inputs
   - Implement CORS properly
   - Encrypt sensitive data

4. **Monitoring**
   - Log all important actions
   - Monitor for suspicious activity
   - Set up alerts for errors
   - Regular security audits

---

## Maintenance & Updates

### Regular Tasks
- [ ] Daily: Monitor error logs
- [ ] Weekly: Backup database
- [ ] Weekly: Check server resources
- [ ] Monthly: Review user activity
- [ ] Monthly: Update dependencies
- [ ] Quarterly: Security audit

### Version Updates
```bash
# Check for updates
npm outdated

# Update packages
npm update
npm audit fix

# Test thoroughly before production
npm test

# Deploy to production
git push production main
```

---

## Support & Contact

**Email**: support@meetinghub.com
**Documentation**: https://docs.meetinghub.com
**GitHub**: https://github.com/meetinghub

---

## Changelog

### v1.0.0 (May 2026)
- ✅ Initial release
- ✅ All core features implemented
- ✅ HTML + React versions
- ✅ Backend API ready
- ✅ Dark mode support
- ✅ Mobile responsive

### Upcoming Features (v1.1.0)
- 🔄 WebSocket real-time updates
- 🔄 Video integration (Zoom/Google Meet)
- 🔄 AI meeting summary
- 🔄 Advanced analytics
- 🔄 Mobile app (iOS/Android)

---

## License

MIT License - Free for commercial and personal use.

---

**Last Updated:** May 22, 2026
**Version:** 1.0.0
**Status:** ✅ Production Ready
