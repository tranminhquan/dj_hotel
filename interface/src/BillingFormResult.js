import React from 'react';
import {PageHeader, Tag, Table, Button, Modal } from 'antd';
import ModalForm from './ModalForm.js';
import RegisterBillForm from './RegisterBillForm.js'


class BillingFormResult extends React.Component {
  render() {
    //table
    const columns = [
      {
        title: 'Ngay ',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'So nuoc dau ',
        dataIndex: 'water_start_num',
        key: 'water_start_num',
        
      },
      {
        title: 'So nuoc cuoi ',
        dataIndex: 'water_end_num',
        key: 'water_end_num',
      },
      {
        title: 'So dien dau ',
        dataIndex: 'electricity_start_num',
        key: 'electricity_start_num',
      },
      {
        title: 'So dien cuoi ',
        dataIndex: 'electricity_end_num',
        key: 'electricity_end_num',
      },
      {
        title: 'Tien nuoc ',
        dataIndex: 'water_price',
        key: 'water_price',
      },
      {
        title: 'Tien dien ',
        dataIndex: 'electricity_price',
        key: 'electricity_price',
      },
      {
        title: 'Phu phi ',
        dataIndex: 'surchage',
        key: 'surchage',
      },
      {
        title: 'Tien xe ',
        dataIndex: 'bike_price',
        key: 'bike_price',
      },
      {
        title: 'Tong tien ',
        dataIndex: 'total_price',
        key: 'total_price',
      },
    ];



    var dataSource = this.props.bill;
    var max_date = dataSource.map(function(e) { return e.date; }).sort().reverse()[0];
    max_date = "" + max_date;
    var year = max_date.split("-")[0];
    var month = max_date.split("-")[1];

    var current_paid = false;

    if (parseInt(year) == parseInt((new Date()).getFullYear()) && 
        parseInt(month) == (parseInt((new Date()).getMonth()) + 1)){
      current_paid = true;
    }


    var user = this.props.user;

    if (user == null){
      return(
        <div>
        <Table dataSource={dataSource} columns={columns} />
        </div>
    )
    }
    else{
      if (current_paid == false){
        return(
          <div>
          <ul>
              <li>{user.room_id}</li>
              <li>{user.customer_name}</li>
              <li>{user.customer_id}</li>
              <li>{user.customer_phone}</li>
              <li>{user.num_bike}</li>
              <li>{user.bike_id}</li>
              <li>{user.parking_card_id}</li>
              <li>{user.customer_deposit}</li>
              <li>{user.start_date}</li>
              
          </ul>
          
          <Table dataSource={dataSource} columns={columns} />
          
          <PageHeader title="HOA DON CHUA THANH TOAN THANG NAY" tags={<Tag color="red">Warning</Tag>}>
            <RegisterBillForm room_id={user.room_id} month={(new Date()).getMonth()} year={(new Date()).getFullYear()} />
          </PageHeader>
          </div>
      )
      } else{
        return(
            <div>
            <ul>
                <li>{user.room_id}</li>
                <li>{user.customer_name}</li>
                <li>{user.customer_id}</li>
                <li>{user.customer_phone}</li>
                <li>{user.num_bike}</li>
                <li>{user.bike_id}</li>
                <li>{user.parking_card_id}</li>
                <li>{user.customer_deposit}</li>
                <li>{user.start_date}</li>
                
            </ul>
            
            <Table dataSource={dataSource} columns={columns} />
            <PageHeader title="HOA DON DA DUOC THANH TOAN CHO THANG NAY" tags={<Tag color="green">Paid</Tag>}/>
            
            </div>
        )
      }
    }
  }

}

export default BillingFormResult;
