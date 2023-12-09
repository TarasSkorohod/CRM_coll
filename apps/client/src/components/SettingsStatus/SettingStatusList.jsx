import SettingsStatusItem from "./SettingsStatusItem";
import Modal from "../Modal/Modal";
import {useState} from "react";
import ColorPicker from "../UI/ColorPicker";

const SettingStatusList = ({title, data, isAdd = false, changeStatus}) => {
    const [modalAddStatus, setModalAddStatus] = useState(false);

    return (
        <div className="admin-settings-list">
            {title}

            {isAdd ?
                <button className="add-new-status" onClick={() => setModalAddStatus(true)}>
                    +
                </button>
                : null
            }

            <ul>
                {data?.map(({name, color}, index) =>
                    <SettingsStatusItem
                        key={index}
                        isAdd={isAdd}
                        changeStatus={changeStatus}
                        name={name}
                        color={color}
                    />
                )}
            </ul>
            {modalAddStatus ?
                <Modal title="Створити статус" closeModal={setModalAddStatus}>
                    <form className="create-status">
                        <ColorPicker/>
                        <label className="form-control">
                            <input type="text" placeholder="Назва"/>
                        </label>
                        <button type="submit" className="btn btn-aqua">Створити</button>
                    </form>
                </Modal>
                : null
            }
        </div>
    );
};

export default SettingStatusList;