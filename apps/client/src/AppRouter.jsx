import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {apiUrl} from "./utils/api/api";
import {setUser} from "./utils/store/auth";
import PrivateRoute from "./utils/router/PrivateRoute";
import AdminMain from "./pages/AdminMain";
import AdminUsers from "./pages/AdminUsers";
import AdminGroups from "./pages/AdminGroups";
import AdminSettings from "./pages/AdminSettings";
import Operator from "./pages/Operator";
import LogIn from "./pages/LogIn";
import NotFound from "./pages/NotFound";
import 'react-toastify/dist/ReactToastify.css';
import {getAllTelephony, stateRenderTelephony} from "./utils/store/slices/telephonySlice";

const AppRouter = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const { renderTelephony } = useSelector(state => state.telephony);

    useEffect(() => {
        const currentPath = location.pathname;

        if (currentPath.replaceAll('/', '') !== 'login') {
            axios({ method: 'get', url: `${apiUrl}/users/fetch-user` })
                .then(response => {
                    if (response.data.data) {
                        if (JSON.stringify(user) !== JSON.stringify(response.data.data)) dispatch(setUser(response.data.data));
                    } else {
                        toast.error('Помилка авторизації! 🤯', { theme: 'colored' });
                        document.cookie = `Authorization=;`;
                        return navigate('/login');
                    }
                })
                .catch(err => {
                    console.log(err);
                    toast.error('Помилка авторизації! 🤯', { theme: 'colored' });
                    document.cookie = `Authorization=;`;

                    return navigate('/login');
                });
        }
    }, [user, dispatch, navigate, location.pathname]);

    useEffect(() => {
        dispatch(stateRenderTelephony(false));
        try {
            axios.get(`${apiUrl}/users/all/telephony`).then(res => dispatch(getAllTelephony(res.data.data)));
            dispatch(stateRenderTelephony(true));
        } catch (error) {
            console.error(error.response.data.message);
        }
    }, [renderTelephony, dispatch])

    return (
        <>
            <ToastContainer />
            <Routes>
                <Route element={<PrivateRoute />}>
                    {user.role === 'ADMIN' && (
                        <>
                            <Route path="/" element={<AdminMain />} />
                            <Route path="users" element={<AdminUsers />} />
                            <Route path="groups" element={<AdminGroups />} />
                            <Route path="settings" element={<AdminSettings />} />
                            <Route path="operator" element={<Operator />} />
                        </>
                    )}
                    {user.role === 'OPERATOR' && (
                        <Route path="/" element={<Operator />} />
                    )}
                </Route>
                <Route path="login" element={<LogIn />} />
                {user.role === 'OPERATOR' || user.role === 'ADMIN' && (
                    <Route path="*" element={<NotFound />} />
                )}
            </Routes>
        </>
    );
};

export default AppRouter;