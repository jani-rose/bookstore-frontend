import { useState } from "react";

function BookForm({ initialData = {}, onSubmit, onCancel, submitLabel = "Save", loading = false }) {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    author: initialData.author || "",
    description: initialData.description || "",
    price: initialData.price || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-field">
          <label>Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Clean Code"
            required
          />
        </div>
        <div className="form-field">
          <label>Author</label>
          <input
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="e.g. Robert C. Martin"
            required
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-field">
          <label>Price (₹)</label>
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g. 499"
            required
          />
        </div>
        <div className="form-field">
          {/* spacer */}
        </div>
      </div>
      <div className="form-field">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="A short note about the book…"
          required
        />
      </div>
      <div className="panel-actions">
        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? "Saving…" : submitLabel}
        </button>
        {onCancel && (
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default BookForm;
