import css from './App.module.css';

import { lazy, Suspense } from 'react';
import SharedLayout from './SharedLayout/SharedLayout';
import { Route, Routes } from 'react-router-dom';
import RestrictedRoute from './RestrictedRoute';
import PrivateRoute from './PrivateRoute';

const HomePage = lazy(() => import('./../pages/HomePage/HomePage'));
const SignInPage = lazy(() => import('./../pages/SignInPage/SignInPage'));
const SignUpPage = lazy(() => import('./../pages/SignUpPage/SignUpPage'));
const TrackerPage = lazy(() => import('./../pages/TrackerPage/TrackerPage'));
const NotFoundPage = lazy(() => import('./../pages/NotFoundPage/NotFoundPage'));

export const App = () => {
  return (
    <div className={css.app}>
      <SharedLayout>
        <Suspense fallback={null}>
          <Routes>
            <Route
              path="/"
              element={
                <RestrictedRoute
                  component={<HomePage />}
                  redirectTo="/tracker"
                />
              }
            />
            <Route
              path="/signin"
              element={
                <RestrictedRoute
                  component={<SignInPage />}
                  redirectTo="/tracker"
                />
              }
            />
            <Route
              path="/signup"
              element={
                <RestrictedRoute
                  component={<SignUpPage />}
                  redirectTo="/tracker"
                />
              }
            />
            <Route
              path="/tracker"
              element={
                <PrivateRoute
                  component={<TrackerPage />}
                  redirectTo="/signin"
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </SharedLayout>
    </div>
  );
};
