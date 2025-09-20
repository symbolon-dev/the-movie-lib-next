# Refactoring TODO List

## 🚨 Critical Issues (Must Fix)

### Performance & Re-rendering

- [ ] **Fix infinite re-renders** in `MovieResults.tsx:22-23` - useEffect dependency issue
- [x] **Add React.memo** to MovieCard component - ✅ PARTIALLY COMPLETED (need to add to other components)
- [ ] **Implement debouncing** for search in `lib/store.ts:56-59`
- [ ] **Extract sorting logic** from store to utility functions (`lib/store.ts:160-183`)

### TypeScript & Type Safety

- [ ] **Fix weak typing** in UI components (`Button.tsx:6`, `Input.tsx:5`) - replace `[key: string]: unknown`
- [ ] **Add return types** for async functions in `lib/store.ts`
- [ ] **Fix unsafe type assertion** in `Input.tsx:12` - add null check
- [ ] **Remove any types** throughout codebase

### Error Handling

- [ ] **Add Error Boundaries** for React components
- [ ] **Standardize error handling** across API routes
- [ ] **Implement retry mechanism** for failed API calls
- [ ] **Add user-friendly error messages** instead of technical errors

## 🔧 Architecture Issues

### State Management

- [ ] **Fix state mutation** in `lib/store.ts:154-158` - avoid direct array mutation
- [ ] **Decouple components** from direct Zustand store access
- [ ] **Add proper memoization** (`useMemo`, `useCallback`) where needed
- [ ] **Implement request deduplication** for concurrent identical API calls
- [x] **~~Migrate to SWR~~** - ✅ CANCELLED (Using Zustand effectively, SWR removed from dependencies)

### Component Architecture

- [ ] **Fix props drilling** - create proper prop interfaces
- [ ] **Add prop validation** (runtime validation)
- [ ] **Implement compound components** pattern where appropriate
- [ ] **Extract business logic** from components

### Next.js Optimizations

- [ ] **Remove force-dynamic** from `app/page.tsx:4` if not needed
- [ ] **Implement ISR** for movie details pages
- [ ] **Fix deprecated image config** in `next.config.ts:5` - use `remotePatterns`
- [ ] **Add proper SSG/SSR** strategy

## 🎨 UI/UX Improvements

### Design System

- [x] **Install shadcn/ui** for consistent design system - ✅ COMPLETED
- [ ] **Create design tokens** (colors, spacing, typography)
- [x] **Standardize component variants** - ✅ COMPLETED (shadcn/ui variants)
- [ ] **Add proper theme management**

### Performance

- [ ] **Add image lazy loading** for movie posters
- [ ] **Implement code splitting** for routes
- [ ] **Add bundle analyzer** to monitor bundle size
- [ ] **Optimize font loading**

### Loading States

- [x] **Improve skeleton components** with better designs - ✅ COMPLETED (shadcn/ui Skeleton + route-level loading.tsx)
- [ ] **Add progressive loading** patterns
- [ ] **Implement proper loading/error/success states**
- [ ] **Add transition animations**

## 🔒 Security & Validation

### Input Validation

- [ ] **Add Zod validation** for all API inputs
- [ ] **Sanitize user inputs** to prevent XSS
- [ ] **Validate environment variables** at startup
- [ ] **Add rate limiting** to API routes

### Environment & Config

- [ ] **Create .env.example** file
- [ ] **Fix client-side env vars** in `app/movies/[id]/page.tsx:17`
- [ ] **Add proper CORS configuration**
- [ ] **Implement CSP headers**

## 🧪 Testing Infrastructure

### Test Setup

- [ ] **Install Jest + React Testing Library**
- [ ] **Add Playwright** for E2E tests
- [ ] **Configure test environment**
- [ ] **Set up CI/CD pipeline** for automated testing

### Test Coverage

- [ ] **Unit tests** for utility functions
- [ ] **Component tests** for UI components
- [ ] **Integration tests** for API routes
- [ ] **E2E tests** for user workflows

## 📱 Accessibility & UX

### Accessibility

- [ ] **Add ARIA labels** to interactive elements
- [ ] **Implement keyboard navigation**
- [ ] **Fix color contrast** issues
- [ ] **Add screen reader support**

### User Experience

- [ ] **URL state synchronization** for filters
- [ ] **Add search history** persistence
- [ ] **Implement proper focus management**
- [ ] **Add loading indicators** for all async operations

## 🔄 Code Organization

### File Structure

- [x] **Consistent import/export** patterns - ✅ COMPLETED (barrel exports removed for clarity)
- [x] **Extract utility functions** from components - ✅ COMPLETED (utils/ folder structure)
- [x] **Create shared hooks** for common logic - ✅ COMPLETED (Zustand stores)
- [x] **Organize by feature** rather than file type - ✅ COMPLETED (domain-driven structure)
- [x] **Centralized error handling** - ✅ COMPLETED (utils/errorHandler/)
- [x] **Proper file naming conventions** - ✅ COMPLETED (kebab-case enforcement)

### Code Quality

- [ ] **Remove console statements** from production code
- [ ] **Add proper JSDoc** comments
- [x] **Standardize naming conventions** - ✅ COMPLETED (kebab-case for files, PascalCase for components, camelCase for functions)
- [x] **Extract constants** to component-local scope - ✅ COMPLETED (SORT_OPTIONS moved to SortSelect.tsx)

## 📊 Monitoring & Analytics

### Performance

- [ ] **Add performance monitoring** (Web Vitals)
- [ ] **Implement error tracking** (Sentry)
- [ ] **Add analytics** for user behavior
- [ ] **Monitor bundle size** changes

### Development

- [ ] **Add pre-commit hooks** (lint, format, test)
- [ ] **Implement conventional commits**
- [ ] **Add automated dependency updates**
- [ ] **Set up proper dev tools**

## Priority Order

### Phase 1 (Immediate - Critical Bugs)

1. Fix infinite re-renders
2. Add Error Boundaries
3. Fix TypeScript issues
4. Implement proper error handling

### Phase 2 (Performance & Architecture)

1. Add React.memo and memoization - ✅ PARTIALLY COMPLETED
2. Implement debouncing
3. ✅ Extract business logic - COMPLETED (utils/, stores/, schemas/ structure)
4. ✅ Add shadcn/ui - COMPLETED
5. ✅ Standardize file naming - COMPLETED
6. ✅ Centralize error handling - COMPLETED

### Phase 3 (Testing & Security)

1. Set up testing infrastructure
2. Add input validation
3. Implement proper security measures
4. Add accessibility features

### Phase 4 (Polish & Monitoring)

1. ✅ Add proper loading states - COMPLETED (route + component level)
2. ✅ Clean up dependencies - COMPLETED (removed unused SWR)
3. Implement monitoring
4. Optimize bundle size
5. Add advanced UX features
