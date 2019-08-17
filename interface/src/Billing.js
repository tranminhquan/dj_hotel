import React from 'react';
import axios from 'axios';
import BillingFormResult from './BillingFormResult.js'

import {
  Form,
  Input,
  Button,
  
} from 'antd';


class SearchBillForm extends React.Component {
  state = {
    results: [],
    queryData: [],
    user_info: null,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
       const room_id =
        values['ROOM_ID'] === undefined ? '' : values['ROOM_ID'];

      if (!err) {
        axios.get('http://127.0.0.1:8000/api/billing/'+
        '?user__room_id__iexact='+room_id)
        .then((response) => {
          console.log('Data retrun from server',response.data);
    			this.setState({
            results: response.data
          });
        });

        axios.get('http://127.0.0.1:8000/api/user/' + room_id)
        .then((response) => {
          console.log('Data retrun from server',response.data);
    			this.setState({
            user_info: response.data
          });
        });

      }
    });
  };


  render() {
    const { getFieldDecorator } = this.props.form;
    const results  = this.state.results;
    console.log('value of data',results);

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
          <Form.Item label="Số phòng" hasFeedback>
            {getFieldDecorator('ROOM_ID', {
              rules: [
                { required: true,
                  message: 'Điền số phòng!',
                },
              ],
            })(<Input />)}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Hoàn Thành
            </Button>
          </Form.Item>
        </Form>
        
        <BillingFormResult bill={this.state.results} user={this.state.user_info} />
      </div>
    
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'registerbill' })(SearchBillForm);

export default WrappedRegistrationForm ;
