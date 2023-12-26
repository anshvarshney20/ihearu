import React from 'react'
import DashboardNavbar from './DashboardNavbar'
import { useNavigate } from 'react-router-dom'
const AuditLog = () => {
    const navigate = useNavigate()
    const auth = localStorage.getItem('access')

    if (!auth) {
        navigate('/');
        return null; // Render nothing here
    }
    return (
        <>
            <div class="admin_main">
                <DashboardNavbar/>
                <div class="admin_panel_data height_adjust">
                    <div class="row mx-0">
                        <div class="col-12 design_outter_comman shadow">
                            <div class="row comman_header justify-content-between">
                                <div class="col">
                                    <h2>Audit Log</h2>
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
                                                    <th>S.No.</th>
                                                    <th>Date and Time</th>
                                                    <th>Username</th>
                                                    <th>Section IP Address</th>
                                                    <th>Action Details</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>Friday, 11 August 2023, 8PM</td>
                                                    <td>Mohd. Arbab</td>
                                                    <td>192.158.1.38</td>
                                                    <td>
                                                        Appointment Booked
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>Friday, 11 August 2023, 8PM</td>
                                                    <td>Mohd. Arbab</td>
                                                    <td>192.158.1.38</td>
                                                    <td>
                                                        Appointment Cancelled
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td>Friday, 11 August 2023, 8PM</td>
                                                    <td>Mohd. Arbab</td>
                                                    <td>192.158.1.38</td>
                                                    <td>
                                                        Appointment Booked
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>4</td>
                                                    <td>Friday, 11 August 2023, 8PM</td>
                                                    <td>Mohd. Arbab</td>
                                                    <td>192.158.1.38</td>
                                                    <td>
                                                        Appointment Booked
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>5</td>
                                                    <td>Friday, 11 August 2023, 8PM</td>
                                                    <td>Mohd. Arbab</td>
                                                    <td>192.158.1.38</td>
                                                    <td>
                                                        Appointment Booked
                                                    </td>
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
        </>
    )
}

export default AuditLog