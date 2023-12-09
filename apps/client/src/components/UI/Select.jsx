import {forwardRef} from "react";

const Select = forwardRef((
    {options, type = 'white', placeholder = '', ...rest}, ref) => {

    return (
        <select
            className={`select-custom ${type} ${placeholder ? 'placeholder' : ''}`}
            ref={ref}
            {...rest}
        >
            {placeholder ? <option value="">{placeholder}</option> : null}
            {options.map((option, index) =>
                <option key={index} value={option.value}>{option.label}</option>
            )}
        </select>
    );
});

Select.displayName = 'Select';

export default Select;