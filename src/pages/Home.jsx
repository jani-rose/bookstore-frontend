import { Link } from "react-router-dom";

function Home() {
  const isLoggedIn = !!localStorage.getItem("access");

  return (
    <>
      <div className="home-hero">
        <h1>
          Your personal <em>library,</em>
          <br />
          always in order
        </h1>
        <p>
          Add, organise, and manage your book collection from anywhere.
          Simple, clean, and yours alone.
        </p>
        <div className="hero-actions">
          {isLoggedIn ? (
            <Link to="/books" className="btn-hero-primary">
              Go to My Books →
            </Link>
          ) : (
            <>
              <Link to="/register" className="btn-hero-primary">
                Get started
              </Link>
              <Link to="/login" className="btn-hero-secondary">
                Sign in
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="home-features">
        <div className="feature-card">
          <span className="feature-icon">📚</span>
          <h3>Track your collection</h3>
          <p>Keep a tidy record of every book you own — title, author, and price at a glance.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">✏️</span>
          <h3>Edit anytime</h3>
          <p>Made a typo? Update any detail instantly with a clean, focused edit form.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🔒</span>
          <h3>Yours only</h3>
          <p>Your library is private — only you can see and manage your own books after signing in.</p>
        </div>
      </div>
    </>
  );
}

export default Home;
