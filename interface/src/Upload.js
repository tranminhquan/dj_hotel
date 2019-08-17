import React from 'react';
import axios from 'axios';

class UploadImg extends React.Component {

  state = { selectedFile: null }

  fileChangedHandler = event => {
    this.setState({ selectedFile: event.target.files[0]})

  }



  uploadHandler = () => {
    let formData = new FormData();
    formData.append(
      'image_profile',
      this.state.selectedFile,

    );

    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }

    axios.put('http://127.0.0.1:8000/api/user/1/', formData, config)
      .then(res => {
        console.log(res);
      });
  }


  render() {
    return(
      <div>
        <input type="file" onChange={this.fileChangedHandler}/>
        <button onClick={this.uploadHandler}>Upload!</button>
      </div>
    )
  }
}


export default UploadImg;
