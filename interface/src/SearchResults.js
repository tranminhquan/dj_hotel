
import React from "react";
import PropTypes from 'prop-types';
import Result from './Result.js'

class Results extends React.Component {
  render() {
    return(
      this.props.results.map((result) => (
        <Result key={result.id} result={result} />

      ))
    )
  }
}

//property type
Results.propTypes = {
  results: PropTypes.array.isRequired
}

export default Results;
