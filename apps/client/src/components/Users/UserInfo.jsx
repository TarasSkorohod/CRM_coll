import {useState} from "react";
import Modal from "../Modal/Modal";
import {activateUser, deleteUser, editUser} from "../../utils/api/api";
import {useDispatch, useSelector} from "react-redux";
import {clearCurrentUser, renderUserData, setCurrentUsersData} from "../../utils/store/slices/usersSlice";
import {toast} from "react-toastify";
import CreateTelephony from "../Telephony/CreateTelephony";
import AllTelephony from "../Telephony/AllTelephony";
import EditTelephony from "../Telephony/EditTelephony";
import UserTelephony from "./UserTelephony";

const UserInfo = () => {
    const dispatch = useDispatch();
    const [modalCreateTelephony, setModalCreateTelephony] = useState(false);
    const [modalSelectTelephony, setModalSelectTelephony] = useState(false);
    const [modalEditTelephony, setModalEditTelephony] = useState(false);

    const [isDeleting, setIsDeleting] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [validNewPassword, setValidNewPassword] = useState(true);

    const { currentUser } = useSelector(state => state.users);

    const changeUserPassword = async () => {
        if (newPassword.length < 6) {
            setValidNewPassword(false);
            return toast.error('Пароль повинен бути не менше 6 символів!');
        } else {
            setValidNewPassword(true);
        }

        const password = {
            password: newPassword
        }

        const res = await editUser(password, currentUser._id, currentUser.fullName);

        if (res === 'success') {
            setNewPassword('');
            setValidNewPassword(true);
        }
    };

    const changeActiveState = async () => {
        try {
            await activateUser(currentUser._id, !currentUser.isActive);
            dispatch(renderUserData());
            dispatch(setCurrentUsersData({isActive: !currentUser.isActive}));
        } catch (error) {
            console.error('Error:', error.response.data.message);
        }
    };

    const handleDeleteUser = async () => {
        setIsDeleting(true);
        try {
            await deleteUser(currentUser._id);
            dispatch(renderUserData());
            dispatch(dispatch(clearCurrentUser()));
            console.log('Користувач видалений успішно');
        } catch (error) {
            console.error('Помилка при видаленні користувача:', error.response.data.message);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <div className="user-info user-info-wrapper">
                <button className="user-info-close" onClick={() => dispatch(clearCurrentUser())}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                        <circle cx="12.5" cy="12.5" r="11.5" stroke="white"/>
                        <path
                            d="M17.8389 17.0606C17.89 17.1117 17.9306 17.1724 17.9582 17.2391C17.9859 17.3059 18.0001 17.3774 18.0001 17.4497C18.0001 17.522 17.9859 17.5935 17.9582 17.6603C17.9306 17.7271 17.89 17.7877 17.8389 17.8388C17.7878 17.8899 17.7272 17.9304 17.6604 17.9581C17.5936 17.9858 17.5221 18 17.4498 18C17.3776 18 17.306 17.9858 17.2392 17.9581C17.1725 17.9304 17.1118 17.8899 17.0607 17.8388L12.5001 13.2775L7.93939 17.8388C7.83619 17.942 7.69622 18 7.55028 18C7.40434 18 7.26437 17.942 7.16117 17.8388C7.05798 17.7356 7 17.5956 7 17.4497C7 17.3038 7.05798 17.1638 7.16117 17.0606L11.7225 12.4999L7.16117 7.93927C7.05798 7.83607 7 7.6961 7 7.55016C7 7.40421 7.05798 7.26425 7.16117 7.16105C7.26437 7.05785 7.40434 6.99988 7.55028 6.99988C7.69622 6.99988 7.83619 7.05785 7.93939 7.16105L12.5001 11.7224L17.0607 7.16105C17.1639 7.05785 17.3039 6.99988 17.4498 6.99988C17.5958 6.99988 17.7357 7.05785 17.8389 7.16105C17.9421 7.26425 18.0001 7.40421 18.0001 7.55016C18.0001 7.6961 17.9421 7.83607 17.8389 7.93927L13.2776 12.4999L17.8389 17.0606Z"
                            fill="white"/>
                    </svg>
                </button>

                <div className="user-info-title">
                    {currentUser.fullName}
                </div>

                <div className="user-info-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="20" viewBox="0 0 26 20" fill="none">
                        <path
                            d="M25 0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V18C0 18.5304 0.210714 19.0391 0.585786 19.4142C0.960859 19.7893 1.46957 20 2 20H24C24.5304 20 25.0391 19.7893 25.4142 19.4142C25.7893 19.0391 26 18.5304 26 18V1C26 0.734784 25.8946 0.48043 25.7071 0.292893C25.5196 0.105357 25.2652 0 25 0ZM13 10.6437L3.57125 2H22.4287L13 10.6437ZM9.33875 10L2 16.7262V3.27375L9.33875 10ZM10.8188 11.3563L12.3188 12.7375C12.5032 12.9069 12.7446 13.0008 12.995 13.0008C13.2454 13.0008 13.4868 12.9069 13.6712 12.7375L15.1712 11.3563L22.4212 18H3.57125L10.8188 11.3563ZM16.6612 10L24 3.2725V16.7275L16.6612 10Z"
                            fill="#0E0E0E"/>
                    </svg>
                    {currentUser.email}
                </div>

                <div className={`user-info-item ${!validNewPassword ? '_error' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="20" viewBox="0 0 26 20" fill="none">
                        <path
                            d="M2 1V19C2 19.2652 1.89464 19.5196 1.70711 19.7071C1.51957 19.8946 1.26522 20 1 20C0.734784 20 0.48043 19.8946 0.292893 19.7071C0.105357 19.5196 0 19.2652 0 19V1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0C1.26522 0 1.51957 0.105357 1.70711 0.292893C1.89464 0.48043 2 0.734784 2 1ZM12.5 7.8125L10 8.625V6C10 5.73478 9.89464 5.48043 9.70711 5.29289C9.51957 5.10536 9.26522 5 9 5C8.73478 5 8.48043 5.10536 8.29289 5.29289C8.10536 5.48043 8 5.73478 8 6V8.625L5.5 7.8125C5.24771 7.72962 4.97284 7.75036 4.73584 7.87014C4.49884 7.98993 4.31913 8.19896 4.23625 8.45125C4.15337 8.70354 4.17411 8.97841 4.29389 9.21541C4.41368 9.45241 4.62271 9.63212 4.875 9.715L7.375 10.5263L5.8325 12.6513C5.75098 12.7572 5.69153 12.8783 5.65764 13.0076C5.62376 13.1369 5.61613 13.2717 5.63522 13.404C5.65431 13.5363 5.69972 13.6634 5.76877 13.7778C5.83782 13.8922 5.92911 13.9917 6.03725 14.0702C6.14538 14.1488 6.26816 14.2048 6.39834 14.2351C6.52851 14.2654 6.66344 14.2693 6.79514 14.2466C6.92685 14.2238 7.05266 14.1749 7.16513 14.1027C7.27761 14.0305 7.37447 13.9365 7.45 13.8263L8.9925 11.7013L10.535 13.8263C10.6105 13.9365 10.7074 14.0305 10.8199 14.1027C10.9323 14.1749 11.0582 14.2238 11.1899 14.2466C11.3216 14.2693 11.4565 14.2654 11.5867 14.2351C11.7168 14.2048 11.8396 14.1488 11.9478 14.0702C12.0559 13.9917 12.1472 13.8922 12.2162 13.7778C12.2853 13.6634 12.3307 13.5363 12.3498 13.404C12.3689 13.2717 12.3612 13.1369 12.3274 13.0076C12.2935 12.8783 12.234 12.7572 12.1525 12.6513L10.61 10.5263L13.11 9.715C13.3511 9.62531 13.5484 9.44612 13.6609 9.21469C13.7733 8.98327 13.7922 8.71742 13.7136 8.47242C13.6351 8.22742 13.4651 8.02212 13.2391 7.89921C13.013 7.77631 12.7483 7.74525 12.5 7.8125ZM25.75 8.455C25.668 8.20501 25.4909 7.99739 25.2569 7.87712C25.0229 7.75686 24.751 7.73364 24.5 7.8125L22 8.625V6C22 5.73478 21.8946 5.48043 21.7071 5.29289C21.5196 5.10536 21.2652 5 21 5C20.7348 5 20.4804 5.10536 20.2929 5.29289C20.1054 5.48043 20 5.73478 20 6V8.625L17.5 7.81375C17.3751 7.77312 17.2434 7.7575 17.1124 7.76777C16.9815 7.77804 16.8538 7.814 16.7368 7.8736C16.6197 7.93321 16.5155 8.01528 16.4302 8.11515C16.3448 8.21501 16.28 8.3307 16.2394 8.45562C16.1987 8.58054 16.1831 8.71224 16.1934 8.8432C16.2037 8.97416 16.2396 9.10181 16.2992 9.21887C16.3588 9.33593 16.4409 9.44011 16.5408 9.52545C16.6406 9.61079 16.7563 9.67562 16.8813 9.71625L19.3813 10.5275L17.8388 12.6525C17.7572 12.7584 17.6978 12.8796 17.6639 13.0089C17.63 13.1382 17.6224 13.2729 17.6415 13.4052C17.6606 13.5375 17.706 13.6646 17.775 13.7791C17.8441 13.8935 17.9354 13.9929 18.0435 14.0715C18.1516 14.15 18.2744 14.2061 18.4046 14.2364C18.5348 14.2667 18.6697 14.2706 18.8014 14.2478C18.9331 14.2251 19.0589 14.1762 19.1714 14.104C19.2839 14.0318 19.3807 13.9378 19.4562 13.8275L20.9988 11.7025L22.5413 13.8275C22.6168 13.9378 22.7136 14.0318 22.8261 14.104C22.9386 14.1762 23.0644 14.2251 23.1961 14.2478C23.3278 14.2706 23.4627 14.2667 23.5929 14.2364C23.7231 14.2061 23.8459 14.15 23.954 14.0715C24.0621 13.9929 24.1534 13.8935 24.2225 13.7791C24.2915 13.6646 24.3369 13.5375 24.356 13.4052C24.3751 13.2729 24.3675 13.1382 24.3336 13.0089C24.2997 12.8796 24.2403 12.7584 24.1588 12.6525L22.6162 10.5275L25.1162 9.71625C25.3672 9.63261 25.5749 9.45292 25.6936 9.21653C25.8124 8.98013 25.8327 8.7063 25.75 8.455Z"
                            fill="#0E0E0E"/>
                    </svg>

                    <input
                        type="text"
                        placeholder="Новий пароль"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                </div>
                    <div>
                        <div className="user-info-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="22" viewBox="0 0 26 22" fill="none">
                                <path
                                    d="M22 9C22 9.26522 21.8946 9.51957 21.7071 9.70711C21.5196 9.89464 21.2652 10 21 10H16C15.7348 10 15.4804 9.89464 15.2929 9.70711C15.1054 9.51957 15 9.26522 15 9C15 8.73478 15.1054 8.48043 15.2929 8.29289C15.4804 8.10536 15.7348 8 16 8H21C21.2652 8 21.5196 8.10536 21.7071 8.29289C21.8946 8.48043 22 8.73478 22 9ZM21 12H16C15.7348 12 15.4804 12.1054 15.2929 12.2929C15.1054 12.4804 15 12.7348 15 13C15 13.2652 15.1054 13.5196 15.2929 13.7071C15.4804 13.8946 15.7348 14 16 14H21C21.2652 14 21.5196 13.8946 21.7071 13.7071C21.8946 13.5196 22 13.2652 22 13C22 12.7348 21.8946 12.4804 21.7071 12.2929C21.5196 12.1054 21.2652 12 21 12ZM26 2V20C26 20.5304 25.7893 21.0391 25.4142 21.4142C25.0391 21.7893 24.5304 22 24 22H2C1.46957 22 0.960859 21.7893 0.585786 21.4142C0.210714 21.0391 0 20.5304 0 20V2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0H24C24.5304 0 25.0391 0.210714 25.4142 0.585786C25.7893 0.960859 26 1.46957 26 2ZM24 20V2H2V20H24ZM13.9675 15.75C14.0338 16.0069 13.9953 16.2797 13.8605 16.5082C13.7257 16.7368 13.5057 16.9024 13.2488 16.9688C12.9918 17.0351 12.7191 16.9966 12.4905 16.8618C12.262 16.727 12.0963 16.5069 12.03 16.25C11.7013 14.9675 10.3975 14 8.99875 14C7.6 14 6.2975 14.9675 5.9675 16.25C5.9012 16.5069 5.73554 16.727 5.50698 16.8618C5.27842 16.9966 5.00568 17.0351 4.74875 16.9688C4.49182 16.9024 4.27176 16.7368 4.13696 16.5082C4.00217 16.2797 3.9637 16.0069 4.03 15.75C4.3545 14.5422 5.12157 13.5007 6.17875 12.8325C5.61696 12.274 5.23363 11.5614 5.07736 10.7848C4.92109 10.0082 4.99891 9.20273 5.30096 8.47044C5.60301 7.73815 6.11568 7.11202 6.774 6.67145C7.43231 6.23087 8.20661 5.99567 8.99875 5.99567C9.79089 5.99567 10.5652 6.23087 11.2235 6.67145C11.8818 7.11202 12.3945 7.73815 12.6965 8.47044C12.9986 9.20273 13.0764 10.0082 12.9201 10.7848C12.7639 11.5614 12.3805 12.274 11.8188 12.8325C12.8771 13.4997 13.6448 14.5416 13.9688 15.75H13.9675ZM9 12C9.39556 12 9.78224 11.8827 10.1111 11.6629C10.44 11.4432 10.6964 11.1308 10.8478 10.7654C10.9991 10.3999 11.0387 9.99778 10.9616 9.60982C10.8844 9.22186 10.6939 8.86549 10.4142 8.58579C10.1345 8.30608 9.77814 8.1156 9.39018 8.03843C9.00222 7.96126 8.60009 8.00087 8.23463 8.15224C7.86918 8.30362 7.55682 8.55996 7.33706 8.88886C7.1173 9.21776 7 9.60444 7 10C7 10.5304 7.21071 11.0391 7.58579 11.4142C7.96086 11.7893 8.46957 12 9 12Z"
                                    fill="#0E0E0E"/>
                            </svg>

                            <p>Телефонія</p>

                            <div className="user-info-item-buttons">
                                <button onClick={() => setModalCreateTelephony(true)}>+</button>
                                <button onClick={() => setModalSelectTelephony(true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="16" viewBox="0 0 24 16"
                                         fill="none">
                                        <path
                                            d="M22.1368 0.390698C22.2381 0.266831 22.3584 0.168576 22.4909 0.101541C22.6233 0.0345049 22.7652 3.08217e-08 22.9085 2.50114e-08C23.0519 1.92009e-08 23.1938 0.0345049 23.3262 0.101541C23.4586 0.168576 23.579 0.266831 23.6803 0.390697C23.7817 0.514565 23.8621 0.661615 23.9169 0.823455C23.9718 0.985294 24 1.15875 24 1.33393C24 1.5091 23.9718 1.68256 23.9169 1.8444C23.8621 2.00624 23.7817 2.15329 23.6803 2.27715L12.7718 15.609C12.6705 15.7329 12.5502 15.8313 12.4177 15.8984C12.2853 15.9655 12.1434 16 12 16C11.8566 16 11.7147 15.9655 11.5823 15.8984C11.4498 15.8313 11.3295 15.7329 11.2282 15.609L0.319681 2.27715C0.114992 2.027 -6.80293e-07 1.68771 -6.91261e-07 1.33393C-7.0223e-07 0.980148 0.114992 0.640859 0.319681 0.390698C0.524369 0.140539 0.801986 9.21163e-07 1.09146 9.09429e-07C1.38093 8.97694e-07 1.65855 0.140539 1.86324 0.390698L12 12.781L22.1368 0.390698Z"
                                            fill="#292929"/>
                                    </svg>

                                </button>
                            </div>

                        </div>

                        <UserTelephony />

                    </div>

                <div className="user-info-bottom">
                    <button
                        style={{ background: currentUser.isActive ? '#FC2828' : '#46DA2E' }}
                        onClick={() => changeActiveState(currentUser._id)}
                    >
                        {currentUser.isActive ? 'Деактивувати' : 'Активувавти'}
                    </button>

                    <button
                        onClick={handleDeleteUser}
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Видаляємо...' : 'Видалити'}
                    </button

                    >
                    {newPassword && (
                        <button
                            style={{background: '#46DA2E'}}
                            onClick={changeUserPassword}>Змінити пароль</button>
                    )}
                </div>
            </div>

            {modalCreateTelephony ? (
                <Modal title="Створити телефонію" closeModal={() => setModalCreateTelephony(false)}>
                    <CreateTelephony modalCreateTelephony={modalCreateTelephony} setModalCreateTelephony={setModalCreateTelephony} />
                </Modal>
            ) : null}

            {modalSelectTelephony ? (
                <Modal title="Телефонії" closeModal={setModalSelectTelephony}>
                    <AllTelephony
                        setModalEditTelephony={setModalEditTelephony}
                    />
                </Modal>
            ) : null }

            {modalEditTelephony ? (
                <Modal title="Редагування телефонії" closeModal={setModalEditTelephony}>
                    <EditTelephony setModalEditTelephony={setModalEditTelephony} />
                </Modal>
            ) : null }
        </>
    );
};

export default UserInfo;