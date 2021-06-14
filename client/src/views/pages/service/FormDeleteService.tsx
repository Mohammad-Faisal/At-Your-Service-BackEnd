import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormBasicContainer } from '../../common-components/layout/FormStyles';
import { FormInputText } from '../../forms/common/FormInputText';
import ButtonFormSubmit from '../../buttons/ButtonFormSubmit';
import useFormInputValidation from '../../forms/common/useFormInputValidation';
import * as Yup from 'yup';
import { selectRequesting } from '../../../store/misc/requesting/RequestingSelector';
import FormValidationConstants from '../../forms/common/FormValidationConstants';
import { AnyObjectSchema } from 'yup';
import { selectFinished } from '../../../store/misc/finished/FinishedSelector';
import { FormInputRadio, RadioTypes } from '../../forms/common/FormInputRadio';
import { ServiceAction } from '../../../store/service/ServiceAction';
import { CreateServiceRequest, ServiceInputs } from '../../../store/service/requests/CreateServiceRequest';
import { ServiceType } from '../../../constants/GeneralConstants';
import { UpdateServiceRequest } from '../../../store/service/requests/UpdateServiceRequest';

const INITIAL_STATE: ServiceInputs = {
    name: '',
    description: '',
    hourlyRate: '',
    preferredHour: '',
    type: ServiceType.OTHERS,
};

const VALIDATION_SCHEMA: AnyObjectSchema = Yup.object({
    name: FormValidationConstants.REQUIRED_AND_STRING_ONLY,
    description: FormValidationConstants.REQUIRED_AND_STRING_ONLY,
    hourlyRate: FormValidationConstants.REQUIRED_AND_DIGIT_ONLY,
    preferredHour: FormValidationConstants.REQUIRED_AND_STRING_ONLY,
    type: FormValidationConstants.REQUIRED_AND_STRING_ONLY,
});

interface IFormUpdateService {
    existingService: any;
}

export const FormUpdateService: FC<IFormUpdateService> = ({ existingService }) => {
    const dispatch = useDispatch();

    const { control, values } = useFormInputValidation(INITIAL_STATE, VALIDATION_SCHEMA);
    const isRequesting = useSelector((state) => selectRequesting(state, [ServiceAction.UPDATE_SERVICE]));
    const isFinished = useSelector((state) => selectFinished(state, [ServiceAction.UPDATE_SERVICE]));

    useEffect(() => {
        control.setAllValues(existingService);
    }, []);

    useEffect(() => {
        if (isFinished) control.resetData();
    }, [isFinished]);

    const onSubmit = () => {
        values['id'] = existingService.id;
        dispatch(ServiceAction.updateService(new UpdateServiceRequest(values)));
    };

    return (
        <FormBasicContainer>
            <FormInputText label={'Name'} control={control} name={'name'} />
            <FormInputText label={'Description'} control={control} name={'description'} />
            <FormInputText label={'Hourly Rate '} control={control} name={'hourlyRate'} />
            <FormInputText label={'Preferred Hours '} control={control} name={'preferredHour'} />
            <FormInputRadio control={control} label={'Service Type'} name={'type'} type={RadioTypes.SERVICE_TYPE} />
            <ButtonFormSubmit title={'Update Service'} isRequesting={isRequesting} control={control} onSubmit={onSubmit} />
        </FormBasicContainer>
    );
};
