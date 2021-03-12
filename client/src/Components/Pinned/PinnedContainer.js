import React, { useState } from 'react';
import "./PinnedContainer.css";
import Pinned from './Pinned';
import { connect } from 'react-redux';
import PinnedModal from './PinnedModal';

function PinnedContainer(props) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="pinned__container">
            <h4 className="pinned__container--header">PINNED</h4>
            <div className="pinned__entries--container">
                {props.pinned ? props.pinned.filter(exercise => exercise.isPinned).map((exercise, index) => <Pinned exercise={exercise} key={index}/>) : null}
            </div>
            <p className="pinned__container--footer" onClick={() => setShowModal(!showModal)}>EDIT</p>
            
            {showModal ? <PinnedModal onClick={() => setShowModal(!showModal)}/> : null}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        masterExercises: state.workout.masterExercises,
        pinned: state.auth.user.pinned
    }
}

export default connect(mapStateToProps)(PinnedContainer);