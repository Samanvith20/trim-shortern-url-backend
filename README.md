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

## Design Decisions

### 1. Short-Code Generation

I chose a MongoDB counter combined with Base62 encoding.

A dedicated `counters` collection stores the next sequence number. Each new URL increments the counter atomically using MongoDB's `findOneAndUpdate`, and the resulting number is converted to a Base62 string (0-9, A-Z, a-z).

Example:

```text
1000 -> G8
1001 -> G9
1002 -> GA
```

#### Why this approach?

* Guaranteed uniqueness
* No collision handling required
* Predictable performance
* Short and readable URLs

#### Alternatives Considered

* Random strings would require collision checks.
* Hashing URLs can create duplicates for the same URL and requires managing collisions.
* UUIDs generate unnecessarily long short codes.

---

### 2. Storing Clicks

I chose to store individual click events in a dedicated `clicks` collection.

Each click records:

* URL reference
* Timestamp
* Device type
* Referrer

#### Why this approach?

This enables:

* Daily click analytics
* Device breakdown reports
* Future geographic analytics
* More detailed reporting

#### Tradeoffs

As traffic grows, storage requirements increase because every click is stored individually.

A more scalable production approach would be:

* Store raw events temporarily
* Periodically aggregate analytics
* Archive or purge old click data

For the scope of this assignment, storing individual click events provides the most flexibility.

---

### 3. Indexes

The following indexes were added:

#### URL Code Index

```js
code: 1
```

Used for:

* Redirect lookups
* Analytics lookups

This is the most frequently queried field in the application.

#### Click URL Index

```js
urlId: 1
```

Used for:

* Retrieving clicks belonging to a specific URL
* Analytics aggregation

#### Why these indexes?

They optimize the application's most common operations:

* Redirecting users
* Fetching analytics
* Counting clicks

Additional indexes could be introduced later for:

* Time-based analytics
* Geographic reporting
* Administrative dashboards

---

### 4. Redirect Strategy (301 vs 302)

I chose to use:

```http
302 Found
```

#### Why 302?

302 redirects are temporary and are not aggressively cached by browsers.

This ensures every visit reaches the backend so analytics can be recorded accurately.

#### Tradeoffs

##### 301 Permanent Redirect

Pros:

* Better SEO
* Faster repeat visits due to browser caching

Cons:

* Browsers may bypass the backend after caching
* Analytics can become inaccurate

##### 302 Temporary Redirect

Pros:

* Every request reaches the server
* Analytics remain accurate

Cons:

* Slightly higher latency compared to cached redirects

For a URL shortener focused on analytics, 302 is the better choice.


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
node dist/server.js

or

npm start
```



---

# AI Usage

## Tools Used

* ChatGPT
* Lovable

---

## Where it helped most

### Frontend

* Generated the initial landing page UI and design system using Lovable.
* Helped convert generated UI into a working React application.
* Assisted with integrating React Query and API calls.
* Helped troubleshoot deployment issues and environment configuration.

### Backend

* Assisted with route, controller, and service structure.
* Helped design error handling middleware.
* Assisted with Dockerfile creation and deployment setup.
* Helped troubleshoot MongoDB, Mongoose, validation, and CORS issues.

### Documentation

* Helped generate README files.
* Helped document architecture and design decisions.
* Helped prepare submission documentation.

---

## Where it got things wrong / where I had to correct it

### Frontend

* The generated Lovable project used TanStack Start and SSR, which introduced deployment issues.
* Multiple generated files and configurations were unnecessary for the assignment and had to be simplified.
* Several generated API integrations used mock data and required manual replacement with real backend endpoints.

### Backend

* Some suggested implementations did not align with the final architecture.
* Several MongoDB counter initialization approaches required debugging and manual correction.
* Error handling and validation logic needed manual refinement to produce the desired API responses.

### Deployment

* Several suggested deployment configurations were incompatible with the generated frontend setup and required investigation and manual fixes.

---

## One thing I deliberately did NOT delegate to the agent, and why

I did not delegate the overall application architecture, database schema design, API behavior, deployment decisions, and final implementation choices.

I wanted to fully understand the system and be able to explain:

* Why specific database collections were created
* How short-code generation works
* How analytics are recorded
* Why particular indexes were chosen
* Why a 302 redirect was used
* How the application is deployed and configured

This ensured I could confidently reason about and discuss the implementation during code reviews and technical interviews.


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
