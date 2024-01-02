import React, { useState, useEffect } from 'react';
import DashboardNavbar from './DashboardNavbar';

const PromoCodeManagement = () => {
  const [data, setData] = useState([]);
  const [promoCodeForm, setPromoCodeForm] = useState({
    name: '',
    validFrom: '',
    validTo: '',
    discount: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [toggle, setoggle] = useState(false)
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSearchs = () => {
    // Filter data based on date range
    const filtered = data.filter((item) => {
      const itemDate = new Date(item.updatedAt);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      // Function to format date as yyyy-mm-dd
      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      return (
        (!start || formatDate(itemDate) >= formatDate(start)) &&
        (!end || formatDate(itemDate) <= formatDate(end))
      );
    });

    setFilteredData(filtered);
  };

  useEffect(() => {
    handleSearchs();
  }, [startDate, endDate, data]);
  useEffect(() => {
    const fetchPromocode = async () => {
      try {
        const authToken = localStorage.getItem('access');
        if (!authToken) {
          throw new Error('Authentication token not found');
        }

        const headers = {
          'x-auth-token-admin': authToken,
        };

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/getAllPromocodes`, {
          method: 'POST',
          headers: {
            ...headers,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const userData = await response.json();
        setData(userData.results.promocodes);
      } catch (error) {
        console.error('Error fetching promo codes:', error);
        // Handle errors accordingly
      }
    };

    fetchPromocode();
  }, []);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'numeric', year: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPromoCodeForm({
      ...promoCodeForm,
      [name]: value,
    });
  };

  const discount_toogle = () => {
    setoggle((prevToggle) => !prevToggle);
  }
  const addPromocode = async (e) => {
    e.preventDefault();

    try {
      const authToken = localStorage.getItem('access');
      if (!authToken) {
        throw new Error('Authentication token not found');
      }

      // Validate the "validFrom" field
      if (!promoCodeForm.validFrom) {
        throw new Error('Please provide a valid start date');
      }

      // Format the date fields as "YYYY-MM-DD"
      const formattedvalidFrom = new Date(promoCodeForm.validFrom).toISOString().split('T')[0];
      const formattedvalidTo = promoCodeForm.validTo
        ? new Date(promoCodeForm.validTo).toISOString().split('T')[0]
        : null;

      // Convert discount to integer
      const discount = parseInt(promoCodeForm.discount, 10);

      const headers = {
        'x-auth-token-admin': authToken,
        'Content-Type': 'application/json',
      };

      const requestBody = {
        ...promoCodeForm,
        validFrom: formattedvalidFrom,
        validTo: formattedvalidTo,
        discount: discount,
      };

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/addPromocode`, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      // Optionally, update the data state with the new promo code
      setData([...data, result.results.promocode]);

      // Clear the form fields
      setPromoCodeForm({
        name: '',
        validFrom: '',
        validTo: '',
        discount: '',
      });
    } catch (error) {
      console.error('Error adding promo code:', error.message);
      if (error.response) {
        console.error('Server Error Data:', error.response.data);
        console.error('Server Error Status:', error.response.status);
        console.error('Server Error Headers:', error.response.headers);
      } else if (error.request) {
        console.error('No Response Received');
        console.error('Request Data:', error.request);
      } else {
        console.error('Error Message:', error.message);
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery, data]);

  return (
    <>
      <div className='admin_main'>
        <DashboardNavbar />
        <div className="admin_panel_data height_adjust">
          <div className="row mx-0">
            <div className="col-12 design_outter_comman shadow mb-4">
              <div className="row comman_header justify-content-between">
                <div className="col">
                  <h2>Add Promo Code</h2>
                </div>
              </div>
              <form class="form-design py-4 px-3 help-support-form row align-items-end justify-content-between" onSubmit={addPromocode}>
                <div class="form-group col-6">
                  <label for="">Promo Code</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={promoCodeForm.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div class="form-group col-6">
                  <div class="row align-items-end">
                    <label for="">Number of Redeemable Times</label>
                    <input type="text" class="form-control" />
                  </div>
                </div>
                <div class="form-group col-6">
                  <label htmlFor="validFrom">Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={promoCodeForm.validFrom}
                    onChange={handleInputChange}
                    name="validFrom"
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="validTo">End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={promoCodeForm.validTo}
                    onChange={handleInputChange}
                    name="validTo"
                  />
                </div>
                <div className="form-group mb-0 col">
                  <div id="Menu1" className="col form-group position-relative percentage_icons mb-0">
                    <label htmlFor="">Choose Discount Type :</label>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        onClick={discount_toogle}
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        checked={!toggle}
                      />
                      <label className="form-check-label" htmlFor="flexRadioDefault1">
                        Flat Amount off
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        onClick={discount_toogle}
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        checked={toggle}
                      />
                      <label className="form-check-label" htmlFor="flexRadioDefault2">
                        Flat Discount % off
                      </label>
                    </div>
                  </div>
                  <div id="Menu2" class="form-group mb-0 col" style={{ display: "none" }}>
                    <label for="">Fixed  Price</label>
                    <input type="text" class="form-control" value="" name="name" id="name" />
                  </div>

                </div>
                <div class="form-group mb-0 col">
                  <label for="">{toggle ? 'Discount %' : 'Amount'}</label>
                  <input
                    type="text"
                    className="form-control"
                    value={promoCodeForm.discount}
                    onChange={handleInputChange}
                    name="discount"
                  />
                </div>
                <div class="form-group mb-0 col-2">
                  <button class="comman_btn d-flex w-100"><span>Add</span></button>
                </div>
              </form>

            </div>
            <div class="col-12 design_outter_comman shadow mb-4">
              <div class="row comman_header justify-content-between">
                <div class="col">
                  <h2>Promocode Management</h2>
                </div>
                <div class="col-3">
                  <form class="form-design" action="">
                    <div class="form-group mb-0 position-relative icons_set">
                      <input type="text" class="form-control" placeholder="Search" value={searchQuery}
                        onChange={handleSearchChange}
                        name="name" id="name" />
                      <i class="far fa-search"></i>
                    </div>
                  </form>
                </div>
              </div>
              <form className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between" action="" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                <div className="form-group mb-0 col-5">
                  <label htmlFor="">From</label>
                  <input type="date" className="form-control" value={startDate} onChange={handleStartDateChange} />
                </div>
                <div className="form-group mb-0 col-5">
                  <label htmlFor="">To</label>
                  <input type="date" className="form-control" value={endDate} onChange={handleEndDateChange} />
                </div>
                <div className="form-group mb-0 col-2">
                  <button className="comman_btn d-flex w-100" type="submit"><span>Search</span></button>
                </div>
              </form>
              <div class="row">
                <div class="col-12 comman_table_design px-0">
                  <div class="table-responsive">
                    <table class="table mb-0">
                      <thead>
                        <tr>
                          <th>S.No.</th>
                          <th>Promo code Name</th>
                          <th>Number of %</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Number of Redeemable Times</th>
                          <th>Amount</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item?.name}</td>
                            <td>{item.discount}</td>
                            <td>{formatDate(item.validFrom)}</td>
                            <td>{formatDate(item.validTo)}</td>
                            <td>10</td>
                            <td>100 SGD</td>
                            <td>
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
            <div class="col-12 design_outter_comman shadow">
              <div class="row comman_header justify-content-between">
                <div class="col">
                  <h2>Redemption History</h2>
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
                          <th>User Name</th>
                          <th>Promo code Name</th>
                          <th>Number of %</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Number of Redeemable Times</th>
                          <th>Booking Name</th>
                          <th>Amount</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Jennifer Garcia</td>
                          <td>IHearUBeta2024</td>
                          <td>5</td>
                          <td>01/07/2022</td>
                          <td>10/07/2022</td>
                          <td>60</td>
                          <td>Stress</td>
                          <td>100 SGD</td>
                          <td>
                            <a class="comman_btn bg-danger table_viewbtn ms-1" href="javascript:;"><span>Delete</span></a>
                          </td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Jennifer Garcia</td>
                          <td>IHearUBeta2024</td>
                          <td>5</td>
                          <td>01/07/2022</td>
                          <td>10/07/2022</td>
                          <td>60</td>
                          <td>Stress</td>
                          <td>100 SGD</td>
                          <td>
                            <a class="comman_btn bg-danger table_viewbtn ms-1" href="javascript:;"><span>Delete</span></a>
                          </td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>Jennifer Garcia</td>
                          <td>IHearUBeta2024</td>
                          <td>5</td>
                          <td>01/07/2022</td>
                          <td>10/07/2022</td>
                          <td>60</td>
                          <td>Worried ️</td>
                          <td>100 SGD</td>
                          <td>
                            <a class="comman_btn bg-danger table_viewbtn ms-1" href="javascript:;"><span>Delete</span></a>
                          </td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>Jennifer Garcia</td>
                          <td>IHearUBeta2024</td>
                          <td>5</td>
                          <td>01/07/2022</td>
                          <td>10/07/2022</td>
                          <td>60</td>
                          <td>Lonely</td>
                          <td>100 SGD</td>
                          <td>
                            <a class="comman_btn bg-danger table_viewbtn ms-1" href="javascript:;"><span>Delete</span></a>
                          </td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td>Jennifer Garcia</td>
                          <td>IHearUBeta2024</td>
                          <td>5</td>
                          <td>01/07/2022</td>
                          <td>10/07/2022</td>
                          <td>60</td>
                          <td>Angry</td>
                          <td>100 SGD</td>
                          <td>
                            <a class="comman_btn bg-danger table_viewbtn ms-1" href="javascript:;"><span>Delete</span></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      </div >

    </>
  )
}

export default PromoCodeManagement