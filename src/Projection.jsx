import './App.css'
import { useState } from 'react';
import { Button, Input, Space } from 'antd';
import PlotFigure from './PlotFigure'

function Projection(props){
    const {data, changeData} = props;
    const [ fwhm, setFWHM ] = useState(0.0);
    return (
    <>
        <div className='box2'>
          <h3>ckick to get the 1d projetion</h3>
          <Space>
            <Button onClick={
                    () => {
                        fetch("http://127.0.0.1:8000/get_fwhm")
                        .then((response) => response.json())
                        .then(
                          (value) => {
                                console.log(value);
                                setFWHM(Number(value.width[0]))
                          }
                        )
                    }
                }>
                {"get fwhm (pixel): " + fwhm}
            </Button>
          </Space>
          <div className="logo">
            <PlotFigure axis="culmen_length_mm" data={data}/>
          </div>
          <Button onClick={
            () => {
                    fetch('http://127.0.0.1:8000/get_projection?x1=0&x2=100')
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
            Get 1d Projection
          </Button>
        </div>
    </>
    )
};

export default Projection;