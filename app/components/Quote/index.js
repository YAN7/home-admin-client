import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import blueGrey from '@material-ui/core/colors/blueGrey';

const styles = ({
  quoteWrap: {
    padding: '0 25',
    margin: 10,
    position: 'relative',
    // 定义引号类型
    quotes: '"“" "”" "“" "”"',
    '&:before': {
      color: blueGrey[100],
      fontSize: '4em',
      lineHeight: '.1em',
      marginRight: '.25em',
      verticalAlign: '-.4em'
    }
  },
  quoteLeft: {
    extend: 'quoteWrap',
    textAlign: 'left',
    borderLeft: '5px solid' + blueGrey[50],
    paddingLeft: 25,
    '&:before': {
      content: 'open-quote',
    }
  },
  quoteRight: {
    extend: 'quoteWrap',
    textAlign: 'right',
    borderRight: '5px solid' + blueGrey[50],
    paddingRight: 25,
    '&:before': {
      content: 'close-quote',
    }
  },
  quoteBody: {
    marginBottom: 20
  }
});

class Quote extends React.Component {
  render() {
    const {
      align,
      children: content,
      footnote,
      classes
    } = this.props;
    return (
      <div
        className={
          classNames(
            classes.quoteWrap,
            align === 'right' ? classes.quoteRight : classes.quoteLeft
          )
        }
      >
        <Typography variant="subtitle1" className={classes.quoteBody} gutterBottom>
          {content}
        </Typography>
        <Typography variant="caption">
          {footnote}
        </Typography>
      </div>
    );
  }
}

Quote.propTypes = {
  align: PropTypes.string,
  children: PropTypes.array.isRequired,
  footnote: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

Quote.defaultProps = {
  align: 'left',
  footnote: '',
};

export default withStyles(styles)(Quote);
