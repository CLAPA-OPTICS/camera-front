import './css_file/App.css'
import Config from './configuration/Config';
import Camera from './image_stream/Camera';
import { Space, Avatar } from 'antd';
import Projection from './axis_data/Projection';
import Calculation from './calculation/Calculation'
import { useState, useCallback } from 'react'
import Login from './login/Login';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [data, setData] = useState();
  const [range, setRange] = useState([0, 100]);
  const changeData = useCallback((data) => setData(data), []);
  const changeRange = useCallback((range) => setRange(range), []);
  const changeIsLogin = useCallback((data) => setIsLogin(data), []);
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
            <Config />
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
