import CustomCheckBoxSwitcher from "../UI/CustomCheckBoxSwitcher";
import {useState} from "react";
import GroupSettings from "./GroupSettings";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {apiUrl} from "../../utils/api/api";
import {toast} from "react-toastify";
import {
    setAllUsersNotWorking,
    setAllUsersWorking,
    setGroupUsers,
    updateGroup
} from "../../utils/store/slices/groupsSlice";
import Modal from "../Modal/Modal";
import Preloader from "../Preloader/Preloader";
import ModalUsersGroups from "../Users/ModalUsersGroups";

const GroupsItem = ({group}) => {
    const dispatch = useDispatch();
    const [modalSettings, setModalSettings] = useState(false);
    const [modalOperators, setModalOperators] = useState(false);
    const [chkDisabled, setChkDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { allTelephony } = useSelector(state => state.telephony);
    const { groupUsers } = useSelector(state => state.groups);

    const openModalSettings = () => {
        setModalSettings(true);
    }

    const openModalOperators = async (e) => {
        e.stopPropagation();
        setModalOperators(true);
        setIsLoading(true);

        try {
            const res = await axios.get(`${apiUrl}/groups/${group._id}/users`);

            if (res.data.status === 'success') {
                dispatch(setGroupUsers(res.data.data));
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error.response.data.message);
        }
    };

    const changeStatus = async (id) => {
        const statusValue = group.active === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
        setChkDisabled(true);
        try {
            const res = await axios.put(`${apiUrl}/groups/${id}/active`, {status: statusValue})

            if (res.data.status === 'success') {
                const state = res.data.data.data;
                setChkDisabled(false);

                dispatch(updateGroup({id: group._id, active: state.active}));
                toast.success(`Група "${group.name}" ${state?.active === 'ACTIVE' ? 'Активна' : 'Неактивна'}!`);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const d = new Date();
    const dayName = days[d.getDay()];

    return (
        <li className="admin-group__item group-cart">
            <div onClick={openModalSettings}>
                <div className="group-cart__head">
                    {group.name}

                    <button
                        className="group-cart__settings"
                        onClick={openModalOperators}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="17" viewBox="0 0 29 17" fill="none">
                            <path
                                d="M13.2646 11.6728C14.5004 10.915 15.4387 9.81089 15.9406 8.52386C16.4426 7.23683 16.4815 5.83518 16.0518 4.52618C15.622 3.21718 14.7463 2.07032 13.5542 1.25521C12.3621 0.440097 10.9168 0 9.43215 0C7.9475 0 6.50225 0.440097 5.31013 1.25521C4.11802 2.07032 3.24233 3.21718 2.81255 4.52618C2.38278 5.83518 2.42174 7.23683 2.92367 8.52386C3.42561 9.81089 4.36386 10.915 5.5997 11.6728C3.36419 12.4318 1.45502 13.8362 0.157047 15.6765C0.0888304 15.7699 0.041447 15.8748 0.0176512 15.9852C-0.00614469 16.0957 -0.00587827 16.2093 0.0184349 16.3196C0.0427481 16.4299 0.0906231 16.5347 0.159277 16.6278C0.227931 16.7209 0.315994 16.8006 0.418348 16.862C0.520702 16.9235 0.635305 16.9657 0.755495 16.986C0.875685 17.0064 0.999065 17.0045 1.11846 16.9805C1.23786 16.9565 1.3509 16.911 1.451 16.8464C1.5511 16.7818 1.63627 16.6996 1.70155 16.6044C2.5388 15.4183 3.68447 14.4436 5.0345 13.7688C6.38454 13.094 7.89618 12.7406 9.43215 12.7406C10.9681 12.7406 12.4798 13.094 13.8298 13.7688C15.1798 14.4436 16.3255 15.4183 17.1628 16.6044C17.298 16.7896 17.5069 16.9183 17.7443 16.9627C17.9818 17.0071 18.2286 16.9636 18.4315 16.8417C18.6345 16.7198 18.7771 16.5292 18.8287 16.3112C18.8803 16.0931 18.8367 15.8651 18.7073 15.6765C17.4093 13.8362 15.5001 12.4318 13.2646 11.6728ZM4.36064 6.3728C4.36064 5.44886 4.65808 4.54568 5.21534 3.77746C5.77261 3.00923 6.56467 2.41048 7.49137 2.0569C8.41807 1.70333 9.43778 1.61082 10.4216 1.79107C11.4053 1.97132 12.309 2.41624 13.0183 3.06956C13.7275 3.72288 14.2105 4.55525 14.4062 5.46144C14.6019 6.36762 14.5015 7.3069 14.1176 8.1605C13.7338 9.0141 13.0837 9.74369 12.2497 10.257C11.4157 10.7703 10.4352 11.0443 9.43215 11.0443C8.08757 11.0429 6.7985 10.5503 5.84774 9.67449C4.89697 8.79872 4.36217 7.61132 4.36064 6.3728ZM28.5817 16.8518C28.3769 16.9748 28.1274 17.0179 27.8881 16.9715C27.6489 16.9251 27.4394 16.7931 27.3058 16.6044C26.4695 15.4176 25.324 14.4424 23.9737 13.768C22.6234 13.0935 21.1112 12.7411 19.5752 12.743C19.3306 12.743 19.0961 12.6535 18.9232 12.4942C18.7502 12.335 18.6531 12.1189 18.6531 11.8937C18.6531 11.6684 18.7502 11.4523 18.9232 11.2931C19.0961 11.1338 19.3306 11.0443 19.5752 11.0443C20.322 11.0436 21.0595 10.8911 21.7349 10.5974C22.4104 10.3038 23.007 9.8764 23.4823 9.34575C23.9577 8.81509 24.2998 8.19429 24.4845 7.52769C24.6691 6.8611 24.6917 6.16516 24.5505 5.48962C24.4093 4.81407 24.1078 4.1756 23.6677 3.6198C23.2275 3.064 22.6596 2.60461 22.0043 2.27445C21.3491 1.94429 20.6228 1.7515 19.8773 1.70987C19.1318 1.66824 18.3855 1.77879 17.6918 2.03362C17.5787 2.07866 17.4569 2.10236 17.3337 2.10332C17.2105 2.10428 17.0883 2.08248 16.9744 2.03921C16.8605 1.99593 16.7571 1.93207 16.6704 1.85138C16.5838 1.77069 16.5155 1.67482 16.4698 1.56943C16.424 1.46405 16.4016 1.35128 16.404 1.23779C16.4063 1.1243 16.4334 1.0124 16.4835 0.908697C16.5336 0.804992 16.6057 0.711589 16.6957 0.634005C16.7856 0.556422 16.8915 0.496232 17.0072 0.456993C18.5948 -0.126252 20.3608 -0.14724 21.9643 0.398076C23.5677 0.943392 24.8952 2.01637 25.6905 3.41003C26.4858 4.80368 26.6926 6.41926 26.2711 7.94509C25.8495 9.47092 24.8294 10.7989 23.4076 11.6728C25.6431 12.4318 27.5523 13.8362 28.8503 15.6765C28.9839 15.8652 29.0306 16.095 28.9802 16.3154C28.9299 16.5358 28.7865 16.7287 28.5817 16.8518Z"
                                fill="white"/>
                        </svg>
                    </button>

                    <CustomCheckBoxSwitcher
                        isChecked={group.active === 'ACTIVE'}
                        onChange={() => changeStatus(group._id)}
                        disabled={chkDisabled}
                    />
                </div>

                <ul className="group-cart__list">
                    <li className="group-cart__item">
                        <p>Статус</p>
                        <div className="group-cart__status"
                             style={{background: `${group.status === 'WAITING_FOR_TASKS' ? '#EDDA2B' : 'rgba(209, 209, 209, 0.60)'}`}}
                        >
                            {group.status === 'WAITING_FOR_TASKS' ? 'Очікуєм задачі' : 'Очікуєм оператора'}
                        </div>
                    </li>
                    <li className="group-cart__item">
                        <p>Операторів в мережі</p>
                        <span>0 з {group.users.length}</span>
                    </li>
                    <li className="group-cart__item">
                        <p>Розклад</p>
                        {group.dayTime[dayName].with} - {group.dayTime[dayName].on}
                    </li>
                    <li className="group-cart__item">
                        <p>Черга</p>
                        {(allTelephony.find(item => item._id === group.line) || {}).name || '-'}
                    </li>
                    <li className="group-cart__item">
                        <p>В черзі</p>
                        {group.lined_up}
                    </li>
                    <li className="group-cart__item">
                        <p>Просрочені задачі</p>
                        {group.overdue}
                    </li>
                </ul>
            </div>


            {modalSettings ?
                <GroupSettings group={group} setModalSettings={setModalSettings} />
                : null
            }

            {modalOperators ?
                <Modal
                    title="Оператори"
                    closeModal={setModalOperators}
                    otherClass="modals-width"
                    headButtons={
                        <div className="user-group-head-buttons">
                            <button className="btn btn-green" onClick={() => dispatch(setAllUsersWorking())}>Додати всіх</button>
                            <button className="btn btn-red" onClick={() => dispatch(setAllUsersNotWorking())}>Видалити всі</button>
                        </div>
                    }
                >
                    {isLoading
                        ? <Preloader />
                        : <ul className="operators-list">
                            <ModalUsersGroups
                                data={groupUsers}
                                id={group._id}
                                modalClose={setModalOperators}
                            />
                          </ul>
                    }
                </Modal>
                : null
            }
        </li>
    );
};

export default GroupsItem;