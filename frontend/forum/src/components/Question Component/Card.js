import Checkbox from '@material-ui/core/Checkbox';
import React from 'react';
import './Faq.css';
function Card(){
          const getValue=(e)=>{
          console.warn(e.target.value)
      }
    
        return(
            <div className='checkbox'>
                <Checkbox
                    color="primary" onChange={(e)=>getValue(e)}>
                </Checkbox>
                <label>Email me when some one post a reply</label>
            </div>
        );
    }
export default Card;