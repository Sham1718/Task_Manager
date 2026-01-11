# Scalability & Deployment Readiness Notes

This project is currently built as a Spring Boot monolith + React frontend. The system can be scaled further using the following improvements:

## 1. Backend Scalability
- Convert the backend into microservices (Auth Service, Task Service) if needed.
- Use API Gateway for routing and centralized authentication.
- Introduce caching (Redis) for frequently accessed task lists and user sessions.

## 2. Database Scaling
- Add indexing on task fields like `user_id`, `status`, and `created_at` for faster querying.
- Use read replicas for heavy read traffic.
- Use connection pooling (HikariCP default in Spring Boot).

## 3. Load Balancing
- Deploy multiple backend instances behind a load balancer (Nginx / AWS ELB).
- Stateless JWT auth enables horizontal scaling easily.

## 4. Deployment Readiness
- Dockerize backend and frontend with docker-compose.
- Use CI/CD pipeline (GitHub Actions) for build & deployment.
- Store secrets using environment variables instead of committing configs.
