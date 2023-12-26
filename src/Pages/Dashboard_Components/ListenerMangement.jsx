import React from 'react'
import DashboardNavbar from './DashboardNavbar'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
const ListenerMangement = () => {
    const [data, setdata] = useState([])
    const apiBaseUrl = process.env.REACT_APP_API_URL;
    const [cat, setCat] = useState(() => {
        // Initialize cat state from local storage or an empty object
        const storedCat = localStorage.getItem('listener_stats');
        return storedCat ? JSON.parse(storedCat) : {};
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Retrieve the authentication token from local storage
                const authToken = localStorage.getItem('access');

                // Check if the token exists
                if (!authToken) {
                    throw new Error('Authentication token not found');
                }

                // Set up headers with the authentication token
                const headers = {
                    'x-auth-token-admin': authToken,
                };

                // Make the HTTP request with headers
                const response = await axios.get(`${apiBaseUrl}/api/admin/getAllListeners`, {
                    headers,
                });

                // Assuming the API response contains user data, you can access it like this:
                const userData = response.data.results.listeners;

                setdata(userData);
            } catch (error) {
                // Handle error scenarios here
                console.error('Error fetching user data:', error);
                throw error; // You may want to throw the error or handle it in a specific way.
            }
        };
        fetchUser();
    }, []);
    const listener_status = async (id) => {
        console.log(id);
        try {
            const authToken = localStorage.getItem('access');
            const headers = {
                'x-auth-token-admin': authToken,
            };
    
            const response = await fetch(`${apiBaseUrl}/api/admin/changeListenerStatus/${id}`, {
                method: 'GET',
                headers: headers,
            });
    
            const responseData = await response.json();
    
            if (!responseData.error) {
                // Update the local storage
                setCat(prevCat => {
                    const updatedCat = {
                        ...prevCat,
                        [id]: !prevCat[id]
                    };
                    localStorage.setItem('listener_stats', JSON.stringify(updatedCat));
                    return updatedCat;
                });
            } else {
                alert(responseData.message);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
    
    return (
        <>
            <div class="admin_main">
                <DashboardNavbar />
                <div class="admin_panel_data height_adjust">
                    <div class="row mx-0">
                        <div class="col-12 mb-4 px-0">
                            <div class="row justify-content-end">
                                <div class="col-auto">
                                    <a href="javascript:;" class="comman_btn d-inline-flex w-100"><span>Export CSV</span></a>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 design_outter_comman shadow mb-4">
                            <div class="row comman_header justify-content-between">
                                <div class="col">
                                    <h2>Add Commission</h2>
                                </div>
                            </div>
                            <form class="form-design py-4 px-3 help-support-form row align-items-end justify-content-between" action="">
                                <div class="form-group mb-0 col">
                                    <label for="">Add Commission</label>
                                    <input type="text" class="form-control" />
                                </div>
                                <div class="form-group mb-0 col-2">
                                    <button class="comman_btn d-flex w-100"><span>Add</span></button>
                                </div>
                            </form>
                        </div>
                        <div class="col-12 design_outter_comman shadow">
                            <div class="row comman_header justify-content-between">
                                <div class="col">
                                    <h2>Listener Management</h2>
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
                                                    <th>Listener Name</th>
                                                    <th>Email ID</th>
                                                    <th>mobile number</th>
                                                    <th>listener details</th>
                                                    <th>experience</th>
                                                    <th>Commission</th>
                                                    <th>language proficiency</th>
                                                    <th>Booked appointment details</th>
                                                    <th>Classify listener</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.fullName}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.phoneNumber}</td>
                                                        <td>
                                                            {item.profileDescription}
                                                        </td>
                                                        <td>{item.experience} yrs</td>
                                                        <td>10%</td>
                                                        <td>{String(item.serviceLanguage).replace(/([a-z])([A-Z])/g, '$1 $2')}</td>
                                                        <td>
                                                            Friday, 11 August 2023, 8PM <br />
                                                            Video Call
                                                        </td>

                                                        <td>
                                                            Listener+
                                                        </td>
                                                        <td>
                                                            <Link to={`/listener-view/${item._id}`} class="comman_btn table_viewbtn"><span>View</span></Link>
                                                            <a class="comman_btn2 table_viewbtn ms-1" href="javascript:;" data-bs-toggle="modal" data-bs-target="#edit"><span>Edit</span></a>
                                                            <a
                                                                onClick={() => listener_status(item._id)}
                                                                className={`comman_btn ${item.status ? 'black block' : 'bg-success unblock'} table_viewbtn ms-1`}

                                                                href="javascript:;"
                                                            >
                                                                <span>{item.status ? 'Block' : 'Unblock'}</span>
                                                            </a>
                                                            <a class="comman_btn bg-danger table_viewbtn ms-1" href="javascript:;"><span>Delete</span></a>
                                                        </td>
                                                    </tr>
                                                ))}
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
                                    <label for="">Listener Name</label>
                                    <input type="text" class="form-control" value="Mohd. Arbab" />
                                </div>
                                <div class="form-group col-4">
                                    <label for="">Email ID</label>
                                    <input type="text" value="xyz@gmail.com" class="form-control" />
                                </div>
                                <div class="form-group col-4">
                                    <label for="">Mobile Number</label>
                                    <input type="text" value="+65 234234234" class="form-control" />
                                </div>
                                <div class="form-group col-12">
                                    <label for="">Listener Details</label>
                                    <textarea class="form-control" name="" id="" style={{ height: "60px" }}>Master of Counselling and Practising for 5 years.</textarea>
                                </div>
                                <div class="form-group col-4">
                                    <label for="">Experience</label>
                                    <input type="text" value="7 Years" class="form-control" />
                                </div>
                                <div class="form-group col-4">
                                    <label for="">Commission</label>
                                    <input type="text" value="10%" class="form-control" />
                                </div>
                                <div class="form-group col-4">
                                    <label for="">Language Proficiency</label>
                                    <input type="text" value="English , German , French" class="form-control" />
                                </div>
                                <div class="form-group col-6">
                                    <label for="">Booked Appointment Details</label>
                                    <input type="text" value="Friday, 11 August 2023, 8PM Video Call" class="form-control" />
                                </div>
                                <div class="form-group col-6">
                                    <label for="">Classify listener</label>
                                    <input type="text" value="Listener+" class="form-control" />
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

export default ListenerMangement