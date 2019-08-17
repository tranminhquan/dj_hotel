
import React, { Component } from 'react';
import './App.css';
import RegistrationForm from './Form.js';
import SearchBillForm from './Billing.js'
import RegisterBillForm from './RegisterBillForm.js'

import { PageHeader, Tag, Statistic, Row, Col } from 'antd';
import UploadImg from './Upload.js';


import TitleBar from './TitleBar.js';
import { Icon } from 'antd';
import SearchForm from './Search.js'






const extraContent = (
  <Row>
    <Col span={12}>
      <Statistic title="TRANG THAI" value="CHUA THANH TOAN" />
    </Col>
    <Col span={12}>
      <Statistic title="DON GIA" prefix="VND" value={568.08} />
    </Col>
  </Row>
);

class App extends Component {
  render() {
    return (
      <div>
        <TitleBar/>

        <PageHeader title='MỤC ĐIỀN THÔNG TIN NGƯỜI THUÊ PHÒNG '>
          <Icon type="form" />
          <RegistrationForm />
        </PageHeader>



        <PageHeader title='MỤC UPLOAD ẢNH CMND BỔ SUNG CHO TỪNG NGƯỜI THUÊ '>
          <UploadImg/>
        </PageHeader>


        <PageHeader title='MỤC TRA CỨU THÔNG TIN NGƯỜI THUÊ NHÀ '>

          <PageHeader title="Nhập thông tin tìm kiếm ">
            <SearchForm/>
          </PageHeader>


          <PageHeader
            title="Billing Status"
            //subTitle="This is a subtitle"
            tags={<Tag color="red">Warning</Tag>}
          >
            <div className="wrap">

              <div className="extraContent">{extraContent}</div>
            </div>
          </PageHeader>
        </PageHeader>

        <PageHeader title="MỤC THANH TRA CỨU TIỀN PHÒNG">
          <SearchBillForm/>
        </PageHeader>

        <PageHeader title="MỤC CHUYỂN PHÒNG">
          
        </PageHeader>



      </div>


    )
  }
}

export default App;
