# Elysian Stay

A modern full-stack hotel booking system built for a luxury hotel experience.

Elysian Stay allows guests to explore hotel accommodations, view room details, submit booking requests, and contact the hotel. The project also includes an administrative dashboard for managing rooms, bookings, and customer messages.

## Features

### Guest Experience

* Modern and responsive luxury hotel interface
* Hero image slideshow on the homepage
* Featured rooms section
* Dynamic rooms loaded from PostgreSQL
* Dynamic room details
* Room capacity information
* Booking form with dynamic room selection
* Guest selection based on room capacity
* Contact form
* Responsive design for desktop and mobile devices

### Booking System

* Guest booking form
* Check-in and check-out dates
* Dynamic room selection
* Guest selection
* Special requests
* Booking data stored in PostgreSQL

### Admin Dashboard

* View all rooms
* Add new rooms
* Edit existing rooms
* Delete rooms
* View room details
* View customer bookings
* Delete bookings
* View customer messages
* Delete messages

> **Note:** The current admin dashboard does not include authentication. Admin authentication is planned as a future enhancement for a production-ready version.

## Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL

### Deployment

* Render

## Application Architecture

The application follows a simple full-stack architecture:

```text
Frontend
HTML / CSS / JavaScript
        ↓
Express.js Server
        ↓
REST API Endpoints
        ↓
PostgreSQL Database
```

The frontend communicates with the Express.js backend through API endpoints. Room, booking, and message data are stored and retrieved from PostgreSQL.

## Screenshots

### Home Page

![Elysian Stay Home Page](screenshots/home.png)

### Rooms Page

![Elysian Stay Rooms Page](screenshots/rooms.png)

### Booking Page

![Elysian Stay Booking Page](screenshots/booking.png)

### Contact Page

![Elysian Stay Contact Page](screenshots/contact.png)

### Admin Dashboard

![Elysian Stay Admin Dashboard](screenshots/admin.png)

## Project Structure

```text
Elysian Stay/
│
├── config/
│   └── db.js
│
├── public/
│   ├── images/
│   ├── index.html
│   ├── rooms.html
│   ├── room-details.html
│   ├── booking.html
│   ├── about.html
│   ├── contact.html
│   ├── admin.html
│   ├── script.js
│   └── style.css
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

## Installation

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the project directory

```bash
cd elysian-stay
```

### 3. Install dependencies

```bash
npm install
```

### 4. Set up PostgreSQL

Create a PostgreSQL database for the project and configure the database connection through environment variables.

### 5. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL=your_postgresql_connection_string
PORT=4000
NODE_ENV=development
```


### 6. Start the server

```bash
node server.js
```

The application will run locally at:

```text
http://localhost:4000
```

## Database

Elysian Stay uses PostgreSQL to store application data.

The database contains the following main tables:

* `rooms` — stores hotel room information
* `bookings` — stores guest booking information
* `messages` — stores contact form submissions

The project can be connected to a local PostgreSQL database for development or a hosted PostgreSQL database for deployment.

## API Endpoints

### Rooms

```text
GET    /api/rooms
POST   /api/rooms
PUT    /api/rooms/:id
DELETE /api/rooms/:id
```

### Bookings

```text
POST   /book
GET    /api/bookings
DELETE /api/bookings/:id
```

### Messages

```text
POST   /api/messages
GET    /api/messages
DELETE /api/messages/:id
```

## Deployment

The application has been successfully deployed using Render.

The project is designed so that the Express.js application can connect to a hosted PostgreSQL database through the `DATABASE_URL` environment variable.

The current demo deployment may not remain permanently available.

## Development

This project was developed as a complete full-stack application, progressing from the frontend interface to backend functionality, database integration, CRUD operations, and deployment.

The development process included:

* Building the responsive frontend
* Creating the booking interface
* Connecting Express.js to PostgreSQL
* Creating database tables
* Building API endpoints
* Making room data dynamic
* Implementing CRUD functionality
* Connecting the admin dashboard to the database
* Testing the booking workflow
* Deploying the application

## Author

**Sajid**

Full-Stack Web Developer

This project is part of my web development portfolio and demonstrates my experience with frontend development, backend development, databases, CRUD operations, and application deployment.
