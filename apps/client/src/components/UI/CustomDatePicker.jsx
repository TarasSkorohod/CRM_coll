import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import ua from "date-fns/locale/uk";
import 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = ({otherClass = '', groups = []}) => {
    const [startDate, setStartDate] = useState(new Date());

    const ExampleCustomTimeInput = ({date, value, onChange}) => (
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{border: "solid 1px pink"}}
        />
    );

    return (
        <div className={`custom-date-picker ${otherClass}`}>
            <DatePicker
                selected={startDate}
                startDate={startDate}
                onChange={(date) => setStartDate(date)}
                inline={true}
                showTimeInput
                locale={ua}
                timeInputLabel="Час"
                customTimeInput={<ExampleCustomTimeInput/>}
            />

            {groups.length > 0 ?
                <div className="groups-select">
                    Група
                    <select className="select-custom">
                        {groups?.map((option, index) =>
                            <option key={index} value={option}>{option}</option>
                        )}
                    </select>
                </div>
                : null
            }
        </div>
    );
};

export default CustomDatePicker;