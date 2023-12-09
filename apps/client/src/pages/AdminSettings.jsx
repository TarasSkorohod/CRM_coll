import SideBar from "../components/SideBar/SideBar";
import SettingsStatus from "../components/SettingsStatus/SettingsStatus";

const AdminSettings = () => {
    return (
        <div className="admin-container">
            <SideBar/>

            <div className="admin-wrapper">
                <div style={{margin: '40px 0 115px 15px', paddingRight: '40px', color: '#fff'}}>
                    <div className="admin-settings">
                        <div className="admin-settings-title">
                            Налаштування статусів
                        </div>

                        <div className="admin-status-wrapper">
                            <SettingsStatus/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminSettings;