import {useEffect, useState} from "react";

const CustomCheckBoxSwitcher = ({isChecked, type = 'black', onChange, disabled}) => {
    const [chk, setChk] = useState(isChecked || false);

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    useEffect(() => {
        setChk(isChecked);
    }, [isChecked])
    const changeState = () => {
        if(onChange) {
            const newChk = onChange(chk);
            setChk(newChk);
        } else {
            setChk(!chk);
        }
    }

    return (
        <label className={`checkbox-switcher ${type}`} onClick={stopPropagation}>
            <input
                type="checkbox"
                onChange={changeState}
                checked={chk}
                disabled={disabled}
            />
            <span></span>
        </label>
    );
};

export default CustomCheckBoxSwitcher;