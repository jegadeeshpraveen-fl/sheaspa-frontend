import React from 'react';

const CartModal = ({ isOpen, onClose, cartItems = [] }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      >
        {/* Cart Panel */}
        <div
          className="cart-container"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Shopping cart"
        >
          <div className="cart-header">
            <h4 style={{ fontFamily: 'Lora, serif', fontSize: '1.25rem' }}>Your Cart</h4>
            <button
              onClick={onClose}
              style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer' }}
              aria-label="Close cart"
            >
              ✕
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <div className="display-3 mid" style={{ marginBottom: '1rem' }}>No items found.</div>
              <a href="#shop" className="primary-button" onClick={onClose}>Go to shop</a>
            </div>
          ) : (
            <>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {cartItems.map((item) => (
                  <div key={item.id} style={{ display: 'flex', gap: '1rem', padding: '1rem 0', borderBottom: '1px solid #e5e0d8' }}>
                    <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontWeight: 600 }}>{item.name}</div>
                      <div style={{ color: '#8b6f47' }}>${item.price}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ paddingTop: '1rem' }}>
                <a href="#checkout" className="primary-button" style={{ width: '100%', textAlign: 'center' }}>
                  Continue to Checkout
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartModal;
