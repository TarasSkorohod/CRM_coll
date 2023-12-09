import {useEffect, useState} from "react";

const CustomCheckBoxArrow = ({className, checkedState, render}) => {
    const [chk, setChk] = useState(checkedState ? checkedState : false);

    useEffect(() => {
        setChk(checkedState);
    }, [checkedState, render])

    return (
        <label className={`checkbox ${className}`}>
            <input type="checkbox" onChange={() => setChk(!chk)} checked={chk}/>
            <svg className={`${chk ? "active" : ""}`} xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                 viewBox="0 0 30 30" fill="none">
                <rect x="1" y="1" width="28" height="28" rx="3" fill="transparent" stroke="#0E0E0E" strokeWidth="2"/>
                <path
                    d="M26.4843 8.19404L11.4322 23.1263C11.3448 23.213 11.241 23.2819 11.1268 23.3288C11.0126 23.3758 10.8902 23.4 10.7666 23.4C10.6429 23.4 10.5205 23.3758 10.4063 23.3288C10.2921 23.2819 10.1884 23.213 10.101 23.1263L3.51569 16.5934C3.33916 16.4183 3.23999 16.1808 3.23999 15.9331C3.23999 15.6855 3.33916 15.448 3.51569 15.2728C3.69221 15.0977 3.93163 14.9993 4.18127 14.9993C4.43091 14.9993 4.67033 15.0977 4.84686 15.2728L8.65367 19.0501C9.82327 20.2106 11.7099 20.2107 12.8796 19.0502L25.1531 6.87347C25.3296 6.69836 25.5691 6.59998 25.8187 6.59998C26.0684 6.59998 26.3078 6.69836 26.4843 6.87347C26.6608 7.04859 26.76 7.2861 26.76 7.53376C26.76 7.78141 26.6608 8.01892 26.4843 8.19404Z"
                    fill="#46DA2E"/>
            </svg>
        </label>
    );
};

export default CustomCheckBoxArrow;