import type { Couple } from '@/types';

interface StorySectionProps {
  couple: Couple | null;
}

export function StorySection({ couple }: StorySectionProps) {
  return (
    <section id="story" className="section">
      <div className="container">
        <h2 className="section-title">Our Story</h2>
        <div className="story-grid">
          <div className="story-card">
            <div className="story-avatar">🤵</div>
            <h3 className="story-name">{couple?.groom_name ?? 'Sepri'}</h3>
            <p className="story-description">
              {couple?.groom_description ?? 'Putra dari Bapak ... & Ibu ...'}
            </p>
          </div>
          <div className="story-divider">
            <span className="story-heart">♥</span>
          </div>
          <div className="story-card">
            <div className="story-avatar">👰</div>
            <h3 className="story-name">{couple?.bride_name ?? 'Fia'}</h3>
            <p className="story-description">
              {couple?.bride_description ?? 'Putri dari Bapak ... & Ibu ...'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
