import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../Assets/IMG/logo.png'
const DashboardNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const isLinkActive = (pathname) => {
    return location.pathname === pathname;
  };
  const logout = () => {
    localStorage.removeItem('access');

    // Redirect the user to the login page
    navigate('/');
  }
  const menuItems = [
    { path: '/dashboard', icon: 'fas fa-home', label: 'Dashboard' },
    { path: '/user-management', icon: 'fas fa-user', label: 'User Management' },
    { path: '/listener-management', icon: 'fas fa-headphones-alt', label: 'Listener Management' },
    { path: '/category-management', icon: 'fas fa-list-ul', label: 'Category Management' },
    { path: '/appointment-booking-management', icon: 'fas fa-calendar-alt', label: 'Appointment Booking Management' },
    { path: '/reviews-management', icon: 'fas fa-thumbs-up', label: 'Reviews Management' },
    { path: '/payment-management', icon: 'fas fa-file-invoice-dollar', label: 'Payment Management' },
    { path: '/promocode-management', icon: 'fas fa-money-bill', label: 'Promocode Management' },
    { path: '/withdrawal-request', icon: 'fas fa-hand-holding-usd', label: 'Withdrawal Request Management' },
    { path: '/system-support', icon: 'fas fa-cogs', label: 'Help & Support' },
    { path: '/audit-log', icon: 'fas fa-file-alt', label: 'Audit Log' },
    { path: '/master-settings', icon: 'fas fa-cog', label: 'Master Settings' },
  ];

  return (
    <>
      <div class="siderbar_section">
        <div class="siderbar_inner">
          <div class="sidebar_logo">
            <Link to='/dashboard'><img src={logo} alt="Logo" /> </Link>
          </div>
          <div class="sidebar_menus">
            <ul class="list-unstyled ps-1 m-0">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link to={item.path} className={isLinkActive(item.path) ? 'active' : ''}>
                    <i class={item.icon}></i>{item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div class="admin_main_inner">
        <div class="admin_header shadow">
          <div class="row align-items-center mx-0 justify-content-between w-100">
            <div class="col">
              <a class="sidebar_btn" href="javscript:;"><i class="far fa-bars"></i></a>
            </div>
            <div class="col-auto d-flex align-items-center">
              <a class="change_language me-3" href="javascript:;"><img src="assets/img/saudi_flag1.png" alt="" /> عربى</a>
              <div class="dropdown Profile_dropdown">
                <button class="btn btn-secondary" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="assets/img/profile_img1.png" alt="" />
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li><Link to='/view-profile' class="dropdown-item" href="view-profile.html">View Profile</Link></li>
                  <li><Link to='/change-password' class="dropdown-item">Change Password</Link></li>
                  <li><a class="dropdown-item" onClick={logout}>Logout</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardNavbar;
