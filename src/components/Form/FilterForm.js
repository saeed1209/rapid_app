import 'antd/dist/antd.css';
import axios from 'axios';
import React, { Component } from 'react';
import {
    Form,
    Input,
    Select,
    Button,
    DatePicker,
} from 'antd';
import TableFilter from "../TableFilter/TableFilter";
import DataLoader from "../Loader/DataLoader";
import ChartFilter from "../ChartFilter/ChartFilter";
import Base_Url from '../../config/BaseUrl';



const config = {
    rules: [
        {
            type: 'object',
            required: true,
            message: 'Please select time!',
        },
    ],
};

const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 8,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 8,
        },
        sm: {
            span: 8,
        },
    },
};

class FormFilter extends Component{


    state={
        symbol:null,
        start_date:null,
        start_date_validate:false,
        end_date:null,
        email:null,
        tableData:null,
        loader:false
    }

    symbolHandler = (value) => {

        this.setState({symbol: value});

    }
    emailHandler = (event) => {

        this.setState(
            {
                email:event.target.value
            }
        )
    }



    handleStartDatePickerChange=(date,dateString)=> {
        this.setState(
            {
                start_date: dateString
            },function () {
                if (this.state.end_date && new Date(this.state.end_date) < new Date(this.state.start_date) ){
                    this.setState(
                        {
                            start_date_validate: true
                        }
                    )

                }else{
                    this.setState(
                        {
                            start_date_validate: false
                        }
                    )
                }
            }
        )


    }


    handleEndDatePickerChange =(date,dateString)=>{
        this.setState(
            {
                end_date:dateString,

            },function () {
                if (this.state.end_date && new Date(this.state.end_date) < new Date(this.state.start_date) ){
                    this.setState(
                        {
                            start_date_validate: true
                        }
                    )

                }else{
                    this.setState(
                        {
                            start_date_validate: false
                        }
                    )
                }
            }
        )



    }


    onSubmit=()=>{

        if(this.state.start_date
            && this.state.end_date
            && this.state.email
            && this.state.symbol
            && this.state.start_date <= this.state.end_date
            && !this.state.start_date_validate
        )
        {
            this.setState(
                {
                    loader:true
                }
            )

        }

        axios.get(Base_Url+'filter',{
            params: {
                        start_date: this.state.start_date,
                        end_date: this.state.end_date,
                        company_symbol: this.state.symbol,
                        email: this.state.email,
                    }
        }).then(response=>{
            this.setState(
                {
                    tableData:response.data,
                    loader:false
                }
            )
        });
    }




    render()
    {
        var options='';

        const{tableData} = this.state;

        if(this.props.symbols)
        {

            options = this.props.symbols.data.map(function (key,value) {
                return <Option key={key+value} value={key.symbol}>{key.symbol}</Option>
            })
        }


        return (
            <div>
                <Form
                    {...formItemLayout}
                    name="register"
                    initialValues={{
                        prefix: '',
                    }}
                    style={{margin:20}}
                    scrollToFirstError
                >
                    <Form.Item

                        name="prefix"
                        label="Select Symbol"
                        rules={[
                            {
                                type: 'string',
                                message: 'The input is not valid value!',
                            },
                            {
                                required: true,
                                message: 'Please input Symbol!',
                            },
                            {

                            }
                        ]}>
                        <Select onChange={(value)=>this.symbolHandler(value)}>
                            {options}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input onChange={(event)=>this.emailHandler(event)} />
                    </Form.Item>
                    <Form.Item name="start_date" label="Start Date" {...config}>
                        <DatePicker

                            onChange={this.handleStartDatePickerChange}
                            size="large" />
                    </Form.Item>
                    {this.state.start_date_validate ? <p style={{ color:'red'}}>should be lower than end date</p> : null}

                    <Form.Item name="end_date" label="End Date" {...config}>
                        <DatePicker
                            onChange={this.handleEndDatePickerChange}
                            size="large" />
                    </Form.Item>



                    <Form.Item
                        wrapperCol={{
                            xs: {
                                span: 24,
                                offset: 0,
                            },
                            sm: {
                                span: 16,
                                offset: 4,
                            },
                        }}
                    >
                        <Button onClick={this.onSubmit} type="primary" size="large" htmlType="submit">
                            Search
                        </Button>
                    </Form.Item>
                </Form>

                {this.state.loader ?  <DataLoader/> : null}
                <TableFilter data={tableData}/>
                <ChartFilter data={tableData}/>
            </div>
        );
    }


};






export default FormFilter;