import React from 'react';
import "./ButtonMain.css";

export default function ButtonMain(props) {
    return (
        <button onClick={props.onClick} className="buttonmain__button">{props.children}</button>
    )
}
