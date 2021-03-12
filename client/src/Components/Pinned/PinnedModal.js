import React, { Component } from 'react';
import "./PinnedModal.css";
import RadioButton from '../UI/RadioButton/RadioButton';
import ButtonMain from '../UI/ButtonMain/ButtonMain';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

class PinnedModal extends Component {
    state = {
        pinnedExercises: []
    }

    componentDidMount = () => {
        //init pinned exercises array to include "true" pinned exercises
        let pinnedExercisesNames = this.props.pinned.filter(entry => entry.isPinned).map(entry => entry.name);
        this.setState({ pinnedExercises: pinnedExercisesNames});
    }
    
    isPinned = exerciseName => {
        let matchingEntry = this.props.pinned.find(entry => {
            return entry.name === exerciseName;
        });
        if(matchingEntry){
            //this.addExercise(exerciseName);
            return matchingEntry.isPinned;
        } else {
            return false;
        }
    }

    addExercise = e => {
        //remove target value if it already exists in the array
        let pinnedExercises = this.state.pinnedExercises.filter(pinnedExercise => pinnedExercise !== e.target.value);
        //add target value, if checked
        if(e.target.checked){
            pinnedExercises.push(e.target.value);
        }
        this.setState({ pinnedExercises : pinnedExercises });
    }

    onSave = () => {
        //set all isPinned values to false
        let updatedPinned = [...this.props.pinned].map(entry => {
            return ({
                name: entry.name,
                currWeight: entry.currWeight,
                isPinned: false
            })
        });
        //iterate through state pinned exercises array & update isPinned values to true
        this.state.pinnedExercises.forEach(exerciseName => {
            let updatedPinnedEntry = updatedPinned.find(entry => entry.name === exerciseName);
            if(updatedPinnedEntry){
                updatedPinnedEntry.isPinned = true;
            } else {
                updatedPinned.push({
                    name: exerciseName,
                    currWeight: null,
                    isPinned: true
                })
            }
        })
        this.props.updatePinned(updatedPinned);
        this.props.onClick();
    }
    
    render() {
        return (
            <div className="pinned__modal--container">
            <div className="pinned__modal--background" onClick={this.props.onClick}>&nbsp;</div>
            <div className="pinned__modal">
                {this.props.masterExercises ? this.props.masterExercises.map((exercise, index) => {
                    let isExercisePinned = this.isPinned(exercise.name);
                    return (
                        <RadioButton
                            type="checkbox" 
                            name="pinned"
                            value={exercise.name}
                            key={index}
                            active={isExercisePinned}
                            onClick={e => this.addExercise(e)}>
                        {exercise.name}</RadioButton>)
                }) : null}
                <div className="pinned__modal--button">
                    <ButtonMain onClick={this.onSave}>SAVE</ButtonMain>
                </div>
            </div>
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
        updatePinned: updatedPinned => dispatch(actions.updatePinned(updatedPinned))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PinnedModal);
