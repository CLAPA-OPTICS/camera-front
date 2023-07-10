import { useState } from 'react';
import { Select, Space, Button, Input } from 'antd';

function Config(){

    //const [time, setTime] = useState(200);

    const [gamma, setGamma] = useState(null);
    const [gain, setGain] = useState(null);
    const [contrast, setContrast] = useState(null);
    const [exposure_time, setExposure_time] = useState(null);

    return (
    <>
        <Space>
            <div>
                <Input addonBefore="曝光时间" defaultValue={null} onChange = {
                    (e) => {
                        setExposure_time(Number(e.target.value));
                    }
                }></Input>
                <Input addonBefore="增益" defaultValue={null} onChange={
                    (e) => {
                        setGain(Number(e.target.value));
                    }
                }></Input>
            </div>
            <div>
                <Input addonBefore="伽马" defaultValue={null} onChange = {
                    (e) => {
                        setGamma(Number(e.target.value));
                    }
                }></Input>
                <Input addonBefore="对比度" defaultValue={null} onChange={
                    (e) => {
                        setContrast(Number(e.target.value));
                    }
                }></Input>
            </div>
            <Button onClick={
                () => {
                        fetch('http://127.0.0.1:8000/set_camera_parameters', {
                            method:"post",
                            headers:{
                                "Content-Type":"application/json"
                                },
                            body:JSON.stringify({// json
                                    "gain": gain,
                                    "gamma": gamma,
                                    "contrast": contrast,
                                    "exposure_time": exposure_time,
                                })
                        })
                        .then(res=>res.json())
                        .then(data => {
                                console.log(data) //请求的结果
                        })
                }
            }>
                Set Camera Params
            </Button>
        </Space>
    </>
    )
};

export default Config;

/*
            <Button type="text" onClick={
                () => {
                    const url = 'http://127.0.0.1:8000/set_exposure_time?time=' + Number(time);
                    fetch(url, {method: 'POST'});
                }
            }>
                Submit
            </Button>
*/