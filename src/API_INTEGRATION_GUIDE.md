# SmartLink API Integration Guide

## Overview
This document outlines all placeholder data and functions that need to be connected to backend APIs. All placeholders are clearly marked in the code with comments.

---

## 🔗 API Endpoints Required

### Authentication APIs

#### `/api/auth/signin`
**Location:** `/pages/SignIn.tsx`
**Method:** POST
**Request Body:**
```json
{
  "email": "string",
  "password": "string",
  "remember": "boolean"
}
```
**Response:**
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "email": "string",
    "name": "string"
  }
}
```

#### `/api/auth/signup`
**Location:** `/pages/SignUp.tsx`
**Method:** POST
**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```
**Response:**
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "email": "string",
    "name": "string"
  }
}
```

#### `/api/auth/oauth/google`
**Location:** `/pages/SignIn.tsx`, `/pages/SignUp.tsx`
**Method:** POST
**Description:** Google OAuth authentication

#### `/api/auth/oauth/github`
**Location:** `/pages/SignIn.tsx`, `/pages/SignUp.tsx`
**Method:** POST
**Description:** GitHub OAuth authentication

---

### Link Management APIs

#### `/api/links/create`
**Location:** `/components/LinkShortenerDemo.tsx`, `/pages/Dashboard.tsx`
**Method:** POST
**Request Body:**
```json
{
  "originalUrl": "string",
  "customSlug": "string (optional)"
}
```
**Response:**
```json
{
  "id": "number",
  "shortUrl": "string",
  "originalUrl": "string",
  "created": "string (date)",
  "qrCode": "boolean"
}
```

#### `/api/links`
**Location:** `/pages/Dashboard.tsx`
**Method:** GET
**Description:** Fetch all links for authenticated user
**Response:**
```json
{
  "links": [
    {
      "id": "number",
      "shortUrl": "string",
      "originalUrl": "string",
      "clicks": "number",
      "created": "string",
      "lastClick": "string",
      "status": "string",
      "qrCode": "boolean"
    }
  ]
}
```

#### `/api/links/:id`
**Location:** `/pages/Dashboard.tsx`
**Method:** PUT
**Description:** Update link details
**Request Body:**
```json
{
  "customSlug": "string (optional)",
  "originalUrl": "string (optional)"
}
```

#### `/api/links/:id`
**Location:** `/pages/Dashboard.tsx`
**Method:** DELETE
**Description:** Delete a link

---

### Analytics APIs

#### `/api/analytics/overview`
**Location:** `/pages/Dashboard.tsx`, `/components/Analytics.tsx`
**Method:** GET
**Response:**
```json
{
  "totalLinks": "number",
  "totalClicks": "number",
  "activeLinks": "number",
  "countries": "number",
  "clicksOverTime": [
    { "date": "string", "clicks": "number" }
  ]
}
```

#### `/api/analytics/devices`
**Location:** `/pages/Dashboard.tsx`
**Method:** GET
**Response:**
```json
{
  "devices": [
    { "name": "string", "value": "number", "color": "string" }
  ]
}
```

#### `/api/analytics/regions`
**Location:** `/pages/Dashboard.tsx`, `/components/Analytics.tsx`
**Method:** GET
**Response:**
```json
{
  "regions": [
    { "country": "string", "clicks": "number", "percentage": "number" }
  ]
}
```

#### `/api/analytics/links/:id`
**Location:** `/pages/Dashboard.tsx`
**Method:** GET
**Description:** Get detailed analytics for specific link

---

### QR Code APIs

#### `/api/qrcode/generate`
**Location:** `/components/QRCodeDemo.tsx`, `/pages/Dashboard.tsx`
**Method:** POST
**Request Body:**
```json
{
  "url": "string",
  "color": "string (hex)",
  "linkId": "number (optional)"
}
```
**Response:**
```json
{
  "qrCodeUrl": "string (image URL)",
  "downloadUrl": "string"
}
```

#### `/api/qrcode/download/:linkId`
**Location:** `/pages/Dashboard.tsx`
**Method:** GET
**Description:** Download high-resolution QR code

---

### Subscription & Pricing APIs

#### `/api/subscribe`
**Location:** `/pages/Pricing.tsx`
**Method:** POST
**Request Body:**
```json
{
  "plan": "string (Starter|Professional|Enterprise)",
  "billing": "string (monthly|yearly)"
}
```
**Response:**
```json
{
  "subscriptionId": "string",
  "status": "string",
  "nextBilling": "string (date)"
}
```

#### `/api/contact-sales`
**Location:** `/pages/Pricing.tsx`
**Method:** POST
**Description:** Enterprise sales inquiry

#### `/api/plans`
**Location:** `/pages/Pricing.tsx`
**Method:** GET
**Description:** Fetch available subscription plans

---

### Contact & Support APIs

#### `/api/contact`
**Location:** `/pages/Contact.tsx`
**Method:** POST
**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "company": "string (optional)",
  "message": "string"
}
```
**Response:**
```json
{
  "success": "boolean",
  "message": "string"
}
```

---

### Stats APIs

#### `/api/stats`
**Location:** `/components/Hero.tsx`
**Method:** GET
**Description:** Fetch homepage statistics
**Response:**
```json
{
  "totalLinks": "string (e.g., '1.2M+')",
  "uptime": "string (e.g., '99.9%')",
  "countries": "number"
}
```

#### `/api/testimonials`
**Location:** `/components/Testimonials.tsx`
**Method:** GET
**Description:** Fetch customer testimonials
**Response:**
```json
{
  "testimonials": [
    {
      "name": "string",
      "role": "string",
      "company": "string",
      "image": "string (URL)",
      "quote": "string"
    }
  ]
}
```

---

## 📂 File-by-File Integration Checklist

### Dashboard (`/pages/Dashboard.tsx`)
- [ ] `handleCreateLink()` - Connect to `/api/links/create`
- [ ] `handleCopyLink()` - Client-side only (no API needed)
- [ ] `handleDownloadQR()` - Connect to `/api/qrcode/download/:linkId`
- [ ] `handleEditLink()` - Connect to `/api/links/:id` (PUT)
- [ ] `handleDeleteLink()` - Connect to `/api/links/:id` (DELETE)
- [ ] `handleShareLink()` - Connect to sharing API or use Web Share API
- [ ] Replace `PLACEHOLDER_STATS` with `/api/analytics/overview`
- [ ] Replace `PLACEHOLDER_LINKS` with `/api/links`
- [ ] Replace `PLACEHOLDER_ANALYTICS_DATA` with `/api/analytics/overview`
- [ ] Replace `PLACEHOLDER_DEVICE_DATA` with `/api/analytics/devices`
- [ ] Replace `PLACEHOLDER_REGION_DATA` with `/api/analytics/regions`

### Sign In (`/pages/SignIn.tsx`)
- [ ] `handleSubmit()` - Connect to `/api/auth/signin`
- [ ] `handleGoogleSignIn()` - Connect to `/api/auth/oauth/google`
- [ ] `handleGithubSignIn()` - Connect to `/api/auth/oauth/github`

### Sign Up (`/pages/SignUp.tsx`)
- [ ] `handleSubmit()` - Connect to `/api/auth/signup`
- [ ] `handleGoogleSignUp()` - Connect to `/api/auth/oauth/google`
- [ ] `handleGithubSignUp()` - Connect to `/api/auth/oauth/github`

### Link Shortener Demo (`/components/LinkShortenerDemo.tsx`)
- [ ] `handleShorten()` - Connect to `/api/links/create`
- [ ] `handleCopy()` - Client-side only (no API needed)

### QR Code Demo (`/components/QRCodeDemo.tsx`)
- [ ] `handleGenerate()` - Connect to `/api/qrcode/generate`
- [ ] `handleDownload()` - Connect to `/api/qrcode/download`

### Pricing (`/pages/Pricing.tsx`)
- [ ] `handleSubscribe()` - Connect to `/api/subscribe`
- [ ] `handleContactSales()` - Connect to `/api/contact-sales`

### Contact (`/pages/Contact.tsx`)
- [ ] `handleSubmit()` - Connect to `/api/contact`

### Analytics Component (`/components/Analytics.tsx`)
- [ ] Replace `lineData` with `/api/analytics/overview`
- [ ] Replace `barData` with `/api/analytics/overview`
- [ ] Replace `regionData` with `/api/analytics/regions`

### Hero Component (`/components/Hero.tsx`)
- [ ] Replace stats data with `/api/stats`

### Testimonials Component (`/components/Testimonials.tsx`)
- [ ] Replace `testimonials` with `/api/testimonials`

---

## 🔐 Authentication Flow

### Implementation Steps:
1. Store JWT token in localStorage/sessionStorage after successful login
2. Add Authorization header to all authenticated API requests:
   ```javascript
   headers: {
     'Authorization': `Bearer ${token}`,
     'Content-Type': 'application/json'
   }
   ```
3. Implement token refresh mechanism
4. Redirect to `/signin` on 401 responses
5. Update `isLoggedIn` state in `/App.tsx` and `/components/Navigation.tsx`

---

## 🎨 UI State Management

### Loading States
Add loading states to all buttons with API calls:
```tsx
const [isLoading, setIsLoading] = useState(false);

// In function:
setIsLoading(true);
try {
  await apiCall();
} finally {
  setIsLoading(false);
}
```

### Error Handling
All API calls should have try-catch blocks:
```tsx
try {
  const response = await fetch('/api/endpoint');
  if (!response.ok) throw new Error('API Error');
  // Handle success
} catch (error) {
  toast.error('An error occurred. Please try again.');
  console.error(error);
}
```

---

## 📊 Data Refresh Strategy

### Real-time Updates
- Dashboard: Refresh analytics every 30 seconds
- Links table: Refresh on create/edit/delete
- Stats: Update when user returns to tab

### Caching
- Cache API responses where appropriate
- Implement stale-while-revalidate pattern
- Use React Query or SWR for data fetching

---

## 🧪 Testing Checklist

- [ ] Test all form submissions
- [ ] Verify error handling for failed API calls
- [ ] Test authentication flow (login, logout, protected routes)
- [ ] Verify data updates after CRUD operations
- [ ] Test responsive design on mobile devices
- [ ] Verify all animations work smoothly
- [ ] Test loading states for all async operations
- [ ] Validate form inputs before submission
- [ ] Test OAuth flows
- [ ] Verify QR code generation and download

---

## 🚀 Deployment Notes

1. Replace all `console.log()` statements with proper logging
2. Set up environment variables for API endpoints
3. Configure CORS for production domain
4. Enable API rate limiting
5. Set up error tracking (Sentry, etc.)
6. Configure CDN for static assets
7. Enable HTTPS for all endpoints
8. Set up monitoring and analytics

---

## 📝 Code Annotations

All placeholder code is marked with:
- `// PLACEHOLDER FUNCTION - Connect to [description]`
- `// TODO: API call to [endpoint]`
- `PLACEHOLDER_[DATA_NAME]` for data constants

Search for these patterns in the codebase to find all integration points.

---

## Support

For questions about this integration guide, please contact the development team.
