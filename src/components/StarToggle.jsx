// StarToggle.jsx
function StarToggle({ active = false, onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`star-toggle ${className}`}
      aria-pressed={active}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="30"
        viewBox="0 0 24 30"
        className={`star-icon ${active ? "active" : ""}`}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V27L12 22.25 4.5 27V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
          fill={active ? "#5799EF" : "none"}
          stroke="#5799EF"
          strokeWidth="1.8"
        />
      </svg>
    </button>
  );
}

export default StarToggle;
