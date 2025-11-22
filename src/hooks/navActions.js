// navActions.js

export function goTab(navigate, onClose, tab, page = false) {
  if (page) {
    navigate(tab);
    onClose?.();
    return;
  }
  const params = new URLSearchParams({ tab, page: "1" });
  navigate(`${params.toString()}`);
  onClose?.();
}

export function goGenre(navigate, onClose, id) {
  const params = new URLSearchParams({ genres: String(id), page: "1" });
  navigate(`/search?${params.toString()}`);
  onClose?.();
}

export function applyTheme(onClose, theme) {
  document.documentElement.setAttribute("data-theme", theme);
  onClose?.();
}
