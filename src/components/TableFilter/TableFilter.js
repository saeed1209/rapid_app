import React,{Component} from 'react';
import { Table } from 'antd';



class TableFilter extends Component{


    render()
    {
        const data_columns=[];

        if(this.props.data)
        {

            this.props.data.data.map(function (data,key) {
                return data_columns.push(
                    {
                        key:key,
                        date:data.date,
                        open:data.open,
                        high:data.high,
                        low:data.low,
                        close:data.adjclose,
                        volume:data.volume,


                    }
                )
            });

        }
        const columns = [
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
                //render: text => <a>{text}</a>,
            },
            {
                title: 'Open',
                dataIndex: 'open',
                key: 'open',
            },
            {
                title: 'High',
                dataIndex: 'high',
                key: 'high',
            },
            {
                title: 'Low',
                key: 'low',
                dataIndex: 'low',

            },
            {
                title: 'Close',
                key: 'close',
                dataIndex: 'close',

            },
            {
                title: 'Volume',
                key: 'volume',
                dataIndex: 'volume',

            }
        ];


        return(
            <Table columns={columns} dataSource={data_columns} />
        );
    }

}

export default TableFilter;
