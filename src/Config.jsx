import { useState } from 'react';
import { Select, Slider, Space, Button, Input } from 'antd';

function Config(){
    const [isOpen, setIsOpen] = useState(false);
    const [isSample, setSample] = useState(false);
    const [time, setTime] = useState();
    const sunmit =(
        <Button type="text" onClick={
            () => {
                const url = 'http://127.0.0.1:8000/set_exposure_time/?time=' + time;
                fetch(url, {method: 'POST'});
            }
        }>
            Submit
        </Button>
    );

    return (
    <>
        <Space>
            <div>
                <Select defaultValue="colorbar">
                    <Option value="grey">grey</Option>
                    <Option value="jet">jet</Option>
                </Select>
                <Select defaultValue="8bits">
                    <Option value="8bits">8 bits</Option>
                    <Option value="12bits">12 bits</Option>
                </Select>
            </div>
            <div>
                <Input addonBefore="曝光时间" defaultValue={200} onChange = {
                    (value) => {
                        setTime(value);
                    }
                }></Input>
                <Input addonBefore="曝光强度" defaultValue={10000}></Input>
            </div>
            <Button type="text" onClick={
                () => {
                    const url = 'http://127.0.0.1:8000/set_exposure_time/?time=' + time;
                    fetch(url, {method: 'POST'});
                }
            }>
                Submit
            </Button>
        </Space>
        <Space>
            <Button disabled={isOpen} onClick={
                () => {
                    fetch('http://127.0.0.1:8000/start');
                    setIsOpen(true);
                }
            }>
                click to start
            </Button>
            <Button disabled={!isOpen} onClick={
                () => {
                    fetch('http://127.0.0.1:8000/close');
                    setIsOpen(false);
                }
            }>
                click to close
            </Button>
            <Button disabled={isSample} onClick={
                () => {
                    fetch('http://127.0.0.1:8000/start_sample');
                    setSample(true);
                }
            }>
                click to start sample
            </Button>
            <Button disabled={!isSample} onClick={
                () => {
                    fetch('http://127.0.0.1:8000/stop_sample');
                    setSample(false);
                }
            }>
                click to stop sample
            </Button>
        </Space>
    </>
    )
};

export default Config;