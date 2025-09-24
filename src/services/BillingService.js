// Service for managing billing history from purchased courses
class BillingService {
  constructor() {
    this.storageKey = 'billingHistory';
  }

  // Get billing history from localStorage
  getBillingHistory() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading billing history:', error);
      return [];
    }
  }

  // Save billing history to localStorage
  saveBillingHistory(billingHistory) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(billingHistory));
    } catch (error) {
      console.error('Error saving billing history:', error);
    }
  }

  // Add a new billing entry when a course is purchased
  addBillingEntry(course, paymentData) {
    const billingHistory = this.getBillingHistory();
    
    const newEntry = {
      id: Date.now().toString(), // Simple ID generation
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      item: course.title,
      amount: course.price,
      status: 'Paid',
      invoiceId: paymentData.reference || `INV-${Date.now()}`,
      courseId: course.id,
      purchaseDate: new Date().toISOString(),
      paymentMethod: paymentData.paymentMethod || 'Card',
      currency: this.extractCurrency(course.price)
    };

    const updatedHistory = [newEntry, ...billingHistory];
    this.saveBillingHistory(updatedHistory);
    
    return newEntry;
  }

  // Add multiple billing entries for multiple courses
  addMultipleBillingEntries(courses, paymentData) {
    const billingHistory = this.getBillingHistory();
    const newEntries = [];

    courses.forEach(course => {
      const newEntry = {
        id: `${Date.now()}-${course.id}`, // Unique ID for each course
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        item: course.title,
        amount: course.price,
        status: 'Paid',
        invoiceId: paymentData.reference || `INV-${Date.now()}`,
        courseId: course.id,
        purchaseDate: new Date().toISOString(),
        paymentMethod: paymentData.paymentMethod || 'Card',
        currency: this.extractCurrency(course.price)
      };
      newEntries.push(newEntry);
    });

    const updatedHistory = [...newEntries, ...billingHistory];
    this.saveBillingHistory(updatedHistory);
    
    return newEntries;
  }

  // Extract currency from price string (e.g., "N30,000" -> "N")
  extractCurrency(priceString) {
    const match = priceString.match(/^[^\d]+/);
    return match ? match[0] : '₦';
  }

  // Get billing history for a specific course
  getBillingHistoryForCourse(courseId) {
    const billingHistory = this.getBillingHistory();
    return billingHistory.filter(entry => entry.courseId === courseId);
  }

  // Get total amount spent
  getTotalSpent() {
    const billingHistory = this.getBillingHistory();
    return billingHistory.reduce((total, entry) => {
      const amount = parseFloat(entry.amount.replace(/[^\d.]/g, ''));
      return total + (isNaN(amount) ? 0 : amount);
    }, 0);
  }

  // Get billing history with pagination
  getBillingHistoryPaginated(page = 1, itemsPerPage = 5) {
    const billingHistory = this.getBillingHistory();
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    return {
      data: billingHistory.slice(startIndex, endIndex),
      totalPages: Math.ceil(billingHistory.length / itemsPerPage),
      currentPage: page,
      totalItems: billingHistory.length
    };
  }

  // Clear all billing history (for testing purposes)
  clearBillingHistory() {
    localStorage.removeItem(this.storageKey);
  }

  // Export billing history as CSV
  exportBillingHistory() {
    const billingHistory = this.getBillingHistory();
    const csvContent = [
      ['Date', 'Item', 'Amount', 'Status', 'Invoice ID', 'Payment Method'],
      ...billingHistory.map(entry => [
        entry.date,
        entry.item,
        entry.amount,
        entry.status,
        entry.invoiceId,
        entry.paymentMethod
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `billing-history-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}

const billingService = new BillingService();
export default billingService;
