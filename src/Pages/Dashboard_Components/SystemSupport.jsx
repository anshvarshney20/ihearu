import React from 'react'
import DashboardNavbar from './DashboardNavbar'
import { useState, useEffect } from 'react'

const SystemSupport = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchSupport = async () => {
            try {
                const authToken = localStorage.getItem('access');
                if (!authToken) {
                    throw new Error('Authentication token not found');
                }

                const headers = {
                    'x-auth-token-admin': authToken,
                };

                // Additional parameters for the API request
                const requestBody = {
                    page: 1,
                    type: 'Listener',
                };

                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/supportList`, {
                    method: 'POST',
                    headers: {
                        ...headers,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const userData = await response.json();
                setData(userData.results.chats);
                console.log(userData.results.chats)
            } catch (error) {
                console.error('Error fetching promo codes:', error);
                // Handle errors accordingly
            }
        };

        fetchSupport();
    }, []);
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'numeric', year: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    return (
        <>
            <div className='admin_main'>
                <DashboardNavbar />
                <div class="admin_panel_data height_adjust">
                    <div class="row mx-0">
                        <div class="col-12 design_outter_comman shadow">
                            <div class="row comman_header justify-content-between">
                                <div class="col">
                                    <h2>Help &amp; Support Management</h2>
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
                                                    <th>Username </th>
                                                    <th>email id</th>
                                                    <th>phone number</th>
                                                    <th>Date and Time </th>
                                                    <th>Query</th>
                                                    <th>type of support</th>
                                                    <th>Status</th>
                                                    <th>Revert Back</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    data.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.listener}</td>
                                                            <td>Test Email</td>
                                                            <td>+123456789</td>
                                                            <td>Tuesday 20 2023</td>
                                                            <td>{item.concern}</td>

                                                            <td>{item.type}</td>
                                                            <td>In Progress</td>
                                                            <td>
                                                                <a class="comman_btn table_viewbtn" href="javascript:;"><span>Yes</span></a>
                                                                <a class="comman_btn2 table_viewbtn ms-1" href="javascript:;"><span>No</span></a>
                                                            </td>
                                                            <td>
                                                                <a data-bs-toggle="modal" data-bs-target="#View" class="comman_btn table_viewbtn" href="javascript:;"><span>View</span></a>
                                                                <a class="comman_btn2 table_viewbtn ms-1" href="javascript:;"><span>Settled</span></a>
                                                                <a class="comman_btn bg-danger table_viewbtn ms-1" href="javascript:;"><span>Delete</span></a>
                                                            </td>
                                                        </tr>

                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade comman_modal edit_modal" id="View" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Query</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-0">
                            <form class="form-design py-4 px-4 row" action="">
                                <div class="form-group col-12">
                                    <label for="">Query</label>
                                    <textarea class="form-control" name="" id="" style={{ height: "150px" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi nihil et dolor vel dignissimos vero nobis recusandae? Eveniet rem temporibus, praesentium cupiditate beatae fuga, incidunt ducimus dignissimos nostrum dolore saepe.</textarea>
                                </div>
                                <div class="form-group col-12">
                                    <label for="">Update Status</label>
                                    <select class="form-select form-control" aria-label="Default select example">
                                        <option selected="">In Progress</option>
                                        <option value="1">Solve</option>
                                        <option value="2">Pending</option>
                                    </select>
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

export default SystemSupport