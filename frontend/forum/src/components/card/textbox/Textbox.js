import React from 'react'
import "./textbox.css"

export default function Textbox() {



    function fileValidation() {
        var fileInput = 
            document.getElementById('image-upload-icon');
          
        var filePath = fileInput.value;
      
        // Allowing file type
        var allowedExtensions = 
                /(\.jpg|\.jpeg|\.png|\.gif)$/i;
          
        if (!allowedExtensions.exec(filePath)) {
            alert('Invalid file type');
            fileInput.value = '';
            return false;
        } 
        /*else 
        {
          
            // Image preview
            if (fileInput.files && fileInput.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById(
                        'imagePreview').innerHTML = 
                        '<img src="' + e.target.result
                        + '"/>';
                };
                  
                reader.readAsDataURL(fileInput.files[0]);
            }
        }*/
    }




    return (
        <div>
            {/*<div id="imagePreview"></div>*/}
            <div className="" style={{ color :"black" , fontSize : "24px"}}> 
                    Your Answer... 
                </div>
                <hr style={{width : "50%", maxWidth : "650px",  border: "none",  height: "5px", background : "black"}}></hr>
            <div className="container-sm d-flex justify-content-center "/*key={item._id}*/>
                
                <div className="card mb-3 ans-card textbox-card">
                    <div className="row ">
                        <form>
                            <div className="d-flex justify-content-start">
                                <label title="File Upload" for="file-upload-icon"><i class="fas fa-file-alt"></i></label>
                                <input id="file-upload-icon" className="file-input" type="file"></input>
                                <label title="Image Upload" for="image-upload-icon"><i class="fas fa-image"></i></label>
                                <input id="image-upload-icon" className="image-input" type="file" onChange={fileValidation}></input>
                            </div>
                            
                            <textarea rows="10" cols="110" placeholder="Add your answer here...."></textarea>
                            <div className="d-flex justify-content-end">
                                <button type="button" class="btn btn-primary ">Post Your Answer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
