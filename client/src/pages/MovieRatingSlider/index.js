import React, { Component } from 'react';
import Slider, { defaultValueReducer } from '@material-ui/lab/Slider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const STYLE = {
  root: {
    padding: '50px 30px',
    overflowX: 'hidden'
  },
  slider: {
    padding: '22px 0px',
  },
};

function valueReducer(rawValue, props, event) {
  const { disabled, max, min, step } = props;

  function roundToStep(number) {
    return Math.round(number / step) * step;
  }

  if (!disabled && step) {
    if (rawValue > min && rawValue < max) {
      if (rawValue === max - step) {
        // If moving the Slider using arrow keys and value is formerly an maximum edge value
        return roundToStep(rawValue + step / 2);
      }
      if (rawValue === min + step) {
        // Same for minimum edge value
        return roundToStep(rawValue - step / 2);
      }
      return roundToStep(rawValue);
    }
    return rawValue;
  }

  return defaultValueReducer(rawValue, props, event);
}

class MovieRatingSlider extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    initialRating: PropTypes.number.isRequired,
    onValueChange: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      value: props.initialRating
    };
  }

  _handleChange = (event, value) => {
    const { onValueChange } = this.props;
    this.setState({ value });
    if(onValueChange) onValueChange({value});
  }

  render() {

    const { classes } = this.props;
    const { root, slider } = classes;
    const { value } = this.state;

    return (
      <div className={root}>
        <Typography id="slider-ratings">Ratings</Typography>
        <Slider
          className={slider}
          value={value}
          valueReducer={valueReducer}
          min={0}
          max={10}
          step={0.5}
          direction='right'
          onChange={this._handleChange}
        />
        <Typography id="slider-ratings">{value}</Typography>
      </div>
    );
  }

}

export default withStyles(STYLE)(MovieRatingSlider);
