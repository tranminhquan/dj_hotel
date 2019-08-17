import React from "react";
import {Table} from "antd";
import { Card, Row, Col } from 'antd';

class Result extends React.Component {
  render() {

    //table
    const columns = [
      {
        title: 'Ngày bắt đầu thuê ',
        dataIndex: 'start_date',
        key: 'start_date',
      },
      {
        title: 'Tên ',
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
        title: 'Số điện thoại ',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'Số phòng ',
        dataIndex: 'id_room',
        key: 'id_room',
      },
      {
        title: 'Số thẻ xe ',
        dataIndex: 'card_id',
        key: 'card_id',
      },
      {
        title: 'Tiền đặt cọc ',
        dataIndex: 'deposit',
        key: 'deposit',
      },


    ];



    const dataSource = [];
    dataSource.push({
      key: this.props.result.id,
      num_id: this.props.result.id,
      start_date: this.props.result.start_date,
      name: this.props.result.customer_name,
      cmnd: this.props.result.customer_id,
      phone: this.props.result.customer_phone,
      id_room: this.props.result.room_id,
      card_id: this.props.result.parking_card_id,
      deposit: this.props.result.customer_deposit,
    })


    return(

      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Table dataSource={dataSource} columns={columns} />


        <Row gutter={20}>
          <Col span={15}>
            <Card title="CMND Image" bordered={false} style={{width:800}} >
              <img alt='cmnd' style={{width:750,height:350}} src={this.props.result.image_cmnd} />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Profile Picture" bordered={false}>
              <img alt='profile' style={{width:250,height:350}} src={this.props.result.image_profile} />
            </Card>
          </Col>

        </Row>
      </div>


    )
  }
}

export default Result;
