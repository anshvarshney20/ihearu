import React from 'react';
import { useState,useEffect } from 'react';
import DashboardNavbar from './DashboardNavbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const UserView = () => {
    const { _id } = useParams();
    const [data, setData] = useState({});
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

                const response = await axios.get(`${apiBaseUrl}/api/admin/viewCaller/${_id}`, {
                    headers,
                });
                console.log(response.data.results.caller);
                const userData = response.data.results.caller;
                setData(userData);
                console.log(userData)
            } catch (error) {
                console.error('Error fetching user data:', error);
                throw error;
            }
        };

        fetchUser();
    }, [_id]);

    const userList = Array.isArray(data) ? data : [];
    return (
        <>
            <div className='admin_main'>

                <DashboardNavbar />
                <div className="admin_panel_data height_adjust">
                    <div className="row mx-0">
                        <div className="col-12 design_outter_comman shadow mb-4 toggle_set">
                            <div className="row comman_header justify-content-between">
                                <div className="col-auto">
                                    <h2>User Details</h2>
                                </div>
                            </div>
                            <div className="row">
                                <form className="row align-items-center justify-content-center form-design position-relative p-4 py-5">
                                    <div className="col-12 mb-4">
                                        <div className="row adjust_margin">
                                            <div className="form-group col-12 mb-2">
                                                <div className="userinfor_box text-center">
                                                    <span className="user_imgg">
                                                        <img src={data?.image} alt="" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-10">
                                        <div class="row">
                                            <div class="form-group col-12">
                                                <label for="">Full Name</label>
                                                <input disabled type="text" class="form-control" value={data?.fullName} />
                                            </div>
                                            <div class="form-group col-4">
                                                <label for="">Year Of Birth</label>
                                                <input disabled type="text" class="form-control" value={data?.birthYear} />
                                            </div>
                                            <div class="form-group col-4">
                                                <label for="">Display Name</label>
                                                <input disabled type="text" class="form-control" value={data?.displayName} />
                                            </div>
                                            <div class="form-group col-4">
                                                <label for="">Gender</label>
                                                <input disabled type="text" class="form-control" value={data?.gender} />
                                            </div>
                                            <div class="form-group col-4">
                                                <label for="">Email Id</label>
                                                <input disabled type="text" value={data?.email} class="form-control" />
                                            </div>
                                            <div class="form-group col-6">
                                                <label for="">Mobile Number</label>
                                                <input disabled type="text" value={data?.phoneNumber} class="form-control" />
                                            </div>
                                            <div class="form-group col-6">
                                                <label for="">Transaction Details
                                                </label>
                                                <input disabled type="text" value="Debit Card" class="form-control" />
                                            </div>
                                            <div class="form-group col-12">
                                                <label for="">Appointment Details</label>
                                                <textarea disabled class="form-control" name="" id="" style={{ height: "100px" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</textarea>
                                            </div>


                                            <div class="col-12 mt-4">
                                                <div class="row inner_details border mx-0 py-3 px-2 position-relative">
                                                    <div class="col-12 mb-3">
                                                        <h2 class="inner_details_head">Emergency Contact Details :</h2>
                                                    </div>
                                                    <div class="form-group col-6">
                                                        <label for="">Full Name</label>
                                                        <input disabled="" type="text" class="form-control" value={data?.emergencyContactName} />
                                                    </div>
                                                    <div class="form-group col-6">
                                                        <label for="">Relations</label>
                                                        <input disabled="" type="text" class="form-control" value={data?.emergencyContactRelation} />
                                                    </div>
                                                    <div class="form-group col-6">
                                                        <label for="">Contact Number</label>
                                                        <input disabled="" type="text" class="form-control" value={data?.emergencyContactNumber} />
                                                    </div>
                                                    <div class="form-group col-6">
                                                        <label for="">Appointment Details</label>
                                                        <input disabled="" type="text" class="form-control" value="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
                                                    </div>
                                                    <div class="form-group col-6">
                                                        <label for="">Transaction Details</label>
                                                        <input disabled="" type="text" class="form-control" value="Debit Card" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-auto"></div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserView;
