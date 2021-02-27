import React from 'react';

import { connect } from 'react-redux';
import * as MC from '../../../shared/material-ui';
import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import TransferList from '../../../shared/material-ui/TransferList';
import { environmentProps, cloudProps, softwareStacks, cloudServerInstances} from './../infraRequest/infra-constants';
import { infrarequest_sample } from './../infraRequest/infra-constants';
import { launchReviewRequest, approveInfraRequest, reset } from './infraReview.reducer';

export interface IReviewInfraReqProps extends StateProps, DispatchProps {

}

export interface IReviewInfraReqState {
  infrarequest: any; // class declaration
}

const useStyles = (theme: MC.Theme) =>
  MC.createStyles({
    root: {
      flexGrow: 1
    },
    divider_margin: {
      marginTop: 10,
      marginBottom: 10
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    }, button: {
      margin: theme.spacing(1),
    }
  });

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <MC.Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <MC.Box p={3}>{children}</MC.Box>
    </MC.Typography>
  );
}

export class ReviewInfraReqPage extends React.Component<IReviewInfraReqProps, IReviewInfraReqState> {

  componentWillMount() {
    this.props.launchReviewRequest('');
    console.log('this.props.reviewInfraReq ', this.props.reviewReqContent);
    this.setState({
      infrarequest: infrarequest_sample
    });
  }

  componentWillReceiveProps(props) {
    console.log('this.componentWillReceiveProps ', this.props.reviewReqContent);
    if(this.props.reviewReqContent && this.props.reviewReqContent.updateSuccess){
      this.setState({
        infrarequest: this.props.reviewReqContent.reviewInfraReq.data
      });
    }
  }

  componentDidMount() {
    console.log('** ReviewInfraReqPage.tsx, Calling props.getSession  ');
    this.props.getSession();
  }

  componentWillUnmount() {
    console.log('** ReviewInfraReqPage.tsx, Calling props.reset ');
    this.props.reset();
  }

  handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    console.log('handleTabChange, name, value ', { newValue: newValue, event: event });
    // setValue(newValue);
    this.state.infrarequest.selectedEnv = newValue;
    this.setState({ infrarequest: this.state.infrarequest });
    return true;
  }

  a11yProps = (index: any) => {
    console.log('a11yProps : ', index);
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  handleApproveClick = () => {
    this.state.infrarequest.environments = [];
    
    console.log('Before Approving ', this.state.infrarequest);
    this.props.approveInfraRequest(this.state.infrarequest);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <MC.Grid item xs={12}>
          <MC.ButtonGroup variant="contained" fullWidth aria-label="full width primary button group">
            <MC.Button>Review Infra Request</MC.Button>
          </MC.ButtonGroup>
        </MC.Grid>

        <MC.Grid container spacing={1}>
          <MC.Grid item xs={4}>
            <MC.TextField
              id="standard-with-placeholder"
              label="Application Name"
              placeholder="Corporate Payments"
              className={classes.textField}
              value={this.state.infrarequest.appName}
              margin="normal"
            />
          </MC.Grid>
          <MC.Grid item xs={4}>
            <MC.TextField
              id="standard-with-placeholder"
              label="Application CI"
              placeholder="eg: S.A.CPG"
              className={classes.textField}
              value={this.state.infrarequest.appCI}
              margin="normal"
            />
          </MC.Grid>
          <MC.Grid item xs={4}>
            <MC.TextField
              id="standard-with-placeholder"
              label="Appln Description"
              placeholder="Short Description"
              className={classes.textField}
              value={this.state.infrarequest.description}
              margin="normal"
            />
          </MC.Grid>
          <MC.Grid item xs={4}>
            <MC.TextField
              id="standard-with-placeholder"
              label="Requestor Id"
              placeholder="eg: s417466"
              className={classes.textField}
              value={this.state.infrarequest.requestorId}
              margin="normal"
            />
          </MC.Grid>
          <MC.Grid item xs={4}>
            <MC.TextField
              id="standard-with-placeholder"
              label="Attachments"
              placeholder="Attach Approval emails.."
              className={classes.textField}
              margin="normal"
            />
          </MC.Grid>
        </MC.Grid>

        <MC.Divider className={classes.divider_margin} />
        <MC.Grid container spacing={1}>
          <MC.Grid item xs={12}>
            <MC.AppBar position="static">
              <MC.Tabs value={this.state.infrarequest.selectedEnv}
                onChange={this.handleTabChange}
                aria-label="simple tabs example">
                {this.state.infrarequest.environmentAttribObjs.map((env_detail, index) => (
                  <MC.Tab label={env_detail.env_name} {...this.a11yProps(index)} />
                ))}
              </MC.Tabs>
            </MC.AppBar>
            {this.state.infrarequest.environmentAttribObjs.map((env_detail, index) => (

              <TabPanel value={this.state.infrarequest.selectedEnv} index={index}>
                <div>
                  <MC.Grid item xs={12}>
                    <MC.ButtonGroup variant="contained" fullWidth aria-label="full width primary button group">
                      <MC.Button>Infrastructure Name</MC.Button>
                      <MC.Button>Was</MC.Button>
                      <MC.Button>Now</MC.Button>
                    </MC.ButtonGroup>
                  </MC.Grid>

                  {env_detail.infra_details.map((infra_detail, index2) => (
                    <MC.Grid item xs={12}>
                      <MC.ButtonGroup fullWidth aria-label="full width outlined button group">
                        <MC.Button>{infra_detail.attribute_label}</MC.Button>
                        <MC.Button>{infra_detail.prev_value}</MC.Button>
                        <MC.Button>{infra_detail.cur_value}</MC.Button>
                      </MC.ButtonGroup>
                    </MC.Grid>
                  ))}

                  <MC.Divider className={classes.divider_margin} />

                  <MC.Grid item xs={12}>
                    <MC.ButtonGroup variant="contained" fullWidth aria-label="full width primary button group">
                      <MC.Button>Software Name</MC.Button>
                      <MC.Button>Was</MC.Button>
                      <MC.Button>Now</MC.Button>
                    </MC.ButtonGroup>
                  </MC.Grid>

                  {env_detail.software_details.map((sw_detail, index2) => (
                    <MC.Grid item xs={12}>
                      <MC.ButtonGroup fullWidth aria-label="full width outlined button group">
                        <MC.Button>{sw_detail.attribute_label}</MC.Button>
                        <MC.Button>{sw_detail.prev_value}</MC.Button>
                        <MC.Button>{sw_detail.cur_value}</MC.Button>
                      </MC.ButtonGroup>
                    </MC.Grid>
                  ))}

                </div>
              </TabPanel>

            ))}

          </MC.Grid>
        </MC.Grid>
        <MC.Divider className={classes.divider_margin} />
        <MC.Divider className={classes.divider_margin} />
        <div>
          <MC.Button variant="contained" size="large"
           className={classes.button}>Reject</MC.Button>
          <MC.Button variant="contained" size="large"
           color="secondary" className={classes.button}>Validate</MC.Button>
          <MC.Button variant="contained" size="large"
           color="primary" className={classes.button} onClick={this.handleApproveClick}>Approve</MC.Button>
          <MC.Button variant="contained" size="large" className={classes.button}>Schedule</MC.Button>
        </div>

      </div>
    );
  }
}

const mapStateToProps = storeState  => ({
  isAuthenticated: storeState.authentication.isAuthenticated,
  reviewReqContent: storeState.reviewInfraReq
});

const mapDispatchToProps = { getSession, launchReviewRequest, approveInfraRequest, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default MC.withStyles(useStyles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewInfraReqPage));
