import type { Gallery } from '@/types';

interface GallerySectionProps {
  galleries: Gallery[];
}

export function GallerySection({ galleries }: GallerySectionProps) {
  return (
    <section id="gallery" className="section">
      <div className="container">
        <h2 className="section-title">Our Gallery</h2>
        {galleries.length === 0 ? (
          <p className="text-center text-muted">No photos yet.</p>
        ) : (
          <div className="gallery-grid">
            {galleries.map((item) => (
              <div key={item.id} className="gallery-item">
                <img
                  src={item.image_url}
                  alt={item.caption ?? 'Wedding photo'}
                  className="gallery-image"
                  loading="lazy"
                />
                {item.caption && (
                  <p className="gallery-caption">{item.caption}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
