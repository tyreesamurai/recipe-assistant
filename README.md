# 🍽️ Recipe Assistant

## 📌 Overview

A full-stack recipe-sharing platform where users can create, edit, and view recipes, each including ingredients, quantities, instructions, and nutrition facts. This project focuses on clean architecture, reusable components, and scalable back-end design.

## 🧪 Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS, Shadcn UI
- **Backend:** C# ASP.NET Core
- **Database:** PostgreSQL
- **Infrastructure:** Docker, GitHub Actions (CI/CD)

---

## 🎯 Goals

- ✅ Replace older class projects with professional-grade applications
- 🧪 Implement end-to-end test coverage
- 🌍 Create a responsive and accessible UI
- 🚀 Deploy production-ready with CI/CD and containerization

---

## 🧱 Milestones

| Phase      | Description                       | Status         |
| ---------- | --------------------------------- | -------------- |
| Design     | Wireframes, DB Schema, API Routes | 🟡 In Progress |
| Backend    | API endpoints, models, DB logic   | ⚪ Not Started |
| Frontend   | Pages, forms, layout              | ⚪ Not Started |
| Testing    | Unit + integration tests          | ⚪ Not Started |
| Deployment | Docker Compose + Live Hosting     | ⚪ Not Started |

---

## 🎨 Design

### 🧾 Database Schema

To be added once finalized. Will include:

- Users
- Recipes
- Ingredients
- Nutrition
- RecipeIngredients (many-to-many relationship)

---

## 🚧 Development Roadmap

### 🧱 Design

- [ ] Define key user flows (searching, creating, planning meals, generating shopping lists)
- [ ] Sketch wireframes for Home, Create Recipe, Meal Planner, & Shopping List
- [ ] Finalize component system (using Shadcn UI + Tailwind CSS)
- [ ] Document UX guidelines (layout consistency, drawer behavior, modals, responsiveness)

### 🔧 Backend (ASP.NET Core + PostgreSQL)

- [ ] Scaffold ASP.NET Core project & configure Postgres Connection
- [ ] Design & implement data models for Recipe, Ingredient, User, MealPlan, & ShoppingList
- [ ] Build RESTful API endpoints for recipes, ingredients, & planning workflows
- [ ] Create database seeding & migration scripts
- [ ] Add data validation, error handling, & API documentation (e.g. Swagger)

### 💻 Frontend (Next.js + Tailwind + Shadcn)

- [ ] Create persistent layout with NavBar & right-side cart drawer
- [ ] Implement Home page with hero, filters, & recipe cards
- [ ] Build "Create Recipe" dropdown with import modal & manual modal
- [ ] Build Meal Planner UI with drag-and-drop & calendar view
- [ ] Build Shopping List page with consolidated ingredient list
- [ ] Make all components mobile-friendly & accessible

### 🧪 Testing

- [ ] Create unit tests
- [ ] Frontend tests with Jest + React Testing Library
- [ ] Integration tests for API + frontend with Playwright or Cypress
- [ ] Add GitHub Action to run tests on PRs & pushes to main

### 🚀 Deployment

- [ ] Write Dockerfile & docker-compose.yml for full stack (front-end, back-end, db)
- [ ] Configure GitHub Actions for CI pipeline (test, build, deploy steps)
- [ ] Prepare production environment (e.g. Railway, Azure, or Fly.io)
- [ ] Set up staging environment for previewing changes

---

## 🧠 Inspiration

This app was inspired by a personal need for better recipe tracking and the frustration with cluttered or overly commercial food websites. The goal is to keep the experience clean, fast, and structured.

---

## 📬 Contact

Want to collaborate or offer feedback?  
Reach out via [GitHub](https://github.com/tyreesamurai) or open an issue in this repo.
