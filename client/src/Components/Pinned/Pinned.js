import React from 'react';
import "./Pinned.css";

export default function Pinned(props) {
    return (
        <div className="pin__container">
            <p className="pin__name">{props.exercise.name}</p>
            <div className="pin__weight--container">
                <p className="pin__weight">{props.exercise.currWeight}</p>
            </div>
        </div>
    )
}
