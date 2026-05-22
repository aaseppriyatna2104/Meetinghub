# MeetingHub - Backend Setup Guide

## Daftar Isi
1. [Database Schema](#database-schema)
2. [API Endpoints](#api-endpoints)
3. [Backend Setup](#backend-setup)
4. [Authentication](#authentication)
5. [Deployment Guide](#deployment-guide)
6. [Environment Variables](#environment-variables)

---

## Database Schema

### PostgreSQL Tables

#### 1. **users**
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'staff') DEFAULT 'staff',
    division VARCHAR(100),
    position VARCHAR(100),
    avatar VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

#### 2. **meetings**
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
    organizer_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    status ENUM('scheduled', 'ongoing', 'completed', 'cancelled') DEFAULT 'scheduled',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_meetings_date ON meetings(meeting_date);
CREATE INDEX idx_meetings_status ON meetings(status);
CREATE INDEX idx_meetings_organizer ON meetings(organizer_id);
```

#### 3. **participants**
```sql
CREATE TABLE participants (
    id SERIAL PRIMARY KEY,
    meeting_id INTEGER NOT NULL REFERENCES meetings(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    attendance_status ENUM('hadir', 'tidak_hadir', 'pending') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(meeting_id, user_id)
);

CREATE INDEX idx_participants_meeting ON participants(meeting_id);
CREATE INDEX idx_participants_user ON participants(user_id);
```

#### 4. **meeting_notes**
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

CREATE INDEX idx_notes_meeting ON meeting_notes(meeting_id);
```

#### 5. **action_items**
```sql
CREATE TABLE action_items (
    id SERIAL PRIMARY KEY,
    meeting_id INTEGER REFERENCES meetings(id) ON DELETE CASCADE,
    notes_id INTEGER REFERENCES meeting_notes(id) ON DELETE CASCADE,
    task VARCHAR(500) NOT NULL,
    pic_id INTEGER REFERENCES users(id),
    deadline DATE NOT NULL,
    status ENUM('pending', 'in_progress', 'completed', 'overdue') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_action_items_meeting ON action_items(meeting_id);
CREATE INDEX idx_action_items_pic ON action_items(pic_id);
CREATE INDEX idx_action_items_deadline ON action_items(deadline);
```

#### 6. **notifications**
```sql
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    meeting_id INTEGER REFERENCES meetings(id),
    type ENUM('reminder', 'action_item', 'meeting_update', 'note_shared') NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
```

---

## API Endpoints

### Authentication
```
POST   /api/auth/login                  - Login user
POST   /api/auth/logout                 - Logout user
POST   /api/auth/register               - Register new user (admin only)
GET    /api/auth/me                     - Get current user
POST   /api/auth/refresh-token          - Refresh JWT token
```

### Users
```
GET    /api/users                       - Get all users
GET    /api/users/:id                   - Get user by ID
PUT    /api/users/:id                   - Update user profile
DELETE /api/users/:id                   - Delete user (admin only)
GET    /api/users/:id/meetings          - Get user's meetings
```

### Meetings
```
GET    /api/meetings                    - Get all meetings (with filters)
GET    /api/meetings/:id                - Get meeting detail
POST   /api/meetings                    - Create new meeting
PUT    /api/meetings/:id                - Update meeting
DELETE /api/meetings/:id                - Delete meeting
GET    /api/meetings?date=YYYY-MM-DD    - Get meetings by date
GET    /api/meetings?status=completed   - Get meetings by status
GET    /api/meetings/search?q=keyword   - Search meetings
```

### Participants
```
GET    /api/meetings/:id/participants   - Get meeting participants
POST   /api/meetings/:id/participants   - Add participant to meeting
DELETE /api/meetings/:id/participants/:userId - Remove participant
PUT    /api/meetings/:id/participants/:userId - Update attendance status
```

### Meeting Notes
```
GET    /api/meetings/:id/notes          - Get meeting notes
POST   /api/meetings/:id/notes          - Create meeting notes
PUT    /api/meetings/:id/notes          - Update meeting notes
DELETE /api/meetings/:id/notes          - Delete meeting notes
GET    /api/notes/:id/export/pdf        - Export notes as PDF
GET    /api/notes/:id/export/html       - Export notes as HTML
POST   /api/notes/:id/send-email        - Send notes via email
```

### Action Items
```
GET    /api/action-items                - Get all action items
GET    /api/action-items?status=pending - Get pending action items
POST   /api/meetings/:id/action-items   - Create action item
PUT    /api/action-items/:id            - Update action item
DELETE /api/action-items/:id            - Delete action item
GET    /api/action-items/overdue        - Get overdue items
```

### Notifications
```
GET    /api/notifications               - Get user notifications
GET    /api/notifications/unread        - Get unread notifications
PUT    /api/notifications/:id/read      - Mark notification as read
DELETE /api/notifications/:id           - Delete notification
POST   /api/notifications/mark-all-read - Mark all as read
```

### Reports
```
GET    /api/reports/summary             - Get meeting summary
GET    /api/reports/statistics          - Get statistics
GET    /api/reports/export/excel        - Export meetings to Excel
GET    /api/reports/export/pdf          - Export meetings to PDF
GET    /api/reports/attendance          - Get attendance report
```

---

## Backend Setup

### 1. Node.js + Express Setup

```bash
# Initialize project
mkdir meetinghub-backend
cd meetinghub-backend
npm init -y

# Install dependencies
npm install express cors dotenv pg jsonwebtoken bcryptjs multer nodemailer
npm install --save-dev nodemon

# Install optional packages
npm install chart.js pdf-lib xlsx
```

### 2. Project Structure

```
meetinghub-backend/
├── config/
│   ├── database.js
│   └── jwt.js
├── controllers/
│   ├── authController.js
│   ├── meetingController.js
│   ├── participantController.js
│   ├── notesController.js
│   ├── notificationController.js
│   └── reportController.js
├── routes/
│   ├── auth.js
│   ├── meetings.js
│   ├── users.js
│   ├── participants.js
│   ├── notes.js
│   ├── notifications.js
│   └── reports.js
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   └── validators.js
├── models/
│   ├── User.js
│   ├── Meeting.js
│   ├── Participant.js
│   ├── MeetingNotes.js
│   ├── ActionItem.js
│   └── Notification.js
├── services/
│   ├── emailService.js
│   ├── pdfService.js
│   ├── excelService.js
│   └── notificationService.js
├── .env
├── .gitignore
└── server.js
```

### 3. Main Server File (server.js)

```javascript
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/database');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/meetings', require('./routes/meetings'));
app.use('/api/participants', require('./routes/participants'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/reports', require('./routes/reports'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
```

### 4. Database Config (config/database.js)

```javascript
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
```

### 5. Authentication Middleware (middleware/auth.js)

```javascript
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Invalid token' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
  next();
};

module.exports = { authMiddleware, adminOnly };
```

### 6. Example Controller (controllers/meetingController.js)

```javascript
const db = require('../config/database');

// Get all meetings
exports.getAllMeetings = async (req, res) => {
  try {
    const { status, date, search } = req.query;
    let query = 'SELECT * FROM meetings WHERE 1=1';
    const params = [];

    if (status) {
      query += ' AND status = $' + (params.length + 1);
      params.push(status);
    }

    if (date) {
      query += ' AND meeting_date = $' + (params.length + 1);
      params.push(date);
    }

    if (search) {
      query += ' AND title ILIKE $' + (params.length + 1);
      params.push('%' + search + '%');
    }

    query += ' ORDER BY meeting_date DESC';

    const result = await db.query(query, params);

    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get meeting by ID
exports.getMeetingById = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT m.*, 
             array_agg(DISTINCT p.user_id) as participants,
             n.id as notes_id
      FROM meetings m
      LEFT JOIN participants p ON m.id = p.meeting_id
      LEFT JOIN meeting_notes n ON m.id = n.meeting_id
      WHERE m.id = $1
      GROUP BY m.id, n.id
    `;

    const result = await db.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Meeting not found' });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create meeting
exports.createMeeting = async (req, res) => {
  try {
    const { title, description, meetingDate, startTime, endTime, room, onlineLink } = req.body;
    const organizerId = req.userId;

    const query = `
      INSERT INTO meetings (title, description, meeting_date, start_time, end_time, room, online_link, organizer_id, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'scheduled')
      RETURNING *
    `;

    const result = await db.query(query, [
      title,
      description,
      meetingDate,
      startTime,
      endTime,
      room,
      onlineLink,
      organizerId
    ]);

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update meeting
exports.updateMeeting = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, meetingDate, startTime, endTime, room, onlineLink, status } = req.body;

    const query = `
      UPDATE meetings
      SET title = $1, description = $2, meeting_date = $3, start_time = $4, 
          end_time = $5, room = $6, online_link = $7, status = $8, updated_at = CURRENT_TIMESTAMP
      WHERE id = $9
      RETURNING *
    `;

    const result = await db.query(query, [
      title,
      description,
      meetingDate,
      startTime,
      endTime,
      room,
      onlineLink,
      status,
      id
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Meeting not found' });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete meeting
exports.deleteMeeting = async (req, res) => {
  try {
    const { id } = req.params;

    const query = 'DELETE FROM meetings WHERE id = $1 RETURNING *';
    const result = await db.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Meeting not found' });
    }

    res.json({ success: true, message: 'Meeting deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
```

---

## Authentication

### JWT Implementation

```javascript
// Generate JWT Token
const generateToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role: role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// Refresh Token
const refreshToken = (oldToken) => {
  const decoded = jwt.decode(oldToken);
  return generateToken(decoded.id, decoded.role);
};
```

### Login Flow

```javascript
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const query = 'SELECT * FROM users WHERE email = $1 AND role = $2';
    const result = await db.query(query, [email, role]);

    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user.id, user.role);

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
```

---

## Environment Variables

Create `.env` file:

```env
# Server
PORT=3001
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=meetinghub
DB_USER=postgres
DB_PASSWORD=your_password
DB_SSL=false

# JWT
JWT_SECRET=your_super_secret_key_here_change_in_production

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=noreply@meetinghub.com

# Frontend
FRONTEND_URL=http://localhost:3000

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads
```

---

## Deployment Guide

### Heroku Deployment

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create meetinghub-api

# Set environment variables
heroku config:set JWT_SECRET=your_secret_key
heroku config:set DB_URL=postgresql://user:pass@host:port/db

# Deploy
git push heroku main
```

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3001

CMD ["node", "server.js"]
```

```bash
# Build and run
docker build -t meetinghub-api .
docker run -p 3001:3001 --env-file .env meetinghub-api
```

### AWS Deployment (EC2)

```bash
# SSH into EC2
ssh -i key.pem ec2-user@your-instance-ip

# Install Node.js
curl -fsSL https://rpm.nodesource.com/setup_16.x | sudo bash -
sudo yum install nodejs

# Clone repository
git clone your-repo-url
cd meetinghub-backend

# Install dependencies
npm install

# Setup PM2 for process management
npm install -g pm2
pm2 start server.js --name "meetinghub-api"
pm2 startup
pm2 save
```

---

## Testing API with cURL

```bash
# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"budi@company.com","password":"staff123","role":"staff"}'

# Get all meetings
curl -X GET http://localhost:3001/api/meetings \
  -H "Authorization: Bearer YOUR_TOKEN"

# Create meeting
curl -X POST http://localhost:3001/api/meetings \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title":"Team Meeting",
    "description":"Daily standup",
    "meetingDate":"2026-05-25",
    "startTime":"10:00",
    "endTime":"10:30",
    "room":"Meeting Room A",
    "onlineLink":"https://meet.google.com/abc"
  }'

# Get meeting by ID
curl -X GET http://localhost:3001/api/meetings/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Frontend Integration

### React Integration Example

```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API Service
export const meetingAPI = {
  login: (email, password, role) =>
    apiClient.post('/auth/login', { email, password, role }),
  
  getMeetings: (filters) =>
    apiClient.get('/meetings', { params: filters }),
  
  getMeetingById: (id) =>
    apiClient.get(`/meetings/${id}`),
  
  createMeeting: (data) =>
    apiClient.post('/meetings', data),
  
  updateMeeting: (id, data) =>
    apiClient.put(`/meetings/${id}`, data),
  
  deleteMeeting: (id) =>
    apiClient.delete(`/meetings/${id}`),
};

// Usage in React
function MeetingsList() {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    meetingAPI.getMeetings().then(res => {
      setMeetings(res.data.data);
    });
  }, []);

  return (
    <div>
      {meetings.map(m => (
        <div key={m.id}>{m.title}</div>
      ))}
    </div>
  );
}
```

---

## Features to Implement Next

- [ ] Real-time notifications using WebSocket
- [ ] Email reminders (node-cron + nodemailer)
- [ ] PDF export with templates
- [ ] Excel export with formatting
- [ ] File upload for meeting attachments
- [ ] AI-powered meeting summary
- [ ] Video integration (Zoom/Google Meet API)
- [ ] Advanced search with Elasticsearch
- [ ] Analytics dashboard
- [ ] Mobile app (React Native)

---

## Support & Troubleshooting

### Common Issues

**Issue: Database connection failed**
```
Solution: Check DB_HOST, DB_PORT, credentials in .env
Verify PostgreSQL service is running: sudo systemctl status postgresql
```

**Issue: JWT token expired**
```
Solution: Implement refresh token endpoint
Handle token renewal in frontend interceptor
```

**Issue: CORS errors**
```
Solution: Update CORS config in server.js with correct origin
app.use(cors({ origin: process.env.FRONTEND_URL }));
```

---

## License

MIT License - Free for commercial and personal use.

---

**Last Updated:** May 2026
**Version:** 1.0.0
