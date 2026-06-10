import { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import BookForm from "../components/BookForm";
import API from "../services/api";

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchBooks = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await API.get("/api/books/");
      setBooks(response.data);
    } catch (err) {
      if (!err.response) {
        setError("Cannot reach the server. Make sure Django is running.");
      } else if (err.response.status === 401) {
        setError("Session expired. Please log in again.");
      } else {
        setError("Failed to load books. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = async (formData) => {
    setAddLoading(true);
    setAddError("");
    try {
      await API.post("/api/books/", formData);
      setShowAddForm(false);
      await fetchBooks();
    } catch (err) {
      setAddError(
        err.response?.data
          ? Object.values(err.response.data).flat().join(" ")
          : "Failed to add book. Please try again."
      );
    } finally {
      setAddLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this book from your collection?")) return;
    setDeletingId(id);
    try {
      await API.delete(`/api/books/${id}/`);
      setBooks(books.filter((b) => b.id !== id));
    } catch {
      alert("Failed to delete book. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="page-wrap">
      {/* Header */}
      <div className="books-header">
        <div>
          <h1>My Books</h1>
          {!loading && (
            <p className="books-header-sub">
              {books.length} book{books.length !== 1 ? "s" : ""} in your
              collection
            </p>
          )}
        </div>
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div className="search-bar">
            <svg
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              placeholder="Search books…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            className="btn-add"
            onClick={() => {
              setShowAddForm(!showAddForm);
              setAddError("");
            }}
          >
            {showAddForm ? (
              "✕ Cancel"
            ) : (
              <>
                <svg
                  width="14"
                  height="14"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Add Book
              </>
            )}
          </button>
        </div>
      </div>

      {/* Add book panel */}
      {showAddForm && (
        <div className="add-book-panel">
          <h2>Add a new book</h2>
          {addError && <div className="alert alert-error">{addError}</div>}
          <BookForm
            onSubmit={handleAdd}
            onCancel={() => setShowAddForm(false)}
            submitLabel="Add Book"
            loading={addLoading}
          />
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="spinner-wrap">
          <div className="spinner" />
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="alert alert-error" style={{ marginBottom: "24px" }}>
          {error}{" "}
          <button
            onClick={fetchBooks}
            style={{
              marginLeft: "8px",
              fontWeight: 700,
              background: "none",
              border: "none",
              color: "#b91c1c",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Retry
          </button>
        </div>
      )}

      {/* Book grid */}
      {!loading && !error && (
        <div className="books-grid">
          {filteredBooks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📭</div>
              <h2>
                {searchQuery
                  ? "No books match your search"
                  : "Your library is empty"}
              </h2>
              <p>
                {searchQuery
                  ? "Try a different title or author name."
                  : 'Click "Add Book" above to start your collection.'}
              </p>
            </div>
          ) : (
            filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onDelete={handleDelete}
                isDeleting={deletingId === book.id}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Books;
