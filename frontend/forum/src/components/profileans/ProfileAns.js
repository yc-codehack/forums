import React from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';


import './ProfileAns.css'
//import 'font-awesome/css/font-awesome.min.css'; 

function ProfileAns(){
    return(
          <div>
              <div class="card" style={{width:"100%", height:"120px" }}>
                <div >
                  <h5>Question</h5>
                </div>
              <div>
                  Answer
              </div>
          </div>

          <button class="like">
            <button class="btn">
              <i class="fa fa-thumbs-up" aria-hidden="true"></i>
            </button>
          </button>&nbsp;

          <button class="dislike">
            <button class="btn">
              <i class="fa fa-thumbs-down"></i>
            </button>
          </button>

          <button class="del">
            <button class="btn">
              <i class="fa fa-trash"></i>
              </button>
            </button>
          </div>

    )
}
export default ProfileAns;