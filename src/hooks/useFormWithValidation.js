import React, { useCallback } from 'react';
const isEmail = require('validator/lib/isEmail');

//хук управления формой и валидацией формы
export default function useFormWithValidation() {
    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);

    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        if (name === 'email') {
            if (!isEmail(value)) {
                target.setCustomValidity('Формат поля некорректный. Пример: movie@movie.ru');
            } else {
                target.setCustomValidity('');
            }
        }

        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: target.validationMessage });
        setIsValid(target.closest('form').checkValidity());
    };

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );

    return { values, handleChange, errors, isValid, resetForm, setIsValid, setValues };
}