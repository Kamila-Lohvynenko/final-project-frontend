import css from './App.module.css';

import { lazy, Suspense, useEffect } from 'react';
import SharedLayout from './SharedLayout/SharedLayout';
import { Route, Routes } from 'react-router-dom';
import RestrictedRoute from './RestrictedRoute';
import PrivateRoute from './PrivateRoute';
import { useDispatch } from 'react-redux';
import { getWaterByDay } from '../redux/water/operations';
import { loginUser } from '../redux/user/operations';

const HomePage = lazy(() => import('./../pages/HomePage/HomePage'));
const SignInPage = lazy(() => import('./../pages/SignInPage/SignInPage'));
const SignUpPage = lazy(() => import('./../pages/SignUpPage/SignUpPage'));
const TrackerPage = lazy(() => import('./../pages/TrackerPage/TrackerPage'));
const NotFoundPage = lazy(() => import('./../pages/NotFoundPage/NotFoundPage'));

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function fn1() {
      await dispatch(
        loginUser({ email: 'kulak1224@gmail.com', password: '123456789' }),
      ).unwrap();
      dispatch(getWaterByDay({ day: '02', month: '09', year: 2024 }));
    }
    fn1();
  }, []);
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
