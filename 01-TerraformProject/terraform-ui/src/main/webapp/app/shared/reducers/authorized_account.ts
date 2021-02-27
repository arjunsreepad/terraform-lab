const json_data_roles = {
    user : {
      username: 'user',
      login: 'user',
      activeProfiles: 'prod',
      activated: true,
      authorities : ['ROLE_USER'],
      sub: '417466',
      lastName: 'Venkata Nidumukkala (user)',
      jobTitle: 'SENIOR SOFTWARE ENGINEER',
      iss: 'PingAccess',
      costCentreCode: 'D1729',
      orgRole: 'D1729 - Emirates Group Technology Centre - 4237 - SOFTWARE ENGINEER',
      appRole: 'ROLE_USER',
      pingaccess_refresh_exp: 1460449935,
      auth_time: 1460449428,
      deptDesc: 'EMIRATES GROUP I T',
      exp: 1460451675,
      iat: 1460449428,
      jti: '07398a08-133b-44e6-a464-7d392314917b',
      cchId: '138703',
      isOutstationUser: 'N',
      employeeId: '417466',
      managerId: '417466',
      mobileNo: '+971551234567',
      // tslint:disable-next-line:max-line-length
      access_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6InBw',
      aud: 'be2es',
      firstName: 'ABC-local',
      grade: 'EK.07',
      location: 'Emirates Group Technology Centre',
      costCentreDesc: 'SOFTWARE ENGINEERING - WORK PROGRAM CONTROLLERS & ENGINEERS',
      deptCode: 'D17'
    },
    admin : {
      username: 'admin',
      login: 'admin',
      activeProfiles: 'prod',
      activated: true,
      authorities : ['ROLE_ADMIN'],
      sub: '417466',
      lastName: 'Venkata Nidumukkala (admin)',
      jobTitle: 'SENIOR SOFTWARE ENGINEER',
      iss: 'PingAccess',
      costCentreCode: 'D1729',
      orgRole: 'D1729 - Emirates Group Technology Centre - 4237 - SOFTWARE ENGINEER',
      appRole: 'ROLE_ADMIN',
      pingaccess_refresh_exp: 1460449935,
      auth_time: 1460449428,
      deptDesc: 'EMIRATES GROUP I T',
      exp: 1460451675,
      iat: 1460449428,
      jti: '07398a08-133b-44e6-a464-7d392314917b',
      cchId: '138703',
      isOutstationUser: 'N',
      employeeId: '417466',
      managerId: '417466',
      mobileNo: '+971551234567',
      // tslint:disable-next-line:max-line-length
      access_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6InBw',
      aud: 'be2es',
      firstName: 'ABC-local',
      grade: 'EK.07',
      location: 'Emirates Group Technology Centre',
      costCentreDesc: 'SOFTWARE ENGINEERING - WORK PROGRAM CONTROLLERS & ENGINEERS',
      deptCode: 'D17'

    }

  };

  export const fetch_accountdetails = loginname => {
    if (loginname === undefined || loginname === '') {
      loginname = 'user';
    }

    const login_info = { data : json_data_roles[loginname] };

    // console.log(login_info.data);

    return login_info;
  };

  export const fetch_managementinfo = () => {
    // return { data : 'info'};
    return { };
  };

