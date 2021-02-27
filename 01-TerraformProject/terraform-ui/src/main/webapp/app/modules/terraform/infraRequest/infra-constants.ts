export const environmentProps = {
    left: [{
        label: 'DEV', value: 'DEV', selected: false
    }, {
        label: 'TEST', value: 'TEST', selected: false
    }, {
        label: 'STAGE', value: 'STAGE', selected: false
    }, {
        label: 'PROD', value: 'PROD', selected: false
    }],
    right: []
};

export const cloudProps = {
    left: [{
        label: 'AWS', value: 'aws', selected: false, propToUpdate: 'provider'
    }, {
        label: 'AZURE', value: 'azure', selected: false, propToUpdate: 'provider'
    }, {
        label: 'GOOGLE', value: 'gcp', selected: false, propToUpdate: 'provider'
    }],
    right: []
};

export const softwareStacks = {
    left: [{
        label: 'Jdk11', value: 'Jdk11', selected: false, propToReset: 'jdkSwCommand', propToUpdate: 'javaVersion'
    }, {
        label: 'Node9', value: 'Node9', selected: false, propToReset: 'nodeJsSwCommand', propToUpdate: 'nodeJsVersion'
    }, {
        label: 'Jboss 8', value: 'jboss8', selected: false, propToReset: 'jbossSwCommand', propToUpdate: 'jbossVersion'
    }, {
        label: 'Tomcat 9', value: 'tomcat9', selected: false, propToReset: 'tomcatSwCommand', propToUpdate: 'tomcatVersion'
    }],
    right: []
};

export const cloudServerInstances = [{
    label: 'EK-Cloud-Ubuntu-Micro', value: 'ubuntu_t2micro'
}, {
    label: 'EK-Cloud-Ubuntu-Max', value: 'ubuntu_t2max'
}, {
    label: 'EK-Cloud-RHEL-Min', value: 'rhel_t2micro'
}, {
    label: 'EK-Cloud-RHEL-Max', value: 'rhel_t2max'
}];

// && cd ~/test/myprojects/02-nodejs/ && sudo npm start
//nodeJsSwCommand: 'sudo apt-get install -y nodejs && mkdir test && cd test && git clone https://github.com/nvkkgithub/myprojects.git && cd myprojects/02-nodejs/ && sudo npm install && sleep 5 && cd ~/test/myprojects/02-nodejs/ && sudo npm start',
export const cloudServersAMIs = {
    ubuntu_t2micro: {
        name: 'Ubuntu-16-2GB',
        type: 't2.micro',
        ami: 'ami-05c1fa8df71875112',
        keypair_name: 'vk-ubuntu-ec2pair',
        nodeJsSwCommand: 'sudo apt-get install -y nodejs && mkdir test && cd test && git clone https://github.com/nvkkgithub/myprojects.git && cd myprojects/02-nodejs/ && sudo npm install && sleep 5',
        jdkSwCommand: 'sudo apt-get install -y default-jre'
    },
    ubuntu_t2max: {
        name: 'Ubuntu-16-4GB',
        type: 't2.micro',
        ami: 'ami-05c1fa8df71875112',
        keypair_name: 'vk-ubuntu-ec2pair',
        nodeJsSwCommand: 'sudo apt-get install -y nodejs && mkdir test && cd test && git clone https://github.com/nvkkgithub/myprojects.git && cd myprojects/02-nodejs/ && sudo npm install && sleep 5',
        jdkSwCommand: 'sudo apt-get install -y default-jre'
    },
    rhel_t2micro: {
        name: 'RHEL-4GB',
        type: 't2.micro',
        ami: 'ami-05c1fa8df71875112',
        keypair_name: 'vk-ubuntu-ec2pair',
        nodeJsSwCommand: 'sudo apt-get install -y nodejs && mkdir test && cd test && git clone https://github.com/nvkkgithub/myprojects.git && cd myprojects/02-nodejs/ && sudo npm install && sleep 5',
        jdkSwCommand: 'sudo apt-get install -y default-jre'
    },
    rhel_t2max: {
        name: 'RHEL-8GB',
        type: 't2.micro',
        ami: 'ami-05c1fa8df71875112',
        keypair_name: 'vk-ubuntu-ec2pair',
        nodeJsSwCommand: 'sudo apt-get install -y nodejs && mkdir test && cd test && git clone https://github.com/nvkkgithub/myprojects.git && cd myprojects/02-nodejs/ && sudo npm install && sleep 5',
        jdkSwCommand: 'sudo apt-get install -y default-jre'
    }
}

export const infrarequest_sample = {
    appName: '',
    appCI : '',
    description: '',
    orgAccount : '',
    provider : '',
    environment : '',
    region : '',
    vpc : '',
    subnet : '',
    cidr_ips : '',
    subnet_zone : '',
    server_tag : '',
    server : '',
    serverAMI : '',
    amiKeyPair : '',
    applnPortRangeFrom : 3000, 
    applnPortRangeTo : 3000,
    nodeJsSwCommand : '',
    jdkSwCommand : '',
    javaVersion : '',
    nodeJsVersion : '',
    environments : [],
    environmentAttribObjs : []
};


export const infrarequest_sample_dummy = {
    environmentAttribObjs:
        [],
    environments: ['dev'],
    nodeJsVersion: 'NodeJs9',
    javaVersion: 'Jdk11',
    jdkSwCommand: 'sudo apt-get install -y default-jre',
    nodeJsSwCommand: 'sleep 1',
    applnPortRangeTo: 3000,
    applnPortRangeFrom: 3000,
    amiKeyPair: 'vk-ubuntu-ec2pair',
    serverAMI: 'ami-05c1fa8df71875112',
    server: 't2.micro',
    server_tag: 'cpg-dev',
    subnet_zone: 'us-east-2b',
    cidr_ips: '10.0.0.0/16',
    subnet: 'cpg-vpc-1-subnet-1',
    vpc: 'cpg-vpc-1',
    region: 'us-east-2',
    environment: 'dev',
    provider: 'aws',
    orgAccount: 'ekdev',
    description: 'Corporate Projects',
    appCI: 'S.A.CPG',
    appName: 'CPG'
};
