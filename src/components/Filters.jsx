// Filters.jsx
import { useState, useMemo, useEffect } from "react";
import { useMovies } from "../context/MoviesContext";
import { useLocation, useSearchParams } from "react-router-dom";

const GENRE_NAME_TO_ID = {
  Drama: 18,
  Action: 28,
  Comedy: 35,
  Horror: 27,
  Romance: 10749,
};

const TAB_NAME_TO_PARAM = {
  Trending: "trending",
  "Top Rated": "top",
  Popular: "popular",
  Upcoming: "upcoming",
  "Now Playing": "now", // لو حبيت تعمل tab خاص بيها لاحقًا
};

const TAB_PARAM_TO_NAME = {
  trending: "Trending",
  popular: "Popular",
  top: "Top Rated",
  upcoming: "Upcoming",
  now: "Now Playing",
};

function Filters() {
  const location = useLocation();
  const [params, setParams] = useSearchParams();

  const { activeExplore, handleActiveExplore, handleActiveGenre, activeGenre } =
    useMovies();

  const explore = [
    "Trending",
    "Top Rated",
    "Popular",
    "Upcoming",
    "Now Playing",
  ];
  const genres = ["Drama", "Action", "Comedy", "Horror", "Romance"];

  // --- قراءة حالة الراوت/البارامز
  const inSearchRoute = location.pathname === "/search";
  const q = (params.get("q") || "").trim();
  const hasQuery = q.length >= 3;

  const activeUrlSort = params.get("sort") || ""; // ex: "popularity.desc"
  const activeUrlWindow = params.get("window") || ""; // "upcoming" | "now"
  const activeUrlGenreId = params.get("genres") || ""; // ex: "28"
  const activeTabParam = params.get("tab") || ""; // ex: "popular" | "top" | ...

  // --- تحكم في تبويب Explore/Genre: نضبطه تلقائيًا حسب الرابط
  const initialTabFromUrl = activeUrlGenreId ? "Genre" : "Explore";
  const [activeTab, setActiveTab] = useState(initialTabFromUrl);

  // لما الرابط يتغيّر (من المنيو مثلاً) نحدّث التبويب
  useEffect(() => {
    if (activeUrlGenreId) setActiveTab("Genre");
    else if (activeTabParam || activeUrlSort || activeUrlWindow)
      setActiveTab("Explore");
    // لو كلهم فاضيين، ما نغيّر تبويب المستخدم يدويًا
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  // --- تحويل Explore ⇄ URL (لمنطق البحث النصّي)
  function mapExploreToUrl(e) {
    switch (e) {
      case "Trending":
      case "Popular":
        return { sort: "popularity.desc", window: "" };
      case "Top Rated":
        return { sort: "vote_average.desc", window: "" };
      case "Upcoming":
        return { sort: "", window: "upcoming" };
      case "Now Playing":
        return { sort: "", window: "now" };
      default:
        return { sort: "", window: "" };
    }
  }

  // --- عند الضغط على Explore
  function onExploreClick(e) {
    if (!inSearchRoute) {
      // السلوك القديم خارج /search
      handleActiveExplore(e);
      return;
    }

    // داخل /search:
    if (hasQuery) {
      // وضع البحث النصّي: نستخدم sort/window
      const { sort, window } = mapExploreToUrl(e);

      if (sort) {
        const isSame = activeUrlSort === sort;
        if (isSame) params.delete("sort");
        else params.set("sort", sort);
        params.delete("window");
        params.delete("tab"); // نفصل عن وضع التابات
      } else if (window) {
        const isSame = activeUrlWindow === window;
        if (isSame) params.delete("window");
        else params.set("window", window);
        params.delete("sort");
        params.delete("tab");
      } else {
        params.delete("sort");
        params.delete("window");
        params.delete("tab");
      }
    } else {
      // بدون q: نستخدم tab=<...>
      const tabParam = TAB_NAME_TO_PARAM[e] || "";
      if (tabParam) {
        const isSame = activeTabParam === tabParam;
        if (isSame) params.delete("tab");
        else params.set("tab", tabParam);
      } else {
        params.delete("tab");
      }
      // تنظيف أي فلاتر تضارب
      params.delete("sort");
      params.delete("window");
      params.delete("genres");
    }

    params.set("page", "1");
    setParams(params, { replace: false });
  }

  // --- عند الضغط على Genre
  function onGenreClick(g) {
    if (!inSearchRoute) {
      // السلوك القديم خارج /search
      handleActiveGenre(g);
      return;
    }

    const id = String(GENRE_NAME_TO_ID[g]);
    const current = params.get("genres") || "";

    if (current === id) params.delete("genres");
    else params.set("genres", id);

    // لو اخترنا جينر من المنيو/الفلاتر نخلي وضع genre-only ونزيل tab
    params.delete("tab");

    // في وضع البحث النصّي ممكن تخلي sort/window شغّالة مع الجينر لو حابب.
    // ما هنمسحهم هنا (اتركهم كما هم). امسحهم لو تبغى سلوك أبسط:
    // params.delete("sort"); params.delete("window");

    params.set("page", "1");
    setParams(params, { replace: false });
  }

  // --- تحديد العنصر النشِط في Explore حسب الرابط
  const uiActiveExplore = useMemo(() => {
    if (!inSearchRoute) return activeExplore;

    if (hasQuery) {
      if (activeUrlWindow === "upcoming") return "Upcoming";
      if (activeUrlWindow === "now") return "Now Playing";
      if (activeUrlSort === "vote_average.desc") return "Top Rated";
      if (activeUrlSort === "popularity.desc") return "Trending"; // أو "Popular"
      return "";
    }

    // بدون q: نعتمد على tab
    if (activeTabParam) return TAB_PARAM_TO_NAME[activeTabParam] || "";
    return "";
  }, [
    inSearchRoute,
    hasQuery,
    activeExplore,
    activeUrlSort,
    activeUrlWindow,
    activeTabParam,
  ]);

  // --- تحديد الجينر النشِط حسب الرابط
  const uiActiveGenre = useMemo(() => {
    if (!inSearchRoute) return activeGenre;

    const name = Object.entries(GENRE_NAME_TO_ID).find(
      ([, val]) => String(val) === activeUrlGenreId
    )?.[0];
    return name || "";
  }, [inSearchRoute, activeGenre, activeUrlGenreId]);

  return (
    <div className="filters container">
      <div className="filters__catogerys">
        <button
          className={`filters__catogerys--option ${
            activeTab === "Explore" ? "is-active" : ""
          }`}
          onClick={() => setActiveTab("Explore")}
          type="button"
        >
          Explore
        </button>

        <button
          className={`filters__catogerys--option ${
            activeTab === "Genre" ? "is-active" : ""
          }`}
          onClick={() => setActiveTab("Genre")}
          type="button"
        >
          Genre
        </button>
      </div>

      <div className="filters__options">
        {activeTab === "Explore"
          ? explore.map((e) => (
              <button
                key={e}
                type="button"
                className={`filters__chip ${
                  uiActiveExplore === e ? "is-active" : ""
                }`}
                onClick={() => onExploreClick(e)}
              >
                {e}
              </button>
            ))
          : genres.map((g) => (
              <button
                key={g}
                type="button"
                className={`filters__chip ${
                  uiActiveGenre === g ? "is-active" : ""
                }`}
                onClick={() => onGenreClick(g)}
              >
                {g}
              </button>
            ))}
      </div>
    </div>
  );
}

export default Filters;
