import React, {useEffect, useState} from 'react'
import {API_URL, PROJECT_UID} from "@Utils/constants";
import {Status} from "@Models/types/bases/enums";
import {Alert, Result} from 'antd';

export const StatusWeb = (props) =>{

    const [status,setStatus]  =  useState<Status>(Status.UP)
    const [message,setMessage]  =  useState<string>('')

    useEffect(()=>{
        setInterval(request,3000)
    },[])

    const request = () =>{
        fetch(API_URL,{method:'POST',headers:{"Content-Type":"application/json"},body:JSON.stringify({projectUid:PROJECT_UID})}).then((res)=>{
            res.json().then((response)=>{
                if(response?.result){
                    setStatus(response.result)
                    setMessage(response.message)
                }
            }).catch((error)=>console.log('Not JSON',error))
        }).catch((error)=>{
            console.error(error)
        })
    }


    const getAlertPage = () =>{
        switch (status) {
            case Status.DOWN:
                return (<Result
                    status="500"
                    title="500"
                    subTitle={message}
                />)
            case Status.MAINTENANCE:
                return (<div>
                    <Alert style={{position:"fixed",width:'100%'}} message={message} type="warning" showIcon />
                    {props.children}
                </div>)
            case Status.UP:
                return (<>{props.children}</>);
        }
    }

    return (
        <>
            {getAlertPage()}
        </>
    )
}


