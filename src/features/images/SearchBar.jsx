import { useState } from "react";

export default function SearchBar({ onSearch, onReset, images }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  //list sugget english keywords
  const suggestKeywords = [
    "nature",
    "animals",
    "technology",
    "food",
    "travel",
    "people",
    "cities",
    "art",
    "yoga",
    "music",
    "fashion",
    "history",
    "science",
  ];

  const isValidQuery = (query) => {
    const trimmedQuery = query.trim();
    // Kiểm tra query rỗng
    if (trimmedQuery === "") {
      setError("Please enter keywords to search.");
      return false;
    }
    // Kiểm tra query quá ngắn (tùy chọn: có thể bỏ nếu muốn cho phép query 1 ký tự)
    if (trimmedQuery.length < 1) {
      setError("Keyword must be at least 1 character.");
      return false;
    }
    // Kiểm tra query chỉ chứa ký tự đặc biệt (cho phép ký tự Unicode)
    if (!/[\p{L}\p{N}]/u.test(trimmedQuery)) {
      setError("Keyword must contain at least one letter or number");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidQuery(query)) {
      setSearchSubmitted(false);
      onReset(); // Reset images khi query không hợp lệ
      return;
    }
    setError("");
    setSearchSubmitted(true);
    onSearch(query.trim());
  };
  const handleSuggestionClick = (keyword) => {
    setQuery(keyword);
    setError("");
    setSearchSubmitted(true);
    onSearch(keyword);
  };
  const noResults = searchSubmitted && images && images.length === 0;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-2 my-6 px-4"
    >
      <div className="w-full sm:w-1/2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search images..."
          className={`w-full px-4 py-2 rounded-md border ${
            error ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        {noResults && !error && (
          <p className="text-yellow-500 text-sm mt-1">
            No results found for "{query.trim() || "keyword"}".
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 hover:translate-y-[1px] active:bg-green-700 active:translate-y-[2px] active:shadow-inner transition-all duration-150 shadow-md"
      >
        Search
      </button>

      {/* tu khoa goi y */}
      <div className="flex flex-wrap gap-2 mt-2">
        {suggestKeywords.map((keyword) => (
          <button
            key={keyword}
            type="button"
            onClick={() => handleSuggestionClick(keyword)}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition duration-150"
          >
            {keyword}
          </button>
        ))}
      </div>
    </form>
  );
}
