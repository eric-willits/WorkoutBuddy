import React, { Component } from 'react';
import "./Workouts.css";
import Workout from './Workout/Workout';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

class Workouts extends Component {
    render() {
        return (
            <div>
                <h4 className="workouts__container--header">WORKOUTS</h4>
                {this.props.workouts ? (
                    this.props.workouts.map((workout, index) => <Workout workout={workout} key={index}/>)
                ) : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        workouts: state.workout.workouts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addWorkout: workout => dispatch(actions.addWorkout(workout))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Workouts);