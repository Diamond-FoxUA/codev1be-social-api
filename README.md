# 🚀 Codevibe Social API

Backend API for a **social-blog platform** focused on travel experiences, built as a team project by **CodeV1be**.  
Handles authentication, users, posts, and content discovery.

---

## 📌 Overview

Codevibe Social API is a RESTful backend for a **social-blog platform** where users can explore and save travel experiences shared on the platform.

The application is designed as a content-driven system, focusing on browsing and collecting inspiring travel stories rather than full social interaction features.

The project was developed collaboratively with a focus on clean architecture, separation of concerns, and backend fundamentals.

---

## 🌍 Concept

The platform is inspired by the idea of a digital travel diary where users can discover stories and journeys from different places.

Instead of heavy social interactions, the current version emphasizes:
- content exploration  
- personal collections  
- simple and scalable backend architecture  

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- Custom session-based authentication
- Cookie-based session handling
- Cloudinary (media storage)
- Multer (file uploads)

---

## ✨ Features

- 🔐 Custom session-based authentication (stored in DB)
- 🍪 Secure cookie handling
- 👤 User profiles
- 📝 Browse travel posts
- 🔖 Save / unsave posts to personal collection
- 📷 Image upload support
- 🔎 Basic filtering & pagination

---

## ⚠️ Current Limitations

- Posts cannot be deleted by users
- Limited interaction features (focus on core API structure)

---

## 🎯 Project Scope

This project focuses on backend architecture, authentication, and data handling rather than full social media functionality.

---

## 📂 Project Structure

```
src/

├── controllers/   # request handling

├── services/      # business logic

├── routes/        # API routes

├── models/        # database schemas

├── middleware/    # auth & middleware logic

├── validations/   # request validation

├── utils/         # helper functions

├── constants/     # static values

├── db/            # database connection

└── server.js      # entry point
```

> The project follows a layered architecture with clear separation of concerns.  
> Future improvements may include migration to a feature-based structure for better scalability.

---

## 🔐 Authentication

This API uses **custom session-based authentication**:

- Sessions are stored in the database  
- Each session has a unique session ID  
- Session ID is stored in an HTTP-only cookie  
- Server validates session on each request  

This approach provides full control over session lifecycle and authentication flow.

---

## 🔐 API Endpoints (example)

### Auth
- POST /api/auth/register  
- POST /api/auth/login  
- POST /api/auth/logout  

### Users
- GET /api/users/:id  

### Posts
- GET /api/posts  
- GET /api/posts/:id  
- POST /api/posts/:id/save  

---

## 🔄 Why Sessions Instead of JWT?

- Easier session invalidation  
- Better control over active sessions  
- More predictable authentication flow  

---

## 🧠 Architecture Notes

- Controllers handle HTTP layer  
- Services contain business logic  
- Middleware handles authentication & validation  
- Session data is persisted in database  
- Clean separation of concerns across layers  

---

## 👥 Team

Developed by **CodeV1be** team.

A collaborative project where team members contributed to backend architecture, API design, and feature implementation.

---
