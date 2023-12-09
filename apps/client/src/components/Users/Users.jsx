import UserItem from './UserItem';
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Preloader from "../Preloader/Preloader";

const Users = ({ title, data, usersLoading = true }) => {
    const [userData, setUserData] = useState([]);
    const { renderUser } = useSelector(state => state.users);

    useEffect(() => {
        setUserData(data);
    }, [data, renderUser])

    return (
        <div>
            <div className="user-title">{title}</div>
            {usersLoading ?
                <Preloader />
                :  <ul className="users-list">
                    {Array.isArray(userData) &&
                        userData.map(user => (
                            <UserItem
                                key={user._id}
                                user={user}
                            />
                        ))}
                </ul>
            }
            <button className="users-all-add">Додати всіх</button>
        </div>
    );
};

export default Users;

