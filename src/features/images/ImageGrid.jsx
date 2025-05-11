import { useState, useEffect } from "react";
import StatusMessage from "../../components/StatusMessage";
import { FiMaximize2, FiMinimize2 } from "react-icons/fi";

export default function ImageGrid({ images, loading, error }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Xử lý phím Esc để đóng modal
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
            className="overflow-hidden rounded-lg shadow-lg cursor-pointer"
            onClick={() => {
              setSelectedImage(img);
              setIsFullscreen(false); // Reset chế độ toàn màn hình khi chọn ảnh mới
            }}
          >
            <img
              src={img.urls.small}
              alt={img.alt_description || "Image"}
              className="w-full h-60 object-cover"
              loading="lazy" // Tải ảnh lười để tối ưu
              onError={(e) => console.error("Error loading image:", e)} // Log lỗi nếu ảnh không tải được
            />
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
                  src={selectedImage.urls.regular} // Sử dụng regular thay vì full để giảm tải
                  alt={selectedImage.alt_description || "Image"}
                  className={`w-full object-contain rounded-lg select-none ${
                    isFullscreen ? "h-[85vh]" : "h-[200px] sm:h-[300px]"
                  }`}
                  style={{ userSelect: "none", touchAction: "pan-y" }}
                  onError={(e) => console.error("Error loading full image:", e)} // Log lỗi nếu ảnh không tải được
                />
              </div>

              <div className="flex-1 space-y-2">
                <h2 className="text-base sm:text-lg font-bold text-gray-800">
                  {selectedImage.description ||
                    selectedImage.alt_description ||
                    "No description"}
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm">
                  <span className="font-semibold">By:</span>{" "}
                  {selectedImage.user?.name || "Unknown"}
                </p>
                {selectedImage.created_at && (
                  <p className="text-gray-600 text-xs sm:text-sm">
                    <span className="font-semibold">Created:</span>{" "}
                    {new Date(selectedImage.created_at).toLocaleDateString()}
                  </p>
                )}
                {selectedImage.likes && (
                  <p className="text-gray-600 text-xs sm:text-sm">
                    <span className="font-semibold">Likes:</span>{" "}
                    {selectedImage.likes}
                  </p>
                )}
                {(selectedImage.width || selectedImage.height) && (
                  <p className="text-gray-600 text-xs sm:text-sm">
                    <span className="font-semibold">Dimensions:</span>{" "}
                    {selectedImage.width || "N/A"} x{" "}
                    {selectedImage.height || "N/A"}
                  </p>
                )}

                {selectedImage.links?.html && (
                  <p className="text-gray-600 text-xs sm:text-sm">
                    <span className="font-semibold">Source:</span>{" "}
                    <a
                      href={selectedImage.links.html}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View on Unsplash
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
