# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

<ToastContainer draggable={true} transition={Slide} autoClose={2000} />
toast.error(error.response?.data?.message || "Something went wrong");

import { axiosInstance } from "../context/AxiosInstance";

const FilterSection = lazy(() => import("../Components/my-ui/FilterSection"));
const Pagination = lazy(() => import("../Components/my-ui/Pagination"));
const Footer = lazy(() => import("../Components/layout/Footer"));


 <Suspense fallback={<LoadingUi />}>
              </Suspense>
