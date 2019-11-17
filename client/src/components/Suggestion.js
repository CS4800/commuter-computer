import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ResultCard from './ResultCard';

class Suggestion extends Component {
  render() {
    if (this.props.suggestions && this.props.suggestions.length) {
      let suggestions = this.props.suggestions;

      return (
        <React.Fragment>
          <h3 className='mt-5 text-center'>Nearby cities</h3>
          {suggestions.map((result, i) => (
            <ResultCard result={result} />
          ))}
        </React.Fragment>
      );
    } else return <div>&nbsp;</div>;
  }
}

Suggestion.propTypes = {
  suggsetions: PropTypes.array
};

export default Suggestion;
