import React, { useState } from 'react';

const PaymentSection = ({
  savedCards,
  billingHistory,
  currentPage,
  totalPages,
  currentBillingHistory,
  onAddPaymentMethod,
  onRemoveCard,
  onSetDefaultCard,
  onDownloadInvoice,
  onPageChange,
  onExportBillingHistory,
  totalSpent
}) => {
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    isDefault: false
  });

  const handleAddCard = () => {
    if (!newCard.cardNumber || !newCard.expiryDate || !newCard.cvv || !newCard.cardholderName) {
      alert('Please fill in all card details');
      return;
    }

    // Add new card logic here
    const cardData = {
      id: Date.now(),
      type: 'Visa', // This would be determined by card number
      lastFour: newCard.cardNumber.slice(-4),
      expiry: newCard.expiryDate,
      isDefault: newCard.isDefault || savedCards.length === 0,
      cardholderName: newCard.cardholderName
    };

    onAddPaymentMethod(cardData);
    setNewCard({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
      isDefault: false
    });
    setShowAddCardModal(false);
  };

  const handleRemoveCard = (cardId) => {
    if (window.confirm('Are you sure you want to remove this payment method?')) {
      onRemoveCard(cardId);
    }
  };

  const getCardType = (cardNumber) => {
    if (cardNumber.startsWith('4')) return 'Visa';
    if (cardNumber.startsWith('5')) return 'Mastercard';
    if (cardNumber.startsWith('3')) return 'American Express';
    return 'Card';
  };

  const formatCardNumber = (cardNumber) => {
    return cardNumber.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  return (
    <div className="payment-section">
      <h2 className="section-title">Payment & Billing</h2>
      
      {/* Saved Cards Section */}
      <div className="payment-subsection">
        <h3 className="subsection-title">Saved Cards</h3>
        
        {savedCards.length === 0 ? (
          <div className="empty-cards-state">
            <div className="empty-cards-icon">
              <svg width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="6" width="44" height="26" rx="4" stroke="#9CA3AF" strokeWidth="2" fill="none"/>
                <rect x="6" y="10" width="36" height="18" rx="2" fill="#F3F4F6"/>
                <rect x="8" y="12" width="8" height="6" rx="1" fill="#9CA3AF"/>
                <rect x="18" y="12" width="12" height="6" rx="1" fill="#9CA3AF"/>
                <rect x="32" y="12" width="8" height="6" rx="1" fill="#9CA3AF"/>
                <rect x="8" y="20" width="16" height="4" rx="1" fill="#9CA3AF"/>
                <rect x="26" y="20" width="14" height="4" rx="1" fill="#9CA3AF"/>
              </svg>
            </div>
            <h4 className="empty-cards-title">No saved cards yet</h4>
            <p className="empty-cards-description">
              Add a payment method to easily enroll in paid services like courses, mentorship, or podcast subscriptions.
            </p>
            <button className="add-payment-btn" onClick={() => setShowAddCardModal(true)}>
              Add Payment Method
            </button>
          </div>
        ) : (
          <div className="saved-cards-list">
            {savedCards.map((card) => (
              <div key={card.id} className="saved-card">
                <div className="card-info">
                  <div className="card-type">
                    {card.type === 'Visa' && (
                      <div className="visa-logo">VISA</div>
                    )}
                    {card.type === 'Mastercard' && (
                      <div className="mastercard-logo">Mastercard</div>
                    )}
                    {card.type === 'American Express' && (
                      <div className="amex-logo">AMEX</div>
                    )}
                  </div>
                  <div className="card-details">
                    <div className="card-number">
                      {card.type} ending in **** {card.lastFour}
                      {card.isDefault && <span className="default-badge">Default</span>}
                    </div>
                    <div className="card-expiry">Expiry {card.expiry}</div>
                  </div>
                </div>
                <div className="card-actions">
                  {!card.isDefault && (
                    <button 
                      className="set-default-btn"
                      onClick={() => onSetDefaultCard(card.id)}
                    >
                      Set Default
                    </button>
                  )}
                  <button 
                    className="remove-card-btn"
                    onClick={() => handleRemoveCard(card.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button className="add-new-card-btn" onClick={() => setShowAddCardModal(true)}>
              Add New Card
            </button>
          </div>
        )}
      </div>

      {/* Billing History Section */}
      <div className="payment-subsection">
        <div className="billing-header">
          <h3 className="subsection-title">Billing History</h3>
          {billingHistory.length > 0 && (
            <div className="billing-actions">
              <div className="billing-summary">
                <span className="total-spent-label">Total Spent:</span>
                <span className="total-spent-amount">
                  {totalSpent ? `₦${totalSpent.toLocaleString()}` : '₦0'}
                </span>
              </div>
              <button 
                className="export-billing-btn"
                onClick={onExportBillingHistory}
              >
                Export CSV
              </button>
            </div>
          )}
        </div>
        
        {billingHistory.length === 0 ? (
          <div className="empty-billing-state">
            <div className="empty-billing-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="8" width="40" height="32" rx="4" stroke="#9CA3AF" strokeWidth="2" fill="none"/>
                <path d="M12 20h24M12 24h16M12 28h20" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="32" cy="16" r="4" fill="#9CA3AF"/>
              </svg>
            </div>
            <h4 className="empty-billing-title">No billing history yet</h4>
            <p className="empty-billing-text">
              Your course purchases and billing history will appear here once you enroll in paid courses.
            </p>
          </div>
        ) : (
          <div className="billing-history">
            <div className="billing-table">
              <div className="table-header">
                <div className="table-cell">Date</div>
                <div className="table-cell">Item</div>
                <div className="table-cell">Amount</div>
                <div className="table-cell">Status</div>
                <div className="table-cell">Invoice</div>
              </div>
              <div className="table-body">
                {currentBillingHistory.map((item, index) => (
                  <div key={index} className="table-row">
                    <div className="table-cell">{item.date}</div>
                    <div className="table-cell">{item.item}</div>
                    <div className="table-cell">{item.amount}</div>
                    <div className="table-cell">
                      <span className={`status-badge ${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="table-cell">
                      <button 
                        className="download-invoice-btn"
                        onClick={() => onDownloadInvoice(item.invoiceId)}
                      >
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  className="pagination-btn"
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ←
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                    onClick={() => onPageChange(page)}
                  >
                    {page}
                  </button>
                ))}
                <button 
                  className="pagination-btn"
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  →
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Card Modal */}
      {showAddCardModal && (
        <div className="modal-overlay">
          <div className="ps-modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Add New Payment Method</h3>
            </div>
            <div className="modal-body">
              <div className="card-form">
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    value={newCard.cardNumber}
                    onChange={(e) => setNewCard(prev => ({ ...prev, cardNumber: e.target.value.replace(/\D/g, '').slice(0, 16) }))}
                    placeholder="1234 5678 9012 3456"
                    className="form-input"
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input
                      type="text"
                      id="expiryDate"
                      value={newCard.expiryDate}
                      onChange={(e) => setNewCard(prev => ({ ...prev, expiryDate: e.target.value.replace(/\D/g, '').slice(0, 4).replace(/(.{2})/, '$1/') }))}
                      placeholder="MM/YY"
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      value={newCard.cvv}
                      onChange={(e) => setNewCard(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                      placeholder="123"
                      className="form-input"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="cardholderName">Cardholder Name</label>
                  <input
                    type="text"
                    id="cardholderName"
                    value={newCard.cardholderName}
                    onChange={(e) => setNewCard(prev => ({ ...prev, cardholderName: e.target.value }))}
                    placeholder="John Doe"
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={newCard.isDefault}
                      onChange={(e) => setNewCard(prev => ({ ...prev, isDefault: e.target.checked }))}
                    />
                    <span className="checkmark"></span>
                    Set as default payment method
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button 
                className="cancel-btn" 
                onClick={() => setShowAddCardModal(false)}
              >
                Cancel
              </button>
              <button 
                className="add-card-btn" 
                onClick={handleAddCard}
              >
                Add Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSection;