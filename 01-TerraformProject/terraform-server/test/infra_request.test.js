const infrarequest = require('../lib/infra_request');
const { empty_environmentAttribs,
    empty_infrarequest,
    empty_envInfraObj } = require('./../lib/constants/empty_objs');

test('Create - Infra Request', () => {
    // Input object type received from UI screen.
    const empty_infrarequest = {
        appName: 'cpg',
        appCI: 's.a.cpg',
        description: 'cpg description',
        orgAccount: 'vkdev',
        requestorId: 's417466',
        attachments: [],
        envInfraObjList: [
            {
                environment : '',
                provider : 'aws',
                cloud_region : 'us-east-2',
                vpc : 'test-vpc-1',
                subnet : 'test-subnet-1',
                cidr_ips : '10.0.0.0/16',
                subnet_zone : 'us-east-2b',
                server_tag : '',
                server : 'dumy',
                serverAMI : 'dumy',
                amiKeyPair : 'dumy',
                applnPortRangeFrom : 3000, 
                applnPortRangeTo : 3000,
                selectedSoftwares : ['Jdk', 'NodeJs'],
                selectedEnvironments: ['Dev', 'Test'],
                server_stack : 'ubuntu_ec2_micro'
            },
            {
                environment : '',
                provider : 'aws',
                cloud_region : 'us-east-3',
                vpc : 'test-vpc-2',
                subnet : 'test-subnet-2',
                cidr_ips : '10.0.0.0/16',
                subnet_zone : 'us-east-3b',
                server_tag : '',
                server : 'dumy',
                serverAMI : 'dumy',
                amiKeyPair : 'dumy',
                applnPortRangeFrom : 3000, 
                applnPortRangeTo : 3000,
                selectedSoftwares : ['Jboss', 'Tomcat'],
                selectedEnvironments: ['Stage'],
                server_stack : 'ubuntu_ec2_micro'
            }
        ], // submitted along with req submit. refers 'envInfraObj'
        envInfraObjListFrReview: [] // populated during review-mode 'review_req_row_attribute'
    };


    infrarequest.createRequest(null, null, empty_infrarequest);

});

test('Fetch - Infra Request', () => {

    let reviewObj = infrarequest.reviewRequest(null, null);

    console.log('Response = ', reviewObj);

    console.log(' ************************************ ');
    infrarequest.applyRequest(null, null, reviewObj);

});