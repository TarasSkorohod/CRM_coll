import SideBar from "../components/SideBar/SideBar";
import InformationPanel from "../components/InformationPanel/InformationPanel";
import Tasks from "../components/Tasks/Tasks";
import AllTasks from "../components/AllTasks/AllTasks";

const AdminMain = () => {
    return (
        <div className="admin-container">
            <SideBar/>

            <div className="admin-wrapper">
                <div style={{margin: '50px 0 0 15px', display: 'flex', gap: '30px', paddingRight: '40px'}}>
                    <InformationPanel/>
                    <Tasks/>
                </div>

                <div style={{margin: '50px 0 115px 15px', paddingRight: '40px'}}>
                    <AllTasks/>
                </div>
            </div>

        </div>
    );
};

export default AdminMain;