import React from 'react';
import DashboardNavbar from './DashboardNavbar';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
const ViewProfile = () => {
    const [data, setdata] = useState('')
    const apiBaseUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate()
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

                const response = await axios.get(`${apiBaseUrl}/api/admin/getAdminData`, {
                    headers,
                });

                const userData = response.data.results.admin;
                setdata(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
                throw error;
            }
        };

        fetchUser();
    }, []);

    return (
        <>

            <div className='admin_main'>

                <DashboardNavbar />
                <div className="admin_panel_data height_adjust">
                    <div className="row">
                        <div className="col-12 editprofile design_outter_comman shadow">
                            <div className="row comman_header justify-content-between">
                                <div className="col-auto">
                                    <h2>View Profile</h2>
                                </div>
                            </div>
                            <div className="row justify-content-center py-5">
                                <div className="col-md-12">
                                    <form className="row form-design justify-content-center position-relative mx-0 px-4">
                                        <div className="form-group col-12 text-center">
                                            <div className="account_profile position-relative d-inline-flex">
                                                <div className="circle">
                                                    <img className="profile-pic" src={data?.image ? data.image : "assets/img/profile_img1.png"} alt="" />
                                                </div>
                                                <div className="p-image">
                                                    <i className="upload-button fas fa-camera"></i>
                                                    <input className="file-upload" type="file" accept="image/*" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group col-4">
                                            <label htmlFor="name">Full Name</label>
                                            <input type="text" className="form-control" value={data?.fullName} name="name" id="name" />
                                        </div>
                                        <div className="form-group col-4">
                                            <label htmlFor="email">Email Address</label>
                                            <input type="text" className="form-control" value={data?.email} name="email" id="email" />
                                        </div>
                                        <div className="form-group col-4">
                                            <label htmlFor="mobile">Mobile Number</label>
                                            <input type="text" className="form-control" value="+65 123123192312" name="mobile" id="mobile" />
                                        </div>
                                        <div className="form-group col-12 text-center mb-0">
                                            <a className="comman_btn" href="javscript:;"><span>Save</span></a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewProfile;
