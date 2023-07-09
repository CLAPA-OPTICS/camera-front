import { useState } from 'react';
import { Select, Space, Button, Input } from 'antd';

function Config(){

    const [time, setTime] = useState(200);

    return (
    <>
        <Space>
            <div>
                <Input addonBefore="曝光时间" defaultValue={200} onChange = {
                    (e) => {
                        setTime(Number(e.target.value));
                    }
                }></Input>
                <Input addonBefore="曝光强度" defaultValue={10000}></Input>
            </div>
            <Button type="text" onClick={
                () => {
                    const url = 'http://127.0.0.1:8000/set_exposure_time?time=' + Number(time);
                    fetch(url, {method: 'POST'});
                }
            }>
                Submit
            </Button>
        </Space>
    </>
    )
};

export default Config;