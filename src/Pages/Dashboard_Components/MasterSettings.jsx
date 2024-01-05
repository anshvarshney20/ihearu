import React from 'react'
import DashboardNavbar from './DashboardNavbar'
import { Link } from 'react-router-dom'
const MasterSettings = () => {
    return (
        <>

            <div className='admin_main'>

                <DashboardNavbar />
                <div class="admin_panel_data height_adjust">
                    <div class="row buyersseller mx-0">
                        <div class="col-12 design_outter_comman shadow px-0">
                            <ul class="nav nav-tabs comman_tabs" id="myTab" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Maintenance mode</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                <Link to='/change-password'><button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Change password</button></Link>
                                </li>
                            </ul>
                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade active show" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div class="row mx-0 px-4 pt-4 pb-5">
                                        <div class="col-12">
                                            <div class="Maintenance_mode text-center">
                                                <img src="assets/img/app-maintance.png" alt="" />
                                                <h2>App is under Maintenance</h2>
                                                <div class="Maintenance_toggle">
                                                    <div class="check_toggle">
                                                        <input type="checkbox" name="maintance" id="maintance" class="d-none" />
                                                        <label for="maintance"></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default MasterSettings