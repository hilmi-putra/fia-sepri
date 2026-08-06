export function GiftSection() {
  return (
    <section id="gift" className="section section-alt">
      <div className="container">
        <h2 className="section-title">Wedding Gift</h2>
        <p className="section-subtitle">
          Doa restu Anda merupakan karunia yang sangat berarti bagi kami.
          Namun jika Anda ingin memberikan tanda kasih, kami menyediakan amplop digital.
        </p>

        <div className="gift-grid">
          <div className="gift-card">
            <div className="gift-icon">🏦</div>
            <h3 className="gift-bank">Bank BCA</h3>
            <p className="gift-account">1234567890</p>
            <p className="gift-holder">a.n. Sepri</p>
          </div>

          <div className="gift-card">
            <div className="gift-icon">🏦</div>
            <h3 className="gift-bank">Bank BNI</h3>
            <p className="gift-account">0987654321</p>
            <p className="gift-holder">a.n. Fia</p>
          </div>
        </div>
      </div>
    </section>
  );
}
