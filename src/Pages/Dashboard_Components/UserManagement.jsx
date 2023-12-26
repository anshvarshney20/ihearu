import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardNavbar from './DashboardNavbar';
import axios from 'axios';

const UserManagement = () => {
    const [originalData, setOriginalData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [cat, setCat] = useState(() => {
        // Initialize cat state from local storage or an empty object
        const storedCat = localStorage.getItem('userstats');
        return storedCat ? JSON.parse(storedCat) : {};
    });

    const apiBaseUrl = process.env.REACT_APP_API_URL;

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

                const response = await axios.get(`${apiBaseUrl}/api/admin/getAllCallers`, {
                    headers,
                });

                const userData = response.data.results.callers;
                setOriginalData(userData);
                setFilteredData(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
                throw error;
            }
        };

        fetchUser();
    }, [apiBaseUrl]);

    const user_status = async (id) => {
        console.log(id);
        try {
            const authToken = localStorage.getItem('access');
            const headers = {
                'x-auth-token-admin': authToken,
            };

            const response = await fetch(`${apiBaseUrl}/api/admin/changeCallerStatus/${id}`, {
                method: 'GET',
                headers: headers,
            });

            const responseData = await response.json();

            if (!responseData.error) {
                // Update the originalData and filteredData directly
                const updatedData = originalData.map(item =>
                    item._id === id ? { ...item, status: !item.status } : item
                );

                setOriginalData(updatedData);
                setFilteredData(updatedData);

                // Update the local storage
                setCat(prevCat => ({
                    ...prevCat,
                    [id]: !prevCat[id]
                }));
                localStorage.setItem('userstats', JSON.stringify({
                    ...cat,
                    [id]: !cat[id]
                }));
            } else {
                alert(responseData.message);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const handleSearch = () => {
        const searchTermLowerCase = searchTerm.toLowerCase();
        const filtered = originalData.filter((item) =>
            Object.values(item).some(
                (value) => typeof value === 'string' && value.toLowerCase().includes(searchTermLowerCase)
            )
        );
        setFilteredData(filtered);
    };

    return (
        <>
            <div className="admin_main">
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
                                    <h2>User Management</h2>
                                </div>
                                <div className="col-3">
                                    <form className="form-design" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                                        <div className="form-group mb-0 position-relative icons_set">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search"
                                                name="name"
                                                id="name"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
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
                                                    <th>Full name</th>
                                                    <th>year of birth</th>
                                                    <th>gender</th>
                                                    <th>Email Id</th>
                                                    <th>mobile number</th>
                                                    <th>appointment details</th>
                                                    <th>transaction details </th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredData.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.fullName}</td>
                                                        <td>{item.birthYear}</td>
                                                        <td>{item.gender}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.phoneNumber}</td>
                                                        <td>{item.appointmentDetails}</td>
                                                        <td>{item.transactionDetails}</td>
                                                        <td>
                                                            <Link to={`/user-view/${item._id}`} className="comman_btn table_viewbtn" ><span>View</span></Link>
                                                            <a className="comman_btn2 table_viewbtn ms-1" href="javascript:;" data-bs-toggle="modal" data-bs-target="#edit"><span>Edit</span></a>
                                                            <a
                                                                onClick={() => user_status(item._id)}
                                                                className={`comman_btn ${item.status ? 'black block' : 'bg-success unblock'} table_viewbtn ms-1`}
                                                                href="javascript:;"
                                                            >
                                                                <span>{item.status ? 'Block' : 'Unblock'}</span>
                                                            </a>
                                                            <a className="comman_btn bg-danger table_viewbtn ms-1" href="javascript:;"><span>Delete</span></a>
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

export default UserManagement