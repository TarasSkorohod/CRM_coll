import CustomCheckBoxSwitcher from "../UI/CustomCheckBoxSwitcher";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {apiUrl} from "../../utils/api/api";
import {toast} from "react-toastify";
import {setCurrentUsersData} from "../../utils/store/slices/usersSlice";
import {useState} from "react";

const UserTelephony = () => {
    const dispatch = useDispatch();
    const [chkDisabled, setChkDisabled] = useState(false);
    const { currentUser } = useSelector(state => state.users);

    const removeTelephony = async (id) => {
        try {
            const res = await axios({
                method: 'DELETE',
                url: `${apiUrl}/users/${currentUser._id}/user-telephony/${id}`
            });

            const user = res.data.data;

            if (res.data.status === 'success') {
                dispatch(setCurrentUsersData({telephony: user.telephony}));
                toast.success('Телефонію видалено!');
            }
        } catch (error) {
            console.error(error.response.data.message);
            toast.error('Виникла помилка при видаленні телефонії.');
        }
    }

    const changeStateLine = async (state, id) => {
        setChkDisabled(true);
        try {
            const res = await axios({
                method: 'POST',
                url: `${apiUrl}/users/${currentUser._id}/telephony/${id}/select`,
                data: {
                    isTelephonySelected: !state
                }
            });

            if (res.data.status === 'success') {
                dispatch(setCurrentUsersData({telephony: res.data.data.telephony}));
                toast.success('Статас телефонії змінено!');

                setChkDisabled(false);
                return !state;
            }
        } catch (error) {
            console.error(error.response.data.message);
        }

        return state;
    }

    return (
        <ul className={currentUser.telephony.length >= 3 ? 'user-info-item-list scroll' : 'user-info-item-list'}>

            {currentUser.telephony.length > 0 ?
                currentUser.telephony.map(({
                                               name,
                                               id,
                                               login,
                                               password,
                                               sipInternalNumber,
                                               sipServer,
                                               isTelephonySelected
                                           }, index) =>
                    <li key={index}>
                        <div className="user-info-item-list-head">
                            <b>{name}</b>
                            <button onClick={() => removeTelephony(id)}>
                                <svg viewBox="0 0 24 24" width="23" height="23" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm3.21,11.79a1,1,0,0,1,0,1.42,1,1,0,0,1-1.42,0L12,13.41l-1.79,1.8a1,1,0,0,1-1.42,0,1,1,0,0,1,0-1.42L10.59,12l-1.8-1.79a1,1,0,0,1,1.42-1.42L12,10.59l1.79-1.8a1,1,0,0,1,1.42,1.42L13.41,12Z" fill="red"/>
                                </svg>
                            </button>
                        </div>
                        <div>
                            <p><b>SIP Internal Number:</b> {sipInternalNumber}</p>
                            <p><b>SIP Server:</b> {sipServer}</p>
                            <p><b>Логін:</b> {login}</p>
                            <p><b>Пароль:</b> {password}</p>
                        </div>

                        <div className="user-info-item-chk">
                            Приймати вхідну лінію
                            <CustomCheckBoxSwitcher isChecked={isTelephonySelected} disabled={chkDisabled} onChange={() => changeStateLine(isTelephonySelected, id)}/>
                        </div>
                    </li>
                )
                : null
            }

        </ul>
    );
};

export default UserTelephony;