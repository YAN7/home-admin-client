import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import lightStyle from 'react-syntax-highlighter/dist/esm/styles/prism/solarizedlight';
import darkStyle from 'react-syntax-highlighter/dist/esm/styles/prism/xonokai';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import LinearProgress from '@material-ui/core/LinearProgress';
import Code from '@material-ui/icons/Code';
import Close from '@material-ui/icons/Close';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import codePreview from '../../../config/codePreview';

const styles = theme => ({
  button: {
    margin: '8px 5px',
  },
  iconSmall: {
    fontSize: 20,
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  source: {
    overflow: 'hidden',
    height: 0,
    position: 'relative',
    transition: 'all .5s',
    margin: '0 -10px',
    '& pre': {
			margin: '0 0 1em 30px !important',
			borderRadius: '4px !important',
			border: '1px solid rgb(225, 225, 232) !important',
			padding: '15px !important',
			fontSize: '1em !important',
			fontFamily: 'Menlo, Monaco, monospace !important',
		},
		'& code': {
			tabSize: '0 !important',
			fontSize: '1em !important',
			fontFamily: 'Menlo, Monaco, monospace !important',
		},
  },
  preloader: {
    position: 'absolute',
    top: 36,
    left: 0,
    width: '100%'
  },
  open: {
    height: 'auto',
    minHeight: 20,
  },
  src: {
    textAlign: 'left',
		padding: 10,
    position: 'absolute',
    top: -10,
    left: 0,
    zIndex: 1,
    fontFamily: 'monospace',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    '& span': {
      fontSize: 14,
    },
    '& p': {
      color: 'grey',
      '& span': {
        marginRight: 5,
        top: 3,
        position: 'relative'
      }
    }
  },
  toggleContainer: {
    height: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

class CodeReader extends Component {
  state = {
    open: true,
    loading: false,
    style: this.props.mode // eslint-disable-line
  };

  sourceOpen = () => {
    const { open } = this.state;
		this.setState({ open: !open });
  };

  handleStyle = (event, value) => {
    this.setState({ style: value });
  };

  render() {
    const {
      open,
      loading,
      style
    } = this.state;
		const { classes, value, language } = this.props;
		console.log('language', language);
		// SyntaxHighlighter
    SyntaxHighlighter.registerLanguage('jsx', jsx);
    if (codePreview.enable) {
      return (
        <div>
          <Button onClick={this.sourceOpen} color="secondary" className={classes.button} size="small">
            { open ? (
              <Close className={classNames(classes.leftIcon, classes.iconSmall)} />
            ) : (
              <Code className={classNames(classes.leftIcon, classes.iconSmall)} />
            )}
            { open ? 'Hide Code' : 'Show Code' }
          </Button>
          <section className={classNames(classes.source, open ? classes.open : '')}>
            <div className={classes.src}>
              <p />
              <div className={classes.toggleContainer}>
                <ToggleButtonGroup value={style} exclusive onChange={this.handleStyle}>
                  <ToggleButton value="light">
                    Light
                  </ToggleButton>
                  <ToggleButton value="dark">
                    Dark
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            </div>
            {loading && (
              <LinearProgress color="secondary" className={classes.preloader} />
            )}
            <SyntaxHighlighter
              language="jsx"
              style={style === 'dark' ? darkStyle : lightStyle}
              showLineNumbers="true"
            >
              {value}
            </SyntaxHighlighter>
          </section>
        </div>
      );
    }
    return false;
  }
}

CodeReader.propTypes = {
  value: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
	mode: PropTypes.string.isRequired,
	language: PropTypes.string,
};

CodeReader.defaultProps = {
	language: ''
};

const reducer = 'ui';
const mapStateToProps = state => ({
  mode: state.getIn([reducer, 'type']),
});

const AppMapped = connect(
  mapStateToProps,
)(CodeReader);

export default withStyles(styles)(AppMapped);
