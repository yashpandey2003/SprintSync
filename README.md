# SprintSync - Project Management System

## Overview
**SprintSync** is a production-ready, full-stack web application built using **Spring Boot** and **ReactJS (Vite)** to facilitate project tracking, task management, and real-time collaboration among teams. The application integrates **Razorpay** for payment processing and provides an intuitive, premium dark-themed UI with **ShadCN** and **Tailwind CSS**. State management is handled by **Redux**, and live communication is powered by **WebSockets**. The backend is secured against DDoS attacks using a global rate limiter via **Resilience4j** and orchestrated locally using **Docker Compose**.

## Features
- **User Authentication:** Secure Sign up, Login, and Logout using JWT.
- **Project Management:** Create, Edit, and Delete projects.
- **Kanban Task Flow:** Assign tasks to team members and track progress with real-time UI updates.
- **Real-Time Project Chat:** Live messaging within projects powered by **WebSockets (STOMP)**.
- **Team Collaboration:** Invite members via email (SMTP Integration).
- **Payment Integration:** Subscription management using **Razorpay**.
- **UI Notifications:** Elegant global toast notifications for user actions.
- **Observability & APIs:** Built-in **Spring Boot Actuator** metrics and auto-generated **Swagger OpenAPI** documentation.
- **DevOps Ready:** One-click deployment using **Docker Compose**.

## Tech Stack
### Backend (Spring Boot)
- Spring Boot 3+
- Spring Security (JWT Authentication)
- Spring Data JPA
- WebSockets (STOMP Broker)
- Resilience4j (Global Rate Limiting)
- Spring Boot Actuator (Observability)
- SpringDoc OpenAPI (Swagger API Documentation)
- Java Mail (Email Invites)
- Razorpay API (Payment Gateway)

### Frontend (ReactJS)
- React 19 (Built with Vite for ultra-fast HMR)
- Redux & Redux Thunk (State Management)
- React Router DOM (Navigation)
- ShadCN UI & Tailwind CSS (UI Components & Styling)
- React Toastify (Notifications)
- @stomp/stompjs (WebSocket Client)

---

## Installation Guide (Docker - Recommended)
The entire application (Frontend + Backend) is fully containerized.

### Prerequisites
- Docker & Docker Compose installed and running.

### 1-Click Setup
1. Clone the repository and navigate to the root directory.
2. Run the orchestration command:
   ```sh
   docker-compose up -d --build
   ```
3. Access the applications:
   - **Frontend UI:** http://localhost:5173 
   - **Swagger API Docs:** http://localhost:8081/swagger-ui.html
   - **Actuator Health Metrics:** http://localhost:8081/actuator/health

---

## Installation Guide (Manual Setup)
### Prerequisites
- Java 17+
- Node.js 18+
- MySQL / PostgreSQL Server (Depending on your `application.properties` driver)
- Maven

### 1. Backend Setup
1. Navigate to the root folder containing the `pom.xml`.
2. Configure the database in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/project_management
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
4. Add your Razorpay API Keys:
   ```properties
   razorpay.api.key=your-key-id
   razorpay.api.secret=your-key-secret
   ```
5. Run the Spring Boot application:
   ```sh
   mvn spring-boot:run
   ```
*(The backend will start on `http://localhost:8081`)*

### 2. Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd project-management
   ```
2. Install the modern dependencies:
   ```sh
   npm install
   ```
3. Start the Vite development server:
   ```sh
   npm run dev
   ```
*(The frontend will start on `http://localhost:5173`)*

---

## Verification & Testing
To run the automated backend service test suite, navigate to the root directory and execute:
```sh
mvn test
```
This runs the isolated unit tests using an in-memory H2 database, validating the core business logic across Issue, Project, and User services without requiring an active external database connection.
