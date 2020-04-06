import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Comments, ShowcaseCard } from 'dan-components';
import AllInclusive from '@material-ui/icons/AllInclusive';
import Brightness5 from '@material-ui/icons/Brightness5';
import People from '@material-ui/icons/People';
import commentData from 'dan-api/apps/commentData';
import img from 'dan-api/images/photos';
import Markdown from './Markdown';
// import SidebarBlog from './SidebarBlog';
import styles from './blogStyle-jss';
import request from '../../../utils/request';

class Article extends React.Component {
  state = {
    articleDto: {},
  }

  componentDidMount() {
    this.query();
  }

  query = async () => {
    console.log('prop', this.props);
    const id = this.props?.match?.params?.id;
    const res = await request.get(`/blog/article/${id}`);
    if (res.success && res.data) {
      this.setState({
        articleDto: res?.data,
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { articleDto } = this.state;
    const { editContent, title, headPic } = articleDto;
    return (
      <Fragment>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <article className={classes.article}>
                <div className={classes.content}>
                  <img className={classes.headPic} src={headPic} alt="headPic" />
                  <Typography variant="h4" gutterBottom>
                    {title}
                  </Typography>
                  <Markdown>
                    {editContent}
                  </Markdown>
                  {/* <Divider className={classes.dividerBordered} /> */}
                </div>
              </article>
              <section className={classes.socmedShare}>
                <div className={classes.btnArea}>
                  <Typography className={classes.title}>
                    Share to social media
                  </Typography>
                  <Button variant="outlined" size="small" className={classes.redBtn} type="button">
                    <AllInclusive className={classNames(classes.leftIcon, classes.iconSmall)} />
                    Socmed 1
                  </Button>
                  <Button variant="outlined" size="small" className={classes.blueBtn} type="button">
                    <Brightness5 className={classNames(classes.leftIcon, classes.iconSmall)} />
                    Socmed 2
                  </Button>
                  <Button variant="outlined" size="small" className={classes.cyanBtn} type="button">
                    <People className={classNames(classes.leftIcon, classes.iconSmall)} />
                    Socmed 3
                  </Button>
                </div>
              </section>
              <Divider className={classes.dividerBordered} />
              <section>
                <Typography className={classes.title}>
                  Write comments
                </Typography>
                <Comments dataList={commentData} />
              </section>
              {/* <Typography variant="h6" className={classes.title2} gutterBottom>Related Posts</Typography>
              <Grid container spacing={3}>
                <Grid item sm={4} xs={12}>
                  <ShowcaseCard
                    title="Post title"
                    date="Nov 12"
                    desc="Aenean facilisis vitae purus facilisis semper."
                    action="Read more"
                    image={img[5]}
                  />
                </Grid>
                <Grid item sm={4} xs={12}>
                  <ShowcaseCard
                    title="Post title"
                    date="Nov 12"
                    desc="Aenean facilisis vitae purus facilisis semper."
                    action="Read more"
                    image={img[25]}
                  />
                </Grid>
                <Grid item sm={4} xs={12}>
                  <ShowcaseCard
                    title="Post title"
                    date="Nov 12"
                    desc="Aenean facilisis vitae purus facilisis semper."
                    action="Read more"
                    image={img[45]}
                  />
                </Grid>
              </Grid> */}
            </Grid>
            {/* <Grid item md={4} xs={12}>
              <SidebarBlog />
            </Grid> */}
          </Grid>
        </div>
      </Fragment>
    );
  }
}

Article.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Article);
