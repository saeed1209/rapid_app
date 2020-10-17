import React,{Component} from 'react';
import { Chart, LineAdvance } from 'bizcharts';

class ChartFilter extends Component{


    render(){
        const data_open=[];
        let data_close=[];
        if(this.props.data)
        {

            this.props.data.data.map(function (data,key) {
                return data_open.push(
                    {
                        date:data.date,
                        status:'open',
                        price:data.open
                    }
                )
            });

            this.props.data.data.map(function (data,key) {
                return data_close.push(
                    {
                        date:data.date,
                        status:'close',
                        price:data.adjclose
                    }
                )
            });

        }
        const data = [...data_close, ...data_open]

        return (
            <Chart padding={[10, 20, 50, 40]} autoFit height={300} data={data} >
                <LineAdvance
                    shape="smooth"
                    point
                    area
                    position="date*price"
                    color="status"
                />
            </Chart>
        );
    }
}

export default ChartFilter;