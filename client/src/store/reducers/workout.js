import * as actionTypes from '../actions/actionTypes';

const initialState = {
    workouts: [],
    masterExercises: []
}

const reducer = (state = initialState, action) => {
    let updatedWorkouts = null;
    switch(action.type){
        case(actionTypes.GET_WORKOUTS) :
            return {
                ...state,
                workouts: action.workouts
            }
        case(actionTypes.ADD_WORKOUT) :
            updatedWorkouts = [...state.workouts];
            updatedWorkouts.push(action.workout);
            return {
                ...state,
                workouts: updatedWorkouts
            }
        case(actionTypes.GET_EXERCISES) :
            return {
                ...state,
                masterExercises: action.exercises
            }
        case(actionTypes.DELETE_WORKOUT) :
            updatedWorkouts = [...state.workouts].filter(workout => workout._id !== action.workoutId);
            return {
                ...state,
                workouts: updatedWorkouts
            }
        case(actionTypes.UPDATE_WORKOUT) :
            updatedWorkouts = [...state.workouts].filter(workout => workout._id !== action.workout._id);
            updatedWorkouts.push(action.workout);
            return {
                ...state,
                workouts: updatedWorkouts
            }
        default :
            return state;
    }
}

export default reducer;