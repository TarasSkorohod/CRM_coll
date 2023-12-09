import {useEffect, useState} from "react";
import Modal from "../Modal/Modal";
import './Group.css';
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import axios from "axios";
import {apiUrl} from "../../utils/api/api";
import {useDispatch} from "react-redux";
import {renderGroupsData} from "../../utils/store/slices/groupsSlice";
import {useNavigate} from "react-router-dom";

const filterData = [
    {value: '', name: 'Всі', color: '#ccc'},
    {value: '?active=ACTIVE', name: 'Активні', color: '#46DA2E'},
    {value: '?active=INACTIVE', name: 'Неактивні', color: '#FC2828'},
]
const GroupHeader = ({setSearch}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openModalFilter, setOpenModalFilter] = useState(false);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [filterValue, setFilterValue] = useState({value: '', name: 'Всі', color: '#ccc'});

    const urlParams = new URLSearchParams(window.location.search);
    const activeValue = urlParams.get('active');

    useEffect(() => {
        const currentFilter = filterData.find(item => item.value.includes(activeValue));

        if (currentFilter) {
            if (activeValue === 'ACTIVE') {
                setFilterValue( {value: '?active=ACTIVE', name: 'Активні', color: '#46DA2E'});
            } else if (activeValue === 'INACTIVE') {
                setFilterValue( {value: '?active=INACTIVE', name: 'Неактивні', color: '#FC2828'});
            } else {
                setFilterValue({value: '', name: 'Всі', color: '#ccc'});
            }
        }

        dispatch(renderGroupsData());
    }, [activeValue, dispatch])

    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors }
    } = useForm({mode: 'onSubmit', reValidateMode: "onSubmit"});


    const changeFilter = (name, color, value) => {
        setFilterValue({value: value, name: name, color: color});
        setOpenModalFilter(false);
        navigate(value);
    }

    const createGroup = async (data) => {
        try {
            const res = await axios({
                method: 'POST',
                url: `${apiUrl}/groups/create`,
                data: data
            })

            if(res.data.status === 'success') {
                dispatch(renderGroupsData());

                toast.success('Групу створено!');
                setOpenModalCreate(false);
                setValue('name', '');
            }
        } catch (error) {
            console.error(error.response.data.message)
        }

    }

    useEffect(() => {
        errors?.name && toast.error(errors.name.message);
    }, [errors.name])

    return (
        <>
            <div className="admin-group__head">
                <label>
                    <input type="text" placeholder="Пошук" onChange={(e) => setSearch(e.target.value)}/>
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                        <path
                            d="M16.8086 15.8844L12.7208 11.7974C13.9056 10.3749 14.4964 8.55047 14.3703 6.70351C14.2442 4.85656 13.4109 3.12931 12.0437 1.8811C10.6766 0.632883 8.88084 -0.040203 7.03006 0.00185901C5.17928 0.043921 3.41597 0.797893 2.10693 2.10693C0.797893 3.41597 0.043921 5.17928 0.00185901 7.03006C-0.040203 8.88084 0.632883 10.6766 1.8811 12.0437C3.12931 13.4109 4.85656 14.2442 6.70351 14.3703C8.55047 14.4964 10.3749 13.9056 11.7974 12.7208L15.8844 16.8086C15.9451 16.8693 16.0171 16.9174 16.0964 16.9503C16.1757 16.9831 16.2607 17 16.3465 17C16.4323 17 16.5173 16.9831 16.5966 16.9503C16.6759 16.9174 16.7479 16.8693 16.8086 16.8086C16.8693 16.7479 16.9174 16.6759 16.9503 16.5966C16.9831 16.5173 17 16.4323 17 16.3465C17 16.2607 16.9831 16.1757 16.9503 16.0964C16.9174 16.0171 16.8693 15.9451 16.8086 15.8844ZM1.32432 7.20256C1.32432 6.03996 1.66907 4.90346 2.31498 3.93679C2.96089 2.97012 3.87895 2.21669 4.95306 1.77178C6.02717 1.32687 7.20909 1.21046 8.34935 1.43727C9.48962 1.66408 10.537 2.22393 11.3591 3.04602C12.1812 3.86811 12.741 4.91551 12.9679 6.05578C13.1947 7.19604 13.0783 8.37796 12.6334 9.45207C12.1884 10.5262 11.435 11.4442 10.4683 12.0901C9.50167 12.7361 8.36517 13.0808 7.20256 13.0808C5.64409 13.0791 4.14994 12.4592 3.04793 11.3572C1.94592 10.2552 1.32605 8.76104 1.32432 7.20256Z"
                            fill="white"/>
                    </svg>
                </label>

                <button
                    style={{background: `${filterValue.color}`}}
                    className="admin-group__filter"
                    onClick={() => setOpenModalFilter(true)}
                >
                    {filterValue.name}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="16" viewBox="0 0 24 16" fill="none">
                        <path
                            d="M22.1368 0.390698C22.2381 0.266831 22.3584 0.168576 22.4909 0.101541C22.6233 0.0345049 22.7652 3.08217e-08 22.9085 2.50114e-08C23.0519 1.92009e-08 23.1938 0.0345049 23.3262 0.101541C23.4586 0.168576 23.579 0.266831 23.6803 0.390697C23.7817 0.514565 23.8621 0.661615 23.9169 0.823455C23.9718 0.985294 24 1.15875 24 1.33393C24 1.5091 23.9718 1.68256 23.9169 1.8444C23.8621 2.00624 23.7817 2.15329 23.6803 2.27715L12.7718 15.609C12.6705 15.7329 12.5502 15.8313 12.4177 15.8984C12.2853 15.9655 12.1434 16 12 16C11.8566 16 11.7147 15.9655 11.5823 15.8984C11.4498 15.8313 11.3295 15.7329 11.2282 15.609L0.319681 2.27715C0.114992 2.027 -6.80293e-07 1.68771 -6.91261e-07 1.33393C-7.0223e-07 0.980148 0.114992 0.640859 0.319681 0.390698C0.524369 0.140539 0.801986 9.21163e-07 1.09146 9.09429e-07C1.38093 8.97694e-07 1.65855 0.140539 1.86324 0.390698L12 12.781L22.1368 0.390698Z"
                            fill="white"/>
                    </svg>
                </button>
                <button
                    className="admin-group__create"
                    onClick={() => setOpenModalCreate(true)}
                >
                    Створити
                </button>
            </div>

            {openModalFilter ?
                <Modal title="Вибір фільтру" closeModal={setOpenModalFilter}>
                    <ul className="admin-group__filter-list">
                        {filterData.map(({name, color, value}, index) =>
                            <li key={index}>
                                <button
                                    style={{background: `${color}`}}
                                    onClick={() => changeFilter(name, color, value)}
                                >
                                    {name}
                                </button>
                            </li>
                        )}
                    </ul>
                </Modal>
                : null
            }

            {openModalCreate ?
                <Modal title="Створити нову групу" closeModal={setOpenModalCreate}>
                    <form onSubmit={handleSubmit(createGroup)}>
                        <div style={{margin: '20px 0 30px'}}>
                            <label className="admin-group__create-label">
                                <input
                                    {...register("name", {
                                        required: "Введіть назву групи!",
                                    })}
                                    type="text"
                                    placeholder="Назва"
                                    className={errors.name ? '_error' : ''}
                                />
                            </label>
                            <button className="btn btn-aqua btn-send" style={{width: 'calc(100% - 30px)'}}>Зберегти
                            </button>
                        </div>
                    </form>
                </Modal>
                : null
            }
        </>
    );
};

export default GroupHeader;