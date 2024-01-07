import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import DashboardNavbar from './DashboardNavbar';

const CategoryManagement = () => {
    const [data, setdata] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [categoryImage, setCategoryImage] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [toggle, setToggle] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const apiBaseUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    useEffect(() => {
        const authToken = localStorage.getItem('access');
        if (!authToken) {
            navigate('/'); // Redirect to login or any other page if not authenticated
        }
    }, [navigate]);

    const toggleCategoryStatus = async (id) => {
        try {
            const authToken = localStorage.getItem('access');
            const headers = {
                'x-auth-token-admin': authToken,
            };

            const response = await fetch(`${apiBaseUrl}/api/admin/categoryStatus/${id}`, {
                method: 'GET',
                headers: headers,
            });

            const responseData = await response.json();

            if (!responseData.error) {
                setToggle(prevToggle => ({
                    ...prevToggle,
                    [id]: !prevToggle[id],
                }));
                fetchUser();
            } else {
                console.error('Error toggling category status:', responseData.message);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
    const handleSearch = () => {
        const filtered = data.filter((item) => {
            const itemDate = new Date(item.updatedAt);
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;

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
        handleSearch();
    }, [startDate, endDate, data]);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const authToken = localStorage.getItem('access');
            if (!authToken) {
                console.error('Authentication token not found');
                return;
            }

            const headers = {
                'x-auth-token-admin': authToken,
            };

            const response = await axios.get(`${apiBaseUrl}/api/admin/getCategories`, {
                headers,
            });

            const userData = response.data.results.categories;
            setdata(userData);
            setFilteredData(userData);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleNameChange = (event) => {
        setCategoryName(event.target.value);
    };

    const handleImageChange = (event) => {
        setCategoryImage(event.target.files[0]);
    };

    const addCategory = async () => {
        const formData = new FormData();
        formData.append('name', categoryName);
        formData.append('image', categoryImage);

        try {
            const authToken = localStorage.getItem('access');
            const headers = {
                'x-auth-token-admin': authToken,
            };

            const response = await fetch(`${apiBaseUrl}/api/admin/newCategory`, {
                method: 'POST',
                body: formData,
                headers: headers,
            });

            const responseData = await response.json();

            if (!responseData.error) {
                console.log(responseData.message);
                console.log(responseData.results.newCat);
            } else {
                console.error('Error adding category:', responseData.message);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
        fetchUser()
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addCategory();
        navigate('/category-management');
        setCategoryImage('');
        setCategoryName('');
    };

    const handleSearchInputChange = (event) => {
        const input = event.target.value;
        setSearchInput(input);

        const filtered = data.filter((item) =>
            item.name.toLowerCase().includes(input.toLowerCase())
        );

        setFilteredData(filtered);
    };

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'numeric', year: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    const userList = Array.isArray(filteredData) ? filteredData : [];

    const delete_category = async (_id) => {
        try {
            const authToken = localStorage.getItem('access');
            const headers = {
                'x-auth-token-admin': authToken,
            };

            const response = await fetch(`${apiBaseUrl}/api/admin/deleteCategory/${_id}`, {
                method: 'GET',
                headers: headers,
            });

            const responseData = await response.json();
            if (!responseData.error) {
                fetchUser();
                alert('Category deleted successfully.');
            } else {
                console.error('Error deleting category:', responseData.message);
            }
        } catch (error) {
            console.error('An error occurred during user deletion:', error);
        }
    };

    return (
        <>
            <div className="admin_main">
                <DashboardNavbar />
                <div className="admin_panel_data height_adjust">
                    <div className="row mx-0">
                        <div className="col-12 design_outter_comman shadow mb-4">
                            <div className="row comman_header justify-content-between">
                                <div className="col">
                                    <h2>Add New Category </h2>
                                </div>
                            </div>
                            <form
                                className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                                onSubmit={handleSubmit}
                            >
                                <div className="form-group mb-0 col-5">
                                    <label htmlFor="categoryName">Category Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="categoryName"
                                        className="form-control"
                                        value={categoryName}
                                        onChange={handleNameChange}
                                    />
                                </div>
                                <div className="form-group mb-0 col-5 choose_file position-relative">
                                    <span>Category Image</span>
                                    <label htmlFor="upload_video">
                                        <i className="fal fa-camera me-1"></i>Choose File
                                    </label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        name="image"
                                        id="upload_video"
                                        onChange={handleImageChange}
                                    />
                                </div>
                                <div className="form-group mb-0 col-2">
                                    <button type="submit" className="comman_btn d-flex w-100">
                                        <span>Add</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="col-12 design_outter_comman shadow">
                            <div className="row comman_header justify-content-between">
                                <div className="col">
                                    <h2>Category Management</h2>
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
                                                value={searchInput}
                                                onChange={handleSearchInputChange}
                                            />
                                            <i className="far fa-search"></i>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <form
                                className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                                action=""
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSearch();
                                }}
                            >
                                <div className="form-group mb-0 col-5">
                                    <label htmlFor="">From</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={startDate}
                                        onChange={handleStartDateChange}
                                    />
                                </div>
                                <div className="form-group mb-0 col-5">
                                    <label htmlFor="">To</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={endDate}
                                        onChange={handleEndDateChange}
                                    />
                                </div>
                                <div className="form-group mb-0 col-2">
                                    <button className="comman_btn d-flex w-100" type="submit">
                                        <span>Search</span>
                                    </button>
                                </div>
                            </form>
                            <div className="row">
                                <div className="col-12 comman_table_design px-0">
                                    <div className="table-responsive">
                                        <table className="table mb-0">
                                            <thead>
                                                <tr>
                                                    <th>S.No.</th>
                                                    <th>Category image</th>
                                                    <th>Category Name</th>
                                                    <th>Added Date</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {userList.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            <img
                                                                className="table_img"
                                                                src={item.image.replace('/public/', '/')}
                                                                alt={item.name}
                                                            />
                                                        </td>
                                                        <td>{item.name}</td>
                                                        <td>{formatDate(item.updatedAt)}</td>
                                                        <td>
                                                            <div className="check_toggle"  onClick={()=>toggle[item._id]}>
                                                                <input
                                                                    type="checkbox"
                                                                    name="maintenance"
                                                                    id={`maintenance-${index}`}
                                                                    className="d-none"
                                                                    checked={item.status}
                                                                    onChange={() => toggleCategoryStatus(item._id)}
                                                                />
                                                                {/* Display the value of item.status */}
                                                                <label htmlFor={`maintenance-${index}`}></label>                                                            </div>                                                        </td>
                                                        <td>
                                                            <Link
                                                                to={`/category-view/${item._id}`}
                                                                className="comman_btn2 table_viewbtn"
                                                            >
                                                                <span>Edit</span>
                                                            </Link>
                                                            <a
                                                                className="comman_btn bg-danger table_viewbtn ms-1"
                                                                href="javascript:;"
                                                                onClick={() => delete_category(item._id)}
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
                </div>
            </div>
        </>
    );
};

export default CategoryManagement;
