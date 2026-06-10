# BookStoreFrontend

A React-based frontend application for the Book Store Management System. This project provides a user interface for managing a personal book collection and integrates with a Django REST Framework backend using JWT authentication.

## Author

Jani Rose Lawwellman

## Technologies Used

* React
* Vite
* React Router DOM
* Axios
* JWT Authentication

## Features

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* View Book Collection
* Search Books
* Add New Books
* Edit Existing Books
* Delete Books
* Logout Functionality
* Loading and Error Handling

## Project Structure

```text
src/
├── components/
│   ├── Navbar.jsx
│   ├── BookCard.jsx
│   ├── BookForm.jsx
│   └── ProtectedRoute.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Books.jsx
│   └── EditBook.jsx
│
├── services/
│   └── api.js
│
├── App.jsx
├── main.jsx
└── index.css
```

## Backend Integration

This frontend is designed to work with the Django REST Framework backend developed as a separate repository. Communication is handled through REST APIs using Axios, with JWT tokens attached automatically to authenticated requests.

## Functionality

* Register a new user account
* Login using JWT authentication
* Access protected pages after authentication
* View all books
* Search books by title or author
* Add new books
* Update existing books
* Delete books
* Logout securely

## Project Status

Completed and integrated with Django REST API backend.
