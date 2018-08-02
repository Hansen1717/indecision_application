import React from 'react';
import Action from './Action'
import Header from './Header'
import Options from './Options'
import OptionModal from './OptionModal'

export default class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    };
    handlePick = () => {
        const selectedOption = this.state.options[Math.floor(Math.random() * this.state.options.length)];
        this.setState(() => ({ selectedOption }));
    };
    handleDeleteSelectedOption = () => {
        this.setState(() => ({ selectedOption: undefined }));
    };
    handleDeleteOptions = () => {
        this.setState(() => ({ options: [] }));
    };
    handleDeleteSingleOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }))
    };
    handleAddOption = (option) => {
        if (!option) {
            return 'Enter a valid Item!'
        }
        else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists!'
        }

        this.setState((prevState) => ({ options: prevState.options.concat([option]) }));
    };
    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if (options) {
                this.setState(() => ({ options }))
            }
        }
        catch (e) {
            //Do nothing if nothing in local storage on page load
        }
    };
    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
        console.log('savingData')
    };
    render() {
        const title = 'Indecidision'
        const subtitle = 'Put your life in the hands of a computer!'

        return (
            <div>
                <Header title={title} subtitle={subtitle} />
                <div className='container'>
                    <Action
                        handlePick={this.handlePick}
                        hasOptions={this.state.options.length > 0}
                    />
                    <Options
                        options={this.state.options}
                        handleDeleteOptions={this.handleDeleteOptions}
                        handleDeleteSingleOption={this.handleDeleteSingleOption}
                        handleAddOption={this.handleAddOption}
                    />
                    <OptionModal
                        selectedOption={this.state.selectedOption}
                        handleDeleteSelectedOption={this.handleDeleteSelectedOption}
                    />
                </div>
            </div>
        )
    };
};