import React from 'react'
import DashboardNavbar from './DashboardNavbar'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
const ViewAppointment = () => {
  const navigate = useNavigate()
  const { _id } = useParams();
  const [data, setData] = useState({});
  const apiBaseUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const authToken = localStorage.getItem('access');
    if (!authToken) {
        navigate('/'); // Redirect to login or any other page if not authenticated
    }
}, [navigate]);


  useEffect(() => {
    const fetchSession = async () => {
      try {
        const authToken = localStorage.getItem('access');

        if (!authToken) {
          throw new Error('Authentication token not found');
        }

        const headers = {
          'x-auth-token-admin': authToken,
        };

        const response = await axios.get(`${apiBaseUrl}/api/admin/viewSession/${_id}`, {
          headers,
        });
        console.log(response.data.results);
        setData(response.data.results.session);
      } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
      }
    };
   
    fetchSession();
  }, [_id]);
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'numeric', year: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  return (
    <div className='admin_main'>
      <DashboardNavbar />
      <div class="admin_panel_data height_adjust">
        <div class="row mx-0">
          <div class="col-12 design_outter_comman shadow">
            <div class="row comman_header justify-content-between">
              <div class="col">
                <h2>Appointment Booking Details</h2>
              </div>
            </div>
            <form class="form-design py-4 px-4 row" action="">
              <div class="form-group col-4">
                <label for="">Username</label>
                <input disabled type="text" class="form-control" value={data?.caller?.fullName} />
              </div>
              <div class="form-group col-4">
                <label for="">Price</label>
                <input disabled type="text" class="form-control" value={data?.amount} />
              </div>
              <div class="form-group col-4">
                <label for="">Listener Name</label>
                <input disabled type="text" class="form-control" value={data?.listener?.fullName} />
              </div>
              <div class="form-group col-4">
                <label for="">Date and Time</label>
                <input disabled type="text" class="form-control" value={formatDate(data?.date)} />
              </div>
              <div class="form-group col-4">
                <label for="">Category of Issue</label>
                <input disabled type="text" class="form-control" value="Stress" />
              </div>
              <div class="form-group col-4">
                <label for="">Appointment Status</label>
                <input disabled type="text" class="form-control" value={data?.status} />
              </div>
              <div class="form-group col-4">
                <label for="">Appointment Duration</label>
                <input disabled type="text" class="form-control" value={data?.time} />
              </div>
              <div class="form-group col-4">
                <label for="">Mode Of Communication</label>
                <input disabled type="text" class="form-control" value={data?.communicationType} />
              </div>
              <div class="form-group col-4">
                <label for="">Hear Me Out Details</label>
                <input disabled type="text" class="form-control" value="lorem" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewAppointment