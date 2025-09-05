import React from 'react';

const PaymentSection = ({ 
  savedCards, 
  billingHistory, 
  currentPage, 
  totalPages, 
  currentBillingHistory, 
  onRemoveCard, 
  onAddNewCard, 
  onAddPaymentMethod, 
  onDownloadInvoice, 
  onPageChange 
}) => {
  return (
    <div className="payment-section">
      <h2 className="section-title">Payment & Billing</h2>
      
      {/* Saved Cards Section */}
      <div className="saved-cards-section">
        <h3 className="subsection-title">Saved Cards</h3>
        {savedCards.length > 0 ? (
          <div className="cards-list">
            {savedCards.map((card) => (
              <div key={card.id} className="saved-card">
                <div className="card-info">
                  <div className="card-details">
                    <div className="card-type">{card.type} ending in **** {card.lastFour}</div>
                    <div className="card-expiry">Expiry {card.expiry}</div>
                    {card.isDefault && <div className="default-badge">Default</div>}
                  </div>
                  <button 
                    className="remove-card-btn"
                    onClick={() => onRemoveCard(card.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button 
              className="add-new-card-btn"
              onClick={onAddNewCard}
            >
              Add New Card
            </button>
          </div>
        ) : (
          <div className="empty-cards-state">
            <div className="empty-state-icon">💳</div>
            <h4 className="empty-state-title">No saved cards yet</h4>
            <p className="empty-state-description">
              Add a payment method to easily enroll in paid services like courses, mentorship, or podcast subscriptions.
            </p>
            <button 
              className="add-payment-btn"
              onClick={onAddPaymentMethod}
            >
              Add Payment Method
            </button>
          </div>
        )}
      </div>

      {/* Billing History Section */}
      <div className="billing-history-section">
        <h3 className="subsection-title">Billing History</h3>
        <div className="billing-table-container">
          <div className="billing-table">
            <div className="table-header">
              <div className="table-cell">Date</div>
              <div className="table-cell">Item</div>
              <div className="table-cell">Amount</div>
              <div className="table-cell">Status</div>
              <div className="table-cell">Invoice</div>
            </div>
            <div className="table-body">
              {currentBillingHistory.map((item) => (
                <div key={item.id} className="table-row">
                  <div className="table-cell">{item.date}</div>
                  <div className="table-cell">{item.item}</div>
                  <div className="table-cell">{item.amount}</div>
                  <div className="table-cell">
                    <span className="status-paid">{item.status}</span>
                  </div>
                  <div className="table-cell">
                    <button 
                      className="download-btn"
                      onClick={() => onDownloadInvoice(item.id)}
                    >
                      {item.invoice}
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
      </div>
    </div>
  );
};

export default PaymentSection;
