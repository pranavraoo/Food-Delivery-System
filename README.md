# Food Delivery Ordering System

## Overview

This project is a **full-stack food delivery web application** that simulates a real-world online food ordering platform. Users can browse restaurants, explore menus, manage a cart, place orders, track live order status with ETA countdowns, and access persistent order history.

The system follows a **client–server architecture**, using a modern React frontend and a RESTful backend powered by Node.js, Express, and MongoDB.

---

## Key Features

### Frontend

* Restaurant listing and discovery
* Menu browsing with veg / non-veg classification
* Cart management with quantity control
* Multi-restaurant cart guard
* Order placement and confirmation
* Backend-driven order status tracking
* Live ETA countdown (minutes and seconds)
* Persistent order history with reorder support
* Responsive and modular UI

### Backend

* RESTful API architecture
* MongoDB Atlas integration
* Separate collections for restaurants, menu items, and orders
* Backend-controlled order lifecycle and ETA resolution
* Order persistence and history retrieval
* Production-ready build and deployment setup

---

## Technology Stack

| Layer        | Technologies                              |
| ------------ | ----------------------------------------- |
| Frontend     | React, TypeScript, Vite                   |
| Backend      | Node.js, Express.js                       |
| Database     | MongoDB Atlas                             |
| ODM          | Mongoose                                  |
| Deployment   | Render                                    |
| External API | TheMealDB (used for initial data seeding) |

---

## Project Structure

### Frontend

```
frontend/
├── components/
├── hooks/
├── services/
├── types/
├── styles/
├── App.tsx
└── main.tsx
```

### Backend

```
backend/
├── controllers/
├── models/
├── routes/
├── utils/
├── config/
├── server.ts
└── db.ts
```

---

## Setup Instructions

### Prerequisites

* Node.js (v18 or later)
* MongoDB Atlas account
* Git

---

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
npm install
```

2. Create a `.env` file:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/food_delivery
```

3. Configure MongoDB Atlas:

* Go to **Network Access**
* Add IP address: `0.0.0.0/0`

4. Build and start the backend:

```bash
npm run build
npm start
```

The backend will run at:

```
http://localhost:5000/api
```

---

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
npm install
```

2. Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

3. Start the frontend:

```bash
npm run dev
```

The frontend will be available at:

```
http://localhost:5173
```

---

## Sample Usage / Test Flow

### 1. Browse Restaurants

* Open the application
* View a list of available restaurants fetched from the backend
* Each restaurant displays cuisine type, rating, and delivery time

### 2. View Menu

* Click on a restaurant
* Browse menu items categorized by type
* Veg / Non-Veg indicators are displayed per item

### 3. Add Items to Cart

* Add items to the cart
* Quantity can be increased or decreased
* The cart enforces a **single-restaurant constraint**

### 4. Place an Order

* Navigate to the cart
* Click **Place Order**
* Order is sent to the backend and persisted in MongoDB

### 5. Track Order Status

* Order status updates automatically:

  * Placed → Confirmed → Preparing → Out for Delivery → Delivered
* Live ETA countdown updates in minutes and seconds
* Status resolution is **backend-driven**

### 6. View Order History

* Access past orders from the order history view
* Each order displays:

  * Items
  * Total cost
  * Final status
  * Remaining / completed ETA

### 7. Reorder

* Click **Reorder** from order history
* Items are merged into the cart
* Menu page is skipped for faster checkout

---

## Deployment Notes

### Backend (Render)

* **Build Command:** `npm run build`
* **Start Command:** `npm start`
* Environment variables:

  * `MONGO_URI`
  * `PORT`

### Frontend (Render / Netlify / Vercel)

* **Build Command:** `npm run build`
* **Output Directory:** `dist`
* Environment variable:

```env
VITE_API_BASE_URL=<backend_live_url>/api
```

---

## Common Issues & Solutions

| Issue                                  | Solution                               |
| -------------------------------------- | -------------------------------------- |
| MongoDB connection failure             | Ensure IP whitelist allows `0.0.0.0/0` |
| Backend works locally but not deployed | Use `npm start`, not `nodemon`         |
| Menu not loading                       | Verify `apiCategory` mapping           |
| ETA always static                      | Ensure backend ETA logic is active     |
| Reorder cart errors                    | Use normalized menu item IDs           |

---

## Learning Outcomes

* Full-stack application design
* REST API development
* MongoDB schema modeling
* Backend-driven UI state
* Deployment and environment management
* Debugging real-world production issues
* Type-safe development with TypeScript

---

## Conclusion

This project represents a **complete, production-ready full-stack system**, demonstrating practical experience with frontend development, backend architecture, database modeling, and deployment workflows. It is suitable for academic evaluation, professional portfolios, and technical interviews.

