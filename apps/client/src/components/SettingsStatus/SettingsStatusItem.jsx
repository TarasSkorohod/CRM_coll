import Modal from "../Modal/Modal";
import {useState} from "react";
import ColorPicker from "../UI/ColorPicker";

const SettingsStatusItem = ({name, color, isAdd}) => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <li
                style={{background: color}}
                onClick={() => setModalOpen(true)}
            >
                {name}
            </li>
            {modalOpen ?
                <Modal title="Зміна статусу" closeModal={setModalOpen}>
                    <form className="form-change-status">
                        <ColorPicker colorDefault={color}/>
                        {isAdd ?
                            <label className="form-control">
                                <input type="text" placeholder="Назва"/>
                            </label>
                            : null
                        }
                        <div className="form-change-status-buttons">
                            {isAdd ? <button type="button" className="btn btn-red">Видалити</button> : null}
                            <button type="submit" className="btn btn-aqua">Змінити</button>
                        </div>
                    </form>
                </Modal>
                : null
            }
        </>
    );
};

export default SettingsStatusItem;