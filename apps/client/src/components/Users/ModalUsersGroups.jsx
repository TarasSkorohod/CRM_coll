import UserGroupList from "./UserGroupList";
import {useSelector} from "react-redux";
import Preloader from "../Preloader/Preloader";
import {useState} from "react";
import axios from "axios";
import {apiUrl} from "../../utils/api/api";
import {toast} from "react-toastify";

const ModalUsersGroups = ({data, id}) => {
    const { groupUsers } = useSelector(state => state.groups);
    const workingList = data?.filter(item => item.isWorking === true);
    const notWorkingList = data?.filter(item => item.isWorking === false);

    const [isSending, setIsSending] = useState(false);

    const updateList = async () => {
        setIsSending(true);

        try {
            const res = await axios({
                method: 'POST',
                url: `${apiUrl}/groups/${id}/add-users`,
                data: groupUsers
            })

            if (res.data.status === 'success') {
                toast.success(`Зміни успішно оновлені!`);
                setIsSending(false);
            }
        } catch (error) {
            setIsSending(false);
            console.error(error.response.data.message);
        }
    }

    return (
        <>
            {isSending ?
                <div className="loader-working">
                    <Preloader />
                </div>
                : null
            }
            <div className="modal-group">
                <div className="user-group-wrapper">
                    <UserGroupList list={workingList} title="Працюю з"/>

                    <UserGroupList list={notWorkingList} title="Не працюю з"/>
                </div>
            </div>
            <button className="btn btn-aqua btn-send" style={{width: '290px'}} onClick={updateList}>Зберегти</button>
        </>
    );
};

export default ModalUsersGroups;