# Project Management System

## Overview
The **Project Management System** is a full-stack web application built using **Spring Boot** and **ReactJS** to facilitate project tracking, task management, and collaboration among teams. The application integrates **Razorpay** for payment processing and provides an intuitive UI with **ShadCN** for an enhanced user experience. **Redux** is used for state management in the frontend, and **MySQL** serves as the database for data persistence.

## Features
- **User Authentication** (Sign up, Login, Logout)
- **Project Management** (Create, Edit, Delete projects)
- **Task Assignment** (Assign tasks to team members, track progress)
- **Invite Members** via email (SMTP integration)
- **Payment Integration** using Razorpay
- **State Management** with Redux
- **Responsive UI** using ShadCN components

## Tech Stack
### Backend (Spring Boot)
- Spring Boot
- Spring Security (JWT Authentication)
- Spring Data JPA
- MySQL (Database)
- Java Mail (for email invites)
- Razorpay API (Payment Gateway)

### Frontend (ReactJS)
- ReactJS
- Redux Toolkit (State Management)
- React Router (Navigation)
- ShadCN UI (UI Components)

## Installation Guide
### Prerequisites
Ensure you have the following installed:
- Java 17+
- Node.js 18+
- MySQL Server
- Maven
- Razorpay API Credentials

### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/project-management.git
   cd project-management/backend
   ```
2. Configure the database in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/project_management
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   spring.jpa.hibernate.ddl-auto=update
   ```
3. Configure Mail Service in `application.properties`:
   ```properties
   spring.mail.host=smtp.gmail.com
   spring.mail.port=587
   spring.mail.username=your-email@gmail.com
   spring.mail.password=your-email-password
   spring.mail.properties.mail.smtp.auth=true
   spring.mail.properties.mail.smtp.starttls.enable=true
   ```
4. Run the application:
   ```sh
   mvn spring-boot:run
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd project-management/frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```

## Razorpay Payment Integration
To integrate Razorpay, obtain your API keys from [Razorpay Dashboard](https://razorpay.com/) and configure them in `application.properties`:
```properties
razorpay.key_id=your-key-id
razorpay.key_secret=your-key-secret
```

