import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Acceuil from'./pages/Dashboard/Acceuil';
import Archive from './pages/Dashboard/Archive';
import ListeVisite from './pages/Dashboard/ListeVisite';
import UserListe from './pages/Dashboard/UserListe';
import Otp from './pages/Authentication/Otp';
import Reset from './pages/Authentication/Reset';
import Stat from './pages/Dashboard/Stat'
import  AuthorizeUser  from './middlware/auth';
import ProtectRoute from './middlware/protectauth';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard " />
              <AuthorizeUser><ProtectRoute><ECommerce /></ProtectRoute></AuthorizeUser>
            </>
          }
        />
         <Route
          path="/acceuil"
          element={
            <>
              <PageTitle title="Acceuil " />
              <AuthorizeUser><Acceuil /></AuthorizeUser>
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar " />
              <AuthorizeUser><Calendar /></AuthorizeUser>
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile " />
              <AuthorizeUser><Profile /></AuthorizeUser>
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <AuthorizeUser><FormElements /></AuthorizeUser>
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <AuthorizeUser><FormLayout /></AuthorizeUser>
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables " />
              <AuthorizeUser><Tables /></AuthorizeUser>
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <AuthorizeUser><Settings /></AuthorizeUser>
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <AuthorizeUser><Chart /></AuthorizeUser>
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <AuthorizeUser><Alerts /></AuthorizeUser>
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <AuthorizeUser><Buttons /></AuthorizeUser>
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              
              <AuthorizeUser><ProtectRoute><SignUp /></ProtectRoute></AuthorizeUser>

            </>
          }
        />
        <Route
          path="/auth/otp"
          element={
            <>
              <PageTitle title="Otp" />
              <Otp />
            </>
          }
        />
        <Route
          path="/auth/reset"
          element={
            <>
              <PageTitle title="Reset" />
              <Reset />
            </>
          }
        />
        <Route
          path="/Visites"
          element={
            <>
              <PageTitle title="Visites " />
              <AuthorizeUser><ListeVisite /></AuthorizeUser>
            </>
          }
        />
        <Route
          path="/User"
          element={
            <>
              <PageTitle title="Utilisateurs " />
              <AuthorizeUser><ProtectRoute><UserListe /></ProtectRoute></AuthorizeUser>
            </>
          }
        />
        <Route
          path="/Archive"
          element={
            <>
              <PageTitle title="Archive " />
              <AuthorizeUser><ProtectRoute><Archive /></ProtectRoute></AuthorizeUser>
            </>
          }
        />
         <Route
          path="/Stat"
          element={
            <>
              <PageTitle title="Statistique " />
              <AuthorizeUser><ProtectRoute><Stat /></ProtectRoute></AuthorizeUser>
            </>
          }
        />
      </Routes>
     
      
    </>
  );
}

export default App;


