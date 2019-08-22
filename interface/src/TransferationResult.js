import React from 'react';
import {PageHeader, Tag, Table, Button, Modal } from 'antd';
import ModalForm from './ModalForm.js';



class TransferationResult extends React.Component {
 
  render() {

    var user = this.props.user;
    var transferation = this.props.transferation

    if (user != null){
        return(
          <div>
          <h3>THONG TIN PHONG CU</h3>    
          <ul>
              
              <li>Ten khach thue: {user.customer_name}</li>
              <li>Ma khach thue: {user.customer_id}</li>
              <li>So dien thoai: {user.customer_phone}</li>
              <li>So luong xe: {user.num_bike}</li>
              <li>So xe: {user.bike_id}</li>
              <li>So the giu xe: {user.parking_card_id}</li>
              <li>Tien coc: {user.customer_deposit}</li>
          </ul>

          <h3>THONG TIN CHUYEN PHONG</h3>
          <ul>
              <li>Phong cu: {transferation.old_room_id}</li>
              <li>Phong moi: {transferation.new_room_id}</li>
              <li>Ngay chuyen: {transferation.start_date}</li>
              <li>Tien nuoc con no: {transferation.water_debt}</li>
              <li>Tien dien con no: {transferation.electricity_debt}</li>
              <li>Tong tien no: {transferation.total_debt}</li>
          </ul>

          </div>
      )
     
    }
    else{
        return(
            <div>
               
            </div>
        )
    }
  }
}

export default TransferationResult;
