import React from "react";

import { MultiSelect } from 'primereact/multiselect';

import "./SelectCustom.scss";

interface Props {
    label?: string;
    placeholder: string;
    list: {name: string, value: string}[];
    selectionLimit?: number;
    selectedValues: any;
    setSelectedValues: (value: any) => void;
    disabled?: boolean;
    margin?: string;
}

export const SelectCustom: React.FC<Props> = (props) => {

    return (
        <div className={'Component_SelectCustom'}>
            {props.label &&
            <div className={'Component_SelectCustom__label'}>{props.label}</div>
            }
            <MultiSelect
                className={"w-full Component_SelectCustom__input"}
                disabled={props.disabled ? props.disabled : false}
                selectionLimit={props.selectionLimit ? props.selectionLimit : null}
                value={props.selectedValues}
                options={props.list}
                onChange={(e) => {
                    props.setSelectedValues(e.value)
                }}
                optionLabel="name"
                placeholder={props.placeholder}
            />
        </div>
    )
}
