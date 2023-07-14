import '../css_file/App.css'
import { useState, useCallback, useEffect } from 'react';
import { Button, Input, Space } from 'antd';
import PlotFigure from '../plot_figure/PlotFigure'

function Projection(props){
    const {data, changeData} = props;
    const [fwhm, setFWHM] = useState(0.0);

    /*
    const updateState = useCallback(async () => {
      let response = await fetch('http://127.0.0.1:8000/get_projection?x1=0&x2=100');
      let data = await response.json();
      changeData(data[0]);
    }, [data]);

    useEffect(
      () => {
        setInterval(updateState, 1000)
      }, [updateState]
    );
    */

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
                                setFWHM(Number(value.width[0]).toFixed(4))
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
                        console.log(data[0]);
                        changeData(data[0]);
                        setFWHM(Number(data[1].width[0]).toFixed(4))
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