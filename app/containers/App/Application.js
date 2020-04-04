import React from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../Templates/Dashboard';
import {
  PersonalDashboard, AppLayout, Responsive, Grid,
} from '../pageListAsync';

class Application extends React.Component {
  render() {
    const { changeMode, history } = this.props;
    return (
      <Dashboard history={history} changeMode={changeMode}>
        <Switch>
          <Route exact path="/app" component={PersonalDashboard} />
          <Route path="/app/layouts/grid" component={Grid} />
          <Route path="/app/layouts/app-layout" component={AppLayout} />
          <Route path="/app/layouts/responsive" component={Responsive} />
          <Route path="/app/pages/error" component={Error} />
        </Switch>
      </Dashboard>
    );
  }
}

Application.propTypes = {
  changeMode: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default Application;
