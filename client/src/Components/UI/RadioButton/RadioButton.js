import React from 'react';
import "./RadioButton.css";

export default function RadioButton(props) {
    return (
        <div>
            <input type={props.type}
                value={props.value} 
                name={props.name} 
                id={props.id ? props.id : props.value} 
                onClick={props.onClick}
                style={{display:"none"}}
                defaultChecked={props.active ? props.active: false}/>
            <label className="ui__radiobutton" htmlFor={props.id ? props.id : props.value}>{props.children}</label>
        </div>
    )
}
