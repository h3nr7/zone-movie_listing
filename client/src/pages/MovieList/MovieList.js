import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarIcon from '@material-ui/icons/Star';


const STYLE = theme => ({
  root: {
    display: 'block',
    width: '100%'
  },
  gridList: {
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    fontSize: '1.8em',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2em'
    },
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  subtitle: {
    color: 'white',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  icon: {
    marginRight: '15px',
    color: 'white',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  },
});

class MovieList extends Component {

  static propTypes = {
    tileData: PropTypes.array,
    classes: PropTypes.object.isRequired,
    rating: PropTypes.number,
    genre: PropTypes.array,
    genreHash: PropTypes.object,
    filterType: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      tileData: props.tileData,
      rating: props.rating,
      genre: props.genre,
      filterType: props.filterType
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {

    let obj = { filterType: nextProps.filterType };

    if(prevState.rating !== nextProps.rating) {
      return { ...obj, rating: nextProps.rating };
    }

    if(prevState.genre !== nextProps.genre) {
      return { ...obj, genre: nextProps.genre };
    }

    if(prevState.genreHash !== nextProps.genreHash) {
      return { ...obj, genreHash: nextProps.genreHash };
    }

    return obj;
  }

  _displayStart = (key, icon, rating) => {
    const nRating = Math.floor(rating/2);
    const nCrumbs = rating/2-nRating >= 0.5;
    let output = [];
    let outChildren = [];
    for(let i=0; i < nRating; i++) {
      outChildren.push(<StarIcon key={`${key}_${i}`} />);
    }
    if(nCrumbs) outChildren.push(<StarHalfIcon key={`${key}_${nRating}`} />);

    output.push(<div key={`${key}_table`} className={icon}>{outChildren}</div>);

    return output;
  }

  render() {
    const { classes, genreHash } = this.props;
    const { rating, genre } = this.state;
    const { tileData, filterType } = this.state;
    const { root, gridList, icon, titleBar, title, subtitle  } = classes;

    const wWidth = window.innerWidth > 780 ? 'original' : window.innerWidth >= 500 ? 'w780' : window.innerWidth >= 342 ? 'w500' : window.innerWidth >= 185 ? 'w342' : 'w185';

    return (
      <div className={`${root} movielist__container`}>
        <GridList cellHeight={200} spacing={1} className={gridList}>
        {tileData
          .filter(tile => {
            // the genre tag filtering felt a little off, therefore giving the option to do union or intersect type filtering
            if(filterType === 'intersect') {
              let intersection = tile.genre_ids.filter(x => genre.includes(x));
              return tile.vote_average >= rating && intersection.length === tile.genre_ids.length;
            }

            const test = new Set([...genre, ...tile.genre_ids]);
            const calcGenreDiff = tile.genre_ids.length + genre.length - test.size;
            return tile.vote_average >= rating && calcGenreDiff > 0;
          })
          .sort((a, b) => b.popularity - a.popularity)
          .map((tile, index) => (
            <GridListTile key={tile.title} cols={index%3 === 0 ? 2 : 1} rows={index%3 === 0 ? 2 : 1}>
              <img src={`https://image.tmdb.org/t/p/${wWidth}${tile.backdrop_path}`} alt={tile.title} />
              <GridListTileBar
                classes={{ title }}
                title={tile.title}
                subtitle={
                  <Typography key={`${tile.title}`} className={subtitle}>{tile.genre_ids.map((id, index) => `${genreHash[id]}${index < tile.genre_ids.length-1 ? ', ' : ''}`)}</Typography>
                }
                titlePosition="top"
                actionIcon={this._displayStart(tile.title, icon, tile.vote_average)}
                actionPosition="right"
                className={titleBar}
              />
            </GridListTile>
        ))}
      </GridList>
      </div>
    );
  }

}

export default withStyles(STYLE)(MovieList);
