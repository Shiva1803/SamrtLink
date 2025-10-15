# SmartLink Frontend

Quick reference for frontend development. See [main README](../README.md) for complete documentation.

## Quick Start

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── config/         # API endpoints & constants
├── lib/            # API client & utilities  
├── hooks/          # Custom hooks (useAuth, useLinks, useAnalytics)
├── types/          # TypeScript types
├── features/       # Service layer for backend
├── components/     # UI components (organized)
└── pages/          # Page components (organized)
```

## Usage Examples

### Authentication
```typescript
import { useAuth } from '@/hooks/useAuth';

const { user, signIn, logout } = useAuth();
await signIn({ email, password });
```

### Link Management
```typescript
import { useLinks } from '@/hooks/useLinks';

const { links, createLink, deleteLink } = useLinks();
await createLink({ originalUrl, customSlug });
```

### Analytics
```typescript
import { useAnalytics } from '@/hooks/useAnalytics';

const { data, fetchAnalytics } = useAnalytics();
await fetchAnalytics(linkId);
```

## Configuration

Edit `src/config/api.config.ts` to update API endpoints:

```typescript
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  // ... endpoints
};
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

For complete documentation, see [main README](../README.md).

