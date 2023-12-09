import {Navigate, Outlet} from 'react-router-dom';
import {getCookie} from "../cookie/Cookie";

const PrivateRoute = () => {
    const token = getCookie('Authorization');
    return (
        token ? <Outlet/> : <Navigate to="/login"/>
    );
};

export default PrivateRoute;

