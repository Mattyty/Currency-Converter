import React from 'react';
import Select from 'react-dropdown-select';

const DropDownComponent = ({label, value, options, onChange}) => {

        return(
            <div>
                <label>
                    <select value={value} onChange={onChange} defaultValue="" className="large-input">
                        <option disabled={true} value="">Please Choose a Currency</option>
                        {options.map((option) => (
                            <option value={option}>{option[0]}, {option[1]}</option>
                        ))}
                    </select>
                </label>
            </div>
        )
    }

export default DropDownComponent;