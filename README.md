# 📘 Chapter Performance Dashboard Backend (MathonGo Task)

A RESTful API built using *Node.js, **Express.js, **MongoDB, and **Redis*, simulating a real-world backend with features like filtering, caching, file upload, rate limiting, and admin-based access.

---

## 🚀 Features

- ✅ REST API to manage *chapters* with schema validation
- 🔍 Filtering by: class, unit, status, subject, weakChapters
- 📦 Chapter upload via JSON file (admin-only)
- 📄 Pagination with page & limit
- 🧠 *Redis caching* for GET /chapters (1-hour TTL)
- 🔄 Cache invalidation on new upload
- 🛡 *Rate limiting* using Redis (30 requests/min per IP)
- ☁ Deployed on [Your Platform]

---

## 📂 API Endpoints

### *1. Get All Chapters*

GET /api/v1/chapters

*Query Parameters:*

- Filters: class, unit, status, subject, weakChapters
- Pagination: page, limit

*Returns:*
- List of chapters
- totalCount: Total chapters (before pagination)

---

### *2. Get Chapter by ID*

GET /api/v1/chapters/:id

Returns a specific chapter by its MongoDB ObjectID.

---

### *3. Upload Chapters (Admin Only)*

POST /api/v1/chapters


*Body:*

- Upload a .json file containing an array of chapters.

*Behavior:*

- Valid chapters are stored.
- Invalid chapters (schema errors) are skipped and returned in the response.

---

## 📌 Redis Features

- *Caching:* GET /api/v1/chapters is cached for 1 hour (per query).
- *Invalidation:* Cache is auto-invalidated on any successful chapter upload.
- *Rate Limiting:* All routes are protected — 30 requests/min per IP using Redis.

---

## 🧪 Postman Collection

- Includes example requests, filters, and file upload
- Pre-filled data for easy testing

---

## 🛠 Tech Stack

- *Backend:* Node.js, Express.js
- *Database:* MongoDB, Mongoose
- *Cache/Rate Limiting:* Redis
- *Deployment:* Render 

---
