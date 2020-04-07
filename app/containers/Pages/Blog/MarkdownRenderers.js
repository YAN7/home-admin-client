import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  listItem: {
    marginTop: theme.spacing(1),
  },
  inlineCode: {
    color: theme.palette.type === 'dark' ? theme.palette.primary.main : theme.palette.primary.dark,
  },
  link: {
		color: theme.palette.type === 'dark' ? theme.palette.primary.main : theme.palette.primary.dark,
		position: 'relative',
		display: 'inline-block',
		overflow: 'hidden',
		textDecoration: 'none',
		verticalAlign: 'top',
		outline: 0,
		'&:hover': {
			textDecoration: 'underline',
		},
		'&:before': {
			position: 'absolute',
			top: 'auto',
			bottom: '1px',
			left: '0px',
			width: '100%',
			height: '1px',
			content: '123',
			display: 'block',
			backgroundColor: theme.palette.type === 'dark' ? theme.palette.primary.main : theme.palette.primary.dark,
			transition: 'all 0.2s',
			transform: 'scaleX(0)',
			backfaceVisibility: 'hidden',
		},
		'&:hover:before': {
			transform: 'scaleX(1)',
		},
  }
});

// * inlinecode
function InlineCode(props) {
  const { classes, children } = props;
  return <code className={classes.inlineCode}>{children}</code>;
}

InlineCode.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

const InlineCodeStyled = withStyles(styles)(InlineCode);

// * link
function Link(props) {
  const { classes, children, href } = props;
  return <a href={href} className={classes.link}>{children}</a>;
}

Link.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  href: PropTypes.string.isRequired,
};

const LinkStyled = withStyles(styles)(Link);

// * list
function ListItem(props) {
  const { classes, children } = props;
  return (
    <li className={classes.listItem}>
      {children}
    </li>
  );
}

ListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

const ListItemStyled = withStyles(styles)(ListItem);

export {
	InlineCodeStyled,
	LinkStyled,
	ListItemStyled,
};
