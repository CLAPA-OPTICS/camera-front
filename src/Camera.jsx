import './App.css'
import { useState } from 'react'
import { Slider, Space, Button } from 'antd';

function Camera(props) {

    const [isOpen, setIsOpen] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [imgurl, setImgUrl] = useState("http://127.0.0.1:8000/frame");

    const {range, changeData, changeRange} = props;

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
                    <Button onClick={
                        () => {
                            if(!isShow){
                            setImgUrl("http://127.0.0.1:8000/frame" + '?' + Math.random());
                            fetch("http://127.0.0.1:8000/start_sample")
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
                            console.log(data);
                            changeData(data);
                        })
                        .catch((err) => {
                            console.log(err.message);
                        });
                    }
                    }> 
                    get range axis data
                    </Button>
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
  