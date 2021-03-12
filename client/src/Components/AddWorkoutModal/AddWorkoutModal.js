import React, { Component } from 'react'
import "./AddWorkoutModal.css";
import AddExerciseModal from "../AddExerciseModal/AddExerciseModal";
import Exercise from '../Exercise/Exercise';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import RadioButton from '../UI/RadioButton/RadioButton';

class AddWorkoutModal extends Component {
    state = {
        showModal: false,
        stagedExercises: [],
        muscleGroups: [],
        notes: null,
        date: null
    }

    toggle = () => {
        this.setState({ 
            showModal: !this.state.showModal,
            stagedExercises: []
        })
    }

    addExercise = exercise => {
        let exercises = [...this.state.stagedExercises];
        exercises.push(exercise);
        this.setState({ stagedExercises : exercises });
    }

    addMuscleGroup = e => {
        //remove target value if it already exists in the array
        let muscleGroups = this.state.muscleGroups.filter(muscleGroup => muscleGroup !== e.target.value);
        //add target value, if checked
        if(e.target.checked){
            muscleGroups.push(e.target.value);
        }
        this.setState({ muscleGroups : muscleGroups });
    }

    sumbitWorkout = () => {
        let updatePinned = [...this.props.pinned];
        //map exercise names to exercise ID's
        const exercises = this.state.stagedExercises.map(exercise => {
            //update pinned exercise array
            let pinnedArrayEntry = updatePinned.find(entry => entry.name === exercise.name);
            if(pinnedArrayEntry){
                pinnedArrayEntry.currWeight = exercise.weight
            } else {
                updatePinned.push({
                    name: exercise.name,
                    currWeight: exercise.weight,
                    isPinned: false
                })
            }
            
            let matchingExercise = this.props.masterExercises.find(entry => entry.name === exercise.name);
            return {
                exerciseId: matchingExercise._id,
                sets: exercise.sets,
                reps: exercise.reps,
                weight: exercise.weight
            }
        })
        //send new Pin array
        this.props.updatePinned(updatePinned);
        //config workout object
        const workout = {
            date: this.state.date,
            muscleGroups: this.state.muscleGroups,
            exercises: exercises,
            notes: this.state.notes
        }
        //post to mongodb
        this.props.addWorkout(workout);
        this.setState({ showModal: false, stagedExercises: [], muscleGroups: [], notes: null, date: null});
    }

    render() {
        return (
            <div>
                <button onClick={() => this.setState({ showModal: !this.state.showModal})} className="addworkout__button">+WORKOUT</button>
                {this.state.showModal ? (<>
                <div className="addworkout__modal--background" onClick={() => this.toggle()}>&nbsp;</div>
                <div className="addworkout__modal">
                    <div className="addworkout__header--container">
                        <h3 className="addworkout__header">NEW WORKOUT</h3>
                    </div>
                    <div className="addworkout__date--container">
                        <div className="left__column">
                            <label htmlFor="date" className="addworkout__date--label">Date</label>
                        </div>
                        <div className="right__column">
                            <input type="date" name="date" min="2021-01-01" max="2021-12-31" onChange={e => this.setState({ date: e.target.value})}
                                className="addworkout__date--input"
                            />
                        </div>
                    </div>
                    <div className="addworkout__muscleGroups--container">
                        <div className="left__column">
                            <p className="addworkout__muscleGroups--header">Muscle</p>
                            <p className="addworkout__muscleGroups--header">Groups</p>
                        </div>
                        <div className="right__column">
                            <div className="addWorkout__inputs--container">
                                <div className="addworkout__muscleGroups">
                                    <RadioButton type="checkbox" name="groups" value="biceps" onClick={e => this.addMuscleGroup(e)}>Biceps</RadioButton>
                                    <RadioButton type="checkbox" name="groups" value="triceps" onClick={e => this.addMuscleGroup(e)}>Triceps</RadioButton>
                                    <RadioButton type="checkbox" name="groups" value="shoulders" onClick={e => this.addMuscleGroup(e)}>Shoulders</RadioButton>
                                </div>
                                <div className="addworkout__muscleGroups">
                                    <RadioButton type="checkbox" name="groups" value="back" onClick={e => this.addMuscleGroup(e)}>Back</RadioButton>
                                    <RadioButton type="checkbox" name="groups" value="chest" onClick={e => this.addMuscleGroup(e)}>Chest</RadioButton>
                                    <RadioButton type="checkbox" name="groups" value="legs" onClick={e => this.addMuscleGroup(e)}>Legs</RadioButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="addworkout__addExercise--container">
                        <AddExerciseModal 
                            onClick={exercise => this.addExercise(exercise)} 
                            options={this.props.masterExercises.map(exercise => exercise.name)}/>
                    </div>
                    <div className="addworkout__exercises--container">
                        {this.state.stagedExercises.map((exercise, index) => <Exercise exercise={exercise} key={index} />)}
                    </div>
                    <div className="addworkout__notes--container">
                        <div className="left__column">
                            <p className="addworkout__notes--label">Notes</p>
                        </div>
                        <div className="right__column">
                            <textarea 
                                className="addworkout__notes--input"
                                onChange={e => this.setState({ notes: e.target.value})}/>
                        </div>
                    </div>
                    <div className="addworkout__modal--submit">
                        <button onClick={this.sumbitWorkout} className="addworkout__button">SUBMIT</button>
                    </div>
                </div>
                </>) : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        masterExercises: state.workout.masterExercises,
        pinned: state.auth.user.pinned
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addWorkout: workout => dispatch(actions.addWorkout(workout)),
        updatePinned: pinned => dispatch(actions.updatePinned(pinned))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddWorkoutModal);