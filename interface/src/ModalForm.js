import React from 'react';
import axios from 'axios';


import {
  Form,
  Input,
  Button,

} from 'antd';


class ModalForm extends React.Component {
  state = {
    results: [],
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        axios.put('http://127.0.0.1:8000/api/user/'+this.props.user.id+'/', values).then((response) => {
    			this.setState({
            results: response.data
          });
          console.log('Info back from database',this.state.results)

    		})
        console.log('Received values of form: ', values);
      }
    })
  };






  render() {
    const { getFieldDecorator } = this.props.form;
    console.log('id from past',this.props.user.id)


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
          <Form.Item label="Tên Người Thuê " hasFeedback>
            {getFieldDecorator('customer_name', {
              rules: [
                {
                  required: true,
                  message: 'Điền tên khách hàng!',
                },
              ],
            })(<Input />)}
          </Form.Item>

          <Form.Item label="Số CMND" hasFeedback>
            {getFieldDecorator('customer_id', {
              rules: [
                {
                  required: true,
                  message: 'Điền số chứng minh nhân dân!',
                },
              ],
            })(<Input />)}
          </Form.Item>

          <Form.Item label="Số điện thoại" hasFeedback>
            {getFieldDecorator('customer_phone', {
              rules: [
              ],
            })(<Input/>)}
          </Form.Item>

          <Form.Item label="Số phòng" hasFeedback>
            {getFieldDecorator('room_id', {
              rules: [{ required: true, message: 'Điền số phòng!' }],
            })(<Input />)}
          </Form.Item>

          <Form.Item label='Tiền đặt cọc ' hasFeedback>
            {getFieldDecorator('customer_deposit', {
              rules: [
                {
                  required: true,
                  message: 'Điền số tiền đặt cọc!', whitespace: true }],
            })(<Input />)}
          </Form.Item>

          <Form.Item label="Số lượng xe gắn máy" hasFeedback>
            {getFieldDecorator('num_bike', {
              rules: [{ required: true, message: 'Điền số xe gắn máy!' }],
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

const WrappedModalForm = Form.create({ name: 'register' })(ModalForm);

export default WrappedModalForm ;
