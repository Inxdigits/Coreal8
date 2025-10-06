// PaystackService.js
// Service for handling Paystack payment integration

class PaystackService {
  constructor() {
    this.publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_your_public_key_here';
    this.scriptLoaded = false;
  }

  // Load Paystack script dynamically
  loadScript() {
    return new Promise((resolve, reject) => {
      if (this.scriptLoaded) {
        resolve();
        return;
      }

      if (window.PaystackPop) {
        this.scriptLoaded = true;
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      script.onload = () => {
        this.scriptLoaded = true;
        resolve();
      };
      script.onerror = () => {
        reject(new Error('Failed to load Paystack script'));
      };
      document.head.appendChild(script);
    });
  }

  // Initialize payment with Paystack
  async initializePayment(paymentData) {
    try {
      await this.loadScript();

      if (!window.PaystackPop) {
        throw new Error('Paystack script not loaded');
      }

      return new Promise((resolve, reject) => {
        const handler = window.PaystackPop.setup({
          key: this.publicKey,
          email: paymentData.email,
          amount: paymentData.amount * 100, // Convert to kobo (smallest currency unit)
          currency: 'NGN',
          ref: paymentData.reference,
          metadata: {
            custom_fields: [
              {
                display_name: "Full Name",
                variable_name: "full_name",
                value: paymentData.fullName
              },
              {
                display_name: "Phone",
                variable_name: "phone",
                value: paymentData.phone
              },
              {
                display_name: "Country",
                variable_name: "country",
                value: paymentData.country
              },
              {
                display_name: "Courses",
                variable_name: "courses",
                value: paymentData.courses.map(course => course.title).join(', ')
              }
            ]
          },
          callback: (response) => {
            // Payment successful
            resolve({
              success: true,
              reference: response.reference,
              transaction: response
            });
          },
          onClose: () => {
            // Payment cancelled or failed
            reject({
              success: false,
              message: 'Payment cancelled by user'
            });
          }
        });

        handler.openIframe();
      });
    } catch (error) {
      throw new Error(`Payment initialization failed: ${error.message}`);
    }
  }

  // Generate a unique reference for the payment
  generateReference() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return `coreal8_${timestamp}_${random}`;
  }

  // Format payment data for Paystack
  formatPaymentData(courses, userData) {
    const totalAmount = courses.reduce((total, course) => {
      const price = parseFloat(course.price.replace(/[N,]/g, ''));
      return total + price;
    }, 0);

    return {
      email: userData.email,
      fullName: userData.fullName,
      phone: userData.phone,
      country: userData.country,
      amount: totalAmount,
      reference: this.generateReference(),
      courses: courses
    };
  }
}

// Create and export a singleton instance
const paystackService = new PaystackService();
export default paystackService;
