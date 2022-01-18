import * as React from 'react';

interface Props {
    width: string;
}

export const AddGrey: React.FC<Props> = (props) => {

    const height = parseInt(props.width) * (24 / 24) // h/w

    return (
        <svg width={props.width} height={height} viewBox="0 0 50 50"
             fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 2.08337C12.2917 2.08337 2.08333 12.2917 2.08333 25C2.08333 37.7084 12.2917 47.9167 25 47.9167C37.7083 47.9167 47.9167 37.7084 47.9167 25C47.9167 12.2917 37.7083 2.08337 25 2.08337ZM35.4167 29.1667H29.1667V35.4167C29.1667 37.7084 27.2917 39.5834 25 39.5834C22.7083 39.5834 20.8333 37.7084 20.8333 35.4167V29.1667H14.5833C12.2917 29.1667 10.4167 27.2917 10.4167 25C10.4167 22.7084 12.2917 20.8334 14.5833 20.8334H20.8333V14.5834C20.8333 12.2917 22.7083 10.4167 25 10.4167C27.2917 10.4167 29.1667 12.2917 29.1667 14.5834V20.8334H35.4167C37.7083 20.8334 39.5833 22.7084 39.5833 25C39.5833 27.2917 37.7083 29.1667 35.4167 29.1667Z" fill="#C4C4C4"/>
        </svg>

    );
};