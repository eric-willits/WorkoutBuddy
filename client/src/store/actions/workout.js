import * as actionTypes from './actionTypes';
import axios from 'axios';
import { tokenConfig } from './auth';

export const addWorkout = workout => (dispatch, getState) =>{
    axios.post('/api/workouts', workout, tokenConfig(getState))
        .then(res => dispatch({
            type: actionTypes.ADD_WORKOUT,
            workout: res.data
        }))
}

export const getWorkouts = () => (dispatch, getState) => {
    axios.get('/api/workouts', tokenConfig(getState))
        .then(res => dispatch({
            type: actionTypes.GET_WORKOUTS,
            workouts: res.data
        }))
}

export const getExercises = () => dispatch => {
    axios.get('/api/exercises')
        .then(res => dispatch({
            type: actionTypes.GET_EXERCISES,
            exercises: res.data
        }))
}

export const deleteWorkout = workoutId => (dispatch, getState) => {
    axios.delete('/api/workouts', tokenConfig(getState))
        .then(() => dispatch({
            type: actionTypes.DELETE_WORKOUT,
            workoutId
        }))
}

export const updateWorkout = data => (dispatch, getState) => {
    axios.put('/api/workouts', data, tokenConfig(getState))
        .then(res => dispatch({
            type: actionTypes.UPDATE_WORKOUT,
            workout: res.data
        }))
}