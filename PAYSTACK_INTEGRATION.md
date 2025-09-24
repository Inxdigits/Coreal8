# Paystack Integration Setup

This project now includes Paystack payment integration for course purchases. Here's how to set it up:

## 1. Get Paystack API Keys

1. Sign up at [Paystack Dashboard](https://dashboard.paystack.com/)
2. Go to Settings > Developers
3. Copy your Public Key (starts with `pk_test_` for test mode)

## 2. Environment Configuration

Create a `.env` file in the root directory and add:

```env
VITE_PAYSTACK_PUBLIC_KEY=pk_test_your_public_key_here
```

For production, use your live public key:
```env
VITE_PAYSTACK_PUBLIC_KEY=pk_live_your_live_public_key_here
```

**Note:** In Vite, environment variables must be prefixed with `VITE_` to be accessible in the browser.

## 3. Features Implemented

### Payment Processing
- ✅ Paystack SDK integration
- ✅ Payment form validation
- ✅ Multiple course selection and payment
- ✅ Payment success/failure handling
- ✅ Course enrollment after successful payment

### User Experience
- ✅ Loading states during payment processing
- ✅ Success modal with enrolled courses
- ✅ Error handling with user-friendly messages
- ✅ Responsive design for all devices

### Course Management
- ✅ Multiple course enrollment in one transaction
- ✅ Duplicate course prevention
- ✅ Course data persistence in localStorage
- ✅ Integration with existing course context

## 4. How It Works

1. User selects courses and fills in payment details
2. Clicks "Proceed to Payment" button
3. Paystack payment modal opens
4. User completes payment
5. On success, courses are automatically enrolled
6. User is redirected to dashboard with success confirmation

## 5. Testing

For testing, use Paystack's test card numbers:
- **Successful payment**: 4084084084084081
- **Declined payment**: 4084084084084085
- **Insufficient funds**: 4084084084084086

## 6. Security Notes

- Public keys are safe to use in frontend code
- Never expose your secret keys in frontend code
- All sensitive operations should be handled on your backend
- Consider implementing webhook verification for production

## 7. Customization

You can customize the payment experience by modifying:
- `src/services/PaystackService.js` - Payment configuration
- `src/context/PaymentContext.jsx` - Payment state management
- `src/Components/Courses/CheckoutPage/CheckoutPage.jsx` - UI components
