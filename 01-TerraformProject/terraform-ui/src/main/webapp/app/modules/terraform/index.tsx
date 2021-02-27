import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CreateInfraReq from './infraRequest/infraRequest';
import ReviewInfraReq from './infraReview/infraReview';

const Routes = ({ match }) => (
  <div>
    <ErrorBoundaryRoute path={`${match.url}/create`} component={CreateInfraReq} />
    <ErrorBoundaryRoute path={`${match.url}/review`} component={ReviewInfraReq} />
  </div>
);

export default Routes;
