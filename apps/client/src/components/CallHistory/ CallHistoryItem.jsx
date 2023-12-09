import {IconTypeCall} from "../../utils/IconTypeCall";

const CallHistoryItem = ({item, setModalDatePicker}) => {
    return (
        <li className="call-history-item" onClick={() => setModalDatePicker(true)}>
            {IconTypeCall(item.type)}
            {item.phone}
            <span>{item.time}</span>
        </li>
    );
};

export default CallHistoryItem;