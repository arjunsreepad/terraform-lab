import React from 'react';

import { connect } from 'react-redux';

import * as MC from './../../../shared/material-ui';

// import { AvForm, AvField } from 'availity-reactstrap-validation';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { saveInfraRequest, reset } from './infraRequest.reducer';
import TransferList from './../../../shared/material-ui/TransferList';
import { infrarequest_sample, environmentProps, cloudProps, softwareStacks, cloudServerInstances, cloudServersAMIs } from './infra-constants';

export interface ICreateInfraReqProps extends StateProps, DispatchProps {

}

export interface ICreateInfraReqState {
  infrarequest: any;
  softwareStacks: any;
  cloudProps: any;
  environmentProps: any;
}

const updateObjProps = (infraReqFinal, prop, value) => {
  try {
    infraReqFinal[prop] = value;
  }
  catch (e) {
    console.log(e);
  }
  return infraReqFinal;
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
      minWidth: 120
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    }
  });

export class CreateInfraReqPage extends React.Component<ICreateInfraReqProps, ICreateInfraReqState> {
  componentWillMount() {
    this.setState({
      infrarequest: infrarequest_sample,
      softwareStacks: softwareStacks.left,
      cloudProps: cloudProps.left,
      environmentProps: environmentProps.left
    });
  }

  componentDidMount() {
    console.log('** CreateInfraReqPage.tsx, Calling props.getSession  ');
    this.props.getSession();
  }

  componentWillUnmount() {
    console.log('** CreateInfraReqPage.tsx, Calling props.reset ');
    this.props.reset();
  }

  handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.state.infrarequest[name] = event.target.value;
    this.setState({ ...this.state, infrarequest: this.state.infrarequest });
  }

  handleInstanceSelection = (name: string) => (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.state.infrarequest[name] = event.target.value;

    const cloud_server = cloudServersAMIs[event.target.value];
    updateObjProps(this.state.infrarequest, 'server', cloud_server.type);
    updateObjProps(this.state.infrarequest, 'serverAMI', cloud_server.ami);
    updateObjProps(this.state.infrarequest, 'amiKeyPair', cloud_server.keypair_name);
    updateObjProps(this.state.infrarequest, 'nodeJsSwCommand', cloud_server.nodeJsSwCommand);
    updateObjProps(this.state.infrarequest, 'jdkSwCommand', cloud_server.jdkSwCommand);

    this.setState({ ...this.state, infrarequest: this.state.infrarequest });
  }

  handleCheckboxChange = (name: string, index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    let objToUpdt = this.state[name][index];
    objToUpdt.selected = event.target.checked;
    console.log('objToUpdt ==> ', objToUpdt);
    if (objToUpdt.propToReset) {
      const command = objToUpdt.selected ? this.state.infrarequest[objToUpdt.propToReset] : 'sleep 1';
      const value = objToUpdt.selected ? objToUpdt.value : '';
      updateObjProps(this.state.infrarequest, objToUpdt.propToReset, command);
      updateObjProps(this.state.infrarequest, objToUpdt.propToUpdate, value);
    }
    else if(objToUpdt.propToUpdate){
      console.log('objToUpdt.propToUpdate ', objToUpdt.propToUpdate);
      updateObjProps(this.state.infrarequest, objToUpdt.propToUpdate, objToUpdt.value);
      console.log('this.state.infrarequest ', this.state.infrarequest);
    }

    this.setState({ ...this.state, [name]: this.state[name] });
    this.setState({ ...this.state, infrarequest: this.state.infrarequest });
  }

  checkBoxSelectionError = (checkboxitems: any) => {
    return false;
  }

  getDisplayInfraObj = (label, type, prev_value, cur_value) => {
    return {
      attribute_label: label,
      attribute_type: type,
      prev_value,
      cur_value
    };
  }

  handleValidSubmit = () => {
    this.state.infrarequest.environments = [];
    
    // server_tag - to be updated by service.
    updateObjProps(this.state.infrarequest, 'applnPortRangeTo', this.state.infrarequest.applnPortRangeFrom);
    this.state.environmentProps.filter(envObj => envObj.selected).map(envObj => {
      this.state.infrarequest.environments.push(envObj.value);
    });
    console.log('Before Submitting ', this.state.infrarequest);
    this.props.saveInfraRequest(this.state.infrarequest);
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.root}>
          <MC.Grid item xs={12}>
            <MC.ButtonGroup variant="contained" fullWidth aria-label="full width primary button group">
              <MC.Button>Create Infra Request</MC.Button>
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
                onChange={this.handleChange('appName')}
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
                onChange={this.handleChange('appCI')}
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
                onChange={this.handleChange('description')}
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
                onChange={this.handleChange('requestorId')}
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

            <MC.Grid item xs={4}>
              <MC.TextField
                id="standard-with-placeholder"
                label="Org Account"
                placeholder="eg: ekdev"
                className={classes.textField}
                value={this.state.infrarequest.orgAccount}
                onChange={this.handleChange('orgAccount')}
                margin="normal"
              />
            </MC.Grid>

            <MC.Grid item xs={4}>
              <MC.TextField
                id="standard-with-placeholder"
                label="Region"
                placeholder="eg:us-east-2"
                className={classes.textField}
                value={this.state.infrarequest.region}
                onChange={this.handleChange('region')}
                margin="normal"
              />
            </MC.Grid>

            <MC.Grid item xs={4}>
              <MC.TextField
                id="standard-with-placeholder"
                label="VPC"
                placeholder="eg: test-<appname>-vpc-1"
                className={classes.textField}
                value={this.state.infrarequest.vpc}
                onChange={this.handleChange('vpc')}
                margin="normal"
              />
            </MC.Grid>

            <MC.Grid item xs={4}>
              <MC.TextField
                id="standard-with-placeholder"
                label="Subnet"
                placeholder="eg: test-<appname>-subnet-1"
                className={classes.textField}
                value={this.state.infrarequest.subnet}
                onChange={this.handleChange('subnet')}
                margin="normal"
              />
            </MC.Grid>

            <MC.Grid item xs={4}>
              <MC.TextField
                id="standard-with-placeholder"
                label="CIDR range"
                placeholder="eg:10.0.0.0/16"
                className={classes.textField}
                value={this.state.infrarequest.iprange}
                onChange={this.handleChange('cidr_ips')}
                margin="normal"
              />
            </MC.Grid>

            <MC.Grid item xs={4}>
              <MC.TextField
                id="standard-with-placeholder"
                label="Subnet Zone"
                placeholder="eg: us-east-2b"
                className={classes.textField}
                value={this.state.infrarequest.subnet_zone}
                onChange={this.handleChange('subnet_zone')}
                margin="normal"
              />
            </MC.Grid>

            <MC.Grid item xs={4}>

              <MC.FormControl className={classes.formControl}>
                <MC.InputLabel htmlFor="selectedInstance-native-helper">Server Stack</MC.InputLabel>
                <MC.NativeSelect
                  value={this.state.infrarequest.selectedInstance}
                  onChange={this.handleInstanceSelection('selectedInstance')}
                  input={<MC.Input name="selectedInstance" id="selectedInstance-native-helper" />}
                >
                  <option value="" />
                  {cloudServerInstances.map(server => (
                    <option value={server.value}>{server.label}</option>
                  ))}
                </MC.NativeSelect>
              </MC.FormControl>

            </MC.Grid>

            <MC.Grid item xs={4}>
              <MC.TextField
                id="standard-with-placeholder"
                label="Ports to Open"
                placeholder="eg:3000,8082"
                className={classes.textField}
                value={this.state.infrarequest.applnPortRangeFrom}
                onChange={this.handleChange('applnPortRangeFrom')}
                margin="normal"
              />
            </MC.Grid>
            <MC.Grid item xs={4}>
            </MC.Grid>  

            <MC.Grid item xs={4}>
              <MC.FormControl required error={this.checkBoxSelectionError(this.state.environmentProps)} component="fieldset" className={classes.formControl}>
                <MC.FormLabel component="legend">Environment(s)</MC.FormLabel>
                <MC.FormGroup>
                  {this.state.environmentProps.map((chkboxObj, index) => (
                    <MC.FormControlLabel
                      control={<MC.Checkbox checked={chkboxObj.selected} onChange={this.handleCheckboxChange('environmentProps', index)} value={chkboxObj.value} />}
                      label={chkboxObj.label}
                    />
                  ))}
                </MC.FormGroup>
                <MC.FormHelperText>Error goes here...</MC.FormHelperText>
              </MC.FormControl>
            </MC.Grid>

            <MC.Grid item xs={4}>
              <MC.FormControl required error={this.checkBoxSelectionError(this.state.cloudProps)} component="fieldset" className={classes.formControl}>
                <MC.FormLabel component="legend">Choose Cloud</MC.FormLabel>
                <MC.FormGroup>
                  {this.state.cloudProps.map((chkboxObj, index) => (
                    <MC.FormControlLabel
                      control={<MC.Checkbox checked={chkboxObj.selected} onChange={this.handleCheckboxChange('cloudProps', index)} value={chkboxObj.value} />}
                      label={chkboxObj.label}
                    />
                  ))}
                </MC.FormGroup>
                <MC.FormHelperText>Error goes here...</MC.FormHelperText>
              </MC.FormControl>
            </MC.Grid>

            <MC.Grid item xs={4}>
              <MC.FormControl required error={this.checkBoxSelectionError(this.state.softwareStacks)} component="fieldset" className={classes.formControl}>
                <MC.FormLabel component="legend">Choose Software Stack</MC.FormLabel>
                <MC.FormGroup>
                  {this.state.softwareStacks.map((swcheck, index) => (
                    <MC.FormControlLabel
                      control={<MC.Checkbox checked={swcheck.selected} onChange={this.handleCheckboxChange('softwareStacks', index)} value={swcheck.value} />}
                      label={swcheck.label}
                    />
                  ))}
                </MC.FormGroup>
                <MC.FormHelperText>Error goes here...</MC.FormHelperText>
              </MC.FormControl>
            </MC.Grid>
          </MC.Grid>

          <MC.Grid container spacing={1}>
          </MC.Grid>

          <MC.Divider className={classes.divider_margin} />
          <MC.Divider className={classes.divider_margin} />
        </div>

        <div>
          <MC.Button variant="contained" size="large"
            color="secondary" className={classes.button}>Reset</MC.Button>
          <MC.Button variant="contained" size="large"
            color="primary"
            onClick={this.handleValidSubmit}
            className={classes.button}>Submit</MC.Button>
        </div>
      </div>

    );
  }
}

const mapStateToProps = ({ authentication }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated
});

const mapDispatchToProps = { getSession, saveInfraRequest, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default MC.withStyles(useStyles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateInfraReqPage));
