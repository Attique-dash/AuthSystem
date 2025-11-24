# AuthN - Authentication Backend

A secure authentication system built with Node.js, Express, and MongoDB. This service provides user registration, login, password reset, and email verification functionality.

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  - Request body: `{ "username": "user@example.com", "password": "securePassword123" }`
  - Response: `{ "message": "User registered successfully", "userId": "..." }`

- `POST /api/auth/login` - Login user
  - Request body: `{ "username": "user@example.com", "password": "securePassword123" }`
  - Response: `{ "token": "jwt.token.here", "userId": "..." }`

### Password Management

- `POST /api/password/forgot` - Request password reset
  - Request body: `{ "email": "user@example.com" }`
  - Response: `{ "message": "Password reset OTP sent to email" }`

- `POST /api/password/verify-otp` - Verify OTP for password reset
  - Request body: `{ "email": "user@example.com", "otp": "123456" }`
  - Response: `{ "message": "OTP verified successfully" }`

- `POST /api/password/reset` - Reset password
  - Request body: `{ "email": "user@example.com", "otp": "123456", "newPassword": "newSecurePassword123" }`
  - Response: `{ "message": "Password reset successful" }`

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
FRONTEND_URL=your_frontend_url
```

## Deployment

This project is configured to be deployed on Vercel. The API will be available at `https://your-project.vercel.app`

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. The server will be available at `http://localhost:5000`
