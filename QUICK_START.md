# MeetingHub - Quick Start Guide ⚡

Panduan cepat untuk memulai MeetingHub dalam 10 menit!

---

## 🚀 Pilihan 1: HTML Standalone (Paling Cepat - 1 Menit)

### Langkah 1: Buka File HTML
```bash
# Cara 1: Buka langsung di browser
open meetinghub.html

# Cara 2: Gunakan Python HTTP server
cd folder_yang_berisi_file
python -m http.server 8000
# Buka http://localhost:8000/meetinghub.html

# Cara 3: Gunakan Node HTTP server
npx http-server
# Buka http://localhost:8080/meetinghub.html
```

### Langkah 2: Login dengan Demo Credentials
```
Admin:
Email: admin@company.com
Password: admin123

Staff:
Email: budi@company.com
Password: staff123
```

### Langkah 3: Explore Features
- ✅ Lihat Dashboard
- ✅ Buka Calendar
- ✅ Buat Meeting Baru
- ✅ Lihat History
- ✅ Toggle Dark Mode

**Kelebihan:**
- Tidak butuh backend
- Tidak butuh database
- Bisa diakses offline
- Loading cepat

**Kekurangan:**
- Data hanya di memory (tidak persist)
- Tidak bisa share antar user
- Tidak ada notifikasi real-time

---

## 🎯 Pilihan 2: React Development (5 Menit)

### Langkah 1: Setup React Project
```bash
# Create React app
npx create-react-app meetinghub
cd meetinghub

# Install dependencies
npm install
npm install -D tailwindcss postcss autoprefixer
npm install lucide-react

# Setup Tailwind
npx tailwindcss init -p
```

### Langkah 2: Buat struktur folder
```bash
mkdir src/components
mkdir src/pages
mkdir src/hooks
mkdir src/services
```

### Langkah 3: Copy React Component
```javascript
// src/App.jsx
import MeetingHubApp from './MeetingHub-React'

export default MeetingHubApp
```

### Langkah 4: Setup Tailwind Config
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#10b981',
      }
    },
  },
  plugins: [],
}
```

### Langkah 5: Run Development Server
```bash
npm start
# Buka http://localhost:3000
```

---

## 🏗️ Pilihan 3: Full Stack Setup dengan Backend (10 Menit)

### Langkah 1: Setup Database
```bash
# Install PostgreSQL (jika belum)
# macOS:
brew install postgresql@15

# Linux:
sudo apt-get install postgresql postgresql-contrib

# Windows:
# Download dari https://www.postgresql.org/download/windows/

# Start PostgreSQL
sudo systemctl start postgresql

# Create database
createdb meetinghub
```

### Langkah 2: Setup Backend
```bash
# Clone atau buat folder backend
mkdir meetinghub-backend
cd meetinghub-backend

# Initialize Node project
npm init -y

# Install dependencies
npm install express cors dotenv pg jsonwebtoken bcryptjs nodemailer
npm install --save-dev nodemon

# Create structure
mkdir config controllers routes middleware models services
```

### Langkah 3: Create .env file
```bash
cp .env.example .env

# Edit .env dengan credentials Anda
nano .env
```

### Langkah 4: Create server.js
```javascript
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/meetings', require('./routes/meetings'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Langkah 5: Run Backend
```bash
npm start
# Server akan running di http://localhost:3001
```

### Langkah 6: Setup Frontend ke Backend
```javascript
// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001/api'
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
```

---

## 📝 Demo Data

Meeting yang sudah ada (tanggal 20 Mei 2026):

**Operations Meeting - Finance & Logistics**
- **Waktu**: 13:30 - 15:00
- **Lokasi**: Meeting Room A
- **Status**: Completed ✅
- **Peserta**: 4 orang
- **Link**: https://meet.google.com/ops-meeting-2026

### Topics yang dibahas:
1. Finance Ops Dashboard
2. Deployment Warisan Kopi
3. Routing JABODETABEK
4. Tim Maintenance
5. Dashboard Monitoring Baru

---

## 🔧 Troubleshooting

### Issue: "Module not found"
```bash
# Solution: Install semua dependencies
npm install
```

### Issue: "Cannot connect to database"
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Start PostgreSQL
sudo systemctl start postgresql

# Verify connection
psql -U postgres -h localhost
```

### Issue: "Port already in use"
```bash
# Find process using port
lsof -i :3001

# Kill process
kill -9 <PID>

# Or use different port
PORT=3002 npm start
```

### Issue: "CORS errors"
```bash
# Make sure CORS is enabled in backend
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000'
}));
```

---

## 📚 Fitur yang Bisa Langsung Dicoba

### 1. Dashboard
- ✅ Lihat statistik meeting
- ✅ Today's meetings
- ✅ Upcoming meetings

### 2. Calendar
- ✅ Lihat meeting di kalender
- ✅ Klik tanggal untuk detail
- ✅ Event indicator

### 3. Book Meeting
- ✅ Buat meeting baru
- ✅ Tambah peserta
- ✅ Set waktu & lokasi

### 4. History
- ✅ Search meeting
- ✅ Filter by status
- ✅ Sorting

### 5. Reports
- ✅ Lihat statistik
- ✅ Export PDF/Excel

### 6. Settings
- ✅ Dark mode
- ✅ Notification preferences

---

## 🔑 Demo Credentials

| Role | Email | Password | Access |
|------|-------|----------|--------|
| Admin | admin@company.com | admin123 | Full access |
| Staff | budi@company.com | staff123 | Limited access |
| Staff | siti@company.com | staff123 | Limited access |
| Staff | ahmad@company.com | staff123 | Limited access |
| Staff | dewi@company.com | staff123 | Limited access |

---

## 📦 File Structure

```
meetinghub/
├── meetinghub.html (Standalone version)
├── MeetingHub-React.jsx (React component)
├── README.md (Full documentation)
├── BACKEND_SETUP_GUIDE.md (Backend guide)
├── .env.example (Environment template)
└── quick-start.md (This file)

Backend:
├── server.js
├── config/
│   ├── database.js
│   └── jwt.js
├── controllers/
│   ├── authController.js
│   └── meetingController.js
├── routes/
│   ├── auth.js
│   └── meetings.js
└── .env
```

---

## 🚀 Production Deployment

### Heroku (Easiest)
```bash
# Install Heroku CLI
brew install heroku

# Login
heroku login

# Create app
heroku create meetinghub-app

# Deploy
git push heroku main
```

### Docker
```bash
# Build image
docker build -t meetinghub .

# Run container
docker run -p 3001:3001 meetinghub
```

### AWS/DigitalOcean
```bash
# See BACKEND_SETUP_GUIDE.md for detailed instructions
```

---

## 📞 Support

**Jika ada masalah:**

1. ✅ Cek demo credentials
2. ✅ Cek error di browser console (F12)
3. ✅ Cek server logs
4. ✅ Cek .env configuration
5. ✅ Clear browser cache (Ctrl+Shift+Delete)
6. ✅ Restart server

**Links:**
- 📖 Full Documentation: README.md
- 🏗️ Backend Setup: BACKEND_SETUP_GUIDE.md
- ⚙️ Configuration: .env.example

---

## 💡 Next Steps

Setelah setup berhasil:

1. **Explore Features**: Coba semua fitur di aplikasi
2. **Customize**: Sesuaikan dengan kebutuhan perusahaan Anda
3. **Add Data**: Import data meeting existing (jika ada)
4. **Setup Email**: Configure SMTP untuk notifikasi
5. **Backup**: Setup database backup regular
6. **Monitor**: Setup monitoring & alerting
7. **Deploy**: Deploy ke production

---

## 📊 Architecture Overview

```
┌─────────────────────────────────────────────┐
│         Browser / Mobile App                 │
│  (React, HTML, or Native Mobile)             │
└──────────────┬──────────────────────────────┘
               │
               │ API Calls (REST/GraphQL)
               ▼
┌─────────────────────────────────────────────┐
│      Backend Server (Node.js/Express)       │
│  - Authentication (JWT)                      │
│  - API Endpoints                             │
│  - Business Logic                            │
│  - Email Service                             │
│  - File Upload Handler                       │
└──────────────┬──────────────────────────────┘
               │
               │ SQL Queries
               ▼
┌─────────────────────────────────────────────┐
│      PostgreSQL Database                    │
│  - Users                                     │
│  - Meetings                                  │
│  - Participants                              │
│  - Notes                                     │
│  - Action Items                              │
│  - Notifications                             │
└─────────────────────────────────────────────┘
```

---

## ✅ Checklist Setup

- [ ] Clone/download repository
- [ ] Install Node.js & npm
- [ ] Setup database (PostgreSQL)
- [ ] Create .env file
- [ ] Install dependencies (`npm install`)
- [ ] Run migrations (`npm run migrate`)
- [ ] Start backend (`npm start`)
- [ ] Start frontend (`npm run dev`)
- [ ] Test login dengan demo credentials
- [ ] Create first meeting
- [ ] Invite participants
- [ ] Create meeting notes
- [ ] Export reports
- [ ] Setup email notifications
- [ ] Deploy to production

---

## 🎉 Selesai!

MeetingHub Anda sudah siap digunakan! 🎊

Mulai dari:
1. **Dashboard** - Lihat overview meeting
2. **Calendar** - Lihat schedule
3. **Book Meeting** - Buat meeting baru
4. **History** - Cari meeting lama
5. **Reports** - Export data

---

**Happy Meeting! 📅**

Untuk pertanyaan atau bantuan, silakan cek dokumentasi lengkap di README.md
