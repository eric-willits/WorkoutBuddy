import React, { Component } from 'react';
import "./AddExerciseModal.css";
import RadioButton from "../UI/RadioButton/RadioButton";

export default class AddExerciseModal extends Component {
    state = {
        showModal : false,
        exercise : null,
        sets : null,
        reps : null,
        weight: null
    }

    toggle = () => {
        this.setState({ 
            showModal: !this.state.showModal,
            exercise: null,
            sets: null,
            reps: null,
            weight: null
        })
    }

    selectValue = (e, property) => {
        this.setState({ [property] : e.target.value });
    }

    onSubmit = () => {
        const exercise = {
            name: this.state.exercise,
            sets: this.state.sets,
            reps: this.state.reps,
            weight: this.state.weight
        }
        this.props.onClick(exercise);
        this.toggle();
    }
    
    render() {
        return (
            <div>
                <button onClick={() => this.toggle()} className="addexercise__button">+EXERCISE</button>
                {this.state.showModal ? (<>
                <div className="addexercise__modal--background" onClick={() => this.toggle()}>&nbsp;</div>
                <div className="addexercise__modal">
                    {/* drop down exercise search bar input */}
                    <div className="addexercise__search--container">
                        <input list="exercise"
                            name="exercise"
                            onSelect={e => this.selectValue(e, "exercise")}
                            placeholder="search for an exercise"
                            className="addexercise__search--input"
                            />
                        <datalist id="exercise">
                            {this.props.options.map((option, index) => <option value={option} key={index}/>)}
                        </datalist>
                    </div>
                    <div className="addexercise__radio-section">
                        {/* sets radio button input */}
                        <div className="addexercise__radio-section--sets">
                            <p>SETS</p>
                            <div className="addexercise__inputs--container">
                                <RadioButton type="radio" name="sets" value={3} id="sets3" onClick={e => this.selectValue(e, "sets")}>3</RadioButton>
                                <RadioButton type="radio" name="sets" value={4} id="sets4" onClick={e => this.selectValue(e, "sets")}>4</RadioButton>
                                <RadioButton type="radio" name="sets" value={5} id="sets5" onClick={e => this.selectValue(e, "sets")}>5</RadioButton>
                            </div>
                        </div>
                        {/* reps radio button input */}
                        <div className="addexercise__radio-section--reps">
                            <p>REPS</p>
                            <div className="addexercise__inputs--container">
                                <RadioButton type="radio" name="reps" value={5} id="reps5" onClick={e => this.selectValue(e, "reps")}>5</RadioButton>
                                <RadioButton type="radio" name="reps" value={8} id="reps8" onClick={e => this.selectValue(e, "reps")}>8</RadioButton>
                                <RadioButton type="radio" name="reps" value={10} id="reps10" onClick={e => this.selectValue(e, "reps")}>10</RadioButton>
                                <RadioButton type="radio" name="reps" value={12} id="reps12" onClick={e => this.selectValue(e, "reps")}>12</RadioButton>
                                <RadioButton type="radio" name="reps" value={15} id="reps15" onClick={e => this.selectValue(e, "reps")}>15</RadioButton>
                                <RadioButton type="radio" name="reps" value={24} id="reps24" onClick={e => this.selectValue(e, "reps")}>24</RadioButton>
                            </div>
                        </div>
                    </div>
                    <div className="addexercise__weight--container">
                        <label className="addexercise__weight--label">Weight (lbs) &nbsp;
                        <input type="text" onChange={e => this.selectValue(e, "weight")} className="addexercise__weight--input"/></label>
                    </div>
                    <div className="addexercise__submit">
                        <button onClick={this.onSubmit} className="addexercise__button">SAVE EXERCISE</button>
                    </div>
                </div>
                </>) : null}
            </div>
        )
    }
}
