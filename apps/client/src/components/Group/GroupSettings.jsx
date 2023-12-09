import Select from "../UI/Select";
import DoubleTime from "../UI/DoubleTime";
import Modal from "../Modal/Modal";
import {useDispatch, useSelector} from "react-redux";
import {Controller, useForm} from "react-hook-form";
import {useEffect} from "react";
import axios from "axios";
import {apiUrl} from "../../utils/api/api";
import {toast} from "react-toastify";
import {updateGroup} from "../../utils/store/slices/groupsSlice";

const GroupSettings = ({setModalSettings, group}) => {
    const dispatch = useDispatch();
    const { allTelephony } = useSelector(state => state.telephony);

    const {
        handleSubmit,
        register,
        setValue,
        control,
        formState: { errors }
    } = useForm({mode: 'onSubmit', reValidateMode: "onSubmit"});

    const selectOptionsTelephony = allTelephony.map(item => {
        return ({value: item._id, label: item.name});
    })

    const changeSettings = async (data) => {
        try {
            const res = await axios.put(`${apiUrl}/groups/edit/${group._id}`, data);
            console.log(data)
            if (res.data.status === 'success') {
                setModalSettings(false);
                console.log(data)
                dispatch(updateGroup({id: group._id, ...data}));
                toast.success(`Групу оновлено!`);
            }
        } catch (error) {
            console.error(error.response.data.message);
        }
    }

    useEffect(() => {
        if (allTelephony) {
            setValue("name", group.name);
            setValue("line", group.line ? group.line : '');
        }
    }, [allTelephony, setValue, group.line, group.name]);

    return (
        <Modal
            closeModal={setModalSettings}
            otherClass="group-cart__settings-head"
            title="Налаштування групи"
            headButtons={
                <>
                    <button className="group-cart__head-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"
                             fill="none">
                            <circle cx="15" cy="15" r="15" fill="#0E0E0E"/>
                            <path
                                d="M24.1667 5H10.8333C10.6123 5 10.4004 5.0878 10.2441 5.24408C10.0878 5.40036 10 5.61232 10 5.83333V10H5.83333C5.61232 10 5.40036 10.0878 5.24408 10.2441C5.0878 10.4004 5 10.6123 5 10.8333V24.1667C5 24.3877 5.0878 24.5996 5.24408 24.7559C5.40036 24.9122 5.61232 25 5.83333 25H19.1667C19.3877 25 19.5996 24.9122 19.7559 24.7559C19.9122 24.5996 20 24.3877 20 24.1667V20H24.1667C24.3877 20 24.5996 19.9122 24.7559 19.7559C24.9122 19.5996 25 19.3877 25 19.1667V5.83333C25 5.61232 24.9122 5.40036 24.7559 5.24408C24.5996 5.0878 24.3877 5 24.1667 5ZM18.3333 23.3333H6.66667V11.6667H18.3333V23.3333ZM23.3333 18.3333H20V10.8333C20 10.6123 19.9122 10.4004 19.7559 10.2441C19.5996 10.0878 19.3877 10 19.1667 10H11.6667V6.66667H23.3333V18.3333Z"
                                fill="white"/>
                        </svg>
                    </button>
                    <button className="group-cart__head-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"
                             fill="none">
                            <circle cx="15" cy="15" r="15" fill="#0E0E0E"/>
                            <path
                                d="M24 17.25V22.5C24 22.8978 23.842 23.2794 23.5607 23.5607C23.2794 23.842 22.8978 24 22.5 24H7.5C7.10218 24 6.72064 23.842 6.43934 23.5607C6.15804 23.2794 6 22.8978 6 22.5V17.25C6 17.0511 6.07902 16.8603 6.21967 16.7197C6.36032 16.579 6.55109 16.5 6.75 16.5C6.94891 16.5 7.13968 16.579 7.28033 16.7197C7.42098 16.8603 7.5 17.0511 7.5 17.25V22.5H22.5V17.25C22.5 17.0511 22.579 16.8603 22.7197 16.7197C22.8603 16.579 23.0511 16.5 23.25 16.5C23.4489 16.5 23.6397 16.579 23.7803 16.7197C23.921 16.8603 24 17.0511 24 17.25ZM14.4694 17.7806C14.539 17.8504 14.6217 17.9057 14.7128 17.9434C14.8038 17.9812 14.9014 18.0006 15 18.0006C15.0986 18.0006 15.1962 17.9812 15.2872 17.9434C15.3783 17.9057 15.461 17.8504 15.5306 17.7806L19.2806 14.0306C19.3503 13.9609 19.4056 13.8782 19.4433 13.7872C19.481 13.6961 19.5004 13.5985 19.5004 13.5C19.5004 13.4015 19.481 13.3039 19.4433 13.2128C19.4056 13.1218 19.3503 13.0391 19.2806 12.9694C19.2109 12.8997 19.1282 12.8444 19.0372 12.8067C18.9461 12.769 18.8485 12.7496 18.75 12.7496C18.6515 12.7496 18.5539 12.769 18.4628 12.8067C18.3718 12.8444 18.2891 12.8997 18.2194 12.9694L15.75 15.4397V6.75C15.75 6.55109 15.671 6.36032 15.5303 6.21967C15.3897 6.07902 15.1989 6 15 6C14.8011 6 14.6103 6.07902 14.4697 6.21967C14.329 6.36032 14.25 6.55109 14.25 6.75V15.4397L11.7806 12.9694C11.6399 12.8286 11.449 12.7496 11.25 12.7496C11.051 12.7496 10.8601 12.8286 10.7194 12.9694C10.5786 13.1101 10.4996 13.301 10.4996 13.5C10.4996 13.699 10.5786 13.8899 10.7194 14.0306L14.4694 17.7806Z"
                                fill="white"/>
                        </svg>
                    </button>
                    <div className="group-cart__head-id">ID - {group.groupId}</div>
                </>
            }
        >
            <form className="group-cart__settings-content" onSubmit={handleSubmit(changeSettings)}>
                <div className="group-cart__settings-item group-cart__settings-item1">
                    <input
                        {...register("name", {
                            required: "Введіть назву групи!",
                        })}
                        type="text"
                        className={errors.name ? '_error' : ''}
                    />
                    <Controller
                        control={control}
                        name="sortBy"
                        defaultValue={group.sortBy}
                        render={({ field }) => (
                            <Select
                                type="black"
                                options={[
                                    {value: 'oldest', label: 'Спочатку старіші'},
                                    {value: 'newest', label: 'Спочатку нові'}
                                ]}
                                {...field}
                            />
                        )}
                    />
                </div>
                <div className="group-cart__settings-item group-cart__settings-item2">
                    <p>Час дозвону <span>{group.callback.callTime}</span></p>
                    <p>Передзвон <span>{group.callback.callback}</span></p>
                    <p>Спроб передзвону <span>{group.callback.callbackAttempt}</span></p>
                    <p>постобробка <span>{group.callback.postProcessing}</span></p>
                </div>
                <div className="group-cart__settings-item group-cart__settings-item3">
                    <p>Зайнятий <span>{group.callback.busy}</span></p>
                    <p>Недоступно <span>{group.callback.notAvailable}</span></p>
                    <p>Недозвон <span>{group.callback.noCall}</span></p>
                    <p>Перервана <span>{group.callback.interrupted}</span></p>
                </div>
                <div className="group-cart__settings-item group-cart__settings-item4">
                    <div className="group-cart__queue">
                        <span style={{justifyContent: "left", width: '50%'}}>Черга</span>
                        <Controller
                            control={control}
                            name="line"
                            render={({ field }) => (
                                <Select
                                    placeholder="Телефонії..."
                                    options={selectOptionsTelephony}
                                    {...field}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="group-cart__settings-item group-cart__settings-item5">
                    <div className="group-cart__time">
                        <span>ПН</span>
                        <Controller
                            control={control}
                            name="dayTime.Monday"
                            defaultValue={{
                                with: group.dayTime.Monday.with,
                                on: group.dayTime.Monday.on
                            }}
                            render={({ field }) => (
                                <DoubleTime
                                        {...field}
                                />
                            )}
                        />

                    </div>
                    <div className="group-cart__time">
                        <span>ВТ</span>
                        <Controller
                            control={control}
                            name="dayTime.Tuesday"
                            defaultValue={{
                                with: group.dayTime.Tuesday.with,
                                on: group.dayTime.Tuesday.on
                            }}
                            render={({ field }) => (
                                <DoubleTime
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <div className="group-cart__time">
                        <span>СР</span>
                        <Controller
                            control={control}
                            name="dayTime.Wednesday"
                            defaultValue={{
                                with: group.dayTime.Wednesday.with,
                                on: group.dayTime.Wednesday.on
                            }}
                            render={({ field }) => (
                                <DoubleTime
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <div className="group-cart__time">
                        <span>ЧТ</span>
                        <Controller
                            control={control}
                            name="dayTime.Thursday"
                            defaultValue={{
                                with: group.dayTime.Thursday.with,
                                on: group.dayTime.Thursday.on
                            }}
                            render={({ field }) => (
                                <DoubleTime
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <div className="group-cart__time">
                        <span>ПТ</span>
                        <Controller
                            control={control}
                            name="dayTime.Friday"
                            defaultValue={{
                                with: group.dayTime.Friday.with,
                                on: group.dayTime.Friday.on
                            }}
                            render={({ field }) => (
                                <DoubleTime
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <div className="group-cart__time">
                        <span>СБ</span>
                        <Controller
                            control={control}
                            name="dayTime.Saturday"
                            defaultValue={{
                                with: group.dayTime.Saturday.with,
                                on: group.dayTime.Saturday.on
                            }}
                            render={({ field }) => (
                                <DoubleTime
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <div className="group-cart__time">
                        <span>НД</span>
                        <Controller
                            control={control}
                            name="dayTime.Sunday"
                            defaultValue={{
                                with: group.dayTime.Sunday.with,
                                on: group.dayTime.Sunday.on
                            }}
                            render={({ field }) => (
                                <DoubleTime
                                    {...field}
                                />
                            )}
                        />
                    </div>

                </div>

                <button className="btn btn-aqua btn-send" style={{width: '190px'}}>Зберегти</button>
            </form>
        </Modal>
    );
};

export default GroupSettings;