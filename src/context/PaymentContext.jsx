import React, { createContext, useContext, useState } from 'react';
import paystackService from '../services/PaystackService';
import billingService from '../services/BillingService';

const PaymentContext = createContext();

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};

export const PaymentProvider = ({ children }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const processPayment = async (courses, userData) => {
    try {
      setIsProcessing(true);
      setError(null);
      setSuccess(null);

      // Format payment data
      const paymentData = paystackService.formatPaymentData(courses, userData);

      // Initialize payment with Paystack
      const result = await paystackService.initializePayment(paymentData);

      if (result.success) {
        // Store billing history for each course
        const paymentData = {
          reference: result.reference,
          paymentMethod: 'Card', // Default payment method
          purchaseDate: new Date().toISOString()
        };

        // Add billing entries for all courses
        billingService.addMultipleBillingEntries(courses, paymentData);

        setSuccess({
          reference: result.reference,
          message: 'Payment successful! You have been enrolled in the selected courses.',
          courses: courses
        });
        return result;
      } else {
        throw new Error(result.message || 'Payment failed');
      }
    } catch (error) {
      const errorMessage = error.message || 'Payment processing failed. Please try again.';
      setError(errorMessage);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  const resetPayment = () => {
    setError(null);
    setSuccess(null);
    setIsProcessing(false);
  };

  const formatPaymentData = (courses, userData) => {
    return paystackService.formatPaymentData(courses, userData);
  };

  const getBillingHistory = () => {
    return billingService.getBillingHistory();
  };

  const getBillingHistoryPaginated = (page = 1, itemsPerPage = 5) => {
    return billingService.getBillingHistoryPaginated(page, itemsPerPage);
  };

  const getTotalSpent = () => {
    return billingService.getTotalSpent();
  };

  const exportBillingHistory = () => {
    return billingService.exportBillingHistory();
  };

  const value = {
    isProcessing,
    error,
    success,
    processPayment,
    resetPayment,
    formatPaymentData,
    getBillingHistory,
    getBillingHistoryPaginated,
    getTotalSpent,
    exportBillingHistory
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
};
