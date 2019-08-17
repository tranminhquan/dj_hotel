import React from 'react';

class TitleBar extends React.Component {
  render() {
    return(
      <table className='titleBar'>
        <tbody>
          <tr>
            <td>
              <img alt='lotus' width='50' src='https://i.ebayimg.com/images/g/mioAAOSwImZZyo8Z/s-l300.jpg'/>
            </td>
            <td>
              <br/>
            </td>
            <td>
              <h1>Quản lý thông tin người thuê </h1>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default TitleBar;
