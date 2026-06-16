# Tiny URL Shortener Backend

Backend API for the Tiny URL Shortener application.

## Features

- Create short URLs
- Redirect using short codes
- Track clicks
- Analytics per URL
- Device detection
- Rate limiting
- MongoDB persistence
- Centralized error handling

---

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Zod
- Express Rate Limit

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Samanvith20/trim-shortern-url-backend.git
```

Install dependencies:

```bash
npm install
```

Create environment file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173

```

---

## Run Locally

Development:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Production:

```bash
npm start
```

---

## API Endpoints

### Create Short URL

```http
POST /api/urls
```

Body:

```json
{
  "url": "https://google.com"
}
```

---

### Get All URLs

```http
GET /
```

---

### Redirect

```http
GET /:code
```

---

### Get Analytics

```http
GET /api/analytics/:code
```

---

## Deployment

Hosted on Render.
