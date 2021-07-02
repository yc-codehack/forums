import React, { useState } from 'react';
import './Signup.css';
import {useSpring,animated} from 'react-spring';
function SignUp(){
    const[registrationFormStatus,setRegistrationFormStatus]=useState(false);
const SignupProps=useSpring({
    left:registrationFormStatus ? -500:0
})
const registerProps=useSpring({
    left:registrationFormStatus ? 0:500
})
const loginBtnProps=useSpring({borderBottom:registrationFormStatus ? 'solid 0px tansparent':'solid 2px #1059ff'})
const registerBtnProps=useSpring({borderBottom:registrationFormStatus ? 'solid 2px #1059ff':'solid 0px transparent'})
    function registerClicked(){setRegistrationFormStatus(true)}
function loginClicked(){setRegistrationFormStatus(false)}
    return(
        
    
       
        <div className="login-register-wrapper">
            
         
    
       <div className="form-group">
      
         
    <animated.form action='' id='Signup' style={SignupProps}><Signup /></animated.form>
   
    </div>
   
      
        </div>
        


    );
}
function Signup(){return(

    <React.Fragment>
   
<input type="text" id='fullname' placeholder="Full Name"/>

<input type="text" id='lastname' placeholder="Last Name"/>
       
   
<input type="email" id='username' placeholder="Email address"/>

<input type='password' id='password'  placeholder="Password" minlength="8" required/>
<input type='submit' value='Sign up' className='submit' />

</React.Fragment>
    )}

export default SignUp;