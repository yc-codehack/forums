import React from 'react'
import "./menucard.css"
import { Link } from "react-router-dom"

export default function Menucard() {
    return (
        <div>
             <div className="container-xs " >
                <div className="card  menu-card mt-5" >
               
                            <div className="row-sm mt-5 mb-2 menu-card-item"> <i class="fas fa-home icon "></i><Link to="/"> Home </Link> </div>
                            <div className="row-sm mt-2 mb-2 menu-card-item"> <i class="fas fa-users icon "></i><Link to="/">Top Users </Link> </div>
                            <div className="row-sm mt-2 mb-5 menu-card-item"> <i class="fas fa-compass icon"></i><Link to="/">Category</Link> </div>
                </div>

             </div>
        </div>
    )
}
