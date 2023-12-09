import {useState} from 'react';
import './ CallHistory.css';
import CallHistoryItem from "./ CallHistoryItem";
import Modal from "../Modal/Modal";
import CustomDatePicker from "../UI/CustomDatePicker";

const data = [
    {
        phone: '(093)944-71-49',
        time: '16:24 01.08',
        type: "manual-dialing"
    },
    {
        phone: '(093)944-71-49',
        time: '16:24 01.08',
        type: "incoming-call"
    },
    {
        phone: '(093)944-71-49',
        time: '16:24 01.08',
        type: "automatic call"
    },
    {
        phone: '(093)944-71-49',
        time: '16:24 01.08',
        type: "manual-dialing"
    },
    {
        phone: '(093)944-71-49',
        time: '16:24 01.08',
        type: "automatic call"
    },
    {
        phone: '(093)944-71-49',
        time: '16:24 01.08',
        type: "manual-dialing"
    },
    {
        phone: '(093)944-71-49',
        time: '16:24 01.08',
        type: "incoming-call"
    },
    {
        phone: '(093)944-71-49',
        time: '16:24 01.08',
        type: "automatic call"
    },
    {
        phone: '(093)944-71-49',
        time: '16:24 01.08',
        type: "manual-dialing"
    },
    {
        phone: '(093)944-71-49',
        time: '16:24 01.08',
        type: "automatic call"
    },
    {
        phone: '(093)944-71-49',
        time: '16:24 01.08',
        type: "manual-dialing"
    },
    {
        phone: '(093)944-71-49',
        time: '16:24 01.08',
        type: "incoming-call"
    },
    {
        phone: '(093)944-71-49',
        time: '16:24 01.08',
        type: "automatic call"
    },
    {
        phone: '(093)944-71-49',
        time: '16:24 01.08',
        type: "manual-dialing"
    },
    {
        phone: '(093)944-71-49',
        time: '16:24 01.08',
        type: "automatic call"
    }
]
const lines = [
    {name: 'Черга 1'},
    {name: 'Черга 2'},
    {name: 'Черга 3'},
]

const options = [
    'Автододзвон',
    'Автододзвон2',
    'Автододзвон3',
    'Автододзвон4',
]
const CallHistory = () => {
    const [line, setLine] = useState('Черга X');
    const [numberValue, setNumberValue] = useState('');
    const [modalLines, setModalLines] = useState(false);
    const [modalKeyBoard, setModalKeyBoard] = useState(false);
    const [modalDatePicker, setModalDatePicker] = useState(false);

    const changeLine = (value) => {
        setLine(value);
        setModalLines(false);
    }

    return (
        <div className="call-history">
            <div className="call-history-head">
                <div className="call-history-select" onClick={() => setModalLines(true)}>
                    {line}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="8" viewBox="0 0 16 8" fill="none">
                        <path
                            d="M14.7578 0.195349C14.8254 0.133416 14.9056 0.0842879 14.9939 0.0507701C15.0822 0.0172523 15.1768 -1.86562e-07 15.2724 -1.90739e-07C15.3679 -1.94916e-07 15.4625 0.0172522 15.5508 0.0507701C15.6391 0.0842879 15.7193 0.133415 15.7869 0.195349C15.8544 0.257282 15.908 0.330807 15.9446 0.411727C15.9812 0.492647 16 0.579376 16 0.666963C16 0.75455 15.9812 0.841279 15.9446 0.922199C15.908 1.00312 15.8544 1.07664 15.7869 1.13858L8.51452 7.8045C8.44698 7.86647 8.36677 7.91564 8.27849 7.94919C8.1902 7.98273 8.09557 8 8 8C7.90443 8 7.8098 7.98273 7.72151 7.94919C7.63323 7.91564 7.55302 7.86647 7.48548 7.8045L0.213121 1.13858C0.0766615 1.0135 -3.16609e-07 0.843853 -3.20537e-07 0.666964C-3.24465e-07 0.490074 0.0766615 0.320429 0.213121 0.195349C0.34958 0.0702696 0.534658 4.53467e-07 0.72764 4.45031e-07C0.920622 4.36595e-07 1.1057 0.0702695 1.24216 0.195349L8 6.39049L14.7578 0.195349Z"
                            fill="#292929"/>
                    </svg>
                </div>

                <label className="call-history-input">
                    <input
                        type="text"
                        placeholder="Телефон"
                        value={numberValue}
                        onChange={(e) => setNumberValue(e.target.value)}
                    />
                    <button style={{background: '#17181C', right: '44px'}} onClick={() => setModalKeyBoard(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="13" viewBox="0 0 17 13" fill="none">
                            <path
                                d="M15.7485 0H1.25299C0.92094 -2.60833e-07 0.602467 0.141106 0.367529 0.392323C0.132591 0.64354 0.000402242 0.984323 0 1.33981V11.6586C-2.43635e-07 12.0141 0.131803 12.355 0.366456 12.6065C0.601109 12.858 0.919423 12.9996 1.25147 13H15.747C16.0791 13 16.3975 12.8589 16.6325 12.6077C16.8674 12.3565 16.9996 12.0157 17 11.6602V1.34144C17 0.985948 16.8682 0.644994 16.6335 0.393472C16.3989 0.14195 16.0806 0.000430636 15.7485 0ZM15.7857 11.6602C15.7857 11.6654 15.7848 11.6706 15.7829 11.6754C15.781 11.6803 15.7783 11.6846 15.7748 11.6883C15.7714 11.692 15.7673 11.695 15.7628 11.697C15.7582 11.699 15.7534 11.7 15.7485 11.7H1.25299C1.24811 11.7 1.24327 11.699 1.23876 11.697C1.23425 11.695 1.23015 11.692 1.2267 11.6883C1.22324 11.6846 1.2205 11.6803 1.21863 11.6754C1.21677 11.6706 1.2158 11.6654 1.2158 11.6602V1.34144C1.2158 1.33088 1.21972 1.32075 1.2267 1.31329C1.23367 1.30582 1.24313 1.30162 1.25299 1.30162H15.7485C15.7584 1.30162 15.7678 1.30582 15.7748 1.31329C15.7818 1.32075 15.7857 1.33088 15.7857 1.34144V11.6602ZM14.5714 6.5C14.5714 6.67239 14.5075 6.83772 14.3936 6.95962C14.2797 7.08152 14.1253 7.15 13.9643 7.15H3.03571C2.87469 7.15 2.72026 7.08152 2.6064 6.95962C2.49254 6.83772 2.42857 6.67239 2.42857 6.5C2.42857 6.32761 2.49254 6.16228 2.6064 6.04038C2.72026 5.91848 2.87469 5.85 3.03571 5.85H13.9643C14.1253 5.85 14.2797 5.91848 14.3936 6.04038C14.5075 6.16228 14.5714 6.32761 14.5714 6.5ZM14.5714 3.9C14.5714 4.07239 14.5075 4.23772 14.3936 4.35962C14.2797 4.48152 14.1253 4.55 13.9643 4.55H3.03571C2.87469 4.55 2.72026 4.48152 2.6064 4.35962C2.49254 4.23772 2.42857 4.07239 2.42857 3.9C2.42857 3.72761 2.49254 3.56228 2.6064 3.44038C2.72026 3.31848 2.87469 3.25 3.03571 3.25H13.9643C14.1253 3.25 14.2797 3.31848 14.3936 3.44038C14.5075 3.56228 14.5714 3.72761 14.5714 3.9ZM4.25 9.1C4.25 9.27239 4.18603 9.43772 4.07217 9.55962C3.95831 9.68152 3.80388 9.75 3.64286 9.75H3.03571C2.87469 9.75 2.72026 9.68152 2.6064 9.55962C2.49254 9.43772 2.42857 9.27239 2.42857 9.1C2.42857 8.92761 2.49254 8.76228 2.6064 8.64038C2.72026 8.51848 2.87469 8.45 3.03571 8.45H3.64286C3.80388 8.45 3.95831 8.51848 4.07217 8.64038C4.18603 8.76228 4.25 8.92761 4.25 9.1ZM11.5357 9.1C11.5357 9.27239 11.4717 9.43772 11.3579 9.55962C11.244 9.68152 11.0896 9.75 10.9286 9.75H6.07143C5.9104 9.75 5.75598 9.68152 5.64211 9.55962C5.52825 9.43772 5.46429 9.27239 5.46429 9.1C5.46429 8.92761 5.52825 8.76228 5.64211 8.64038C5.75598 8.51848 5.9104 8.45 6.07143 8.45H10.9286C11.0896 8.45 11.244 8.51848 11.3579 8.64038C11.4717 8.76228 11.5357 8.92761 11.5357 9.1ZM14.5714 9.1C14.5714 9.27239 14.5075 9.43772 14.3936 9.55962C14.2797 9.68152 14.1253 9.75 13.9643 9.75H13.3571C13.1961 9.75 13.0417 9.68152 12.9278 9.55962C12.814 9.43772 12.75 9.27239 12.75 9.1C12.75 8.92761 12.814 8.76228 12.9278 8.64038C13.0417 8.51848 13.1961 8.45 13.3571 8.45H13.9643C14.1253 8.45 14.2797 8.51848 14.3936 8.64038C14.5075 8.76228 14.5714 8.92761 14.5714 9.1Z"
                                fill="white"/>
                        </svg>
                    </button>
                    <button style={{background: '#46DA2E', right: '12px'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="18" viewBox="0 0 15 18" fill="none">
                            <path
                                d="M1.02133 3.19572C-0.579886 9.18198 3.11924 15.5957 9.09874 17.2007C11.2291 17.7721 13.2953 16.751 14.124 14.719C14.1953 14.5429 14.2255 14.3527 14.2122 14.1631C14.199 13.9735 14.1427 13.7894 14.0476 13.6249C13.971 13.4919 13.8702 13.3743 13.7505 13.2783L10.6671 10.6439L10.6484 10.6286C10.4852 10.5001 10.2925 10.4143 10.0878 10.3792C9.88309 10.344 9.67286 10.3606 9.47618 10.4273L7.25272 11.1806C6.25001 10.3102 5.56582 9.12998 5.30839 7.82663L7.07525 6.24577C7.22872 6.10853 7.34589 5.93541 7.41633 5.74185C7.48676 5.54829 7.50827 5.34029 7.47894 5.13639L7.47506 5.11249L6.73899 1.12149C6.69792 0.856708 6.57286 0.612172 6.3823 0.424002C6.19173 0.235832 5.94576 0.114004 5.68071 0.0765176C3.50869 -0.217516 1.59253 1.06388 1.02133 3.19572ZM5.50807 1.31645L5.51167 1.34141L6.24477 5.3179L4.47859 6.89837C4.31884 7.04149 4.19863 7.22341 4.12955 7.42657C4.06047 7.62974 4.04486 7.84729 4.08422 8.05825C4.39464 9.64209 5.22592 11.0763 6.4455 12.132C6.61042 12.2723 6.80893 12.3671 7.02154 12.4073C7.23414 12.4475 7.45354 12.4317 7.65818 12.3613L9.88097 11.6084L12.9468 14.2359C12.9507 14.2426 12.9622 14.2423 12.9688 14.2475C12.3751 15.7019 10.9511 16.405 9.42221 15.9944C6.75932 15.2801 4.60127 13.4944 3.29012 11.2211C1.97897 8.9478 1.51221 6.18556 2.22669 3.51846C2.63703 1.98973 3.95501 1.10272 5.50807 1.31645Z"
                                fill="white"/>
                        </svg>
                    </button>
                </label>
            </div>
            <div className="call-history-title" style={{marginRight: data.length > 12 ? '24px' : '0'}}>Історія
                Дзвінків
            </div>
            <ul className={`call-history-list ${data.length > 12 ? 'scroll' : ''}`}>
                {data.map((item, index) =>
                    <CallHistoryItem key={index} item={item} setModalDatePicker={setModalDatePicker}/>
                )}
            </ul>

            {modalLines ?
                <Modal title="Черги" closeModal={setModalLines}>
                    <ul className="call-history-line-list">
                        {lines.map(({name}, index) =>
                            <li key={index} onClick={() => changeLine(name)}>{name}</li>
                        )}
                    </ul>
                </Modal>
                : null
            }
            {modalKeyBoard ?
                <Modal title="Ручний набір" closeModal={setModalKeyBoard} otherClass="modal-keyboard">
                    <div className="keyboard-num">{numberValue}</div>
                    <div className="keyboard">
                        <div onClick={() => setNumberValue(numberValue + '1')}>1</div>
                        <div onClick={() => setNumberValue(numberValue + '2')}>2</div>
                        <div onClick={() => setNumberValue(numberValue + '3')}>3</div>
                        <div onClick={() => setNumberValue(numberValue + '4')}>4</div>
                        <div onClick={() => setNumberValue(numberValue + '5')}>5</div>
                        <div onClick={() => setNumberValue(numberValue + '6')}>6</div>
                        <div onClick={() => setNumberValue(numberValue + '7')}>7</div>
                        <div onClick={() => setNumberValue(numberValue + '8')}>8</div>
                        <div onClick={() => setNumberValue(numberValue + '9')}>9</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39" fill="none">
                            <circle cx="19.5" cy="19.5" r="19.5" fill="#46DA2E"/>
                            <path
                                d="M30.7963 23.8072L24.9075 21.1685L24.8913 21.161C24.5856 21.0302 24.2521 20.9778 23.921 21.0083C23.5899 21.0389 23.2716 21.1515 22.995 21.336C22.9624 21.3575 22.9311 21.3809 22.9013 21.406L19.8588 23.9997C17.9313 23.0635 15.9413 21.0885 15.005 19.186L17.6025 16.0972C17.6275 16.066 17.6513 16.0347 17.6738 16.001C17.8543 15.7251 17.9638 15.4089 17.9926 15.0805C18.0214 14.752 17.9686 14.4216 17.8388 14.1185V14.1035L15.1925 8.20475C15.0209 7.80883 14.7259 7.47902 14.3515 7.26455C13.9771 7.05007 13.5433 6.96245 13.115 7.01475C11.4212 7.23763 9.86649 8.06946 8.74118 9.35487C7.61587 10.6403 6.99695 12.2914 7.00001 13.9997C7.00001 23.9247 15.075 31.9997 25 31.9997C26.7084 32.0028 28.3595 31.3839 29.6449 30.2586C30.9303 29.1333 31.7621 27.5785 31.985 25.8847C32.0374 25.4566 31.95 25.0229 31.7357 24.6485C31.5215 24.2741 31.1919 23.979 30.7963 23.8072ZM25 29.9997C20.758 29.9951 16.691 28.3079 13.6914 25.3083C10.6918 22.3088 9.00464 18.2418 9.00001 13.9997C8.99531 12.7791 9.43507 11.5985 10.2372 10.6784C11.0393 9.75827 12.1489 9.16158 13.3588 8.99975C13.3583 9.00473 13.3583 9.00976 13.3588 9.01475L15.9838 14.8897L13.4 17.9822C13.3738 18.0124 13.35 18.0446 13.3288 18.0785C13.1407 18.3671 13.0303 18.6995 13.0084 19.0433C12.9865 19.3872 13.0538 19.7308 13.2038 20.041C14.3363 22.3572 16.67 24.6735 19.0113 25.8047C19.3237 25.9533 19.6694 26.0183 20.0144 25.9933C20.3595 25.9683 20.6922 25.8543 20.98 25.6622C21.0121 25.6406 21.043 25.6173 21.0725 25.5922L24.1113 22.9997L29.9863 25.631C29.9863 25.631 29.9963 25.631 30 25.631C29.8402 26.8426 29.2444 27.9544 28.3241 28.7585C27.4038 29.5626 26.2221 30.0039 25 29.9997Z"
                                fill="white"/>
                        </svg>
                        <div onClick={() => setNumberValue(numberValue + '10')}>0</div>
                        <svg
                            onClick={() => setNumberValue(numberValue.slice(0, -1))}
                            xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39" fill="none">
                            <circle cx="19.5" cy="19.5" r="19.5" fill="#FC2828"/>
                            <path
                                d="M16.2932 28.7081L7.29323 19.7081C7.20026 19.6152 7.12649 19.5049 7.07617 19.3835C7.02585 19.2621 6.99995 19.132 6.99995 19.0006C6.99995 18.8691 7.02585 18.739 7.07617 18.6176C7.12649 18.4962 7.20026 18.3859 7.29323 18.2931L16.2932 9.29306C16.4809 9.10541 16.7354 9 17.0007 9C17.2661 9 17.5206 9.10541 17.7082 9.29306C17.8959 9.4807 18.0013 9.73519 18.0013 10.0006C18.0013 10.2659 17.8959 10.5204 17.7082 10.7081L10.4145 18.0006L30.0007 18.0006C30.2659 18.0006 30.5203 18.1059 30.7078 18.2934C30.8954 18.481 31.0007 18.7353 31.0007 19.0006C31.0007 19.2658 30.8954 19.5201 30.7078 19.7077C30.5203 19.8952 30.2659 20.0006 30.0007 20.0006L10.4145 20.0006L17.7082 27.2931C17.8959 27.4807 18.0013 27.7352 18.0013 28.0006C18.0013 28.2659 17.8959 28.5204 17.7082 28.7081C17.5206 28.8957 17.2661 29.0011 17.0007 29.0011C16.7354 29.0011 16.4809 28.8957 16.2932 28.7081Z"
                                fill="white"/>
                        </svg>
                    </div>
                </Modal>
                : null
            }
            {modalDatePicker ?
                <Modal title="Дата" closeModal={setModalDatePicker}>
                    <CustomDatePicker otherClass="all-tasks-date-wrapper" groups={options}/>
                    <button className="btn btn-aqua btn-send" style={{width: 'calc(100% - 37px)'}}>Зберегти</button>
                </Modal>
                : null
            }
        </div>
    );
};

export default CallHistory;