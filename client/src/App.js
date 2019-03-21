import React, { Component } from 'react';
import classNames from 'classnames';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Header from './components/Header';
import Footer from './components/Footer';
import MovieGenreList from './pages/MovieGenreList';
import MovieList from './pages/MovieList';
import MovieRatingSlider from './pages/MovieRatingSlider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import './App.scss';

const drawerWidth = 350;
const STYLE = theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
});

const PROP_TYPES = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

class App extends Component {

  static propTypes = PROP_TYPES

  constructor(props) {
    super(props);

    this.state = {
      isDrawerOpen: false,
      isGenreLoading: true,
      isMovieLoading: true,
      error: false,
      currentRating: 3,
      filterType: 'union',
      genre: [],
      genreList: [],
      genreHash: {},
      movieList: []
    };

    axios.get(`${API_PROTOCOL}://${API_ENDPOINT}/${API_VER}/genre/movie/list?api_key=${API_KEY}`)
      .then(response =>{
        this.setState({
          isGenreLoading: false,
          genreList: response.data.genres,
          genre: response.data.genres.map(item => item.id),
          genreHash: response.data.genres.reduce((prev, cur) => {
              prev = prev || {};
              prev = {...prev, [cur.id]: cur.name};
              return prev;
            }, null),
        });
        return axios.get(`${API_PROTOCOL}://${API_ENDPOINT}/${API_VER}/movie/now_playing?api_key=${API_KEY}`);
      })
      .then(response => {
        this.setState({
          isMovieLoading: false,
          movieList: response.data.results.map(item => ({...item, isDisplay: true}))
        });
      })
      .catch(this._apiErrorHandler);

  }

  static propTypes = PROP_TYPES

  _apiErrorHandler = (error) => {
    console.log('api error', error);
    this.setState({
      isDrawerOpen: false,
      isGenreLoading: false,
      isMovieLoading: false,
      error: true
    });
  }

  _updateFilterType = eve => {
    this.setState({filterType: eve.filterType});
  }

  _genreChangeHandler = ({tileData}) => {
    const selectedGenre = tileData.reduce((prev, cur) => {
      prev = Array.isArray(prev) ? prev : [prev];
      if(cur && cur.isSelected) prev.push(cur.id);
      return prev;
    }, []);
    this.setState({genre: selectedGenre});
  }

  _ratingChangeHandler = evt => {
    this.setState({currentRating: evt.value});
  }

  _handleDrawerOpen = () => {
    this.setState({ isDrawerOpen: true });
  };

  _handleDrawerClose = () => {
    this.setState({ isDrawerOpen: false });
  };

  _renderDrawer() {
    const { theme, classes } = this.props;
    const { drawer, drawerPaper, drawerHeader } = classes;
    const { isDrawerOpen, isGenreLoading, genreList, currentRating } = this.state;

    return(<Drawer
      className={drawer}
      variant="persistent"
      anchor="left"
      open={isDrawerOpen}
      classes={{
        paper: drawerPaper,
      }}
    >
      <div className={drawerHeader}>
        <IconButton onClick={this._handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>

      <MovieRatingSlider initialRating={currentRating} onValueChange={this._ratingChangeHandler}/>
      { isGenreLoading ? <LinearProgress /> : <MovieGenreList initialTileData={genreList} onFilterTypeUpdate={this._updateFilterType} onGenreUpdate={this._genreChangeHandler} /> }

    </Drawer>);
  }

  render() {
    const { classes } = this.props;
    const { root, content, contentShift, drawerHeader, appBar, appBarShift } = classes;
    const { isDrawerOpen, isMovieLoading, movieList, genre, genreHash, currentRating, filterType } = this.state;

    return (
      <div className={`app__container ${root}`}>
        <CssBaseline />
        <Header
          position="fixed"
          className={classNames(appBar, {
            [appBarShift]: isDrawerOpen,
          })}
          onMenuClick={ this._handleDrawerOpen }/>
        {this._renderDrawer()}
        <main
          className={classNames(content, {
            [contentShift]: isDrawerOpen,
        })}>
          <div className={drawerHeader} />
          { isMovieLoading ? <LinearProgress /> : <MovieList
              genre={genre}
              genreHash={genreHash}
              rating={currentRating}
              filterType={filterType}
              tileData={movieList} /> }
      </main>
      <Footer />
      </div>
    );
  }
}

export default withStyles(STYLE, { withTheme: true })(App);
