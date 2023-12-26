import React from 'react';
import DashboardNavbar from './DashboardNavbar';

const PaymentManagement = () => {
  return (
    <>
      <div class="admin_main">
        <DashboardNavbar />
        <div className="admin_panel_data height_adjust">
          <div className="row mx-0">
            <div className="col-12 mb-4 px-0">
              <div className="row justify-content-end">
                <div className="col-auto">
                  <a href="javascript:;" className="comman_btn d-inline-flex w-100"><span>Export CSV</span></a>
                </div>
              </div>
            </div>
            <div className="col-12 design_outter_comman shadow">
              <div className="row comman_header justify-content-between">
                <div className="col">
                  <h2>Payment Management</h2>
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
                          <th>User Name</th>
                          <th>Booking Name</th>
                          <th>Listener name</th>
                          <th>Category</th>
                          <th>Date and Time</th>
                          <th>Amount</th>
                          <th>COMMISSION</th>
                          <th>Mode of Payment</th>
                          <th>Invoice Number</th>
                          <th>status</th>
                          <th>transaction id</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Mohd. Arbab</td>
                          <td>Jennifer Garcia</td>
                          <td>Elia Ana</td>
                          <td>Stress</td>
                          <td>Friday, 11 August 2023, 8PM</td>
                          <td>110 SGD</td>
                          <td>10%</td>
                          <td>Debit Card</td>
                          <td>101212</td>
                          <td>Paid</td>
                          <td>#11212</td>
                          <td>
                            <a className="comman_btn bg-danger table_viewbtn ms-1" href="javascript:;"><span>Delete</span></a>
                          </td>
                        </tr>
                        {/* Add similar structure for other rows */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="row Total_amt mx-0 py-3">
                <div className="col-6">
                  <strong>Total Amount: </strong>
                </div>
                <div className="col-6 text-end">
                  <span>550 SGD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentManagement;
