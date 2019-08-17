import React from 'react';
import {Table, Button, Modal } from 'antd';
import ModalForm from './ModalForm.js';


class FormResult extends React.Component {

  state = {
    visible: null,
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

  render() {




    //Table

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
                <ModalForm user={this.props.user} />

            </Modal>
          </span>
        ),
      },

    ];

    const data = [
      {
        key: this.props.user.id,
        name: this.props.user.customer_name,
        cmnd: this.props.user.customer_id,
        phone: this.props.user.customer_phone,
        id_room: this.props.user.room_id,
        num_bike: this.props.user.num_bike,
        deposit: this.props.user.customer_deposit,
      },

    ];

    return(
      <div>

        <Table columns={columns} dataSource={data} />

      </div>
    )
  }

}

export default FormResult;
