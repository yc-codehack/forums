import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


import './ProfileQues.css'
import 'font-awesome/css/font-awesome.min.css'; 
function ProfileQues(){
    return(
<div>
<div class="card" style={{width:"800px", height:"120px" }}>
<div >
  <h5>Question</h5>
</div>
<div>
  Answer
</div>


 
</div>
<button class="like">
	<i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
</button>&nbsp;

  <button class="dislike">
	<i class="fa fa-thumbs-o-down"></i>
  </button>
  <button class="del"><button class="btn"><i class="fa fa-trash"></i></button></button>
  
  </div>

    )
}
export default ProfileQues;