import React from 'react';
import DashboardNavbar from './DashboardNavbar';

const WithdrawalRequest = () => {
  return (
    <>
      <div className="admin_main">
        <DashboardNavbar/>
        <div className="admin_panel_data height_adjust">
          <div className="row mx-0">
            <div className="col-12 design_outter_comman shadow">
              <div className="row comman_header justify-content-between">
                <div className="col">
                  <h2>Withdrawal Request Management</h2>
                </div>
                <div className="col-3">
                  <form className="form-design" action="">
                    <div className="form-group mb-0 position-relative icons_set">
                      <input type="text" className="form-control" placeholder="Search" name="name" id="name" />
                      <i className="far fa-search"></i>
                    </div>
                  </form>
                </div>
              </div>
              <form className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between" action="">
                <div className="form-group mb-0 col-5">
                  <label htmlFor="">From</label>
                  <input type="date" className="form-control" />
                </div>
                <div className="form-group mb-0 col-5">
                  <label htmlFor="">To</label>
                  <input type="date" className="form-control" />
                </div>
                <div className="form-group mb-0 col-2">
                  <button className="comman_btn d-flex w-100"><span>Search</span></button>
                </div>
              </form>
              <div className="row">
                <div className="col-12 comman_table_design px-0">
                  <div className="table-responsive">
                    <table className="table mb-0">
                      <thead>
                        <tr>
                          <th>S.No.</th>
                          <th>Listener Name</th>
                          <th>Total Amount in wallet</th>
                          <th>Withdrawal Amount</th>
                          <th>Date & Time of request</th>
                          <th>Status</th>
                          <th>Transfer Date</th>
                          <th>Transaction image</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {/* ... your table rows ... */}
                        </tr>
                        {/* Additional table rows */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WithdrawalRequest;
