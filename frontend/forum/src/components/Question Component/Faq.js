import React, {useState} from 'react';
import './Faq.css';
import TextField from "@material-ui/core/TextField";
import Card from './Card.js';
class Faq extends React.Component {    
    constructor(props) {
      super(props);
      this.state = {value: 'category'};
      this.handleChange = this.handleChange.bind(this);  

      this.state = {value: 'description'}
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    render() {
      return (
        <div className='card'>
            <div className='card-content'>
            <div className='title'>
            <TextField
                label="Enter your title"
                color="primary"
                variant="filled"
                fullWidth>
            </TextField>
            </div><br/>
            <div className='category'>
            <form onChange={this.handleChange}>
                <select style={{ width:'840px',height:'50px'}} value={this.state.value} onChange={this.handleChange}>
                    <option value="category">Select Category</option>
                    <option value="datascience">Data Science</option>
                    <option value="react">React</option>
                    <option value="python">Python</option>
                </select>       
            </form>
            </div>
            <div className='sub-category'>
            <TextField
                label="Sub-category"
                color="primary"
                variant="outlined"
                fullWidth>
            </TextField>
            </div>
            <div className='description'>
              <form onChange={this.handleChange}>
                  <textarea style={{ width:'834px'}} rows={5} value={this.state.value} onChange={this.handleChange} />
              </form>
            </div>
            <hr></hr>
            <div className='card2'>
            <Card/>
            </div>
            <div className='btn'>
               <button>
                   <a>Post</a>
               </button>
           </div>
         </div>
        </div>
      );
    }
  }


export default Faq;
