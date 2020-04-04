/* eslint-disable */

import React from 'react';
import Loading from 'dan-components/Loading';
import loadable from '../utils/loadable';

// Landing Page
export const HomePage = loadable(() =>
  import ('./LandingPage/HomePage'), {
    fallback: <Loading />,
  });
export const SliderPage = loadable(() =>
  import ('./LandingPage/SliderPage'), {
    fallback: <Loading />,
  });
export const BlogHome = loadable(() =>
  import ('./Pages/Blog'), {
    fallback: <Loading />,
  });
export const Article = loadable(() =>
  import ('./Pages/Blog/Article'), {
    fallback: <Loading />,
  });

// Dashboard
export const PersonalDashboard = loadable(() =>
  import ('./Dashboard/PersonalDashboard'), {
    fallback: <Loading />,
  });

// Layouts
export const AppLayout = loadable(() =>
  import ('./Layouts/AppLayout'), {
    fallback: <Loading />,
  });
export const Responsive = loadable(() =>
  import ('./Layouts/Responsive'), {
    fallback: <Loading />,
  });
export const Grid = loadable(() =>
  import ('./Layouts/Grid'), {
    fallback: <Loading />,
  });

// Pages
export const Login = loadable(() =>
  import ('./Pages/Users/Login'), {
    fallback: <Loading />,
  });
