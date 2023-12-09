import {useState} from 'react';

const colors = ['#EDDA2B', '#46DA2E', '#FC2828', '#24CFDA']
const ColorPicker = ({colorDefault}) => {
    const [color, setColor] = useState(colorDefault ? colorDefault : '#EDDA2B');
    const [openColors, setOpenColors] = useState(false);

    const changeColor = (color) => {
        setColor(color);
        setOpenColors(false);
    }
    return (
        <div className="color-picker">
            <div
                className="color-picker-head"
                style={{background: color}}
                onClick={() => setOpenColors(!openColors)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="16" viewBox="0 0 24 16" fill="none">
                    <path
                        d="M22.1368 0.390698C22.2381 0.266831 22.3584 0.168576 22.4909 0.101541C22.6233 0.0345049 22.7652 3.08217e-08 22.9085 2.50114e-08C23.0519 1.92009e-08 23.1938 0.0345049 23.3262 0.101541C23.4586 0.168576 23.579 0.266831 23.6803 0.390697C23.7817 0.514565 23.8621 0.661615 23.9169 0.823455C23.9718 0.985294 24 1.15875 24 1.33393C24 1.5091 23.9718 1.68256 23.9169 1.8444C23.8621 2.00624 23.7817 2.15329 23.6803 2.27715L12.7718 15.609C12.6705 15.7329 12.5502 15.8313 12.4177 15.8984C12.2853 15.9655 12.1434 16 12 16C11.8566 16 11.7147 15.9655 11.5823 15.8984C11.4498 15.8313 11.3295 15.7329 11.2282 15.609L0.319681 2.27715C0.114992 2.027 -6.80293e-07 1.68771 -6.91261e-07 1.33393C-7.0223e-07 0.980148 0.114992 0.640859 0.319681 0.390698C0.524369 0.140539 0.801986 9.21163e-07 1.09146 9.09429e-07C1.38093 8.97694e-07 1.65855 0.140539 1.86324 0.390698L12 12.781L22.1368 0.390698Z"
                        fill="white"/>
                </svg>
            </div>
            {openColors ?
                <ul className="color-picker-body">
                    {colors.map((color, index) =>
                        <li
                            key={index}
                            style={{background: color}}
                            onClick={() => changeColor(color)}
                        ></li>
                    )}
                </ul>
                : null
            }
        </div>
    );
};

export default ColorPicker;