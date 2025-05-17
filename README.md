# Recipe Finder 🍽️

![Homepage Screenshot](<WhatsApp Image 2025-05-17 at 1.34.36 AM.jpeg>)

---

## Project Description

Recipe Finder is a full-stack React application that lets users search, browse and save recipes from around the world. It includes:

- Email/password authentication (via Firebase)  
- Protected routes so only logged-in users can access certain pages  
- Integration with TheMealDB for recipe data  
- An AI-powered “RecipeBot” assistant using OpenAI’s GPT-3.5 Turbo  

---

## Features

- **User Authentication**  
  Register and log in with email/password (Firebase Auth).

- **Protected Routes**  
  Favorites and Recipe Details pages accessible only to authenticated users.

- **Recipe Search**  
  - Search by keyword  
  - Filter by cuisine (American, Italian, Indian, etc.)  
  - “Random Recipe” generator  

- **Favorites Management**  
  Add or remove recipes from your personal favorites list.

- **RecipeBot AI Assistant**  
  Ask cooking questions in natural language; answers powered by GPT-3.5 Turbo.

- **Responsive UI**  
  Mobile-friendly design with reusable React components and CSS styling.

---

## Tech Stack & Required Libraries

- **Core**  
  - React (Create React App)  
  - React Router (`react-router-dom`)  
  - Hooks: `useState`, `useEffect`  

- **Authentication**  
  - Firebase SDK (`firebase`)  

- **API Communication**  
  - Axios (`axios`)  
  - TheMealDB public API  
  - OpenAI Chat Completions API  

- **UI & Icons**  
  - Plain CSS / CSS modules  
  - React Icons (`react-icons`)  

- **Dev & Build**  
  - Node.js & npm  
  - (Optional) `gh-pages` for GitHub Pages deployment  

---

## Environment Variables

Create a file named `.env` in the project root and add your OpenAI key:  
```bash
REACT_APP_OPENAI_API_KEY=sk-your_real_api_key_here


## Running the Project

Once you’ve cloned the repo and set up your .env:
   
bash
   
   npm install
   npm start
