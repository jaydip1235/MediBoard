import React, { useEffect, useState } from 'react';
import {Line} from 'react-chartjs-2';
import { useHistory } from 'react-router-dom';
import './chart.css';

function Chart(props) {
    const history=useHistory();
    let li=[];
    let newData=[100,250,600,180,170,99,450];
    for(let i=0;i<newData.length;i++){
        li.push(2010+i);
    }
    const [fLi,setFLi]=useState(newData);
    const [fDate,setFDate]=useState(li);
    const setData=async()=>{
        try {
            const datas=await props.data;
            let nl=[];
            for(let i=0;i<datas.length;i++){
                nl.push(datas[i].val);
            }
            setFLi(nl);
            let nd=[];
            for(let j=0;j<datas.length;j++){
                nd.push((datas[j].updated).substr(0,10));
            }
            setFDate(nd);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        setData();
    },[history,props.data]);
    return (
        <>
            <div className="linechartDiv mt-4" style={{backgroundColor:props.bgCol}}>
            <Line className="linechart"
            data={{
                labels: fDate,
                datasets: [{
                    label: props.cLab,
                    data: fLi,
                    backgroundColor: props.col,
                    borderColor: props.col,
                    borderWidth: 1
                }]
            }}
            height={600}
            width={600}
            options={{ maintainAspectRatio: false }}
            />
        </div>
        </>
    )
}

export default Chart
