import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormBasicContainer } from '../../common-components/layout/FormStyles';
import { FormInputText } from '../../forms/FormInputText';
import ButtonFormSubmit from '../../common-components/buttons/ButtonFormSubmit';
import useFormInputValidation from '../../forms/useFormInputValidation';
import * as Yup from 'yup';
import { selectRequesting } from '../../../store/misc/requesting/RequestingSelector';
import FormValidationConstants from '../../forms/FormValidationConstants';
import { AnyObjectSchema } from 'yup';
import { selectFinished } from '../../../store/misc/finished/FinishedSelector';
import { FormInputRadio, RadioTypes } from '../../forms/FormInputRadio';
import { ServiceAction } from '../../../store/service/ServiceAction';
import { CreateServiceRequest, ServiceInputs } from '../../../store/service/requests/CreateServiceRequest';
import { ServiceType } from '../../../constants/GeneralConstants';
import { Form } from 'antd';
import { FormInputTextArea } from '../../forms/FormInputTextArea';
import { FormInputSlider } from '../../forms/FormInputSlider';

const INITIAL_STATE: ServiceInputs = {
    name: '',
    description: '',
    hourlyRate: '',
    preferredHour: [0, 23],
    type: ServiceType.OTHERS,
};

const VALIDATION_SCHEMA: AnyObjectSchema = Yup.object({
    name: FormValidationConstants.REQUIRED_AND_STRING_ONLY,
    description: FormValidationConstants.REQUIRED_AND_STRING_ONLY,
    hourlyRate: FormValidationConstants.REQUIRED_AND_DIGIT_ONLY,
    // preferredHour: FormValidationConstants.REQUIRED_AND_STRING_ONLY,
    type: FormValidationConstants.REQUIRED_AND_STRING_ONLY,
});

export const FormCreateService: FC = () => {
    const dispatch = useDispatch();

    const { control, values } = useFormInputValidation(INITIAL_STATE, VALIDATION_SCHEMA);
    const isRequesting = useSelector((state) => selectRequesting(state, [ServiceAction.CREATE_SERVICE]));
    const isFinished = useSelector((state) => selectFinished(state, [ServiceAction.CREATE_SERVICE]));

    useEffect(() => {
        if (isFinished) control.resetData();
    }, [isFinished]);

    const onSubmit = () => {
        dispatch(ServiceAction.createService(new CreateServiceRequest(values)));
    };

    return (
        <FormBasicContainer>
            <Form>
                <FormInputText label={'Name'} control={control} name={'name'} />
                <FormInputTextArea label={'Description'} control={control} name={'description'} />
                <FormInputText label={'Hourly Rate '} control={control} name={'hourlyRate'} />
                <FormInputSlider control={control} label={'Preferred Hours  '} name={'preferredHour'} range={[0, 23]} step={1} />
                <FormInputRadio control={control} label={'Service Type'} name={'type'} type={RadioTypes.SERVICE_TYPE} />
                <ButtonFormSubmit title={'Create New Service'} isRequesting={isRequesting} control={control} onSubmit={onSubmit} />
            </Form>
        </FormBasicContainer>
    );
};
