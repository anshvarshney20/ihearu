import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DashboardNavbar from './DashboardNavbar'
import { UserAuthContextProvider,useUserAuth } from '../../Components/AuthContext'
const Dashboard = () => {
    const navigate = useNavigate()
    const auth = localStorage.getItem('access')

    useEffect(() => {
        const authToken = localStorage.getItem('access');
        if (!authToken) {
            navigate('/'); // Redirect to login or any other page if not authenticated
        }
    }, [navigate]);

    return (
        <>
            <div class="admin_main">
                <DashboardNavbar />
                <div class="admin_panel_data height_adjust">
                    <div class="row dashboard_part justify-content-center">
                        <div class="col-12">
                            <div class="row ms-0 mb-3 justify-content-start">
                                <div class="col-3 d-flex align-items-stretch mb-4">
                                    <a href="javascript:;" class="row dashboard_box box_design w-100 justify-content-center">
                                        <div class="col-12">
                                            <span class="dashboard_icon mx-auto mb-3"><i class="fal fa-receipt"></i></span>
                                        </div>
                                        <div class="col-12">
                                            <div class="dashboard_boxcontent text-center">
                                                <h2>Pending Tasks
                                                </h2>
                                                <span>100 +</span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div class="col-3 d-flex align-items-stretch mb-4">
                                    <a href="javascript:;" class="row dashboard_box box_design w-100 justify-content-center">
                                        <div class="col-12">
                                            <span class="dashboard_icon mx-auto mb-3"><i class="fal fa-users"></i></span>
                                        </div>
                                        <div class="col-12">
                                            <div class="dashboard_boxcontent text-center">
                                                <h2>New listeners Sign Up
                                                </h2>
                                                <span>200 +</span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div class="col-3 d-flex align-items-stretch mb-4">
                                    <a href="javascript:;" class="row dashboard_box box_design w-100 justify-content-center">
                                        <div class="col-12">
                                            <span class="dashboard_icon mx-auto mb-3"><i class="fal fa-calendar-alt"></i></span>
                                        </div>
                                        <div class="col-12">
                                            <div class="dashboard_boxcontent text-center">
                                                <h2>Total Appointments for the month
                                                </h2>
                                                <span>300</span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div class="col-3 d-flex align-items-stretch mb-4">
                                    <a href="javascript:;" class="row dashboard_box box_design w-100 justify-content-center">
                                        <div class="col-12">
                                            <span class="dashboard_icon mx-auto mb-3"><i class="fal fa-calendar-alt"></i></span>
                                        </div>
                                        <div class="col-12">
                                            <div class="dashboard_boxcontent text-center">
                                                <h2>Total Appointments for the day
                                                </h2>
                                                <span>20</span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mx-0">
                        <div class="col-12 design_outter_comman shadow">
                            <div class="row comman_header justify-content-between">
                                <div class="col">
                                    <h2>Upcoming/New Appointments</h2>
                                </div>
                                <div class="col-3">
                                    <form class="form-design" action="">
                                        <div class="form-group mb-0 position-relative icons_set">
                                            <input type="text" class="form-control" placeholder="Search" name="name" id="name" />
                                            <i class="far fa-search"></i>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <form class="form-design py-4 px-3 help-support-form row align-items-end justify-content-between" action="">
                                <div class="form-group mb-0 col-5">
                                    <label for="">From</label>
                                    <input type="date" class="form-control" />
                                </div>
                                <div class="form-group mb-0 col-5">
                                    <label for="">To</label>
                                    <input type="date" class="form-control" />
                                </div>
                                <div class="form-group mb-0 col-2">
                                    <button class="comman_btn d-flex w-100"><span>Search</span></button>
                                </div>
                            </form>
                            <div class="row">
                                <div class="col-12 comman_table_design px-0">
                                    <div class="table-responsive">
                                        <table class="table mb-0">
                                            <thead>
                                                <tr>
                                                    <th>APPOINTMENT ID</th>
                                                    <th>Listener Name</th>
                                                    <th>User Name</th>
                                                    <th>Date & Time</th>
                                                    <th>Duration</th>
                                                    <th>Transaction ID</th>
                                                    <th>appointment Type</th>
                                                    <th>Total Cost</th>
                                                    <th>Promocode</th>
                                                    <th>Payment status</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>0003</td>
                                                    <td>Jennifer</td>
                                                    <td>Garcia</td>
                                                    <td>Friday, 11 August 2023, 8PM</td>
                                                    <td>30 Mins</td>
                                                    <td>1008</td>
                                                    <td>Video Call</td>
                                                    <td>110 SGD</td>
                                                    <td>IHearUBeta2024</td>
                                                    <td>Successful</td>
                                                    <td>Completed</td>
                                                </tr>
                                                <tr>
                                                    <td>0055</td>
                                                    <td>Jennifer</td>
                                                    <td>Garcia</td>
                                                    <td>Friday, 11 August 2023, 8PM</td>
                                                    <td>30 Mins</td>
                                                    <td>1008</td>
                                                    <td>Video Call</td>
                                                    <td>110 SGD</td>
                                                    <td>IHearUBeta2024</td>
                                                    <td>Unsuccessful</td>
                                                    <td>Cancelled</td>
                                                </tr>
                                                <tr>
                                                    <td>0005</td>
                                                    <td>Jennifer</td>
                                                    <td>Garcia</td>
                                                    <td>Friday, 11 August 2023, 8PM</td>
                                                    <td>30 Mins</td>
                                                    <td>1008</td>
                                                    <td>Video Call</td>
                                                    <td>110 SGD</td>
                                                    <td>IHearUBeta2024</td>
                                                    <td>Successful</td>
                                                    <td>Completed</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade comman_modal" id="edit" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content border-0">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Edit</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-0">
                            <form class="form-design py-4 px-4 row" action="">
                                <div class="form-group col-4">
                                    <label for="">First Name</label>
                                    <input type="text" class="form-control" value="Jennifer" />
                                </div>
                                <div class="form-group col-4">
                                    <label for="">Last Name</label>
                                    <input type="text" class="form-control" value="Garcia" />
                                </div>
                                <div class="form-group col-4">
                                    <label for="">Year Of Birth</label>
                                    <input type="text" class="form-control" value="09/09/1991" />
                                </div>
                                <div class="form-group col-6">
                                    <label for="">Gender</label>
                                    <input type="text" class="form-control" value="Female" />
                                </div>
                                <div class="form-group col-6">
                                    <label for="">Email Id</label>
                                    <input type="text" value="xyz@gmail.com" class="form-control" />
                                </div>
                                <div class="form-group col-6">
                                    <label for="">Mobile Number</label>
                                    <input type="text" value="+65 234234234" class="form-control" />
                                </div>
                                <div class="form-group col-6">
                                    <label for="">Transaction Details
                                    </label>
                                    <input type="text" value="Debit Card" class="form-control" />
                                </div>
                                <div class="form-group col-12">
                                    <label for="">Appointment Details</label>
                                    <textarea class="form-control" name="" id="" style={{ height: "100px" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</textarea>
                                </div>

                                <div class="form-group mb-0 col-12 text-center">
                                    <button class="comman_btn d-inline-flex" data-bs-dismiss="modal"><span>Update</span></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard