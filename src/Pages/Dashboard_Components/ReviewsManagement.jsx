import React from 'react';
import DashboardNavbar from './DashboardNavbar';
const ReviewsManagement = () => {
    return (
        <>
            <div class="admin_main">
                <DashboardNavbar />
                <div className="admin_panel_data height_adjust">
                    <div className="row mx-0">
                        <div className="col-12 design_outter_comman shadow">
                            <div className="row comman_header justify-content-between">
                                <div className="col">
                                    <h2>Reviews Management</h2>
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
                                                    <th>Review Description</th>
                                                    <th>Listener name</th>
                                                    <th>date and time</th>
                                                    <th>stars</th>
                                                    <th>Flag</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>Mohd. Arbab</td>
                                                    <td>What I appreciated most about Jennifer was his genuine commitment to my well-being.</td>
                                                    <td>Jennifer Garcia</td>
                                                    <td>Friday, 11 August 2023, 8PM</td>
                                                    <td>
                                                        <img className="rating_star" src="assets/img/star.png" alt="" />
                                                        <img className="rating_star" src="assets/img/star.png" alt="" />
                                                        <img className="rating_star" src="assets/img/star.png" alt="" />
                                                    </td>
                                                    <td><a className="flag_done" href="javascript:;"><i className="fas fa-flag"></i></a></td>
                                                    <td>
                                                        <a className="comman_btn table_viewbtn" href="reviews-view.html"><span>View</span></a>
                                                        <a className="comman_btn bg-dark table_viewbtn ms-1" href="javascript:;"><span>Unflag</span></a>
                                                        <a className="comman_btn bg-danger table_viewbtn ms-1" href="javascript:;"><span>Delete</span></a>
                                                    </td>
                                                </tr>
                                                {/* Add similar structure for other rows */}
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
    );
};

export default ReviewsManagement;
