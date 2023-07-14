import '../css_file/App.css'
import { useState } from 'react'
import { Slider, Select, Space, Button } from 'antd';

function Camera(props) {

    const url = "http://127.0.0.1:8000/frame";
    const [isOpen, setIsOpen] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [imgurl, setImgUrl] = useState(url);
    const [type, setType] = useState('8_bits');
    const [cmap, setCmap] = useState(-1);
    const {range, changeData, changeRange} = props;
    const cmap_dict = [
        {
            value: -1,
            label: 'grey',
        },
        {
            value: 0,
            label: 'autunm',
        },
        {
            value: 1,
            label: 'bone',
        },
        {
            value: 2,
            label: 'jet',
        },
        {
            value: 3,
            label: 'winter',
        },
        {
            value: 4,
            label: 'bainbow',
        },
        {
            value: 5,
            label: 'ocean',
        },
        {
            value: 6,
            label: 'summer',
        },
        {
            value: 7,
            label: 'spring',
        },
        {
            value: 8,
            label: 'cool',
        },
        {
            value: 9,
            label: 'hsv',
        },
        {
            value: 10,
            label: 'pink',
        },
        {
            value: 11,
            label: 'hot',
        }
    ];

    return (
      <>
            <div className='box1'>
                <div>
                    <Space>
                        <Button disabled={isOpen} onClick={
                            () => {
                                fetch('http://127.0.0.1:8000/start');
                                setIsOpen(true);
                                // 通过事件监听页面关闭或刷新
                                window.addEventListener('beforeunload', (event) => {
                                    fetch('http://127.0.0.1:8000/close');
                                    event.returnValue = '';
                                });
                            }
                        }>
                            click to start
                        </Button>
                        <Button disabled={!isOpen} onClick={
                            () => {
                                fetch('http://127.0.0.1:8000/close');
                                setIsOpen(false);
                                setIsShow(false);
                            }
                        }>
                            click to close
                        </Button>
                        <Select options={[
                            {
                            value: '8_bits',
                            label: '8_bits',
                            },
                            {
                            value: '12_bits',
                            label: '12_bits (only 8 bits support cmap)',
                            }]} 
                            defaultValue="8_bits" 
                            onChange={
                                (value) => {
                                    setType(value);
                                }
                            }
                        />
                    </Space>
                    <Space>
                        <Button onClick={
                                () => {
                                    if(!isShow){
                                    fetch("http://127.0.0.1:8000/stop_sample")
                                    .then(setImgUrl(url + '?type=' + type + '&' + 'cmap=' + cmap + '&' + Math.random()))
                                    .then(fetch("http://127.0.0.1:8000/start_sample"))
                                    }else{
                                    fetch("http://127.0.0.1:8000/stop_sample")
                                    }
                                    setIsShow(!isShow);
                                }
                            }>
                            {!isShow ? "start sample" : "stop sample"}
                        </Button>
                        <Button onClick={
                            () => {
                                const url = 'http://127.0.0.1:8000/get_projection/?x1=' + range[0] + '&x2=' + range[1];
                                fetch(url)
                                .then((response) => response.json())
                                .then((data) => {
                                    console.log(data[0]);
                                    changeData(data[0]);
                                })
                                .catch((err) => {
                                    console.log(err.message);
                                });
                            }
                            }> 
                            get projection
                        </Button>
                        <Select options={cmap_dict}
                            defaultValue="grey" 
                            onChange={
                                (value) => {
                                    setCmap(Number(value));
                                }
                            }
                        />
                    </Space>
                </div>
                {
                isShow ? 
                    <div className='two_raw'>
                    <div style={{padding: '1rem', height: '20rem'}}>
                        <Slider vertical range step={1} defaultValue={[0, 100]}  onAfterChange={
                        (value) => {
                            changeRange(value); 
                        }
                        }/>
                    </div>
                    <div>
                        <img src={imgurl} className="logo" alt="Default"/> 
                    </div>
                    </div>
                :
                <div></div>
                }
            </div>
        </>
    )
};
  
export default Camera;
  