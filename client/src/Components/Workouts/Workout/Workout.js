import React, { useState } from 'react';
import "./Workout.css";
import Exercise from '../../Exercise/Exercise';

export default function Workout(props) {
    const [showDetails, setShowDetails] = useState(false);

    const date = props.workout.date.substring(5).replace("-", "/");
    const muscleGroups = props.workout.muscleGroups.map(group => `${group}`);

    return (
        <>
            <div onClick={() => setShowDetails(true)} className="workout__container">
                <p className="workout__header workout__header--date">{date} -&nbsp;</p>
                <p className="workout__header workout__header--groups">{muscleGroups.join(", ")}</p>
                {props.workout.exercises.map((exercise, index) => <p className="workout__exercise" key={index}>{exercise.exerciseId.name} - {exercise.sets} x {exercise.reps} {exercise.weight ? `(${exercise.weight}lbs)` : null}</p>)}
                <p className="workout__exercise">. . .</p>
            </div>
            {showDetails ? (
                <>
                    <div className="workout__modal--background" onClick={() => setShowDetails(false)}>&nbsp;</div>
                    <div className="workout__modal--container">
                        <div className="workout__header--container">
                            <h4 className="workout__header">{date} -&nbsp;</h4>
                            <h5 className="workout__header">{muscleGroups.join(", ")}</h5>
                        </div>
                        <div className="workout__modal--exerciseContainer">
                            {props.workout.exercises.map((exercise, index) => <Exercise exercise={exercise} key={index}/>)}
                        </div>
                        <div className="workout__notes--container">
                            <p className="workout__notes">notes: {props.workout.notes}</p>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    )
}
