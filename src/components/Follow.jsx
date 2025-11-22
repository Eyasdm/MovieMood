// Follow.jsx
export function Follow({ className }) {
  return (
    <>
      {/* GitHub */}
      <a
        className={className}
        href="https://github.com/Eyasdm"
        target="_blank"
        rel="noreferrer"
      >
        <svg
          className="footer__icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M12 1.75C6.62 1.75 2.25 6.12 2.25 11.5c0 4.3 2.79 7.95 6.67 9.24.49.09.68-.21.68-.48
              0-.24-.01-.87-.01-1.7-2.72.59-3.29-1.31-3.29-1.31-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61
              1 .07 1.52 1.03 1.52 1.03.9 1.53 2.37 1.09 2.95.83.09-.65.35-1.09.63-1.34-2.17-.25-4.45-1.09-4.45-4.85
              0-1.07.38-1.95 1.02-2.64-.1-.25-.44-1.27.1-2.65 0 0 .82-.26 2.69 1.01A9.31 9.31 0 0 1 12 6.04
              c.83 0 1.67.11 2.45.33 1.86-1.27 2.68-1.01 2.68-1.01.54 1.38.2 2.4.1 2.65.64.69 1.02 1.57 1.02 2.64
              0 3.77-2.28 4.59-4.46 4.83.36.31.68.92.68 1.86 0 1.35-.01 2.44-.01 2.77 0 .27.18.58.69.48
              3.87-1.29 6.66-4.94 6.66-9.24C21.75 6.12 17.38 1.75 12 1.75Z"
          />
        </svg>
        <span>GitHub</span>
      </a>

      {/* LinkedIn */}
      <a
        className={className}
        href="https://www.linkedin.com/in/eyas-adam/"
        target="_blank"
        rel="noreferrer"
      >
        <svg
          className="footer__icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M4.98 3.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM3.25 9h3.5V20.5h-3.5V9Zm7.25 0h3.35v1.56h.05
              c.47-.9 1.62-1.86 3.33-1.86 3.56 0 4.22 2.34 4.22 5.39v6.41h-3.5v-5.68c0-1.36-.03-3.11-1.9-3.11-1.9 0-2.19 1.49-2.19 3.01v5.78h-3.5V9Z"
          />
        </svg>
        <span>LinkedIn</span>
      </a>
    </>
  );
}
