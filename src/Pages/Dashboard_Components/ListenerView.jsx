import React from 'react'
import DashboardNavbar from './DashboardNavbar'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
const ListenerView = () => {
    const { _id } = useParams();
    const [data, setData] = useState({});
    const navigate = useNavigate()
    const apiBaseUrl = process.env.REACT_APP_API_URL;
    useEffect(() => {
        const authToken = localStorage.getItem('access');
        if (!authToken) {
            navigate('/'); // Redirect to login or any other page if not authenticated
        }
    }, [navigate]);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const authToken = localStorage.getItem('access');

                if (!authToken) {
                    throw new Error('Authentication token not found');
                }

                const headers = {
                    'x-auth-token-admin': authToken,
                };

                const response = await axios.get(`${apiBaseUrl}/api/admin/viewListener/${_id}`, {
                    headers,
                });
                const userData = response.data.results.listener;
                setData(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
                throw error;
            }
        };

        fetchUser();
    }, [_id]);

    return (
        <>
            <div class="admin_main">
                <DashboardNavbar />

                <div class="admin_panel_data height_adjust">
                    <div class="row mx-0">
                        <div class="col-12 design_outter_comman shadow mb-4 toggle_set">
                            <div class="row comman_header justify-content-between">
                                <div class="col-auto">
                                    <h2>Listener Details</h2>
                                </div>
                            </div>
                            <div class="row">
                                <form class="row align-items-center justify-content-center form-design position-relative p-4 py-4" action="">
                                    <div class="col-10">
                                        <div class="row">
                                            <div class="col-12 mb-4">
                                                <div class="row adjust_margin">
                                                    <div class="form-group col-12 mb-2">
                                                        <div class="userinfor_box text-center">
                                                            <span class="user_imgg">
                                                                <img src={data?.image} alt="" />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group col-12">
                                                <label for="">Full Name</label>
                                                <input disabled type="text" class="form-control" value={data?.fullName}  />
                                            </div>

                                            <div class="form-group col-6">
                                                <label for="">Short Decription</label>
                                                <textarea disabled class="form-control" name="" id="" style={{ height: "80px" }} value={data?.shortDescription}></textarea>
                                            </div>
                                            <div class="form-group col-6">
                                                <label for="">Profile Description</label>
                                                <textarea disabled class="form-control" name="" id="" style={{ height: "80px" }} value={data?.profileDescription}></textarea>
                                            </div>
                                            <div class="form-group col-6">
                                                <label for="">Email ID</label>
                                                <input disabled type="text" value={data?.email} class="form-control" />
                                            </div>
                                            <div class="form-group col-6">
                                                <label for="">Mobile Number</label>
                                                <input disabled type="text" value={data?.phoneNumber} class="form-control" />
                                            </div>
                                            <div class="form-group col-6">
                                                <label for="">Years Of Experience</label>
                                                <input disabled type="text" value={data?.experienceTime} class="form-control" />
                                            </div>
                                            <div class="form-group col-6">
                                                <label for="">Commission</label>
                                                <input disabled type="text" value="10%" class="form-control" />
                                            </div>
                                            <div class="form-group col-4">
                                                <label for="">Language Proficiency</label>
                                                <input disabled type="text" value={String(data.serviceLanguage).replace(/([a-z])([A-Z])/g, '$1 $2')} class="form-control" />
                                            </div>
                                            <div class="form-group col-4">
                                                <label for="">Classify listener</label>
                                                <input disabled type="text" value="Listener+" class="form-control" />
                                            </div>
                                            <div class="form-group col-4">
                                                <label for="">EWallet</label>
                                                <input disabled type="text" value="100000 SGD" class="form-control" />
                                            </div>
                                            <div class="form-group col-12">
                                                <label for="">Certifications</label>
                                                <div class="Certifications_img row">
                                                    <div class="col-md-12">
                                                        <input disabled type="text" value={data?.certification} class="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 mt-4 mb-4">
                                                <div class="row inner_details border mx-0 py-3 px-2 position-relative">
                                                    <div class="col-12 mb-3">
                                                        <h2 class="inner_details_head">Booked Appointment Details :</h2>
                                                    </div>
                                                    <div class="col-12">
                                                        <ul class="Appointment_details">
                                                            <li><p>Friday, 11 August 2023, 8PM Video Call</p></li>
                                                            <li><p>Friday, 11 August 2023, 8PM Video Call</p></li>
                                                            <li><p>Friday, 11 August 2023, 8PM Video Call</p></li>
                                                            <li><p>Friday, 11 August 2023, 8PM Video Call</p></li>
                                                            <li><p>Friday, 11 August 2023, 8PM Video Call</p></li>
                                                            <li><p>Friday, 11 August 2023, 8PM Video Call</p></li>
                                                            <li><p>Friday, 11 August 2023, 8PM Video Call</p></li>
                                                            <li><p>Friday, 11 August 2023, 8PM Video Call</p></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="col-12 design_outter_comman shadow">
                            <div class="row comman_header justify-content-between">
                                <div class="col">
                                    <h2>Withdrawal History</h2>
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
                                                    <th>Sr.No.</th>
                                                    <th>User Name</th>
                                                    <th>Date & Time</th>
                                                    <th>Amount</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>0003</td>
                                                    <td>Mohd. Arbab</td>
                                                    <td>Friday, 11 August 2023, 8PM</td>
                                                    <td>100 SGD</td>
                                                    <td>Successful</td>
                                                </tr>
                                                <tr>
                                                    <td>0003</td>
                                                    <td>Mohd. Arbab</td>
                                                    <td>Friday, 11 August 2023, 8PM</td>
                                                    <td>100 SGD</td>
                                                    <td>Successful</td>
                                                </tr>
                                                <tr>
                                                    <td>0003</td>
                                                    <td>Mohd. Arbab</td>
                                                    <td>Friday, 11 August 2023, 8PM</td>
                                                    <td>100 SGD</td>
                                                    <td>Successful</td>
                                                </tr>
                                                <tr>
                                                    <td>0003</td>
                                                    <td>Mohd. Arbab</td>
                                                    <td>Friday, 11 August 2023, 8PM</td>
                                                    <td>100 SGD</td>
                                                    <td>Successful</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="row Total_amt mx-0 py-3">
                                <div class="col-6">
                                    <strong>Total Withdrawal Amount: </strong>
                                </div>
                                <div class="col-6 text-end">
                                    <span>400 SGD</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div >

        </>
    )
}

export default ListenerView