import React from 'react';
import "./Exercise.css";

export default function Exercise(props) {
    return (
        <div className="exercise">
            <div className="exercise__image--container">
                {props.exercise.exerciseId ? <img src={props.exercise.exerciseId.imageURL} alt="exercise diagram" className="exercise__image"/> : null}
            </div>
            <div className="exercise__text--container">
                <p className="exercise__name">{props.exercise.exerciseId ? props.exercise.exerciseId.name : props.exercise.name}</p>
                <p className="exercise__data">{props.exercise.sets} x {props.exercise.reps} {props.exercise.weight ? `(${props.exercise.weight}lbs)` : null}</p>
            </div>
        </div>
    )
}
 