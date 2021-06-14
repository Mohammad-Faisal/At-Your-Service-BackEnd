import { Form, Radio } from 'antd';
import React from 'react';
import { IControl } from './useFormInputValidation';
import SelectionItemModel from './SelectionItemModel';
import { ServiceType, UserType } from '../../../constants/GeneralConstants';

export interface IRadioInput {
    control: IControl;
    label: string;
    name: string;
    isControlledManually?: boolean;
    value?: string | number | boolean;
    disabled?: boolean;
    placeholder?: string;
    type: RadioTypes;
}

export enum RadioTypes {
    USER_TYPE,
    SERVICE_TYPE,
}

export const FormInputRadio = (props: IRadioInput) => {
    const radioOptionsServiceType = [
        new SelectionItemModel('Car Repair', ServiceType.CAR_REPAIR),
        new SelectionItemModel('Carpentry', ServiceType.CARPENTRY),
        new SelectionItemModel('Cleaning', ServiceType.CLEANING),
        new SelectionItemModel('Demolition', ServiceType.DEMOLITION),
        new SelectionItemModel('Home Improvement', ServiceType.HOME_IMPROVEMENT),
        new SelectionItemModel('Landscaping', ServiceType.LANDSCAPING),
        new SelectionItemModel('Moving', ServiceType.MOVING),
        new SelectionItemModel('Other', ServiceType.OTHERS),
    ];

    const radioOptionsUserType = [
        new SelectionItemModel('General User', UserType.GENERAL_USER),
        new SelectionItemModel('Service Provider', UserType.SERVICE_PROVIDER),
        new SelectionItemModel('Super Admin', UserType.SUPER_ADMIN),
    ];

    let radioItems = radioOptionsServiceType;
    if (props.type === RadioTypes.USER_TYPE) radioItems = radioOptionsUserType;

    const isTouched = props.control.touched[`${props.name}`];
    const error = props.control.errors[`${props.name}`];
    const value = props.isControlledManually ? props.value : props.control.values[`${props.name}`];

    return (
        <Form.Item label={props.label} hasFeedback validateStatus={isTouched ? (error ? 'error' : '') : ''} help={isTouched ? error : ''}>
            <Radio.Group
                size={'large'}
                value={value}
                name={props.name}
                buttonStyle="solid"
                onChange={(e) => props.control.handleInputChange(props.name, e.target.value)}
            >
                {radioItems.map((item) => (
                    <Radio.Button style={{ margin: '5px' }} key={item.value} value={item.value}>
                        {' '}
                        {item.label}{' '}
                    </Radio.Button>
                ))}
            </Radio.Group>
        </Form.Item>
    );
};
