# Multiselect Demo App

## Description

Demo App with React + TailwindCSS featuring a Multiselect component that implements multi-selection with search functionality. Options and selected values are objects (e.g., { region: 'Africa/Abidjan' }).

## Quick Start

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Run the app in development mode:**

   ```sh
   npm run dev
   ```

   After starting, the app will be available at the address shown in the console (usually http://localhost:5173/).

3. **Build for production:**

   ```sh
   npm run build
   ```

4. **Preview the production build:**

   ```sh
   npm run preview
   ```

   Open the address shown in the terminal (e.g., http://localhost:4173/).

## Project Structure

- `src/component/Multiselect.jsx` — the core multiselect component (includes code comments)
- `src/App.jsx` — example usage of the component
- `src/App.css, src/index.css` — styles, including scrollbar customization

## Features
- Multi-selection and removal of selected options
- Search through options (by the `region` field)
- Custom scrollbar for the dropdown only
- Dropdown closes when clicking outside its area

---

## Описание

Демо-приложение на React + TailwindCSS с компонентом Multiselect, реализующим мультивыбор с поиском. Опции и выбранные значения — объекты (например, { region: 'Africa/Abidjan' }).

## Быстрый старт

1. **Установите зависимости:**

   ```sh
   npm install
   ```

2. **Запустите приложение в режиме разработки:**

   ```sh
   npm run dev
   ```

   После запуска приложение будет доступно по адресу, указанному в консоли (обычно http://localhost:5173/).

3. **Сборка для продакшена:**

   ```sh
   npm run build
   ```

4. **Просмотр production-сборки:**

   ```sh
   npm run preview
   ```

   Откройте адрес, указанный в терминале (например, http://localhost:4173/).

## Структура проекта

- `src/component/Multiselect.jsx` — основной компонент мультиселекта (с комментариями в коде)
- `src/App.jsx` — пример использования компонента
- `src/App.css`, `src/index.css` — стили, включая кастомизацию скроллбара

## Особенности
- Мультивыбор и удаление выбранных опций
- Поиск по опциям (по полю `region`)
- Кастомный скроллбар только для выпадающего списка
- Закрытие выпадающего списка при клике вне области

## Требования
- Node.js >= 18
- npm >= 9

