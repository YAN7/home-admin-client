import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ShowcaseCard } from 'dan-components';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { withStyles } from '@material-ui/core/styles';
import request from 'dan-utils/request';
import { format } from 'dan-utils/date';
import SidebarBlog from './SidebarBlog';
import styles from './blogStyle-jss';

class Blog extends React.Component {
  state = {
    articles: [],
  };

  componentDidMount() {
    this.queryData();
  }

  queryData = async () => {
    const res = await request.get('/blog/article');
    if (res.success) {
      this.setState({
        articles: res.data,
      });
    }
  }

  render() {
    const { articles } = this.state;
    const { classes } = this.props;
    return (
      <Fragment>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item md={8} xs={12}>
              <section className={classes.postList}>
                <Hidden mdUp>
                  <Typography variant="h4" gutterBottom>Latest Post</Typography>
                </Hidden>
                {articles.map((item, index) => (
                  <ShowcaseCard
                    key={index.toString()}
                    title={item.title}
                    date={format(item.createdAt)}
                    desc={item.description}
                    action="Read more"
                    image={item.headPic}
                    noMargin
                    extraSize
                    href={`/article/${item._id}`}
                  />
                ))}
              </section>
              <div className={classes.pagination}>
                <Button disabled className={classes.button} variant="outlined" color="primary">
                  <ArrowBack />
                  Previous
                </Button>
                <Button className={classes.button} variant="outlined" color="primary">
                  Next
                  <ArrowForward />
                </Button>
              </div>
            </Grid>
            <Grid item md={4} xs={12}>
              <SidebarBlog />
            </Grid>
          </Grid>
        </div>
        {/* <section id="contact">
          <Contact />
        </section> */}
      </Fragment>
    );
  }
}

Blog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Blog);
