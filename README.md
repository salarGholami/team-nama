# 🚀 Team Nama

**Modern Enterprise Project Management Platform**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Educational-green?style=flat-square)](#-license)

> A scalable, role-based project management platform that simulates a real-world software development company environment.

**Live Demo:** [team-nama.vercel.app](https://team-nama.vercel.app)

---

## 📖 Overview

**Team Nama** is not just another admin dashboard. It is a comprehensive front-end application designed to demonstrate how a large-scale **Enterprise Front-End** can be structured, developed, and maintained using modern best practices.

The platform simulates real-world workflows including:

- Project & Task Management (Agile-oriented)
- Design File Review
- Code Review
- Meeting Management
- Role-based Dashboards
- Reports & Analytics

All with a strong focus on **scalability**, **maintainability**, **reusability**, and **clean architecture**.

---

## 🎯 Project Goals

- Demonstrate enterprise-level Front-End architecture
- Implement Role-Based Access Control (RBAC) foundations
- Provide a clean, modern, and fully responsive UI with full **RTL** support
- Create a backend-ready structure that can easily connect to a real API later
- Serve as a high-quality portfolio project reflecting real industry standards

---

## ✨ Key Features

- **Role-Based Dashboards** — Each user only sees relevant tools and data
- **Project Management** — Status, progress, team members, priority, deadlines, departments
- **Agile Task Management** — Status, priority, assignee, sprint, story points, tags
- **Design Files Module** — Version history, comments, and collaboration between designers & developers
- **Code Review Module** — Commit history, file changes, and technical discussions
- **Meetings Management** — Upcoming and past meetings with details
- **Notifications System**
- **Reports & Analytics** with charts
- **Fully Responsive** + **Full RTL Support**
- **Dark / Light Mode**
- **Scalable Feature-Based Architecture**
- **Backend-Ready Data Layer** (currently using `db.json` + json-server)

---

## 🛠 Tech Stack

| Category          | Technology                          |
|-------------------|-------------------------------------|
| Framework         | Next.js 16 (App Router)            |
| UI Library        | React 19                           |
| Language          | TypeScript                         |
| Styling           | Tailwind CSS v4                    |
| Animations        | Framer Motion                      |
| Icons             | Lucide React                       |
| Charts            | Recharts                           |
| Theme             | next-themes                        |
| Data Fetching     | TanStack Query + Axios             |
| Mock API          | json-server                        |

---

## 🏗 Architecture

The project follows a **Feature-Based Architecture** combined with **Component-Driven Design**.

### Main Principles

- Independent and modular features
- High reusability of UI components
- Clear separation of concerns
- Easy to scale and maintain
- Minimal code conflicts for team collaboration
- Ready for real backend integration

### Project Structure (Simplified)

```text
team-nama/
├── app/                  # Next.js App Router pages
├── components/           # Shared & feature components
├── context/              # React Context providers
├── data/                 # Mock data (db.json)
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── providers/            # App-level providers
├── services/             # API / data services
├── styles/               # Global styles
├── types/                # TypeScript types
└── public/               # Static assets
```

---

## 👥 Core Modules

| Module              | Description                                      |
|---------------------|--------------------------------------------------|
| Dashboard           | Role-specific overview & KPIs                    |
| Projects            | Full project lifecycle management                |
| Tasks               | Agile task tracking                              |
| Design Files        | Design review & versioning                       |
| Code Review         | Commit inspection & technical feedback           |
| Meetings            | Schedule and history of meetings                 |
| Notifications       | Real-time system alerts                          |
| Reports & Analytics | Charts and performance insights                  |
| User Profile        | Personal and organizational information          |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or higher
- npm / pnpm / yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/salarGholami/team-nama.git

# Navigate to project
cd team-nama

# Install dependencies
npm install
# or
pnpm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Run Mock API (optional)

```bash
npm run json
```

The mock API will run on `http://localhost:4000`

### Build for Production

```bash
npm run build
npm run start
```

---

## 🗂 Data Management

Currently, all data is served from `data/db.json` using **json-server**.

This structure is intentionally designed to closely mimic a real backend, making future migration to a real API straightforward with minimal changes to the UI layer.

---

## 🗺️ Roadmap

### Planned Features

**Project & Task Management**
- Drag & Drop Kanban
- Advanced filtering & smart search
- Task dependencies
- Milestone & Sprint management
- Backlog management

**Collaboration**
- Project-based chat
- Real-time notifications
- Mentions system
- File sharing

**Design & Code**
- Design approval workflow
- Better version history
- Enhanced code review experience

**Dashboards & UX**
- Customizable widgets
- Advanced analytics
- Performance & accessibility improvements

**Backend Integration**
- Real authentication
- REST / GraphQL APIs
- Database connection
- File management system

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/salarGholami/team-nama/issues).

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is developed for **educational purposes**, skill improvement, and as a **portfolio project**.

---

## 👤 Author

**Salar Gholami**

- GitHub: [salarGholami](https://github.com/salarGholami)
- Live Demo: [team-nama.vercel.app](https://team-nama.vercel.app)

---

<div align="center">
  <strong>Built with ❤️ using modern Front-End best practices</strong>
</div>
```