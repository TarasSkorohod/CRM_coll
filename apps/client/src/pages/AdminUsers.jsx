import {useEffect, useState} from "react";
import SideBar from '../components/SideBar/SideBar';
import AddUsers from '../components/Users/AddUsers';
import Users from '../components/Users/Users';
import UserInfo from '../components/Users/UserInfo';

import {getUsers} from "../utils/api/api";
import '../components/Users/Users.css';
import {useDispatch, useSelector} from "react-redux";
import {setUsersData} from "../utils/store/slices/usersSlice";

const AdminUsers = () => {
    const dispatch = useDispatch();

    const { allUsers, currentUser, renderUser } = useSelector(state => state.users);
    const [usersLoading, setUsersLoading] = useState(false);

    useEffect(() => {
        setUsersLoading(true);
        const fetchData = async () => {
            const fetchedUsers = await getUsers();

            dispatch(setUsersData(fetchedUsers.data));
            await setUsersLoading(false);
        };
        fetchData();
    }, [renderUser, dispatch]);

    return (
        <div className="admin-container">
            <SideBar/>

            <div className="admin-wrapper">
                <div style={{ margin: '32px 0 115px 15px', paddingRight: '40px', color: '#fff' }}>
                    <AddUsers />

                    <div className="users-wrapper">
                        <Users
                            title="Адміністратори"
                            data={allUsers?.filter((user) => user.role === 'ADMIN')}
                            usersLoading={usersLoading}
                        />

                        <Users
                            title="Оператори"
                            data={allUsers?.filter((user) => user.role === 'OPERATOR')}
                            usersLoading={usersLoading}
                        />

                        {Object.keys(currentUser).length !== 0 ? (
                            <UserInfo />
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default AdminUsers
