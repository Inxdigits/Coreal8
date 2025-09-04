# Environment Variables Setup

This project requires several environment variables to be configured for proper functionality.

## Required Environment Variables

Create a `.env` file in the root directory with the following variables:

### EmailJS Configuration
```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_USER_ID=your_user_id_here
```

### Firebase Configuration
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_firebase_app_id_here
VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id_here
```

### Google OAuth Configuration
```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

## How to Get These Values

### EmailJS
1. Go to [EmailJS](https://www.emailjs.com/)
2. Create an account and verify your email
3. Create a new service (Gmail, Outlook, etc.)
4. Create an email template
5. Get your User ID from the integration page

### Firebase
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing
3. Go to Project Settings > General
4. Scroll down to "Your apps" section
5. Add a web app or select existing
6. Copy the configuration values

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials > Create Credentials > OAuth 2.0 Client ID
5. Set application type to "Web application"
6. Add your domain to authorized origins
7. Copy the Client ID

## Security Notes

- Never commit the `.env` file to version control
- The `.env` file is already in `.gitignore`
- For production, set these variables in your hosting platform's environment settings
- The current configuration includes fallback values for development, but you should replace them with your own values

## Current Fallback Values

The application currently uses these fallback values if environment variables are not set:
- Firebase: Uses the existing Coreal8 project configuration
- Google OAuth: Uses the existing client ID
- EmailJS: Will show errors if not configured

## Troubleshooting

If you encounter issues:
1. Make sure all environment variables are set correctly
2. Restart the development server after adding environment variables
3. Check the browser console for any error messages
4. Verify that all services (Firebase, EmailJS, Google OAuth) are properly configured
