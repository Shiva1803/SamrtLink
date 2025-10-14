# SmartLink - Complete Navigation Guide

## 🗺️ Site Map & Page Access

This guide shows how to navigate to every page in the SmartLink website.

---

## 📍 Main Navigation Menu

**Access via:** Top navbar (visible on all public pages)

| Page | Route | Click Target |
|------|-------|-------------|
| Home | `home` | "Home" or SmartLink logo |
| Features | `features` | "Features" |
| Pricing | `pricing` | "Pricing" |
| About | `about` | "About" |
| Contact | `contact` | "Contact" |

---

## 🔐 Authentication Pages

**Access via:** Top navbar CTA buttons (when not logged in)

| Page | Route | Click Target |
|------|-------|-------------|
| Sign In | `signin` | "Sign In" button (navbar) |
| Sign Up | `signup` | "Get Started" button (navbar) |

**Features:**
- Sign In: Email/password + Google/GitHub OAuth
- Sign Up: Full registration + social auth

**Navigation Notes:**
- Footer hidden on auth pages
- Minimal design for focus
- Links to switch between Sign In/Sign Up

---

## 👤 User Dashboard Area

**Access via:** "Dashboard" button (when logged in)

**Entry Point:** `/dashboard`

### Dashboard Navigation (Sidebar)

| Page | Route | Sidebar Link | Description |
|------|-------|-------------|-------------|
| Dashboard | `dashboard` | "Dashboard" | Main overview with stats |
| Links | `dashboard` | "Links" | Link management table |
| Analytics | `dashboard` | "Analytics" | Charts and metrics |
| Settings | `settings` | "Settings" | Account settings |

**Quick Access:**
- From navbar: Click "Dashboard" button (replaces "Get Started" when logged in)
- From any page: Top navbar shows "Dashboard" for authenticated users

---

## ⚙️ Settings Page (Tabbed Interface)

**Access via:** Dashboard sidebar → "Settings"

**Route:** `settings`

### Settings Tabs

| Tab | Access | Contains |
|-----|--------|----------|
| Profile | Click "Profile" tab | Avatar, name, email, bio, company, website |
| Branding | Click "Branding" tab | Custom domain, brand color, logo upload |
| Security | Click "Security" tab | Password, 2FA, notifications, delete account |
| Plan | Click "Plan" tab | Subscription info, upgrade/cancel |

**Navigation Flow:**
```
Dashboard → Settings → [Select Tab]
```

---

## 🌐 Public Profile Page

**Access via:** Public URL (shareable link)

**Route:** `profile`

**Purpose:** Public-facing link page for individual users

**Sections:**
1. **Header** - Profile info, avatar, bio, social links
2. **AI Chatbot** - Interactive assistant
3. **Featured Links** - User's curated link collection

**Use Case:**
- Users share this page: `smartlink.io/@username` or custom domain
- Visitors can chat with AI and access featured links

**Navigation Notes:**
- No navbar/footer (standalone page)
- Clean, minimal design for sharing
- Mobile-optimized for link-in-bio use

---

## 📄 Footer Navigation

**Access via:** Footer (visible on public pages only)

**Footer Hidden On:**
- signin
- signup  
- dashboard
- settings
- profile

### Footer Sections

#### Product Links
- Features → `features`
- Pricing → `pricing`
- Analytics → `features` (scrolls to analytics)
- QR Codes → `features`

#### Company Links
- About Us → `about`
- Contact → `contact`
- Blog → External link
- Careers → External link

#### Resources
- Help Center → External link
- API Docs → External link
- Developers → External link
- Status → External link

#### Legal
- Privacy → External link
- Terms → External link
- Security → External link

#### Newsletter Signup
- Email input + Subscribe button
- Toast notification on submit

---

## 🎯 Page Flow Diagrams

### Public User Journey
```
Landing (Home)
    ↓
Features / Pricing / About / Contact
    ↓
Sign Up
    ↓
Dashboard
```

### Authenticated User Journey
```
Dashboard (Overview)
    ├── Links Tab
    ├── Analytics Tab
    └── Settings
         ├── Profile
         ├── Branding
         ├── Security
         └── Plan
```

### Public Profile Visitor Journey
```
Direct URL (e.g., smartlink.io/@username)
    ↓
Public Profile Page
    ├── Chat with AI
    ├── View Social Links
    └── Click Featured Links (tracked)
```

---

## 🔄 Cross-Page Navigation Patterns

### From Home Page:
- **Hero CTA** → "Get Started Free" → `signup`
- **Features Section** → "Explore All Features" → `features`
- **Pricing Section** → "View Plans" → `pricing`
- **Footer CTA** → "Start Free Trial" → `signup`

### From Features Page:
- **Feature Cards** → "Learn More" → (placeholder - could link to docs)
- **Demo Section** → "Try it yourself" → Interactive demos on page
- **End of Page CTA** → `signup`

### From Pricing Page:
- **Plan Cards** → "Start Free Trial" → `signup`
- **Plan Cards** → "Contact Sales" → Toast (placeholder)
- **Enterprise Card** → "Contact Sales" → `contact`

### From Dashboard:
- **Sidebar** → "Settings" → `settings`
- **Sidebar** → "Logout" → Returns to `home` (placeholder)
- **Top Right** → "Download Report" → Downloads report (placeholder)

### From Settings:
- **Sidebar** → "Dashboard" → `dashboard`
- **Sidebar** → "Logout" → Returns to `home` (placeholder)

---

## 📱 Mobile Navigation

### Hamburger Menu (< 768px)

**Trigger:** Menu icon (top right)

**Opens:** Mobile slide-out menu

**Contains:**
- All main navigation links (Home, Features, Pricing, About, Contact)
- Sign In / Sign Up buttons (if not logged in)
- Dashboard button (if logged in)

**Behavior:**
- Clicking any link closes menu
- Smooth scroll to top on navigation
- Backdrop overlay

### Dashboard Mobile (< 1024px)
- Sidebar hidden by default
- Can add hamburger to reveal sidebar (currently hidden on mobile)
- Content full-width
- Stats grid: 2 columns
- Charts: Single column
- Table: Horizontal scroll

---

## 🎨 Visual Navigation Indicators

### Active States:
1. **Navbar Links** - Underline bar appears below active link
2. **Sidebar Links** - Black background for active item
3. **Settings Tabs** - White background for active tab

### Hover States:
1. **Navbar Links** - Slight upward motion (`y: -2px`)
2. **Sidebar Links** - Slide right 5px
3. **Buttons** - Scale up (`scale: 1.05`)
4. **Cards** - Lift up (`y: -10px`)

### Loading States:
- All buttons support disabled states
- Forms show validation errors
- Toast notifications for actions

---

## 🔗 External Links

**Opens in New Tab:**
- Social media links (footer)
- Blog posts
- Documentation
- External resources
- Featured links (on public profile)

**Same Tab:**
- All internal navigation
- Form submissions (redirects)

---

## ⚡ Quick Access Summary

### For Visitors (Not Logged In):
```
Home → Features → Pricing → Sign Up → Dashboard
```

### For Logged In Users:
```
Dashboard → (View links, analytics) → Settings → (Manage account)
```

### For Public Profile Viewers:
```
Direct Link → Public Profile → (Chat, view links, click through)
```

---

## 🎯 Important Navigation Notes

1. **Scroll Behavior** - All navigation triggers smooth scroll to top
2. **Page Transitions** - Fade animation on all page changes
3. **Breadcrumbs** - Not implemented (simple site structure)
4. **Back Button** - Browser back button works (manual navigation)
5. **Deep Linking** - Routes can be bookmarked (e.g., `settings` tab)

---

## 🔐 Protected Routes (Placeholder)

**Pages Requiring Authentication:**
- Dashboard (`dashboard`)
- Settings (`settings`)

**Current Behavior:**
- Pages accessible without auth (placeholder)
- In production: Redirect to `signin` if not authenticated

**Auth State Tracking:**
```javascript
// Navigation.tsx (line 36)
const isLoggedIn = currentPage === 'dashboard'; 
// PLACEHOLDER: Replace with actual auth state
```

---

## 📊 Navigation Analytics (Placeholder)

**Track These Events:**
- Page views
- CTA button clicks
- Navigation link clicks
- External link clicks
- Form submissions
- Featured link clicks (public profile)

**Implementation:**
```javascript
// Add to each navigation function:
console.log('Navigating to:', page);
// TODO: Send to analytics service
```

---

## 🚀 Developer Navigation Commands

### Update Current Page:
```javascript
onNavigate('pageName')
```

### Available Pages:
```javascript
'home'
'features'
'pricing'
'about'
'contact'
'dashboard'
'settings'
'profile'
'signin'
'signup'
```

### Navigation Handler:
```javascript
// App.tsx
const [currentPage, setCurrentPage] = useState('home');

// Usage
setCurrentPage('features'); // Navigate to features
```

---

## 🎨 Scroll Progress Indicator

**Location:** Top of screen (fixed)

**Behavior:**
- Black bar grows from left to right as user scrolls
- Width = scroll progress percentage
- Visible on all pages

**Implementation:**
```javascript
// App.tsx (line 63-66)
<motion.div
  className="fixed top-0 left-0 right-0 h-1 bg-black"
  style={{ scaleX }}
/>
```

---

## 🌟 Navigation Best Practices

1. **Always scroll to top** when navigating
2. **Close mobile menu** after link click
3. **Show active state** on current page
4. **Disable button** during loading
5. **Toast feedback** for important actions
6. **Maintain scroll position** only on tab switches (Settings)

---

**Status:** ✅ **Complete Navigation System**

All pages are accessible through intuitive navigation patterns. The site structure is clean, logical, and user-friendly.

---

*Navigation Version: 1.0.0*
