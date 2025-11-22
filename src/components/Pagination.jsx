import { useMemo } from "react";

/**
 * Props:
 * - currentPage: number (1-based)
 * - totalPages: number
 * - onPageChange: (page:number) => void
 * - siblingCount?: number (default 1)
 * - boundaryCount?: number (default 1)
 * - className?: string
 */
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  boundaryCount = 1,
  className = "",
}) {
  const pages = useMemo(() => {
    return buildRange({ currentPage, totalPages, siblingCount, boundaryCount });
  }, [currentPage, totalPages, siblingCount, boundaryCount]);

  const goto = (p) => {
    if (p < 1 || p > totalPages || p === currentPage) return;
    onPageChange(p);
  };

  const isDisabled = (cond) => (cond ? " is-disabled" : "");

  return (
    <nav
      className={`mm-pagination ${className}`}
      role="navigation"
      aria-label="Pagination Navigation"
    >
      <button
        type="button"
        className={`mm-page-btn mm-page-edge${isDisabled(currentPage === 1)}`}
        onClick={() => goto(1)}
        aria-label="First page"
        disabled={currentPage === 1}
      >
        « First
      </button>

      <button
        type="button"
        className={`mm-page-btn mm-page-edge${isDisabled(currentPage === 1)}`}
        onClick={() => goto(currentPage - 1)}
        aria-label="Previous page"
        disabled={currentPage === 1}
      >
        ‹ Prev
      </button>

      <ul className="mm-page-list" role="list">
        {pages.map((item, idx) => {
          if (item === "ellipsis-left" || item === "ellipsis-right") {
            return (
              <li
                key={`${item}-${idx}`}
                className="mm-page-ellipsis"
                aria-hidden="true"
              >
                …
              </li>
            );
          }
          const active = item === currentPage ? " is-active" : "";
          return (
            <li key={item}>
              <button
                type="button"
                className={`mm-page-btn${active}`}
                aria-current={item === currentPage ? "page" : undefined}
                onClick={() => goto(item)}
              >
                {item}
              </button>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        className={`mm-page-btn mm-page-edge${isDisabled(
          currentPage === totalPages
        )}`}
        onClick={() => goto(currentPage + 1)}
        aria-label="Next page"
        disabled={currentPage === totalPages}
      >
        Next ›
      </button>

      <button
        type="button"
        className={`mm-page-btn mm-page-edge${isDisabled(
          currentPage === totalPages
        )}`}
        onClick={() => goto(totalPages)}
        aria-label="Last page"
        disabled={currentPage === totalPages}
      >
        Last »
      </button>
    </nav>
  );
}

/* -------- Helpers -------- */

/**
 * Returns an array like:
 * [1, 'ellipsis-left', 5, 6, 7, 'ellipsis-right', 20]
 * based on currentPage/totalPages and sibling+boundary counts.
 */
function buildRange({ currentPage, totalPages, siblingCount, boundaryCount }) {
  if (totalPages <= 0) return [];

  const range = (start, end) => {
    const out = [];
    for (let i = start; i <= end; i++) out.push(i);
    return out;
  };

  const totalNumbers = siblingCount * 2 + 1;
  const totalBlocks = totalNumbers + boundaryCount * 2;

  // If we can show everything, show everything.
  if (totalPages <= totalBlocks) return range(1, totalPages);

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);

  const showLeftEllipsis = leftSibling > boundaryCount + 2;
  const showRightEllipsis = rightSibling < totalPages - boundaryCount - 1;

  const firstPages = range(1, boundaryCount);
  const lastPages = range(totalPages - boundaryCount + 1, totalPages);
  const middlePages = range(
    Math.max(leftSibling, boundaryCount + 1),
    Math.min(rightSibling, totalPages - boundaryCount)
  );

  const result = [...firstPages];

  if (showLeftEllipsis) result.push("ellipsis-left");
  else {
    // Expand to cover gap
    const extra = range(
      boundaryCount + 1,
      Math.max(boundaryCount + 1, leftSibling - 1)
    );
    result.push(...extra);
  }

  result.push(...middlePages);

  if (showRightEllipsis) result.push("ellipsis-right");
  else {
    const extra = range(
      Math.min(rightSibling + 1, totalPages - boundaryCount),
      totalPages - boundaryCount
    );
    result.push(...extra);
  }

  result.push(...lastPages);
  return dedupe(result);
}

function dedupe(arr) {
  return arr.filter((v, i) => arr.indexOf(v) === i);
}
