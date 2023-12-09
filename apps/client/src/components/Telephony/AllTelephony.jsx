import Preloader from "../Preloader/Preloader";
import {addTelephonyToUser, removeTelephony} from "../../utils/api/api";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentTelephony, stateRenderTelephony} from "../../utils/store/slices/telephonySlice";
import {setCurrentUsersData} from "../../utils/store/slices/usersSlice";

const AllTelephony = ({setModalEditTelephony}) => {
    const dispatch = useDispatch();
    const { allTelephony, renderTelephony } = useSelector(state => state.telephony);
    const { currentUser } = useSelector(state => state.users);

    const addTelephony = async (userId, telephonyId, e) => {
        e.stopPropagation();

        const res = await addTelephonyToUser(userId, telephonyId);

        dispatch(setCurrentUsersData({telephony: res.telephony}));
    }

    const editCurrentTelephony = (telephony, e) => {
        e.stopPropagation();
        dispatch(getCurrentTelephony(telephony));
        setModalEditTelephony(true);
    }

    return (
        <ul className="user-info-item-modal-list">
            {!renderTelephony
                ? <Preloader />
                : <>
                    {allTelephony?.map((telephony) =>
                        <li
                            key={telephony._id}
                            onClick={(e) => addTelephony(currentUser._id, telephony._id, e)}
                        >
                            {telephony.name}
                            <span>
                               <button onClick={(e) => {
                                   e.stopPropagation();
                                   dispatch(stateRenderTelephony(false));
                                   return removeTelephony(telephony._id);
                               }}>
                                    <svg viewBox="0 0 24 24" width="23" height="23" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm3.21,11.79a1,1,0,0,1,0,1.42,1,1,0,0,1-1.42,0L12,13.41l-1.79,1.8a1,1,0,0,1-1.42,0,1,1,0,0,1,0-1.42L10.59,12l-1.8-1.79a1,1,0,0,1,1.42-1.42L12,10.59l1.79-1.8a1,1,0,0,1,1.42,1.42L13.41,12Z" fill="red"/>
                                    </svg>
                                </button>
                                    <button
                                        onClick={(e) => editCurrentTelephony(telephony, e)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                            <circle cx="11.5" cy="11.5" r="11.5" fill="#EDDA2B"/>
                                            <path d="M17.8942 8.10394L14.8969 5.1061C14.7972 5.00641 14.6789 4.92733 14.5486 4.87338C14.4184 4.81943 14.2788 4.79166 14.1378 4.79166C13.9968 4.79166 13.8573 4.81943 13.727 4.87338C13.5968 4.92733 13.4784 5.00641 13.3788 5.1061L5.10662 13.3785C5.00652 13.4778 4.92715 13.596 4.87314 13.7263C4.81913 13.8565 4.79155 13.9962 4.792 14.1372V17.135C4.792 17.4197 4.90508 17.6927 5.10637 17.894C5.30766 18.0952 5.58067 18.2083 5.86534 18.2083H8.86333C9.00434 18.2088 9.14403 18.1812 9.27428 18.1272C9.40453 18.0732 9.52275 17.9938 9.62205 17.8937L17.8942 9.62198C17.9939 9.52231 18.073 9.40398 18.1269 9.27375C18.1809 9.14352 18.2087 9.00393 18.2087 8.86296C18.2087 8.72199 18.1809 8.58241 18.1269 8.45217C18.073 8.32194 17.9939 8.20361 17.8942 8.10394ZM8.86333 17.135H5.86534V14.1372L11.7687 8.23408L14.7667 11.2319L8.86333 17.135ZM15.5255 10.4726L12.5275 7.4754L14.1375 5.86546L17.1355 8.86263L15.5255 10.4726Z" fill="white"/>
                                        </svg>
                                    </button>
                            </span>
                        </li>
                    )}
                </>
            }
        </ul>
    );
};

export default AllTelephony;