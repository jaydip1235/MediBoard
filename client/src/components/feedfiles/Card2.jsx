import React from 'react';
import './card.css';

function Card2(props) {
    return (
        <>
            <div className="card card-post m-4 border rounded" style={{ width: "18rem" }}>
                <div className="card-body text-center">
                    <h5 className="card-title text-center text-white bg-danger p-2 border rounded">{props.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted text-center">{props.username}</h6>
                    <p className="card-text text-center">{props.details}</p>
                    <button class="btn btn-danger" onClick={()=>{
                        props.onSelect(props.id);
                    }}>Delete</button>
                </div>
            </div>
        </>
    )
}

export default Card2
