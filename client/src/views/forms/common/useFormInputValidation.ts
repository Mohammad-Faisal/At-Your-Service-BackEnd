import { useEffect, useState } from 'react'
import { message } from 'antd'
import * as Yup from 'yup'
import {AnyObjectSchema, ValidationError} from "yup";


interface IErrorObject {
    [key: string]: string;
}

interface ITouchedObject {
    [key: string]: boolean;
}

export interface IControl{
    values:any,
    touched: ITouchedObject,
    errors:IErrorObject,
    handleSubmit : (onSubmit: () =>void) => void,
    handleInputChange: (a:string , b:any) => void,
    setSingleValue :(name:string, value:string|number|boolean) =>  void,
    setAllValues :(newValues:any) =>  void,
    resetData:() =>  void,
}


export default function useFormInputValidation<T>(
    INITIAL_STATE:T,
    VALIDATION_SCHEMA: AnyObjectSchema= Yup.object({})
) {
    const [values, setValues] = useState(INITIAL_STATE)
    const [touched, setTouched] = useState<ITouchedObject>({})
    const [hasError, setHasError] = useState<boolean>(false)
    const [errors, setErrors] = useState<IErrorObject>({})

    const handleInputChange = (name:string, value:string|number|boolean) => {
        const newValues = {...values, [name]: value}
        const newTouched= {...touched, [name]: true}

        setValues(newValues)
        setTouched(newTouched)
    }

    const setAllValues = (newValues:T) => {
        setValues(newValues)
    }

    const setSingleValue = (name:string, value:string|number|boolean) => {
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = (onSubmit: () =>void) => {
        if (!hasError) {
            onSubmit()
        } else {
            const touched:ITouchedObject = {}
            Object.keys(INITIAL_STATE).map((key) => {
                touched[key] = true
            })
            setTouched(touched)
            message.error('Please fill up all the required fields')
        }
    }

    useEffect(() => {
        validateData()
    }, [values])

    const validateData = () => {
        if (VALIDATION_SCHEMA.validate) {
            VALIDATION_SCHEMA
                .validate(values, { abortEarly: false })
                .then(() => {
                    setErrors({})
                    setHasError(false)
                })
                .catch((err) => {
                    const errorObject: IErrorObject= {}
                    err.inner.forEach((item:ValidationError) => (item.path? errorObject[item.path] = item.message: console.log('path not found')))
                    setErrors(errorObject)
                    setHasError(true)
                })
        }
    }

    const resetData = () => {
        setValues(INITIAL_STATE)
        setTouched({})
    }

    const control:IControl ={
        values,
        touched,
        errors,
        handleSubmit,
        handleInputChange,
        setSingleValue,
        setAllValues,
        resetData
    }

    return {
        values,
        hasError,
        errors,
        handleSubmit,
        handleInputChange,
        resetData,
        setValues,
        control
    }
}
