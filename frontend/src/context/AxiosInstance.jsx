import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const baseURL = 'http://localhost:3000';
let accessToken = localStorage.getItem('token') || null;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: accessToken ? `Bearer ${accessToken}` : '',
  },
  withCredentials: true
});

axiosInstance.interceptors.request.use(async req => {
  accessToken = localStorage.getItem('token') || null;

  if (!accessToken) {
    return req;
  }
  req.headers.Authorization = `Bearer ${accessToken}`;

  try {
    const user = jwtDecode(accessToken);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) {
      return req;
    }

    const response = await axios.get(`${baseURL}/auth/refreshtoken`, {
      withCredentials: true
    });

    localStorage.setItem('token', response.data.accessToken);
    req.headers.Authorization = `Bearer ${response.data.accessToken}`;

    return req;
  } catch {
    localStorage.removeItem('token');
    return req;
  }
});

const useCheckAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get('/auth/verifyAuth');
        if (res.status === 200 && res.data.isAuthenticated) {
          console.log(res.data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
        console.error(error);
      }
    }
    checkAuth();
  }, [isAuthenticated]);

  return { isAuthenticated, setIsAuthenticated }; 
};

const logout = async (setIsAuthenticated) => {
  try {
    const res = await axiosInstance.get('/auth/logout');
    if (res.status === 200 && res.data.success) {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      window.location.href = '/';
      console.log(res.data);
    }
  } catch (error) {
    console.error(error);
  }
};

export { axiosInstance, useCheckAuth, logout };