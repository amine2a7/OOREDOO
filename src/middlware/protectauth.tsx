import React, { ReactNode,useEffect,useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../pages/Authentication/helper/storeUser';

interface ProtectRouteProps {
  children: ReactNode;
}

const ProtectRoute: React.FC<ProtectRouteProps> = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData') || '{}');
    return storedUserData;
  });
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:5000/api/userToken', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, []);
  const role = userData.role;


  if (role === "hotesse") {
    return <Navigate to={'/acceuil'} replace={true} />;
  }

  return <>{children}</>; // Utiliser des fragments pour englober children
};

export default ProtectRoute;
