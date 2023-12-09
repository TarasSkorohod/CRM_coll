import {useDispatch} from "react-redux";
import {toggleUserWorkingStatus} from "../../utils/store/slices/groupsSlice";

const UserGroupList = ({list, title}) => {
    const dispatch = useDispatch();

    return (
        <div style={{width: 'calc(100% / 2 - 25px)'}}>
            <div className="user-group-head">
                <p>{title}</p>
            </div>

            <ul className="user-group-list">
                {list.map(item =>
                    <li
                        key={item._id}
                        onClick={() => dispatch(toggleUserWorkingStatus(item._id))}
                        title={item.fullName}
                    >
                        <p className="text-dots">{item.fullName}</p>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default UserGroupList;