import React from 'react';
import axios from 'axios';
import FormResult from './FormResult.js';
import EditTableResults from './EditTableResults.js'
import ModalForm from './ModalForm.js'

import {
  Form,
  Button,
  Table,
  Modal,
} from 'antd';


class EditTable extends React.Component {
  state = {
    queryData: [],
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  // query user by id
  componentWillMount() {
    axios.get('http://127.0.0.1:8000/api/user/')
    .then(response => {
      console.log('query data by id',response.data);
      this.setState({
        queryData: response.data
      })
    })
    .catch(error => {
      console.log(error);
    });
  }



  render() {


    // table

    const columns = [
      {
        title: 'Tên Người Thuê',
        dataIndex: 'name',
        key: 'name',
        render: text => <p>{text}</p>,
      },
      {
        title: 'CMND ',
        dataIndex: 'cmnd',
        key: 'cmnd',
      },
      {
        title: 'Số điện thoại',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'Số phòng ',
        dataIndex: 'id_room',
        key: 'id_room',
      },
      {
        title: 'Tiền đặt cọc ',
        dataIndex: 'deposit',
        key: 'deposit',
      },
      {
        title: 'Số lượng xe gắn máy ',
        dataIndex: 'num_bike',
        key: 'num_bike',
      },
      {
        title: 'Chỉnh sửa thông tin nhập sai ',
        key: 'Action',
        render: (text, record) => (
          <span>
            <Button type="primary" onClick={this.showModal} >
              Chỉnh Sửa
            </Button>
            <Modal
              title="Chỉnh sửa thông tin nhập sai "
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={null}
            >
                <EditTableResults queryData={this.state.queryData} />

            </Modal>
          </span>
        ),
      },
    ];

    const data = [];
    this.state.queryData.forEach((user) => data.push(
      {
        key: user.id,
        name: user.customer_name,
        cmnd: user.customer_id,
        phone: user.customer_phone,
        id_room: user.room_id,
        num_bike: user.num_bike,
        deposit: user.customer_deposit,
      }
    ))

    console.log('data here',data[0])


    return (

      <div>

        <Table columns={columns} dataSource={data} />



      </div>

    );
  }
}

const WrappedEditTable = Form.create({ name: 'register' })(EditTable);

export default WrappedEditTable ;
