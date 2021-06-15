import React from 'react';
import { Button, Modal } from 'antd';
import { Tooltip } from 'antd';
import styled from 'styled-components';

export default function ModalDeleteConfirmation(props) {
    const showConfirmDeleteCalculationData = () => {
        Modal.confirm({
            title: `${props.confirmationText}`,
            width: 450,
            okText: props.okText ? props.okText : 'Yes I am Sure',
            okType: 'danger',
            cancelText: props.cancelText ? props.cancelText : 'No Cancel this',
            onOk() {
                props.onConfirm();
            },
            onCancel() {},
        });
    };
    const text = <span>{props.tooltip}</span>;
    return (
        <Tooltip placement={'top'} title={props.tooltip}>
            <span>
                <DeleteButton icon={props.icon ? props.icon : 'delete'} text={''} onClick={() => showConfirmDeleteCalculationData()}>
                    Delete
                </DeleteButton>
            </span>
        </Tooltip>
    );
}

const DeleteButton = styled.button`
    background: #e53935;
    border: #e53935;
    transition: 1000ms;
    color: white;
    margin: 10px;
    font-size: 14px;
    padding: 8px;
    border-radius: 4px;
    &:hover {
        cursor: pointer;
    }
`;

export function ButtonMildRed(props) {
    return (
        <Button
            style={{ border: '#e53935', background: '#e53935', color: 'white', padding: '' }}
            loading={props.loading}
            onClick={props.onClick}
            // className={'btn-mild-red'}
            icon={props.icon}
            disabled={props.disabled}
        >
            {props.text}
        </Button>
    );
}
