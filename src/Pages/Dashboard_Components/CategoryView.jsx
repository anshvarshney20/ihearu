import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import DashboardNavbar from './DashboardNavbar';

const CategoryView = () => {
    const { _id } = useParams();
    const navigate = useNavigate()
    const [data, setData] = useState({});
    const [categoryName, setCategoryName] = useState('');
    const [categoryImage, setCategoryImage] = useState(null);

    const apiBaseUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const authToken = localStorage.getItem('access');

                if (!authToken) {
                    throw new Error('Authentication token not found');
                }

                const headers = {
                    'x-auth-token-admin': authToken,
                };

                const response = await axios.get(`${apiBaseUrl}/api/admin/viewCategories/${_id}`, {
                    headers,
                });
                const categoryData = response.data.results.categories;
                setData(categoryData);
                setCategoryName(categoryData.name);
            } catch (error) {
                console.error('Error fetching category data:', error);
            }
        };

        fetchCategory();
    }, [_id, apiBaseUrl]);

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'numeric', year: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    const handleNameChange = (event) => {
        setCategoryName(event.target.value);
    };

    const handleImageChange = (event) => {
        setCategoryImage(event.target.files[0]);
    };

    const updateCategory = async () => {
        const formData = new FormData();
        formData.append('name', categoryName);
        formData.append('image', categoryImage);

        try {
            const authToken = localStorage.getItem('access');
            const headers = {
                'x-auth-token-admin': authToken,
            };

            const response = await fetch(`${apiBaseUrl}/api/admin/editCategory/${_id}`, {
                method: 'POST',
                body: formData,
                headers: headers,
            });

            const responseData = await response.json();

            if (!responseData.error) {
                console.log(responseData.message);
                console.log(responseData.results.newCat);
            } else {
                console.error(responseData.message);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const handleUpdate = (event) => {
        event.preventDefault();
        updateCategory();
        navigate('/category-management')
    };

    return (
        <>
            <div class="admin_main">
                <DashboardNavbar />
                <div class="admin_panel_data height_adjust">
                    <div class="row mx-0">
                        <div class="col-12 design_outter_comman shadow mb-4 toggle_set">
                            <div class="row comman_header justify-content-between">
                                <div class="col-auto">
                                    <h2>Update Category Details</h2>
                                </div>
                            </div>
                            <div class="row">
                                <form class="row align-items-center justify-content-center form-design position-relative p-4 py-5">
                                    <div class="col-10">
                                        <div class="row">
                                            <div class="form-group col-12 choose_file position-relative">
                                                <span>Category Image</span>
                                                <label for="upload_video"><i class="fal fa-camera me-1"></i>Choose File</label>
                                                <input type="file" class="form-control" name="image" id="upload_video" onChange={(e)=>handleImageChange(e)} />
                                            </div>
                                            <div class="form-group col-6">
                                                <label for="">Category Name</label>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    value={categoryName}
                                                    onChange={(e) => setCategoryName(e.target.value)}
                                                />
                                            </div>
                                            <div class="form-group col-6">
                                                <label for="">Added Date</label>
                                                <input
                                                    type="text"
                                                    value={formatDate(data?.updatedAt)}
                                                    class="form-control"
                                                    readOnly
                                                />
                                            </div>

                                            <div class="form-group mb-0 col-12 text-center">
                                                <button onClick={handleUpdate} class="comman_btn d-inline-flex">
                                                    <span>Update</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-auto"></div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryView;
