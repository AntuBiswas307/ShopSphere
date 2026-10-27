# 🛒 ShopSphere - Full-Stack E-Commerce Platform

A modern, responsive full-stack e-commerce application built with the **MERN** stack (MongoDB, Express.js, React, Node.js), Redux Toolkit, and Tailwind CSS.

🔗 **Live Application:** [https://shopsphere-1-qo6d.onrender.com](https://shopsphere-1-qo6d.onrender.com)

---

## 🏗️ Architecture Overview

ShopSphere follows a decoupled **Client-Server Architecture** with a RESTful API and role-based access control (Admin & Customer).

```
               ┌──────────────────────────────────────────────────┐
               │             Client (React 19 + Vite)             │
               │  - Tailwind CSS + shadcn/ui                      │
               │  - Redux Toolkit (Global State Management)       │
               │  - React Router v7 (Role-Based Protected Routes) │
               └─────────┬──────────────────────────────▲─────────┘
                         │                              │
             HTTP / JSON │ REST API           HTTP-only │ Cookies (JWT)
                         ▼                              │
               ┌────────────────────────────────────────┴─────────┐
               │             Server (Node.js + Express 5)         │
               │  - REST Controllers & Routers (Auth, Shop, Admin)│
               │  - JWT Authentication & bcryptjs Password Hashing│
               │  - Multer + Cloudinary (Image Upload Handling)   │
               └─────────┬──────────────────────────────┬─────────┘
                         │                              │
                         ▼                              ▼
             ┌───────────────────────┐      ┌───────────────────────┐
             │   MongoDB (Mongoose)  │      │   Cloudinary CDN      │
             │   Users, Products,    │      │   Product & Banner    │
             │   Orders, Carts, etc. │      │   Image Assets        │
             └───────────────────────┘      └───────────────────────┘
```

### Architecture Highlights:
- **Frontend Layer:** Built with React 19 and Vite for lightning-fast HMR and bundling. Styled with Tailwind CSS and Radix UI / shadcn/ui components. State is orchestrated via Redux Toolkit slices (Auth, Products, Cart, Address, Orders, Search, Reviews).
- **Backend API Layer:** Modular Express.js application organized into routes, controllers, and models. Uses JWT stored in HTTP-only cookies for secure authentication and session management.
- **Data & Media Layer:** MongoDB Atlas with Mongoose schemas for structured relational modeling (Users, Products, Cart, Orders, Reviews, Addresses). Cloudinary integration for scalable cloud image storage.

---

## ⚡ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS, shadcn/ui, Lucide Icons, Redux Toolkit, React Router v7, Axios, Sonner |
| **Backend** | Node.js, Express.js (v5), Mongoose, JSON Web Tokens (JWT), bcryptjs, Cookie-Parser, Cors, Multer |
| **Database & Storage** | MongoDB Atlas, Cloudinary CDN |
| **Deployment** | Render |

---

## ✨ Key Features

- **Authentication & Security:** User registration, login, logout, password hashing, and cookie-based JWT authentication.
- **Role-Based Access Control:** Distinct views and access tiers for **Customers** and **Admins**.
- **Customer Shopping Experience:**
  - Product catalog browsing with filtering by category/brand and price sorting.
  - Real-time product search.
  - Interactive shopping cart and persistent address management.
  - Seamless checkout flow and order tracking history.
  - Product review and rating system.
- **Admin Management Panel:**
  - Product management (Create, Read, Update, Delete) with Cloudinary image upload.
  - Order dashboard to monitor and update fulfillment statuses.
  - Promotional feature banner management.

---

## 📁 Repository Structure

```
ShopSphere/
├── client/                     # Frontend React application
│   ├── src/
│   │   ├── components/         # Common UI & Layout components (admin, shopping, common)
│   │   ├── pages/              # Route views (admin, shopping, auth, unauth)
│   │   ├── store/              # Redux slices & store configuration
│   │   └── config/             # Form controls and route configuration
│   └── package.json
│
├── server/                     # Backend Express API
│   ├── controllers/            # Request handlers (auth, admin, shop, common)
│   ├── models/                 # Mongoose schemas (User, Product, Order, Cart, Address, etc.)
│   ├── routes/                 # Express route definitions
│   ├── helpers/                # Cloudinary & utility helpers
│   ├── server.js               # Application entry point
│   └── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Atlas database URI
- Cloudinary account credentials

### 1. Clone the repository
```bash
git clone https://github.com/AntuBiswas307/ShopSphere.git
cd ShopSphere
```

### 2. Configure Environment Variables

**Server (`server/.env`):**
```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
CLIENT_BASE_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**Client (`client/.env`):**
```env
VITE_API_URL=http://localhost:5000
```

### 3. Run Locally

**Start Server:**
```bash
cd server
npm install
npm run dev
```

**Start Client:**
```bash
cd client
npm install
npm run dev
```

---

## 📄 License

This project is licensed under the MIT License.

