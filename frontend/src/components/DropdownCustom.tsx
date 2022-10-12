import React from "react";
import styled from "styled-components";
import { Dropdown } from 'primereact/dropdown';
import {Label} from "./layout";

interface Props {
    label?: string;
    list: {name: string, code: string}[];
    selectedValue: any;
    setSelectedValue: (value: any) => void;
    placeholder?: string;
    margin?: string;
}

export const DropdownCustom: React.FC<Props> = (props) => {

    return (
        <DropdownCustomWrapper margin={props.margin}>
            {props.label &&
                <Label>{props.label}</Label>
            }
            <DropdownStyle
                value={props.selectedValue ? {name: props.selectedValue.name, code: props.selectedValue.code} : null}
                options={props.list}
                onChange={(e) => {
                    props.setSelectedValue(e.value)
                }}
                optionLabel="name"
                placeholder={props.placeholder}
            />
        </DropdownCustomWrapper>
    )
}

const DropdownCustomWrapper = styled.div<{margin: string}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: ${props => props.margin ? props.margin : "0 0 12px 0"};

  .p-dropdown {
    background: #fafafa !important;
    width: 100%;
    //padding: 8.5px!important;
    border: 1px solid var(--gris_light);
    font-family: Poppins;
    //font-size: 13px;
    //height: 37px;
    //border-radius: 5px;
    font-style: normal;
    font-weight: 400;
    align-items: center;
    ::placeholder {
      font-family: Poppins;
      //font-size: 13px;
    }
  }

  .p-inputtext {
    font-family: Poppins;
    //font-size: 13px;
    font-weight: 400;
  }

  .p-dropdown:enabled:focus {
    box-shadow: none!important;
    border-color: var(--primary_default) !important;
    border-right: none!important;
    border: 1px solid var(--primary_default)!important;
  }

  .p-dropdown:hover {
    box-shadow: none!important;
    border-color: var(--primary_default) !important;
  }

  .p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight {
    background: var(--primary_default) !important;
  }
`;

const DropdownStyle = styled(Dropdown)`
  font-size: 14px;
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  color: $grey_dark;
  border-radius: 0px;
`;
