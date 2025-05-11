import { useSelector, useDispatch } from "react-redux";
import { getImages, resetImages } from "./features/images/imagesSlice.js";
import SearchBar from "./features/images/SearchBar";
import ImageGrid from "./features/images/ImageGrid";
import { FaSearch } from "react-icons/fa";

function App() {
  const dispatch = useDispatch();
  const { images, loading, error } = useSelector((state) => state.images);

  const handleSearch = (query) => {
    dispatch(getImages(query));
  };

  const handleReset = () => {
    dispatch(resetImages());
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-center py-8 flex items-center justify-center gap-3 text-gray-800">
        <FaSearch className="text-blue-500" />
        Image Search
      </h1>

      <SearchBar
        onSearch={handleSearch}
        onReset={handleReset}
        images={images}
      />
      <ImageGrid images={images} loading={loading} error={error} />
    </div>
  );
}

export default App;
