import {useState} from 'react';

export const useForm = (initialValues, onSubmitHandler) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const changeHandler = (e) => {
        setValues(state => ({...state, [e.target.name]: e.target.value}));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        // Clear errors at the beginning of each submit
        setErrors({});
        // Await for potential errors from the submit callback
        const validationErrors = await onSubmitHandler(values);

        if (validationErrors) {
            setErrors(validationErrors);
        }
    };

    const changeValues = (newValues) => {
        // TODO: Validate newValues shape (like initialValues)

        setValues(newValues);
    };


    return {
        values,
        errors,
        changeHandler,
        onSubmit,
        changeValues,
    };
};