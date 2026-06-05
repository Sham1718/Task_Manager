# Task Manager (React + Spring Boot + JWT)

## Summary
A full-stack task management application built with Spring Boot, React, and JWT Authentication, enabling secure user access and complete task lifecycle management.

---

# Overview

Task Manager is a full-stack productivity application that allows users to securely manage their daily tasks through a clean and responsive interface.

The project combines:
- Spring Boot backend APIs
- JWT-based authentication
- React frontend
- MySQL database integration

Users can register, log in, create tasks, update task progress, search tasks, and manage their personal task list through a secure dashboard.

The application follows modern full-stack development practices with a clear separation between frontend and backend layers.

---

# Problem Statement

Managing personal tasks manually can lead to:
- Poor organization
- Difficulty tracking progress
- Lack of centralized task management
- Security concerns when storing user-specific data

This project solves these challenges by providing:
- Secure authentication
- User-specific task management
- Task status tracking
- Responsive task dashboard

through a modern full-stack architecture.

---

# Tools and Tech

## Backend
- Java
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- MySQL / H2 Database
- Lombok

## Frontend
- React (Vite)
- Axios
- React Router DOM
- Tailwind CSS

## Development Tools
- Maven
- Postman
- Git & GitHub

---

# Methods

## Authentication System

- User Registration
- User Login
- JWT Token Generation
- Protected Routes
- Secure Logout
- Stateless Authentication

---

## Task Management

### Create Task
Users can create new tasks.

### List Tasks
Displays tasks belonging only to the authenticated user.

### Search Task
Retrieve task details using task ID.

### Update Task
Modify task details.

### Delete Task
Remove tasks permanently.

### Update Task Status

Supported statuses:

- TODO
- IN_PROGRESS
- DONE

---

## User Interface

### Dashboard Features

- Responsive layout
- Minimal modern design
- User-specific task display
- Task management controls

### Navbar Features

- Application logo
- Search bar
- User avatar (first letter of username)
- Logout button

---



# How to Run Project

## Clone Repository

```bash
git clone <repository-url>
```

---

## Backend Setup

Navigate to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
mvn clean install
```

Run backend server:

```bash
mvn spring-boot:run
```

Backend URL:

```text
http://localhost:8080
```

---

## Database Configuration

Configure database credentials inside:

```properties
application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/task_manager
spring.datasource.username=root
spring.datasource.password=your_password

jwt.secret=your_secret_key
```

---

## Frontend Setup

Navigate to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start frontend:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

# API Endpoints

## Authentication APIs

```http
POST /auth/register
POST /auth/login
```

---

## Task APIs

```http
POST   /tasks
GET    /tasks
GET    /tasks/{id}
PUT    /tasks/{id}
DELETE /tasks/{id}
PATCH  /tasks/{id}/status
```

---


# Author and Contact

## Author
Shyam

## Contact
- GitHub: https://github.com/Sham1718
- Portfolio: https://shyam-neon.vercel.app/
