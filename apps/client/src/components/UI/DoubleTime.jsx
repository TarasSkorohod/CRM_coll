import {forwardRef} from "react";

const DoubleTime = forwardRef(({ onChange, value }, ref) => {
    const handleWithTimeChange = (e) => {
        onChange({ ...value, with: e.target.value });
    };

    const handleOnTimeChange = (e) => {
        onChange({ ...value, on: e.target.value });
    };

    return (
        <label className="double-time">
            <input
                type="time"
                onChange={handleWithTimeChange}
                value={value?.with || ""}
                ref={ref}
            />
            <span>-</span>
            <input
                type="time"
                onChange={handleOnTimeChange}
                value={value?.on || ""}
                ref={ref}
            />
        </label>
    );
});

DoubleTime.displayName = 'DoubleTime';

export default DoubleTime;