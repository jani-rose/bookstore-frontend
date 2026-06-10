import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookForm from "../components/BookForm";
import API from "../services/api";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await API.get(`/api/books/${id}/`);
        setBook(response.data);
      } catch (err) {
        if (err.response?.status === 404) {
          setError("Book not found.");
        } else if (err.response?.status === 401) {
          setError("Session expired. Please log in again.");
        } else {
          setError("Failed to load book. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleSubmit = async (formData) => {
    setSaveLoading(true);
    setError("");
    try {
      await API.put(`/api/books/${id}/`, formData);
      setSuccess(true);
      setTimeout(() => navigate("/books"), 1000);
    } catch (err) {
      const data = err.response?.data;
      setError(
        data
          ? Object.values(data).flat().join(" ")
          : "Failed to update book. Please try again."
      );
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div className="page-wrap edit-wrap">
      <button className="btn-back" onClick={() => navigate("/books")}>
        ← Back to My Books
      </button>

      <h1>Edit Book</h1>
      {book && (
        <p className="edit-subtitle">Editing &ldquo;{book.title}&rdquo;</p>
      )}

      {loading && (
        <div className="spinner-wrap">
          <div className="spinner" />
        </div>
      )}

      {!loading && error && (
        <div className="alert alert-error">{error}</div>
      )}

      {!loading && success && (
        <div className="alert alert-success">Book updated! Redirecting…</div>
      )}

      {!loading && book && !success && (
        <div className="edit-card">
          <BookForm
            initialData={book}
            onSubmit={handleSubmit}
            onCancel={() => navigate("/books")}
            submitLabel="Save changes"
            loading={saveLoading}
          />
          {error && (
            <div className="alert alert-error" style={{ marginTop: "16px" }}>
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default EditBook;
