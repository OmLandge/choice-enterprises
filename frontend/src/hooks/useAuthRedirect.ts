import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userString = sessionStorage.getItem('user');
      
      if (!token || !userString) {
        localStorage.removeItem('token');
        sessionStorage.removeItem('user');
        if (window.location.pathname !== '/') {
          navigate('/');
          window.location.reload();
        }
        return false;
      }
      
      try {
        const user = JSON.parse(userString);
        if (!user || !user.role) {
          throw new Error('Invalid user data');
        }
        if(window.location.pathname === '/change-password') {
          return true;
        }
        if(user.role === 'ADMIN' && window.location.pathname !== '/admin') {
          navigate('/admin');
          window.location.reload();
        }
        if(user.role === 'EMPLOYEE' && window.location.pathname !== '/dashboard') {
          navigate('/dashboard');
          window.location.reload();
        }
        return true;
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        sessionStorage.removeItem('user');
        navigate('/');
        window.location.reload();
        return false;
      }
    };

    const isAuthenticated = checkAuth();
    setIsLoading(!isAuthenticated);
  }, [navigate]);

  return { isLoading };
};
