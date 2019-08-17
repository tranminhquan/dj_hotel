import React from 'react';
import axios from 'axios';
import FormResult from './FormResult.js';

import {
  Form,
  Input,
  Button,
  
} from 'antd';


class RegisterBillForm extends React.Component {
  state = {
    results: [],
    queryData: [],

  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        axios.post('http://127.0.0.1:8000/api/billing/', values).then((response) => {
    			this.setState({
            results: response.data
          });
          console.log('Info back from database',this.state.results);
    		})
        console.log('Received values of form: ', values);
      }
    });
  };


  render() {
    const { getFieldDecorator } = this.props.form;
    var month = this.props.month;
    var year = this.props.year;

    // style of form
    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };


    return (
      <div>
        <h3>Thanh toan tien phong thang {month} nam {year}</h3>
        <Form {...formItemLayout} onSubmit={this.handleSubmit} >
          <Form.Item label="So phong " hasFeedback>
            {getFieldDecorator('user', {
              initialValue: this.props.room_id,
              rules: [
                {
                  required: true,
                  message: 'Dien so phong!',
                },
              ],
            })(<Input />)}
          </Form.Item>

          <Form.Item label="Chi so nuoc cuoi" hasFeedback>
            {getFieldDecorator('water_end_num', {
              rules: [
                {
                  required: true,
                  message: 'Dien chi so nuoc!',
                },
              ],
            })(<Input />)}
          </Form.Item>

          <Form.Item label="Chi so dien cuoi" hasFeedback>
            {getFieldDecorator('electricity_end_num', {
              rules: [
                  {
                    required: true,
                    message: 'Dien chi dien!',
                  }
              ],
            })(<Input/>)}
          </Form.Item>

          <Form.Item label="Phu phi" hasFeedback>
            {getFieldDecorator('surchage', {
              rules: [{ required: true, message: 'Dien phu phi!' }],
            })(<Input />)}
          </Form.Item>
        

        <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Hoàn Thành
            </Button>
          </Form.Item>

          </Form>
      </div>

    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegisterBillForm);

export default WrappedRegistrationForm ;
