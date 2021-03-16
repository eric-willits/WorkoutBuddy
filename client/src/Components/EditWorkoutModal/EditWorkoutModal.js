import React, { useState } from 'react';
import "./EditWorkoutModal.css";
import RadioButton from '../UI/RadioButton/RadioButton';
import AddExerciseModal from '../AddExerciseModal/AddExerciseModal';
import Exercise from '../Exercise/Exercise';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

function UpdateWorkoutModal(props) {
    const [showModal, setShowModal] = useState(false);
    const [date, setDate] = useState(props.workout.date);
    const [muscleGroups, setMuscleGroups] = useState([...props.workout.muscleGroups]);
    const [exercises, setExercises] = useState([...props.workout.exercises]);
    const [notes, setNotes] = useState(props.workout.notes ? props.workout.notes : "");

    const addMuscleGroup = e => {
        //remove target value if it already exists in the array
        let editMuscleGroups = muscleGroups.filter(muscleGroup => muscleGroup !== e.target.value);
        //add target value, if checked
        if(e.target.checked){
            editMuscleGroups.push(e.target.value);
        }
        setMuscleGroups(editMuscleGroups);
    }

    const addExercise = exercise => {
        let editExercises = [...exercises];
        editExercises.push(exercise);
        setExercises(editExercises);
    }

    const deleteExercise = exerciseName => {
        let editExercises = exercises.filter(exercise => exercise.exerciseId.name !== exerciseName);
        setExercises(editExercises);
    }

    const updateWorkout = () => {
        //map populated exerciseId to object id
        const updatedExercises = exercises.map(exercise => {
            if(exercise.exerciseId){
                let id = exercise.exerciseId._id;
                return {
                    exerciseId: id,
                    sets: exercise.sets,
                    reps: exercise.reps,
                    weight: exercise.weight
                }
            } else {
                let matchingExercise = props.masterExercises.find(entry => entry.name === exercise.name);
                return {
                    exerciseId: matchingExercise._id,
                    sets: exercise.sets,
                    reps: exercise.reps,
                    weight: exercise.weight
                }
            }
        })
        //config data for dispatch
        const data = {
            id: props.workout._id,
            data: {
                date,
                muscleGroups,
                exercises: updatedExercises,
                notes
            }
        }
        props.updateWorkout(data);
        setShowModal(false);
    }

    return (
        <div>
            <button onClick={() => setShowModal(true)} className="editworkout__button--edit">edit</button>
                {showModal ? (<>
                <div className="editworkout__modal--background" onClick={() => setShowModal(false)}>&nbsp;</div>
                <div className="editworkout__modal">
                    <div className="editworkout__header--container">
                        <h3 className="editworkout__header">EDIT WORKOUT</h3>
                    </div>
                    <div className="editworkout__date--container">
                        <div className="left__column">
                            <label htmlFor="date" className="editworkout__date--label">Date</label>
                        </div>
                        <div className="right__column">
                            <input type="date" name="date" min="2021-01-01" max="2021-12-31" value={date} onChange={e => setDate(e.target.value)}
                                className="editworkout__date--input"
                            />
                        </div>
                    </div>
                    <div className="editworkout__muscleGroups--container">
                        <div className="left__column">
                            <p className="editworkout__muscleGroups--header">Muscle</p>
                            <p className="editworkout__muscleGroups--header">Groups</p>
                        </div>
                        <div className="right__column">
                            <div className="editworkout__inputs--container">
                                <div className="editworkout__muscleGroups">
                                    <RadioButton type="checkbox" name="groups" value="biceps" active={muscleGroups.includes("biceps")} onClick={e => addMuscleGroup(e)}>Biceps</RadioButton>
                                    <RadioButton type="checkbox" name="groups" value="triceps" active={muscleGroups.includes("triceps")} onClick={e => addMuscleGroup(e)}>Triceps</RadioButton>
                                    <RadioButton type="checkbox" name="groups" value="shoulders" active={muscleGroups.includes("shoulders")} onClick={e => addMuscleGroup(e)}>Shoulders</RadioButton>
                                </div>
                                <div className="editworkout__muscleGroups">
                                    <RadioButton type="checkbox" name="groups" value="back" active={muscleGroups.includes("back")} onClick={e => addMuscleGroup(e)}>Back</RadioButton>
                                    <RadioButton type="checkbox" name="groups" value="chest" active={muscleGroups.includes("chest")} onClick={e => addMuscleGroup(e)}>Chest</RadioButton>
                                    <RadioButton type="checkbox" name="groups" value="legs" active={muscleGroups.includes("legs")} onClick={e => addMuscleGroup(e)}>Legs</RadioButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="editworkout__addExercise--container">
                        <AddExerciseModal 
                            onClick={exercise => addExercise(exercise)} 
                            options={props.masterExercises.map(exercise => exercise.name)}/>
                    </div>
                    <div className="editworkout__exercises--container">
                        {exercises.map((exercise, index) => {
                            return (
                                <div key={index} className="editworkout__exercise--container">
                                    <button 
                                        className="editworkout__deleteExercise"
                                        onClick={() => deleteExercise(exercise.exerciseId.name)}> - </button>
                                    <Exercise exercise={exercise}/>
                                </div>
                            )
                    })}
                    </div>
                    <div className="editworkout__notes--container">
                        <div className="left__column">
                            <p className="editworkout__notes--label">Notes</p>
                        </div>
                        <div className="right__column">
                            <textarea 
                                className="editworkout__notes--input"
                                value={notes}
                                onChange={e => setNotes(e.target.value)}/>
                        </div>
                    </div>
                    <div className="editworkout__modal--submit">
                        <button className="editworkout__button--submit" onClick={updateWorkout}>SUBMIT</button>
                    </div>
                </div>
                </>) : null}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        masterExercises: state.workout.masterExercises
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateWorkout: data => dispatch(actions.updateWorkout(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateWorkoutModal);