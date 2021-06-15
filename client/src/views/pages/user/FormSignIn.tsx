import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormBasicContainer } from '../../common-components/layout/FormStyles';
import { FormInputText } from '../../forms/FormInputText';
import ButtonFormSubmit from '../../common-components/buttons/ButtonFormSubmit';
import { useTranslation } from 'react-i18next';
import useFormInputValidation from '../../forms/useFormInputValidation';
import * as Yup from 'yup';
import { selectRequesting } from '../../../store/misc/requesting/RequestingSelector';
import { UserAction } from '../../../store/user/UserAction';
import FormValidationConstants from '../../forms/FormValidationConstants';
import { SignInInputs, SignInRequest } from '../../../store/user/request-models/SignInRequest';
import { AnyObjectSchema } from 'yup';
import { selectFinished } from '../../../store/misc/finished/FinishedSelector';
import { Form } from 'antd';

const INITIAL_STATE: SignInInputs = {
    email: '',
    password: '',
};

const VALIDATION_SCHEMA: AnyObjectSchema = Yup.object({
    email: FormValidationConstants.REQUIRED_VALID_EMAIL,
    password: Yup.string().min(6, 'Minimum 6 Characters'),
});

export const FormSignIn: FC = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { control, values } = useFormInputValidation(INITIAL_STATE, VALIDATION_SCHEMA);
    const isRequesting = useSelector((state) => selectRequesting(state, [UserAction.SIGN_IN]));
    const isFinished = useSelector((state) => selectFinished(state, [UserAction.SIGN_IN]));

    useEffect(() => {
        if (isFinished) control.resetData();
    }, [isFinished]);

    const onSubmit = () => dispatch(UserAction.signIn(new SignInRequest(values)));

    return (
        <Form layout={'vertical'}>
            <FormInputText label={t('form_input_label.email')} control={control} name={'email'} />
            <FormInputText label={t('form_input_label.password')} control={control} name={'password'} />
            <ButtonFormSubmit title={t('sign_in_title')} isRequesting={isRequesting} control={control} onSubmit={onSubmit} />
        </Form>
    );
};
