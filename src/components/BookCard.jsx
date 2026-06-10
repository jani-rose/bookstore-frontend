import { useNavigate } from "react-router-dom";

function BookCard({ book, onDelete, isDeleting }) {
  const navigate = useNavigate();

  return (
    <div className="book-card">
      <div className="book-card-header">
        <h2 className="book-title">{book.title}</h2>
        <span className="book-price-badge">₹{book.price}</span>
      </div>
      <p className="book-author">by {book.author}</p>
      {book.description && (
        <p className="book-description">{book.description}</p>
      )}
      <div className="book-card-actions">
        <button
          className="btn-edit"
          onClick={() => navigate(`/edit/${book.id}`)}
        >
          Edit
        </button>
        <button
          className="btn-delete"
          onClick={() => onDelete(book.id)}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting…" : "Delete"}
        </button>
      </div>
    </div>
  );
}

export default BookCard;
