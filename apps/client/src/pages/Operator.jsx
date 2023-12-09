import InformationPanel from "../components/InformationPanel/InformationPanel";
import CallHistory from "../components/CallHistory/ CallHistory";
import SideBar from "../components/SideBar/SideBar";
import CallPanel from "../components/CallPanel/CallPanel";
import Logout from "../components/Logout/Logout";
import {useSelector} from "react-redux";

const Operator = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <div className="admin-container">
            <SideBar/>
            <div className="admin-wrapper">
                <div style={{padding: '50px 20px'}}>
                    {user.role === 'OPERATOR' ? <Logout /> : null}
                    <CallPanel/>
                    <div style={{display: 'flex', gap: '40px'}}>
                        <InformationPanel/>

                        <CallHistory/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Operator;