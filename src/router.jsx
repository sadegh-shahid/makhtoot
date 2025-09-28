import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';

const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const Auction = lazy(() => import('./pages/Auction'));
const Certificate = lazy(() => import('./pages/Certificate'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const NotFound = lazy(() => import('./pages/NotFound'));
const SellerDashboard = lazy(() => import('./pages/dashboard/SellerDashboard'));
const BuyerDashboard = lazy(() => import('./pages/dashboard/BuyerDashboard'));

const LoadingFallback = () => (
  <div className="flex-1 flex items-center justify-center">
    <p>در حال بارگذاری...</p>
  </div>
);

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/shop',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Shop />
          </Suspense>
        ),
      },
      {
        path: '/auction',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Auction />
          </Suspense>
        ),
      },
      {
        path: '/cart',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <CartPage />
          </Suspense>
        ),
      },
      {
        path: '/certificate',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Certificate />
          </Suspense>
        ),
      },
      {
        path: '/about',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: '/contact',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: '/product/:id',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ProductPage />
          </Suspense>
        ),
      },
      {
        path: '/dashboard/seller',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SellerDashboard />
          </Suspense>
        ),
      },
      {
        path: '/dashboard/buyer',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <BuyerDashboard />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
