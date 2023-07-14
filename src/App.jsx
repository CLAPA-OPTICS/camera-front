import './css_file/App.css'
import axios from 'axios';
import Config from './configuration/Config';
import Camera from './image_stream/Camera';
import { Space, Avatar } from 'antd';
import Projection from './axis_data/Projection';
import Calculation from './calculation/Calculation'
import { useState, useCallback, useEffect } from 'react'
import Login from './login/Login';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [data, setData] = useState();
  const [range, setRange] = useState([0, 100]);
  const changeData = useCallback((data) => setData(data), []);
  const changeRange = useCallback((range) => setRange(range), []);
  const changeIsLogin = useCallback((data) => setIsLogin(data), []);
  const checkLogin = () => {
    axios.get('http://127.0.0.1:8000/login',{
      headers: {
        'Authorization': "Bearer " + localStorage.getItem('jwToken'),
      }
    })
    .then(()=>{
      //console.log(localStorage.getItem('jwToken'));
      setIsLogin(true);
    })
  };
  useEffect(checkLogin, []);
  return (
    <>
      {isLogin === false ?
        <>
          <Space>
            <Avatar src="/CLAPA.png" />
            <h3>CLAPA-OPTICS Camera software</h3>
          </Space>
          <Login setIsLogin={changeIsLogin}/>
        </>
      :
        <>
          <Space>
            <Avatar src="/CLAPA.png" />
            <h3>CLAPA-OPTICS Camera software</h3>
          </Space>
          <div className='wrapper'>
            <Config setIsLogin={changeIsLogin}/>
          </div>
          <div className='wrapper'>
            <Camera range={range} changeData={changeData} changeRange={changeRange} />
            <Projection data={data} range={range} changeData={changeData}/>
            <Calculation />
          </div>
        </>
      }
    </>
  )
};

export default App;
