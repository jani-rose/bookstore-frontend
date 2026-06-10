# BookStoreFrontend

React + Vite frontend for the BookStore application — a personal book collection manager with JWT authentication.

> **Separate repository.** The Django backend lives in `BookStore`. Both are independent projects connected only at runtime.

---

## Technologies Used

- React 19
- Vite 8
- React Router DOM 7
- Axios

---

## Project Structure

```
BookStoreFrontend/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Sticky nav — shows Logout when logged in
│   │   ├── BookCard.jsx        # Book display card with Edit / Delete
│   │   ├── BookForm.jsx        # Reusable form for Add and Edit
│   │   └── ProtectedRoute.jsx  # Redirects to /login if no token
│   ├── pages/
│   │   ├── Home.jsx            # Landing page
│   │   ├── Login.jsx           # POST /api/login/ → stores JWT tokens
│   │   ├── Register.jsx        # POST /api/register/ → redirect to login
│   │   ├── Books.jsx           # Full CRUD — list, search, add, delete
│   │   └── EditBook.jsx        # Load book → edit → PUT /api/books/<id>/
│   ├── services/
│   │   └── api.js              # Axios instance with JWT interceptor
│   ├── App.jsx                 # Routes with ProtectedRoute on /books
│   ├── main.jsx
│   └── index.css
├── .env.example
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

## Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd BookStoreFrontend

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# .env already contains: VITE_API_URL=http://127.0.0.1:8000
```

---

## How To Run

```bash
# Make sure Django backend is running first (see Backend Requirements below)
npm run dev
```

App runs at: **http://localhost:5173**

---

## Backend Requirements

The Django backend (`BookStore`) must be running for the app to work.

```bash
cd BookStore
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend runs at: **http://127.0.0.1:8000**

### Required backend setup (already done if you have the BookStore repo)

- `django-cors-headers` installed and configured in `settings.py`
- `CORS_ALLOWED_ORIGINS` includes `http://localhost:5173`

---

## API Endpoints Used

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/register/` | No | Create new user |
| POST | `/api/login/` | No | Get JWT access + refresh tokens |
| POST | `/api/logout/` | Yes | Blacklist refresh token |
| GET | `/api/books/` | Yes | List all your books |
| POST | `/api/books/` | Yes | Add a new book |
| GET | `/api/books/<id>/` | Yes | Get one book |
| PUT | `/api/books/<id>/` | Yes | Update a book |
| DELETE | `/api/books/<id>/` | Yes | Delete a book |

JWT access token is attached automatically to all requests by the Axios interceptor in `src/services/api.js`.

---

## Features

- User registration and login with JWT authentication
- Protected routes — `/books` and `/edit/:id` require login
- View your personal book collection
- Search books by title or author
- Add new books (title, author, price, description)
- Edit existing books
- Delete books with confirmation
- Logout with server-side token blacklisting
- Loading states and user-friendly error messages throughout

---

## Build for Production

```bash
npm run build
# Output goes to dist/
```
