import React from 'react';
import axios from 'axios';

import Results from './SearchResults.js'

import {
  Form,
  Input,
  Button,
} from 'antd';

class SearchForm extends React.Component {
  state = {
    confirmDirty: false,
    results: [],

  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
       const name =
        values['NAME'] === undefined ? '' : values['NAME'];
       const id =
        values['ID'] === undefined ? '' : values['ID'];
       const room = values['ROOM'];

      if (!err) {
        axios.get('http://127.0.0.1:8000/api/user/'+
        '?room_id__iexact='+room+
        '&customer_id__iexact='+id+
        '&customer_name__iexact='+name)
        .then((response) => {
          console.log('Data retrun from server',response.data);
    			this.setState({

            results: response.data
          });
    		})

        console.log('Received values of form: ', values);

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
          <Form.Item label="Tên Khách Hàng " hasFeedback>
            {getFieldDecorator('NAME', {
              rules: [
                {
                  required: false,
                  message: 'Điền tên khách hàng!',
                },
              ],
            })(<Input />)}
          </Form.Item>

          <Form.Item label="Số CMND" hasFeedback>
            {getFieldDecorator('ID', {
              rules: [
                {
                  required: false,
                  message: 'Điền số chứng minh nhân dân!',
                },
              ],
            })(<Input />)}
          </Form.Item>

          <Form.Item label="Số phòng" hasFeedback>
            {getFieldDecorator('ROOM', {
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

        <Results results={this.state.results} />
      </div>


    );
  }
}

const WrappedSearchForm = Form.create({ name: 'register' })(SearchForm);

export default WrappedSearchForm ;
