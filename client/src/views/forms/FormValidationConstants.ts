import * as Yup from 'yup'

export default class FormValidationConstants {

    static REQUIRED_VALID_MOBILE_NUMBER = Yup.string()
        .matches(/(^(01){1}[3456789]{1}(\d){8})$/, {
            message: 'Mobile Number Invalid',
            excludeEmptyString: true
        })
        .required('Mobile Number is Required')

    static REQUIRED_VALID_EMAIL = Yup.string()
        .matches(
            /^(?=.{1,40}$)[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/,
            {
                message: 'Invalid Email',
                excludeEmptyString: true
            }
        )
        .required('Email is Required')

    static VALID_MOBILE_NUMBER = Yup.string().matches(/(^(01){1}[3456789]{1}(\d){8})$/, {
        message: 'Mobile Number Invalid',
        excludeEmptyString: true
    })

    static VALID_EMAIL = Yup.string().matches(
        /^(?=.{1,30}$)[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/,
        {
            message: 'Email Invalid',
            excludeEmptyString: true
        }
    )

    static DIGIT_ONLY = Yup.string().matches(/^-?[0-9]*(\.[0-9]*)?$/, {
        message: 'Only Digits allowed',
        excludeEmptyString: true
    })

    static REQUIRED_AND_DIGIT_ONLY = Yup.string()
        .matches(/^-?[0-9]*(\.[0-9]*)?$/, {
            message: 'Only Digits allowed',
            excludeEmptyString: true
        })
        .required('This Field is Required')

    static VALID_AGE = Yup.number().typeError('Age must be Number').max(120, 'Age is too much')

    static REQUIRED_VALID_AGE = Yup.number()
        .typeError('Age must be Number')
        .required('Age is required')
        .min(1, 'Minimum Age 1')
        .max(120, 'Age is too much')

    static REQUIRED_AND_STRING_ONLY = Yup.string()
        .typeError('Digits are not allowed')
        .required('This Field is Required')

    static VALID_NID = Yup.string().matches(/^[0-9]{10}$|^[0-9]{13}$/, {
        message: 'NID Invalid',
        excludeEmptyString: true
    })

    static REQUIRED_VALID_NID = Yup.string()
        .matches(/^[0-9]{10}$|^[0-9]{13}$/, {
            message: 'NID Invalid',
            excludeEmptyString: true
        })
        .required('NID is Required')

    static VALID_PASSWORD = Yup.string().min(6, 'Minimum Digit 6').max(20, 'Maximum Digit 20')

    static REQUIRED_VALID_PASSWORD = Yup.string()
        .required('Password is Required')
        .min(6, 'Minimum Digit 6')
        .max(20, 'Maximum Digit 20')

    static VALID_MAC = Yup.string().matches(
        /^[0-9a-f]{1,2}([.:-])[0-9a-f]{1,2}(?:\1[0-9a-f]{1,2}){4}$/i,
        {
            message: 'MAC Address Invalid',
            excludeEmptyString: true
        }
    )
    static REQUIRED_VALID_MAC = Yup.string().matches(
        /^[0-9a-f]{1,2}([.:-])[0-9a-f]{1,2}(?:\1[0-9a-f]{1,2}){4}$/i,
        {
            message: 'MAC Address Invalid',
            excludeEmptyString: true
        })
        .required('MAC Address is Required')
}
