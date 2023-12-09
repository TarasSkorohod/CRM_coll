import Modal from "../Modal/Modal";
import {createUser} from "../../utils/api/api";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {renderUserData} from "../../utils/store/slices/usersSlice";

const AddUsers = () => {
    const dispatch = useDispatch();
    const [addUserModal, setAddUserModal] = useState(false);
    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors }
    } = useForm({mode: 'onSubmit', reValidateMode: "onSubmit"});

    useEffect(() => {
        if (addUserModal === false) {
            clearFormValues();
        }
    }, [addUserModal])

    const handleSaveUser = async (data) => {
        try {
            await createUser(data);

            setAddUserModal(false);
            clearFormValues();
            dispatch(renderUserData());

        } catch (error) {
            console.error('Помилка при створенні користувача:', error.response.data.message);
        }
    };

    const clearFormValues = () => {
        setValue("fullName", '');
        setValue("email", '');
        setValue("password", '');
        setValue("role", 'ADMIN');
    }

    useEffect(() => {
        errors?.fullName && toast.error(errors.fullName.message);
        errors?.email && toast.error(errors.email.message);
        errors?.password && toast.error(errors.password.message);

    }, [errors.fullName, errors.email, errors.password])

    return (
        <div>
            <button className="add-user" onClick={() => setAddUserModal(true)}>
                +
            </button>

            {addUserModal ?
                <Modal
                    title="Додати користувача"
                    closeModal={() => setAddUserModal(false)}
                >
                    <form className="form-add-user" onSubmit={handleSubmit(handleSaveUser)}>
                        <label className="form-control">
                            <input
                                {...register("fullName", { required: "Введіть імʼя!" })}
                                type="text"
                                placeholder="Ім’я користувача"
                                className={errors.fullName ? '_error' : ''}
                            />
                        </label>
                        <label className="form-control">
                            <input
                                {...register("email", {
                                    required: "Введіть пошту!",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Введіть валідну пошту!"
                                    }
                                })}
                                type="text"
                                placeholder="Пошта"
                                className={errors.email ? '_error' : ''}
                            />
                        </label>
                        <label className="form-control">
                            <input
                                {...register("password", {
                                    required: "Введіть пароль!",
                                    minLength: {
                                        value: 6,
                                        message: "Пароль повинен бути не менше 6 символів!"
                                    }
                                })}
                                type="password"
                                autoComplete="true"
                                placeholder="Пароль"
                                className={errors.password ? '_error' : ''}
                            />
                        </label>
                        <label>
                            <select
                                className="form-control__select"
                                {...register("role")}
                            >
                                <option value="ADMIN">ADMIN</option>
                                <option value="OPERATOR">OPERATOR</option>
                            </select>
                        </label>
                        <button
                            className="btn btn-aqua btn-send"
                        >
                            Зберегти
                        </button>
                    </form>
                </Modal>
                : null
            }
        </div>
    );
};

export default AddUsers;