export const sidemenus = [
    {
        menu_id : 1,
        menu_roles : ['ROLE_ADMIN', 'ROLE_USER'],
        menu_name : 'Create Infra Request',
        navigate_to : '/terraform/create'
    },
    {
        menu_id : 2,
        menu_roles : ['ROLE_ADMIN', 'ROLE_USER'],
        menu_name : 'Review Infra Request',
        navigate_to : '/terraform/review'
    },
    {
        menu_id : 3,
        menu_roles : ['ROLE_ADMIN'],
        menu_name : 'Approve Infra Request',
        navigate_to : '/terraform/approve'
    }
];
