import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserAuthContextProvider, useUserAuth } from './Components/AuthContext';
import Dashboard from './Pages/Dashboard_Components/Dashboard';
import ForgotPassword from './Pages/Dashboard_Authentication/ForgotPassword';
import Login from './Pages/Dashboard_Authentication/Login';
import UserManagement from './Pages/Dashboard_Components/UserManagement';
import ListenerMangement from './Pages/Dashboard_Components/ListenerMangement';
import CategoryManagement from './Pages/Dashboard_Components/CategoryManagement';
import PromoCodeManagement from './Pages/Dashboard_Components/PromoCodeManagement';
import AppointmentManagement from './Pages/Dashboard_Components/AppointmentManagement';
import SystemSupport from './Pages/Dashboard_Components/SystemSupport';
import MasterSettings from './Pages/Dashboard_Components/MasterSettings';
import ReviewsManagement from './Pages/Dashboard_Components/ReviewsManagement';
import PaymentManagement from './Pages/Dashboard_Components/PaymentManagement';
import AuditLog from './Pages/Dashboard_Components/AuditLog';
import WithdrawalRequest from './Pages/Dashboard_Components/WithdrawalRequest';
import ViewProfile from './Pages/Dashboard_Components/ViewProfile';
import Verification from './Pages/Dashboard_Authentication/Verification';
import ResetPassword from './Pages/Dashboard_Authentication/ResetPassword';
import UserView from './Pages/Dashboard_Components/UserView';
import ListenerView from './Pages/Dashboard_Components/ListenerView';
import CategoryView from './Pages/Dashboard_Components/CategoryView';
import ChangePassword from './Pages/Dashboard_Authentication/ChangePassword';
import ViewAppointment from './Pages/Dashboard_Components/ViewAppointment';

function App() {

  const routes = [
    { path: '/', element: <Login /> },
    { path: '/forgotpassword', element: <ForgotPassword /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/user-management', element: <UserManagement /> },
    { path: '/listener-management', element: <ListenerMangement /> },
    { path: '/category-management', element: <CategoryManagement /> },
    { path: '/category-view/:_id', element: <CategoryView /> },

    { path: '/promocode-management', element: <PromoCodeManagement /> },
    { path: '/appointment-booking-management', element: <AppointmentManagement /> },
    { path: '/system-support', element: <SystemSupport /> },
    { path: '/master-settings', element: <MasterSettings /> },
    { path: '/reviews-management', element: <ReviewsManagement /> },
    { path: '/payment-management', element: <PaymentManagement /> },
    { path: '/audit-log', element: <AuditLog /> },
    { path: '/withdrawal-request', element: <WithdrawalRequest /> },
    { path: '/view-profile', element: <ViewProfile /> },
    { path: '/verification', element: <Verification /> },
    { path: '/reset-password', element: <ResetPassword /> },
    { path: '/user-view/:_id', element: <UserView /> },
    { path: '/listener-view/:_id', element: <ListenerView /> },
    { path: '/change-password', element: <ChangePassword /> },
    { path: '/view-appointment/:_id', element: < ViewAppointment /> }
  ];

  return (
    <>
      <BrowserRouter>
        <UserAuthContextProvider>
          <Routes>
            {routes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </UserAuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
