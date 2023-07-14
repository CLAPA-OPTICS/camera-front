import { useState } from 'react';
import { Select, Space, Button, Input } from 'antd';

function Caculation(){

    const calculation = () => {
        if (mode == "mode1") {
          const partition = (Number(arr[0]) - Number(arr[1]))/(Number(arr[2]) - Number(arr[3]));
          setRes(partition);
          setPar(partition);
        }else {
          const partition = (Number(arr[0]) - Number(arr[1])) * par * k2;
          setRes(partition);
        }
        return;
      };

    const [res, setRes] = useState(0);
    const [arr, setArr] = useState([0, 1, 2, 3]);
    const [par, setPar] = useState(0);
    const [k2, setK2] = useState(1.414);
    const [mode, setMode] = useState("mode1");
    const options = [
      { value: 'mode1', label: 'k1 = (x1 - x2)/(x3 - x4)' },
      { value: 'mode2', label: '(x1 - x2) * k1 * k2' },
    ];

    return (
    <>
        <div className='box3'>
          <div style={{display: "flex"}}>
            <Input type="text" onChange={(e) => {
                      setArr((prev) => {
                        prev[0] = Number(e.target.value);
                        const arrCopy = prev.slice();
                        console.log(arrCopy)
                        return arrCopy;
                      });
                    }
            } placeholder={'x1'} addonBefore="x1"/>
            <Input type="text" onChange={(e) => {
                      setArr((prev) => {
                        prev[1] = Number(e.target.value);
                        const arrCopy = prev.slice();
                        return arrCopy;
                      });
                    }
            } placeholder={'x2'} addonBefore="x2"/>
           </div>
          <div style={{display: "flex"}}>
            {mode == "mode1" ? <Input type="text" onChange={(e) => {
                      setArr((prev) => {
                        prev[2] = Number(e.target.value);
                        const arrCopy = prev.slice();
                        return arrCopy;
                      });
                    }
            } placeholder={'x3'} addonBefore="x3"/> : 
            <Input type="text" addonBefore="k1" value={par} disabled/> 
            }
            {mode == "mode1" ? <Input type="text" onChange={(e) => {
                      setArr((prev) => {
                        prev[3] = Number(e.target.value);
                        const arrCopy = prev.slice();
                        return arrCopy;
                      });
                    }
            } placeholder={'x4'} addonBefore="x4"/> : 
            <Input type="text" addonBefore="k2" placeholder={k2} onChange={
              (e)=>{
                setK2(Number(e.target.value));
              }
            }/>
            }
          </div>
          <div style={{display: "flex"}}>
            <Select className='select'
              options={options}
              defaultValue="mode1" 
              onChange={
                (value)=>{
                  setMode(value)
                }
              }
              style={{width: "60%"}}
            />
            <Button className='button' style={{width: "59%"}} onClick={calculation}>
              Calculation: {res.toFixed(4)}
            </Button>
          </div>
        </div>
    </>
    )
};

export default Caculation;