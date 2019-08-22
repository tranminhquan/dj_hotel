import React from 'react';
import axios from 'axios';
import FormResult from './FormResult.js';
import TransferationResult from './TransferationResult.js'

import {
  Form,
  Input,
  Button,
  DatePicker
  
} from 'antd';


class RegisterTransferation extends React.Component {
  state = {
    results: [],
    queryData: [],
    info: 'None',
    user: null,
  };


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({info: JSON.stringify(values)})
        axios.post('http://127.0.0.1:8000/api/transfer/', values).then((response) => {
    			this.setState({
            results: response.data
          });

          axios.get('http://127.0.0.1:8000/api/user/' + values.new_room_id.toString()).then((response) => {
          this.setState({
            user: response.data
            })
          });
    		})
        
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
        
        <Form {...formItemLayout} onSubmit={this.handleSubmit} >
          <Form.Item label="Số phòng cũ " hasFeedback>
            {getFieldDecorator('old_room_id', {
              initialValue: this.props.room_id,
              rules: [
                {
                  required: true,
                  message: 'Dien so phong!',
                },
              ],
            })(<Input />)}
          </Form.Item>

          <Form.Item label="Số phòng mới" hasFeedback>
            {getFieldDecorator('new_room_id', {
              rules: [
                {
                  required: true,
                  message: 'Dien so phong!',
                },
              ],
            })(<Input />)}
          </Form.Item>

          <Form.Item label="Ngày chuyển (mm/dd/yyyy)" hasFeedback>
            {getFieldDecorator('start_date', {
              rules: [
                  {
                    required: true,
                    message: 'Dien ngay chuyen',
                  }
              ],
            })(<DatePicker format={'YYYY-MM-DD'}/>)}
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
      
        <TransferationResult user={this.state.user} transferation={this.state.results}/>
      </div>

    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegisterTransferation);

export default WrappedRegistrationForm ;
