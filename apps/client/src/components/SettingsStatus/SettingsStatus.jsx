import SettingStatusList from "./SettingStatusList";

import './SettingsStatus.css';
import {useEffect, useState} from "react";

const dataStatus = {
    system: [
        {name: 'Готовий', color: '#46DA2E'},
        {name: 'Відпочиваю', color: '#24CFDA'},
        {name: 'Виклик', color: '#FC2828'},
        {name: 'У розмові', color: '#FC2828'},
        {name: 'Постобробка', color: '#EDDA2B'},
    ],
    arbitrary: [
        {name: 'Довільний 1', color: '#46DA2E'},
        {name: 'Довільний 2', color: '#24CFDA'},
        {name: 'Довільний 3', color: '#FC2828'},
        {name: 'Довільний 4', color: '#EDDA2B'},
    ]
}
const SettingsStatus = () => {
    const [allStatus, setAllStatus] = useState({});

    useEffect(() => {
        setAllStatus(dataStatus);
    }, [])

    return (
        <div className="admin-settings-status">
            <div className="admin-settings-status-title">Статуси</div>

            <SettingStatusList title="Системні" data={allStatus.system} changeStatus={setAllStatus}/>
            <SettingStatusList title="Довільні" data={allStatus.arbitrary} changeStatus={setAllStatus} isAdd={true}/>
        </div>
    );
};

export default SettingsStatus;