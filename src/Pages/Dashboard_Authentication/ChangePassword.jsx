import React, { useState } from 'react';
import DashboardNavbar from '../Dashboard_Components/DashboardNavbar';
import { useUserAuth } from '../../Components/AuthContext';
const ChangePassword = () => {
  const { change_password, message } = useUserAuth();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    // Assuming you have the user's email stored somewhere
    const userEmail = localStorage.getItem("useremail");

    // Call the change_password function
    change_password(userEmail, oldPassword, newPassword);
  };

  return (
    <>
      <div className='admin_main'>
        <DashboardNavbar />
        <div className="admin_panel_data height_adjust">
          <div className="row">
            <div className="col-12 editprofile design_outter_comman shadow">
              <div className="row comman_header justify-content-between">
                <div className="col-auto">
                  <h2>Change Password</h2>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <form className="row form-design justify-content-center position-relative mx-0 p-4" onSubmit={handleSave}>
                    <div className="form-group col-12">
                      <label htmlFor="oldPassword">Old Password</label>
                      <input type="password" className="form-control" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                    </div>
                    <div className="form-group col-12">
                      <label htmlFor="newPassword">New Password</label>
                      <input type="password" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                    <div className="form-group col-12">
                      <label htmlFor="confirmPassword">Confirm New Password</label>
                      <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <div className="form-group col-12 text-center">
                      <button type="submit" className="comman_btn" ><span>Save</span></button>
                    </div>
                  </form>
                  {message && <div className="text-danger">{message}</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
