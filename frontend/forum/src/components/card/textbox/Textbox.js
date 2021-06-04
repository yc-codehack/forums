import React from 'react'
import "./textbox.css"

export default function Textbox() {
    return (
        <div>
            <div className="container-sm d-flex justify-content-center "/*key={item._id}*/>
                <div className="card mb-3 ans-card textbox-card">
                    <div className="row ">
                        <form>
                            <textarea rows="10" cols="110" ></textarea>
                            <div className="d-flex justify-content-end">
                                <button type="button" class="btn btn-primary ">Post your answer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
