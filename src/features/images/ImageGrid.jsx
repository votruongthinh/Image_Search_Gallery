import { useState, useEffect } from "react";
import StatusMessage from "../../components/StatusMessage";
import {
  FiMaximize2,
  FiMinimize2,
  FiUser,
  FiCalendar,
  FiHeart,
  FiImage,
  FiLink,
} from "react-icons/fi";

export default function ImageGrid({ images, loading, error }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
        setIsFullscreen(false);
      }
    };
    if (selectedImage) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [selectedImage]);

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  if (loading || error || images.length === 0) {
    return (
      <StatusMessage
        loading={loading}
        error={error}
        noResult={images.length === 0}
      />
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {images.slice(0, 12).map((img) => (
          <div
            key={img.id}
            className="overflow-hidden rounded-lg shadow-lg cursor-pointer bg-white"
            onClick={() => {
              setSelectedImage(img);
              setIsFullscreen(false);
            }}
          >
            <img
              src={img.urls.small}
              alt={img.alt_description || "Image"}
              className="w-full h-60 object-cover"
              loading="lazy"
              onError={(e) => console.error("Error loading image:", e)}
            />
            <p className="p-2 text-sm text-gray-700 flex items-center gap-2">
              <FiUser /> {img.user?.name || "Unknown"}
            </p>
          </div>
        ))}
      </div>

      {/* Modal chi tiết ảnh */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-auto"
          onClick={() => {
            setSelectedImage(null);
            setIsFullscreen(false);
          }}
        >
          <div
            className="relative bg-white rounded-xl p-4 max-w-[90vw] w-full max-h-[90vh] overflow-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Nút toggle fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="absolute top-2 right-2 p-2 bg-white/80 rounded-full z-50 text-xl hover:bg-white"
              aria-label={isFullscreen ? "Minimize" : "Maximize"}
            >
              {isFullscreen ? <FiMinimize2 /> : <FiMaximize2 />}
            </button>

            <div className="flex flex-col gap-4">
              <div className="flex-1">
                <img
                  src={selectedImage.urls.regular}
                  alt={selectedImage.alt_description || "Image"}
                  className={`w-full object-contain rounded-lg select-none ${
                    isFullscreen ? "h-[85vh]" : "h-[200px] sm:h-[300px]"
                  }`}
                  style={{ userSelect: "none", touchAction: "pan-y" }}
                  onError={(e) => console.error("Error loading full image:", e)}
                />
              </div>

              <div className="flex-1 space-y-2 text-gray-700 text-sm sm:text-base">
                <h2 className="text-base sm:text-lg font-bold text-gray-800">
                  {selectedImage.description ||
                    selectedImage.alt_description ||
                    "No description"}
                </h2>

                <div className="flex items-center gap-2">
                  <FiUser className="text-gray-500" />
                  {selectedImage.user?.name || "Unknown"}
                </div>

                {selectedImage.created_at && (
                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-gray-500" />
                    {new Date(selectedImage.created_at).toLocaleDateString()}
                  </div>
                )}

                {selectedImage.likes && (
                  <div className="flex items-center gap-2">
                    <FiHeart className="text-pink-500" />
                    {selectedImage.likes}
                  </div>
                )}

                {(selectedImage.width || selectedImage.height) && (
                  <div className="flex items-center gap-2">
                    <FiImage className="text-gray-500" />
                    {selectedImage.width || "N/A"} x{" "}
                    {selectedImage.height || "N/A"}
                  </div>
                )}

                {selectedImage.links?.html && (
                  <div className="flex items-center gap-2">
                    <FiLink className="text-blue-500" />
                    <a
                      href={selectedImage.links.html}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View on Unsplash
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
