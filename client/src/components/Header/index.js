import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import './Header.scss';

const STYLES = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
    fontSize: '1.5em',
    fontWeight: 200
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const PROP_TYPES = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.any,
  onMenuClick: PropTypes.func.isRequired
};

class Header extends Component{

  static propTypes = PROP_TYPES

  render() {

    const { root, menuButton, grow } = this.props.classes;

    return (
      <AppBar position="fixed" className={this.props.className} color='secondary'>
        <Toolbar>
          <IconButton className={menuButton} color="inherit" aria-label="Menu" onClick={this.props.onMenuClick}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={grow}>
            Zone Digital TmDb Listing
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(STYLES)(Header);
