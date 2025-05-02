export default function StatusMessage({ loading, error, noResult }) {
  if (loading) {
    return (
      <div className="text-center mt-10 text-blue-500 text-xl">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500 text-xl">{error}</div>
    );
  }

  if (noResult) {
    return (
      <div className="flex flex-col items-center mt-10 text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 9.75h.008v.008H9.75V9.75zM14.25 9.75h.008v.008h-.008V9.75zM9 13.5h6m-9 6a9 9 0 1118 0H3z"
          />
        </svg>
        <p>No images found. Try another search!</p>
      </div>
    );
  }

  return null;
}
