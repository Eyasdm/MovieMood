// src/components/MovieMoodLoader.jsx

export default function Loader({ message = "Loading your next mood..." }) {
  return (
    <div className="mm-loader" role="status" aria-live="polite">
      <div className="mm-loader__content">
        <div className="mm-loader__badge">
          <div className="mm-loader__ring" />
          <div className="mm-loader__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="mm-loader__icon-svg"
            >
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          </div>
        </div>

        <p className="mm-loader__brand">
          Movie<span className="mm-loader__brand--accent">Mood</span>
        </p>

        <p className="mm-loader__message">{message}</p>

        <div className="mm-loader__dots">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
