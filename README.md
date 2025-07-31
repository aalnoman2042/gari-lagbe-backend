🚗 Ride Booking API
A secure, scalable, and role-based RESTful API for a ride booking system, similar to Uber or Pathao. Built using Express.js, TypeScript, and Mongoose, the system supports three user roles: Admin, Rider, and Driver, with complete ride management features.

📌 Project Features Overview
🔐 Authentication & Authorization
    ✅ JWT-based login system

    ✅ Role-based route protection middleware

    ✅ Secure password hashing using bcrypt

    ✅ Refresh token mechanism with HTTP-only cookies

👤 Roles & Permissions
        Role	Permissions
        Rider	Request ride, cancel ride, view ride history
        Driver	Accept/reject rides, update status, manage availability, view earnings
        Admin	View/manage all users and rides, approve/suspend drivers, block/unblock users

🚘 Rider Module
    ✅ Request a ride with pickup & destination (lat/lng)

    ✅ Cancel ride (only before accepted)

    ✅ View ride history

    ✅ View ride details

    ✅  Rider cannot cancel another rider's ride.

    ✅  Rider cannot request another ride if:
        They already have a ride with status: requested, accepted, or in_transit.

🧍 Driver Module
    ✅ Accept or reject pending rides

    ✅ Update ride statuses:

    accepted → picked_up → in_transit → completed

    ✅ View completed ride & earnings history

    ✅ Update availability status: Online/Offline

    ✅ Driver cannot accept ride if:

        driver.status === "suspended" or driver.unapproved === true

        Already has an active ride (accepted or in_transit)

        Ride already accepted by another driver

👮 Admin Module
    ✅ View all users, drivers, and rides

    ✅ Approve or suspend drivers

    ✅ Block/unblock any user

    ✅ Optional: Admin can force-update ride statuses

⚙️ Ride Status Transition Rules
    ❌ Invalid transition protection:

    requested → completed ❌

    completed → anything ❌

    Only allow:

    requested → accepted

    accepted → in_transit

    in_transit → completed

    requested → cancelled

        
🧱 Tech Stack
    Backend Framework: Express.js

    Language: TypeScript

    Database: MongoDB (via Mongoose)

    Auth: JWT, Bcrypt, Refresh Tokens with Cookies

    Validation: Zod

    Dev Tools: Nodemon, ESLint, Prettier

📦 Folder Structure
src/
├── app.ts
├── config/
├── modules/
│   ├── auth/
│   ├── user/
│   ├── driver/
│   ├── rider/
│   ├── ride/
├── middlewares/
├── utils/
├── constants/
└── errors/
🛡 API Security
HTTP-only cookies for refresh tokens

Secure password storage with hashing

Middleware-based route protection based on roles

📜 API Endpoints (Sample)
🔐 Auth
POST /api/v1/auth/register

POST /api/v1/auth/login



POST /api/v1/auth/logout

👤 User
GET /api/v1/users/me – Authenticated user info

PATCH /api/v1/users/block/:id – Admin only

🧍 Driver
PATCH /api/v1/drivers/approve/:id – Admin only

PATCH /api/v1/drivers/availability – Driver only

GET /api/v1/drivers/rides – Driver’s ride history

🚘 Ride
POST /api/v1/rides/request – Rider only

PATCH /api/v1/rides/cancel/:id – Rider only

PATCH /api/v1/rides/status/:id – Driver updates

GET /api/v1/rides/history – Rider or driver history



