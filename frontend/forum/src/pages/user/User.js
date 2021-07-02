import React from 'react'
import Navbar from "../../components/navbar/Navbar.js";
import UserProfile  from '../../components/userprofile/UserProfile.js';

import UserActivity from '../../components/useractivity/UserActivity.js';

export default function User() {
    return (
        <div>
            <div className="home__header">
                <Navbar />
            </div>
            <UserProfile/>

            <div><UserActivity/></div>
        </div>
    )
}
