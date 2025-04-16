import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingUi from '../Components/my-ui/Loading';

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
  const [userRole, setUserRole] = useState(null);
  const [authLoading, setauthLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get('/auth/verifyAuth');
        setIsAuthenticated(res.status === 200 && res.data.isAuthenticated);
        setUserRole(res.status === 200 ? res.data.role : null);
      } catch (error) {
        setIsAuthenticated(false);
        setUserRole(null);
        console.error("Authentication error:", error);
      } finally {
        setauthLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { isAuthenticated, setIsAuthenticated, userRole, authLoading };
};

const AdminRoute = ({ children }) => {
  const { isAuthenticated, userRole, authLoading } = useCheckAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || userRole !== 'admin')) {
      navigate('/');
    }
  }, [isAuthenticated, userRole, authLoading, navigate]);

  if (authLoading) {
    return <LoadingUi />;
  }

  return isAuthenticated && userRole === 'admin' ? children : null;
};

const logout = async (setIsAuthenticated) => {
  try {
    const res = await axiosInstance.get('/auth/logout');
    if (res.status === 200 && res.data.success) {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      window.location.href = '/';
    }
  } catch (error) {
    console.error(error);
  }
};

export { axiosInstance, useCheckAuth, logout , AdminRoute };