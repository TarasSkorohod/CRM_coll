import {useForm} from "react-hook-form";
import {createTelephony} from "../../utils/api/api";
import {useEffect} from "react";
import {toast} from "react-toastify";

const CreateTelephony = ({modalCreateTelephony, setModalCreateTelephony}) => {

    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors }
    } = useForm({mode: 'onSubmit', reValidateMode: "onSubmit"});

    const handleCreateTelephony = async (data) => {
        try {
            await createTelephony(data);
            clearFormTelephony();
            setModalCreateTelephony(false);
        } catch (error) {
            console.error('Error creating telephony:', error.response.data.message);
        }
    };

    const clearFormTelephony = () => {
        setValue("name", '');
        setValue("sipInternalNumber", '');
        setValue("sipServer", '');
        setValue("login", '');
        setValue("password", '');
    }

    useEffect(() => {
        if (modalCreateTelephony === false) {
            clearFormTelephony();
        }
    }, [modalCreateTelephony])

    useEffect(() => {
        errors?.name && toast.error(errors.name.message);
        errors?.sipInternalNumber && toast.error(errors.sipInternalNumber.message);
        errors?.sipServer && toast.error(errors.sipServer.message);
        errors?.login && toast.error(errors.login.message);
        errors?.password && toast.error(errors.password.message);

    }, [errors.name, errors.sipInternalNumber, errors.password, errors.sipServer, errors.login])

    return (
        <form className="form-create-telephony" onSubmit={handleSubmit(handleCreateTelephony)}>
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
            <button className="btn btn-aqua btn-send">
                Зберегти
            </button>
        </form>
    );
};

export default CreateTelephony;