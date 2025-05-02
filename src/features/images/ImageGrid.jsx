import StatusMessage from "../../components/StatusMessage";

export default function ImageGrid({ images, loading, error }) {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {images.map((img) => (
        <div key={img.id} className="overflow-hidden rounded-lg shadow-lg">
          <img
            src={img.urls.small}
            alt={img.alt_description}
            className="w-full h-60 object-cover"
          />
        </div>
      ))}
    </div>
  );
}
