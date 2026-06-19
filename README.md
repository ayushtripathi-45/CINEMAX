
<p align="center">
  <img width="100%" src="https://capsule-render.vercel.app/api?type=waving&height=250&color=0:0a0a0f,50:1a0000,100:e84040&text=CINEMAX&fontSize=80&fontColor=ffffff&animation=fadeIn&fontAlignY=40&desc=Premium%20Movie%20Discovery%20Platform&descAlignY=60"/>
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Bebas+Neue&size=30&pause=1000&color=E84040&center=true&vCenter=true&width=800&lines=Discover+Trending+Movies;Search+Thousands+of+Titles;Build+Your+Personal+Watchlist;Powered+by+TMDB+API"/>
</p>

<p align="center">
  <b>Discover. Explore. Save. Watch.</b><br>
  A premium movie discovery platform powered by TMDB.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-111111?style=for-the-badge&logo=react"/>
  <img src="https://img.shields.io/badge/TMDB-API-E84040?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/TailwindCSS-Dark%20UI-111111?style=for-the-badge&logo=tailwindcss"/>
  <img src="https://img.shields.io/badge/Framer-Motion-E84040?style=for-the-badge"/>
</p>

---

<img width="100%" src="https://user-images.githubusercontent.com/74038190/212744275-b4c6f14f-97e7-4b4f-bfd9-3bb16f3f6f8d.gif">

# 🎥 Overview

CINEMAX is a modern movie discovery experience built with React and TMDB API.

Explore trending titles, search movies instantly, browse by genre, save favorites, and enjoy a polished streaming-platform inspired UI.

---


# ✨ Key Features

| Feature | Status |
|----------|---------|
| 🎬 Trending Hero Carousel | ✅ |
| 🔍 Real-time Search | ✅ |
| 🎭 Genre Filtering | ✅ |
| ❤️ Favorites System | ✅ |
| ⚡ Infinite Scroll | ✅ |
| 🎨 Glassmorphism UI | ✅ |
| 📱 Responsive Design | ✅ |
| 🎞 Framer Motion Animations | ✅ |

### 🎬 Hero Experience

* Auto-rotating trending movie showcase
* Cinematic fullscreen backgrounds
* Smooth slide transitions

### 🔍 Smart Search

* Real-time search
* Debounced API requests
* Search history support
* Instant movie discovery

### 🎭 Movie Discovery

* Genre filtering
* Popular movies
* Trending titles
* Top rated collection
* New releases

### ❤️ Favorites System

* Save favorite movies
* Persistent local storage
* Favorite badge indicator
* Sort & manage saved movies

### ⚡ Performance

* Infinite scrolling
* Lazy image loading
* Skeleton loaders
* Optimized API requests

### 🎨 Premium UI

* Dark streaming platform theme
* Glassmorphism effects
* Smooth Framer Motion animations
* Fully responsive design

---

# 📸 Screenshots

## 🏠 Home Page

![Home](./screenshots/home.png)

---

## 🔍 Browse Movies

![Browse](./screenshots/browse.png)

---

## ❤️ Favorites

![Favorites](./screenshots/favorites.png)


---

# 🛠 Tech Stack

| Category         | Technology      |
| ---------------- | --------------- |
| Frontend         | React 18        |
| Styling          | Tailwind CSS    |
| Routing          | React Router v6 |
| Animations       | Framer Motion   |
| API Client       | Axios           |
| Data Source      | TMDB API        |
| State Management | Context API     |
| Build Tool       | Vite            |

---

# 🏗 Architecture

```mermaid
flowchart LR

A[👤 User]
--> B[🎬 CINEMAX UI]

B --> C[⚛ React]

C --> D[🎭 Framer Motion]

C --> E[🎨 Tailwind CSS]

C --> F[🧠 Context API]

F --> G[🔍 Search Engine]

F --> H[❤️ Favorites]

G --> I[🌐 Axios]

I --> J[🎥 TMDB API]

J --> K[(Movie Database)]
```

---

# 🎮 3D Workflow Structure

```md

                 🎬 CINEMAX

      ┌─────────────────────────┐
      │     Home Experience     │
      └───────────┬─────────────┘
                  │
       ┌──────────┴──────────┐
       │                     │
       ▼                     ▼

 🔍 Search Engine      🎭 Movie Discovery

       │                     │

       ▼                     ▼

  🎯 Filters         🎬 Movie Details

       │                     │

       └───────┬─────────────┘
               ▼

        ❤️ Favorites System

               │

               ▼

       💾 Local Storage

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/yourusername/cinemax.git
cd cinemax
```

## Install Dependencies

```bash
npm install
```

## Configure Environment

Create:

```env
VITE_TMDB_API_KEY=YOUR_API_KEY
```

## Start Development Server

```bash
npm run dev
```

---


# 🎨 Design System

### Colors

```css
Background: #0a0a0f
Primary: #e84040
Text: #ffffff
Muted: #a1a1aa
```

---

# ⚡ Performance Optimizations

* Debounced search
* Infinite scroll
* Image lazy loading
* Request caching
* Skeleton loading states
* Component memoization
* 
---

# 🌟 Future Roadmap

* Authentication
* Watchlists
* Movie Reviews
* AI Recommendations
* Streaming Availability
* User Profiles

---

# 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork the project and submit a pull request.

---

# 📜 License

MIT License

---

<img src="https://capsule-render.vercel.app/api?type=waving&height=120&section=footer&color=0:0a0a0f,100:e84040"/>

</p>

<p align="center">
  Built with ❤️ using React, Tailwind CSS and TMDB API
</p>
