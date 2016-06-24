define(['User', 'Group', 'GroupUser'], (User, Group, GroupUser) => {
  const generateMockData = function () {
    // if cache exists, don't regenerate
    if (localStorage.getItem('com.internations.server')) return;
    const users = [];
    users.push(new User('mahmoud_gamal', 'senior front-end developer'));
    users.push(new User('addam_terlson', 'lead front-end developer'));
    users.push(new User('szimonetta_kiss', 'HR recruiter'));

    const groups = [];
    groups.push(new Group('developers', 'All Developers'));
    groups.push(new Group('team-leads', 'All Team Leads'));
    groups.push(new Group('hr', 'All Human Resources'));

    const groupsUsers = [];
    groupsUsers.push(new GroupUser('mahmoud_gamal', 'developers'));
    groupsUsers.push(new GroupUser('addam_terlson', 'developers'));
    groupsUsers.push(new GroupUser('addam_terlson', 'team-leads'));
    groupsUsers.push(new GroupUser('szimonetta_kiss', 'hr'));

    const appMockData = {
      users,
      groups,
      groupsUsers
    };
    localStorage.setItem('com.internations.server', JSON.stringify(appMockData));
  };
  return generateMockData;
});
