import React, { useState, useEffect } from 'react';
import DashboardNavbar from './DashboardNavbar';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const AppointmentManagement = () => {
    const [data, setdata] = useState([]);
    const [listeners, setListeners] = useState([]);
    const [cancelAppointmentId, setCancelAppointmentId] = useState(null);
    const [editAppointment, seteditAppointment] = useState(null)
    const [postponeAppointmentId, setPostponeAppointmentId] = useState(null);
    const [postponeDate, setPostponeDate] = useState('');
    const [postponeTime, setPostponeTime] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [download, setdownload] = useState(null)
    const [totalPages, setTotalPages] = useState(1);
    const [updateCounter, setUpdateCounter] = useState(1)
    const [searchQuery, setSearchQuery] = useState('');
    const [editAppointmentId, setEditAppointmentId] = useState('');
    const [editReason, setEditReason] = useState('');
    const [editStatus, setEditStatus] = useState('');
    const [editTime, setEditTime] = useState('');
    const [editCommunicationType, setEditCommunicationType] = useState('');
    const [editDate, setEditDate] = useState('');
    const [editAmount, setEditAmount] = useState('');
    const navigate = useNavigate()
    const apiBaseUrl = process.env.REACT_APP_API_URL;
    useEffect(() => {
        const fetchData = async (page) => {
            try {
                const authToken = localStorage.getItem('access');
                if (!authToken) {
                    throw new Error('Authentication token not found');
                }

                const headers = {
                    'x-auth-token-admin': authToken,
                    'Content-Type': 'application/json',
                };

                const requestBody = {
                    page: page,
                };

                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/admin/getAllSessions`,
                    {
                        method: 'PATCH',
                        headers: headers,
                        body: JSON.stringify(requestBody),
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const userData = await response.json();
                const sessionsData = userData.results.sessions;
                const userdata = sessionsData.map((session) => session.data).flat();
                setdata(userdata);

                // Update total pages based on API response
                setTotalPages(userData.results.totalPages);
            } catch (error) {
                console.error('Error fetching appointments:', error);
                // Handle errors accordingly
            }
        };
        const fetchListenerId = async () => {
            try {
                const authToken = localStorage.getItem('access');
                if (!authToken) {
                    throw new Error('Authentication token not found');
                }

                const headers = {
                    'x-auth-token-admin': authToken,
                };

                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/listenersList`, {
                    method: 'GET',
                    headers: {
                        ...headers,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const listenerData = await response.json();
                const sessionData = listenerData.results.listeners;
                setListeners(sessionData);
            } catch (error) {
                console.error('Error fetching listener IDs:', error);
                // Handle errors accordingly
            }
        };

        fetchData(currentPage);
        fetchListenerId();
    }, [currentPage]);

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'numeric', year: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    const getListenerName = (listenerId) => {
        const matchedListener = listeners.find((listener) => listener._id === listenerId);
        return matchedListener ? matchedListener.firstName : 'N/A';
    };

    const cancel_appointment = async (_id) => {
        try {
            const authToken = localStorage.getItem('access');
            if (!authToken) {
                throw new Error('Authentication token not found');
            }

            const headers = {
                'x-auth-token-admin': authToken,
            };

            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/cancelAppointment/${_id}`, {
                method: 'PUT',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Handle successful cancellation if needed
            console.log('Appointment canceled successfully!');
            setdata(prevData => {
                return prevData.map(appointment => {
                    if (appointment._id === _id) {
                        return { ...appointment, status: 'Cancelled' };
                    }
                    return appointment;
                });
            });
        } catch (error) {
            console.error('Error canceling appointment:', error);
            // Handle errors accordingly
        } finally {
            // Reset the cancelAppointmentId state
            setCancelAppointmentId(null);
        }
    };

    const postpone_appointment = async () => {
        try {
            const authToken = localStorage.getItem('access');
            if (!authToken) {
                throw new Error('Authentication token not found');
            }

            const headers = {
                'x-auth-token-admin': authToken,
                'Content-Type': 'application/json',
            };

            const requestBody = {
                date: postponeDate,
                time: postponeTime,
            };

            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/postponeSession/${postponeAppointmentId}`, {
                method: 'PUT',
                headers,
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Handle successful postponement if needed
            console.log('Appointment postponed successfully!');

            // Fetch updated data after postponing the appointment
            const updatedData = await fetchUpdatedData();
            setdata(updatedData);

        } catch (error) {
            console.error('Error postponing appointment:', error);
            // Handle errors accordingly
        } finally {
            // Reset the postponeDate, postponeTime, and postponeAppointmentId states
            setPostponeDate('');
            setPostponeTime('');
            setPostponeAppointmentId(null);
        }
    };

    const fetchUpdatedData = async () => {
        try {
            const authToken = localStorage.getItem('access');
            if (!authToken) {
                throw new Error('Authentication token not found');
            }

            const headers = {
                'x-auth-token-admin': authToken,
            };

            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/getAllSessions`, {
                method: 'PATCH',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const userData = await response.json();
            const sessionsData = userData.results.sessions;
            const updatedData = sessionsData.map(session => session.data).flat();
            return updatedData;

        } catch (error) {
            console.error('Error fetching updated data:', error);
            // Handle errors accordingly
            return [];
        }
    };
    const delete_appointment = async (_id, cancellationReason) => {
        try {
            const authToken = localStorage.getItem('access');
            if (!authToken) {
                throw new Error('Authentication token not found');
            }
    
            const headers = {
                'x-auth-token-admin': authToken,
                'Content-Type': 'application/json',
            };
    
            const body = JSON.stringify({ cancelNote: cancellationReason });
    
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/deleteSession/${_id}`, {
                method: 'POST',  // Use POST or another appropriate method
                headers: headers,
                body: body,
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error deleting appointment:', errorData);
                // Handle errors accordingly
                return;
            }
    
            // Handle successful deletion if needed
            console.log('Appointment deleted successfully!');
    
            // Fetch updated data after deleting the appointment
            const updatedData = await fetchUpdatedData();
            setdata(updatedData);
    
        } catch (error) {
            console.error('Error deleting appointment:', error);
            // Handle errors accordingly
        }
    };
    const exprt_csv = async () => {
        try {
            const authToken = localStorage.getItem('access');
            if (!authToken) {
                throw new Error('Authentication token not found');
            }

            const headers = {
                'x-auth-token-admin': authToken,
            };

            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/exportCSV`, {
                method: 'PUT',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const csv_download = await response.json();
            const csv = csv_download.results.file;
            const downloadLink = document.createElement('a');
            downloadLink.href = csv;
            downloadLink.download = 'sessions.csv';

            // Simulate a click on the link to trigger the download
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            // Handle successful cancellation if needed
        } catch (error) {
            console.error('Error Downloading:', error);
            // Handle errors accordingly
        }

    }
    const edit_session = async (_id) => {
        try {
            const authToken = localStorage.getItem('access');

            if (!authToken) {
                throw new Error('Authentication token not found');
            }

            const headers = {
                'x-auth-token-admin': authToken,
                'Content-Type': 'application/json',
            };

            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/api/admin/editSession/${_id}`,
                {
                    method: 'PUT',
                    headers: headers,
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            const appointmentData = result.results.session;

            // Update state variables with fetched data
            setEditAppointmentId(_id);
            setEditReason(appointmentData.reason);
            setEditStatus(appointmentData.status);
            setEditTime(appointmentData.time);
            setEditCommunicationType(appointmentData.communicationType);
            setEditDate(appointmentData.date);
            setEditAmount(appointmentData.amount);

            // ... (existing code)
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error;
        }
    };

    // Function to submit the updated form data
    // Function to submit the updated form data
    const updateAppointment = async () => {
        try {
            const authToken = localStorage.getItem('access');

            if (!authToken) {
                throw new Error('Authentication token not found');
            }

            const headers = {
                'x-auth-token-admin': authToken,
                'Content-Type': 'application/json',
            };

            const requestBody = {
                reason: editReason,
                status: editStatus,  // Make sure to update this with the new value
                time: editTime,
                communicationType: editCommunicationType,  // Update this with the new value
                date: editDate,
                amount: editAmount,
            };

            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/api/admin/editSession/${editAppointmentId}`,
                {
                    method: 'PUT',
                    headers,
                    body: JSON.stringify(requestBody),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            navigate('/appointment-booking-management')

            // Handle successful update if needed
            console.log('Appointment updated successfully!');

            // Update the state variables with the new values
        } catch (error) {
            console.error('Error updating appointment:', error);
            // Handle errors accordingly
        } finally {
            // ... (existing code)
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const updatedData = await fetchUpdatedData();
                setdata(updatedData);
            } catch (error) {
                // Handle errors accordingly
            }
        };

        fetchData();
    }, [updateCounter]);
    return (
        <>
            <div className="admin_main">
                <DashboardNavbar />
                <div className="admin_panel_data height_adjust">
                    <div className="row mx-0">
                        <div className="col-12 mb-4 px-0">
                            <div className="row justify-content-end">
                                <div className="col-auto">
                                    <a href="javascript:;" onClick={() => exprt_csv()} className="comman_btn d-inline-flex w-100"><span>Export CSV</span></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 design_outter_comman shadow">
                            <div className="row comman_header justify-content-between">
                                <div className="col">
                                    <h2>Appointment Booking Management</h2>
                                </div>
                                <div className="col-3">
                                    <form className="form-design" action="">
                                        <div className="form-group mb-0 position-relative icons_set">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search"
                                                name="name"
                                                id="name"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
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
                                                    <th>APPOINTMENT ID</th>
                                                    <th>User Name</th>
                                                    <th>Price</th>
                                                    <th>Listener name</th>
                                                    <th>Date and time</th>
                                                    <th>appointment status</th>
                                                    <th>Scheduled Appointment</th>
                                                    <th>Mode Of Communication</th>
                                                    <th>Hear Me Out Details</th>
                                                    <th>override appointments</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data
                                                    .filter((item) =>
                                                        item.caller?.fullName.toLowerCase().includes(searchQuery.toLowerCase())
                                                    )
                                                    .map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{item._id}</td>
                                                            <td>{item.caller?.fullName}</td>
                                                            <td>{item.amount}</td>
                                                            <td>{getListenerName(item.listener)}</td>
                                                            <td>{formatDate(item.date)}</td>
                                                            <td>{item.status}</td>
                                                            <td>{item.time}</td>
                                                            <td>{item.communicationType}</td>
                                                            <td>{item.reason}</td>
                                                            <td>
                                                                {item.status === 'Cancelled' ? (
                                                                    <a
                                                                        className="comman_btn bg-danger table_viewbtn"
                                                                    >
                                                                        <span>Cancelled</span>
                                                                    </a>
                                                                ) : item.status === 'Pending' ? (
                                                                    <>
                                                                        <a
                                                                            className="comman_btn table_viewbtn"
                                                                            href="javascript:;"
                                                                            onClick={() => setCancelAppointmentId(item._id)}
                                                                            data-bs-dismiss="modal"
                                                                            data-bs-toggle="modal" data-bs-target="#canceling"                                                                    >
                                                                            <span>Cancel</span>
                                                                        </a>
                                                                        <a
                                                                            className="comman_btn2 table_viewbtn ms-1"
                                                                            href="javascript:;"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#postpone"
                                                                            onClick={() => setPostponeAppointmentId(item._id)}                                                                    >
                                                                            <span>Postpone</span>
                                                                        </a>
                                                                    </>
                                                                ) : null}
                                                            </td>
                                                            <td>
                                                                <Link className="comman_btn table_viewbtn" to={`/view-appointment/${item._id}`}><span>View</span></Link>
                                                                <a className="comman_btn2 table_viewbtn ms-1" href="javascript:;"
                                                                    onClick={() => edit_session(item._id)}
                                                                    data-bs-toggle="modal" data-bs-target="#edit"><span>Edit</span></a>
                                                                <a
                                                                    className="comman_btn bg-danger table_viewbtn ms-1"
                                                                    href="javascript:;"
                                                                    onClick={() => delete_appointment(item._id)}
                                                                >
                                                                    <span>Delete</span>
                                                                </a>
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
                    <nav aria-label="Page navigation example" className="my-3">
                        <ul className="pagination">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button
                                    className="page-link"
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                >
                                    Previous
                                </button>
                            </li>
                            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                                (page) => (
                                    <li
                                        key={page}
                                        className={`page-item ${currentPage === page ? 'active' : ''}`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() => setCurrentPage(page)}
                                        >
                                            {page}
                                        </button>
                                    </li>
                                )
                            )}
                            <li
                                className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div >

            <div className="modal fade comman_modal edit_modal" id="canceling" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Appointment Cancel</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-0">
                            <form
                                className="form-design py-4 px-4 row"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const cancellationReason = e.target.elements.cancelNote.value;
                                    cancel_appointment(cancelAppointmentId, cancellationReason);
                                }}
                            >
                                <div className="form-group col-12">
                                    <label htmlFor="">Cancel Reason</label>
                                    <textarea className="form-control" name="cancelNote" id="" style={{ height: '100px' }}></textarea>
                                </div>
                                <div className="form-group mb-0 col-12 text-center">
                                    <button className="comman_btn d-inline-flex" type="submit">
                                        <span>Appointment Cancel</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade comman_modal edit_modal" id="postpone" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Appointment Postpone</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-0">
                            <form className="form-design py-4 px-4 row" onSubmit={(e) => e.preventDefault()}>
                                <div className="form-group col-12">
                                    <label htmlFor="">Add New Appointment Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={postponeDate}
                                        onChange={(e) => setPostponeDate(e.target.value)}
                                    />
                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="">Add New Appointment Time</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        value={postponeTime}
                                        onChange={(e) => setPostponeTime(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-0 col-12 text-center">
                                    <button
                                        className="comman_btn d-inline-flex"
                                        onClick={() => postpone_appointment(cancelAppointmentId)}
                                        data-bs-dismiss="modal"
                                    >
                                        <span>Appointment Postpone</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade comman_modal" id="edit" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Edit</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-0">
                            <form className="form-design py-4 px-4 row" onSubmit={(e) => e.preventDefault()}>
                                <div className="form-group col-4">
                                    <label htmlFor="">Reason</label>
                                    <input type="text" name='reason' className="form-control" value={editReason} onChange={(e) => setEditReason(e.target.value)} />
                                </div>
                                <div className="form-group col-4">
                                    <label htmlFor="appointmentStatus">Appointment Status</label>
                                    <select id="appointmentStatus" className="form-control" value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
                                        <option value="Completed">Completed</option>
                                        <option value="Pending">Pending</option>
                                    </select>
                                </div>
                                <div className="form-group col-4">
                                    <label htmlFor="">Time</label>
                                    <input type="text" name='time' className="form-control" value={editTime} onChange={(e) => setEditTime(e.target.value)} />
                                </div>
                                <div className="form-group col-4">
                                    <label htmlFor="communicationType">Mode Of Communication</label>
                                    <select id="communicationType" name="communicationType" className="form-control" value={editCommunicationType} onChange={(e) => setEditCommunicationType(e.target.value)}>
                                        <option value="videoCall">Video Call</option>
                                        <option value="voiceCall">Voice Call</option>
                                        <option value="chat">Chat</option>
                                        <option value="voicechat">Voice Chat</option>
                                    </select>
                                </div>
                                <div className="form-group col-4">
                                    <label htmlFor="">Date</label>
                                    <input type="text" name='date' className="form-control" value={editDate} onChange={(e) => setEditDate(e.target.value)} />
                                </div>
                                <div className="form-group col-4">
                                    <label htmlFor="">Amount</label>
                                    <input type="text" name='amount' className="form-control" value={editAmount} onChange={(e) => setEditAmount(e.target.value)} />
                                </div>
                                {/* ... (other form fields) */}
                                <div className="form-group mb-0 col-12 text-center">
                                    <button className="comman_btn d-inline-flex" onClick={updateAppointment} data-bs-dismiss="modal"><span>Update</span></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default AppointmentManagement;
