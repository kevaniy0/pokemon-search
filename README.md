# Pokémon Search <img src="./src/docs/logo.png" alt="react" width='38px' style="vertical-align: middle;"/>

**Pokémon Search** — this is a project built with **React**.  
The project allows searching for Pokémon and displaying their characteristics, including image, type, and basic stats.

## Deploy - [Link](https://kevaniy0.github.io/pokemon-search/)

## 📝 Features

- Search Pokémon by name. (You can use numbers from 1 to 1025 if you don't know the names)
- Display a list of results with basic information: name, type, image, etc.
- Store recent search history in `localStorage`.
- Error handling using a custom **ErrorBoundary**.
- Responsive design using **Tailwind CSS**.

## 🧪 Testing & Coverage

- Full project coverage in the `unit-testing` branch using **Vitest** and **React Testing Library**.

- 24 tests across 8 files, including unit and integration tests for components, API calls, loading states, error handling, and localStorage.

## ⚙️ Technologies

- **React**
- **TypeScript**
- **Vite** (project bundler)
- **Tailwind CSS** (styling)
- **GitHub Pages** (deployment)
- **localStorage** (saving search history)
- **Eslint**, **Prettier**, **Husky** (code quality and formatting)
- **Vitest**, **React Testing Library** (testing)

## 📸 Screenshots

<img src="./src/docs/Screenshot_1.png" alt="Main screen" width="700" />
<img src="./src/docs/Screenshot_2.png" alt="Error" width="700" />

## 🚀 Installation & Running

```bash
git clone https://github.com/kevaniy0/pokemon-search.git
cd pokemon-search
npm install
npm run dev
```
