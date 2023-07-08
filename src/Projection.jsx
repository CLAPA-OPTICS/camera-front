import './App.css'
import { Button } from 'antd';
import PlotFigure from './PlotFigure'

function Projection(props){
    const {data, changeData} = props;

    return (
    <>
        <div className='box2'>
          <h3>ckick to get the 1d projetion</h3>
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