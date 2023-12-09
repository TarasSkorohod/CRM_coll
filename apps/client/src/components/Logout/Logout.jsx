import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setUser} from "../../utils/store/auth";

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        document.cookie = 'Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        navigate('/login');
        dispatch(setUser({}));
    };

    return (
        <button className="btn-logout" onClick={handleLogout}>
            <div className="side-bar__nav__icon">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs>
                    <style></style>
                </defs><title/><g id="logout">
                    <line x1="15.92" x2="28.92" y1="16" y2="16" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px" />
                    <path d="M23.93,25v3h-16V4h16V7h2V3a1,1,0,0,0-1-1h-18a1,1,0,0,0-1,1V29a1,1,0,0,0,1,1h18a1,1,0,0,0,1-1V25Z" fill="#fff"/>
                    <line fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px" x1="28.92" x2="24.92" y1="16" y2="20"/>
                    <line fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px" x1="28.92" x2="24.92" y1="16" y2="12"/>
                    <line fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px" x1="24.92" x2="24.92" y1="8.09" y2="6.09"/>
                    <line fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px" x1="24.92" x2="24.92" y1="26" y2="24"/></g>
                </svg>
            </div>
            Вихід
        </button>
    );
};

export default Logout;