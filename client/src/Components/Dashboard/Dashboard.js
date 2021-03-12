import React, {Component} from 'react'
import "./Dashboard.css";
import AddWorkoutModal from '../AddWorkoutModal/AddWorkoutModal';
import Workouts from '../Workouts/Workouts';
import PinnedContainer from '../Pinned/PinnedContainer';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import logoutIcon from '../../images/logout.png';

class Dashboard extends Component {
    componentDidMount = () => {
        this.props.getExercises();
        this.props.getWorkouts();
    }

    render(){
        return (
            <div className="dashboard__container">
                <div className="dashboard__header--container">
                    <h2 className="dashboard__header">DASHBOARD</h2>
                    <img src={logoutIcon} alt="logout" width="30" height="30" onClick={this.props.logout}/>
                </div>
                <div className="dashboard__pinned-exercises">
                    <PinnedContainer />
                </div>
                <div className="dashboard__add-workout">
                    <AddWorkoutModal />
                </div>
                <div className="dashboard__workouts">
                    <Workouts />
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getExercises: () => dispatch(actions.getExercises()),
        getWorkouts: () => dispatch(actions.getWorkouts()),
        logout: () => dispatch(actions.logout())
    }
}

export default connect(null, mapDispatchToProps)(Dashboard);