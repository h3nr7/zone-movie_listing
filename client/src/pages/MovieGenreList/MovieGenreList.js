import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';

const STYLES = theme => ({
  root: {
  },
  tiles: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit,
  },
  title: {
    padding: '0px 30px'
  },
  button: {
   margin: theme.spacing.unit,
   width: '80%',
   marginTop: '50px'
 },
 filterToggle: {
   display: 'flex',
   justifyContent: 'center',
   flexWrap: 'wrap',
 }
});

class MovieGenreList extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    initialTileData: PropTypes.array.isRequired,
    onGenreUpdate: PropTypes.func.isRequired,
    onFilterTypeUpdate: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      filterType: 'union',
      tileData: props.initialTileData.map(tile => ({...tile, isSelected: true}))
    };
  }

  _clickHandler = event => {
    let nTileData = this.state.tileData.map(tile => {
      let nTile = {...tile};
      if(tile.id === Number(event.currentTarget.id)) nTile.isSelected = !tile.isSelected;
      return nTile;
    });
    this.setState({tileData: nTileData}, () => this.props.onGenreUpdate({tileData:this.state.tileData}));
  }

  _radioHandleChange = event => {
    this.setState({ filterType: event.target.value }, () => this.props.onFilterTypeUpdate({filterType: this.state.filterType}));
  }

  _resetGenre = () => {
    const nTileData = this.state.tileData.map(tile => ({...tile, isSelected: true}));
    this.setState({tileData: nTileData}, () => this.props.onGenreUpdate({tileData:this.state.tileData, filterType: this.state.filterType}));
  }

  render() {
    const { tileData, filterType } = this.state;
    const  { root, title, chip, tiles, button, filterToggle } = this.props.classes;

    return (

      <div className={root}>
        <Typography className={title} id="slider-genres">Genres</Typography>
        <FormGroup row className={filterToggle}>
          <FormControlLabel
            control={
              <Radio
                label="Secondary"
                checked={filterType === 'union'}
                onChange={this._radioHandleChange}
                value="union"
                name="radio-button-filter"
                color="primary"
                aria-label="UNION"
              />
            }
            label="Union"
          />
          <FormControlLabel
            control={
              <Radio
                label="Secondary"
                checked={filterType === 'intersect'}
                onChange={this._radioHandleChange}
                value="intersect"
                name="radio-button-filter"
                color="primary"
                aria-label="INTERSECT"
              />
            }
            label="Intersect"
          />
        </FormGroup>
        <div className={tiles}>
          {
            tileData.map(tile => (
              <Chip
                color={tile.isSelected ? 'primary' : 'default'}
                key={tile.name}
                id={tile.id}
                label={tile.name}
                onClick={this._clickHandler}
                className={chip}
                variant={tile.isSelected ? 'outlined' : 'default'}
            />))
          }
          <Button variant="contained" color="primary" className={button} onClick={this._resetGenre}>
            Reset Genre
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(STYLES)(MovieGenreList);
