export function MiniLoader({ message = "Loading..." }) {
  return (
    <div className="mm-loader-inline" role="status" aria-live="polite">
      <div className="mm-loader-inline__badge">
        <div className="mm-loader-inline__ring" />
        <div className="mm-loader-inline__icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="mm-loader-inline__icon-svg"
          >
            <path d="M8 5v14l11-7z" fill="currentColor" />
          </svg>
        </div>
      </div>

      <p className="mm-loader-inline__message">{message}</p>
    </div>
  );
}
