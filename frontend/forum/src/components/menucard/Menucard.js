import React from 'react'
import "./menucard.css"

export default function Menucard() {
    return (
        <div>
             <div className="container-xs " >
                <div className="card  menu-card mt-5" >
               
                            <div className="row-sm mt-5 mb-2 menu-card-item"> <i class="fas fa-home icon "></i> Home </div>
                            <div className="row-sm mt-2 mb-2 menu-card-item"> <i class="fas fa-users icon "></i>Top Users </div>
                            <div className="row-sm mt-2 mb-5 menu-card-item"> <i class="fas fa-compass icon"></i>Category </div>
                </div>

             </div>
        </div>
    )
}
