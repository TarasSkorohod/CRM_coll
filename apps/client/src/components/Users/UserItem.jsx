import { useState} from 'react';
import ModalUsersGroups from "./ModalUsersGroups";
import {useDispatch} from "react-redux";
import {getCurrentUser} from "../../utils/api/api";
import {setCurrentUsersData} from "../../utils/store/slices/usersSlice";
import Modal from "../Modal/Modal";

const UserItem = ({ user }) => {
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);

    const getCurrentUserID = async (userId) => {
        try {
            const userData = await getCurrentUser(userId);
            dispatch(setCurrentUsersData(userData));
        } catch (error) {
            console.error('Помилка при отриманні даних користувача:', error.response.data.message);
        }
    };

    return (
        <li className="users-item" onClick={() => getCurrentUserID(user._id)}>
            <div className="users-item-content">
                <div>{user.fullName}</div>
                <p>{user.email}</p>
                <span style={{ color: user.isActive ? '#46DA2E' : '#FC2828' }}>
                    {user.isActive ? 'Активований' : 'Деактивований'}
                </span>
            </div>
            <button className="users-item-add" onClick={() => setModalOpen(true)}>+</button>

            {modalOpen ? (
                    <Modal title="Групи">
                        <ModalUsersGroups modalClose={() => setModalOpen(false)} />
                    </Modal>

            ) : null}
        </li>
    );
};

export default UserItem;