import css from './App.module.css';

import { lazy, Suspense } from 'react';
import SharedLayout from './SharedLayout/SharedLayout';
import { Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('./../pages/HomePage/HomePage'));
const SignInPage = lazy(() => import('./../pages/SignInPage/SignInPage'));
const SignUpPage = lazy(() => import('./../pages/SignUpPage/SignUpPage'));
const TrackerPage = lazy(() => import('./../pages/TrackerPage/TrackerPage'));

export const App = () => {
  return (
    <div className={css.app}>
      <SharedLayout>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/tracker" element={<TrackerPage />} />
          </Routes>
        </Suspense>
      </SharedLayout>
    </div>
  );
};
