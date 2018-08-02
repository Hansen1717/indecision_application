import React from 'react';
import Option from './Option'
import AddOption from './AddOption'

const Options = (props) => (
    <div>
        <div className='widget-header'>
            <h3 className='widget-header__title'>Your Options</h3>
            <button
                className='button button--link'
                onClick={props.handleDeleteOptions}
            >
                Remove All
            </button>
        </div>
        <div className='widget-body' >
            {props.options.length === 0 && <p className='widget__message' >Please add an option to get started!</p>}
            {
                props.options.map((option, index) =>
                    <Option
                        count={index+1}
                        key={option}
                        optionText={option}
                        handleDeleteSingleOption={props.handleDeleteSingleOption}
                    />)
            }
            <AddOption handleAddOption = {props.handleAddOption}/>
        </div>
    </div>
);

export default Options;