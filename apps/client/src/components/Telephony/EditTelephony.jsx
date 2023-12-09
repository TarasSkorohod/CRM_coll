import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {editingTelephony} from "../../utils/api/api";
import {stateRenderTelephony} from "../../utils/store/slices/telephonySlice";

const EditTelephony = ({setModalEditTelephony}) => {
    const dispatch = useDispatch();
    const { currentTelephony } = useSelector(state => state.telephony);

    const {
        handleSubmit,
        register,
        setValue,
        watch,
        formState: { errors }
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: "onSubmit"
    });

    useEffect(() => {
        if (currentTelephony) {
            setValue("name", currentTelephony.name);
            setValue("sipInternalNumber", currentTelephony.sipInternalNumber);
            setValue("sipServer", currentTelephony.sipServer);
            setValue("login", currentTelephony.login);
            setValue("password", currentTelephony.password);
        }
    }, [currentTelephony, setValue]);

    useEffect(() => {
        if (Object.keys(errors).length !== 0) toast.error("Всі поля повинні бути заповнені!");
    }, [errors.name, errors.sipInternalNumber, errors.password, errors.sipServer, errors.login, errors])

    const handleEditTelephony = async (data) => {
        await editingTelephony(currentTelephony._id, data);
        setModalEditTelephony(false);
        dispatch(stateRenderTelephony(false));
    }

    return (
        <form className="form-edit-telephony" onSubmit={handleSubmit(handleEditTelephony)}>
            <label className="form-control">
                <input
                    {...register("name", {
                        required: "Введіть назву телефонії!",
                    })}
                    type="text"
                    placeholder="Назва"
                    className={errors.name ? '_error' : ''}
                />
            </label>
            <label className="form-control">
                <input
                    {...register("sipInternalNumber", {
                        required: "Введіть номер лінії!",
                    })}
                    type="text"
                    placeholder="Номер лінії"
                    className={errors.sipInternalNumber ? '_error' : ''}
                />
            </label>
            <label className="form-control">
                <input
                    {...register("sipServer", {
                        required: "Введіть SIP сервер!",
                    })}
                    type="text"
                    placeholder="SIP сервер"
                    className={errors.sipServer ? '_error' : ''}
                />
            </label>
            <label className="form-control">
                <input
                    {...register("login", {
                        required: "Введіть логін телефонії!",
                    })}
                    type="text"
                    placeholder="Логін телефонії"
                    className={errors.login ? '_error' : ''}
                />
            </label>
            <label className="form-control">
                <input
                    {...register("password", {
                        required: "Введіть пароль телефонії!",
                    })}
                    type="text"
                    placeholder="Пароль телефонії"
                    className={errors.password ? '_error' : ''}
                />
            </label>
            <div className="user-info-item-chk">
                Приймати вхідну лінію
                <label className={`checkbox-switcher`}>
                    <input
                        {...register("isTelephonySelected", {})}
                        type="checkbox"
                        checked={watch("isTelephonySelected", currentTelephony.isTelephonySelected)}
                    />
                    <span></span>
                </label>
            </div>
            <button className="btn btn-aqua btn-send">Зберегти</button>
        </form>
    );
};

export default EditTelephony;