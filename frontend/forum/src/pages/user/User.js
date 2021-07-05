import React, {useState} from 'react'
import Navbar from "../../components/navbar/Navbar.js";
import UserProfile  from '../../components/userprofile/UserProfile.js';
import UserProfileEdit from '../../components/userprofile_edit/Profile'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import UserActivity from '../../components/useractivity/UserActivity.js';

export default function User() {

    const [edit, setEdit] = useState(false);

    return (
        <div>
            <div className="home__header">
                <Navbar />
            </div>
            <Router>
				<Switch>
					<Route path="/user" exact>
						<UserProfile />
					</Route>
                    <Route path="/user-edit" exact>
						<UserProfileEdit />
					</Route>
                </Switch>
            </Router>
            <div><UserActivity/></div>
        </div>
    )
}
