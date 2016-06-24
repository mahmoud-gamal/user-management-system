define(['User', 'Group', 'GroupUser'], (User, Group, GroupUser) => {
  const dbKey = 'com.internations.server';

  function getSimulatedDb() {
    return JSON.parse(localStorage.getItem(dbKey));
  }

  function Response(data, errorReason) {
    this.data = data;
    this.errorReason = errorReason;
  }

  const simulatedServer = {
    getUser(username) {
      const simulatedDb = getSimulatedDb();
      const user = simulatedDb.users.find(u => u.username === username);
      if (user) {
        // get user groups
        user.groups = this.getUserGroups(username).data;
      }
      return new Response(user);
    },
    getAllUsers() {
      const simulatedDb = getSimulatedDb();
      const users = [];
      for (let i = 0; i < simulatedDb.users.length; i++) {
        users.push(this.getUser(simulatedDb.users[i].username).data);
      }
      return new Response(users);
    },
    getUserGroups(username) {
      const simulatedDb = getSimulatedDb();
      const user = simulatedDb.users.find(u => u.username === username);
      if (user) {
        const groups = [];
        for (let i = 0; i < simulatedDb.groupsUsers.length; i++) {
          if (simulatedDb.groupsUsers[i].username === username) {
            groups.push(simulatedDb.groups.find(g => g.groupName === simulatedDb.groupsUsers[
              i].groupName));
          }
        }
        return new Response(groups);
      }
      return new Response(null, `no groups found for user: ${username}`);
    },
    addUser(username, role, groups) {
      const simulatedDb = getSimulatedDb();
      let response = null;
      // check if user exists
      if (simulatedDb.users.find(u => u.username === username)) {
        response = new Response(null, `user ${username} already exists`);
      } else {
        simulatedDb.users.push(new User(username, role));
        for (let i = 0; i < groups.length; i++) {
          simulatedDb.groupsUsers.push(new GroupUser(username, groups[i]));
        }
        localStorage.setItem(dbKey, JSON.stringify(simulatedDb));
        response = new Response('success');
      }
      return response;
    },
    addUserToGroup(username, groupName) {
      const simulatedDb = getSimulatedDb();
      let response = null;
      // check is user is already in group
      const groups = this.getUserGroups(username).data;
      if (groups && groups.find(g => g.groupName === groupName)) {
        response = new Response(null,
          `user: ${username} is already a member of group: ${groupName}`);
      } else {
        simulatedDb.groupsUsers.push(new GroupUser(username, groupName));
        localStorage.setItem(dbKey, JSON.stringify(simulatedDb));
        response = new Response('success');
      }
      return response;
    },
    removeUserFromGroup(username, groupName) {
      const simulatedDb = getSimulatedDb();
      const user = simulatedDb.users.find(u => u.username === username);
      let response = null;
      if (user) {
        const userGroups = this.getUser(user.username).data.groups;
        if (userGroups && userGroups.length === 1) {
          response = new Response(null, `User: ${username} is only a memeber of group: ${groupName}, he must have at least one group`);
        } else {
          const guIndex = simulatedDb.groupsUsers.findIndex(gu => gu.username === username
            && gu.groupName === groupName);
          if (guIndex !== -1) {
            simulatedDb.groupsUsers.splice(guIndex, 1);
            localStorage.setItem(dbKey, JSON.stringify(simulatedDb));
            response = new Response('success');
          } else {
            // user is not a member of the group
            response = new Response(null,
              `user: ${username} is not a member of group: ${groupName}`);
          }
        }
      } else {
        response = new Response(null, `user: ${username} does not exist`);
      }
      return response;
    },
    deleteUser(username) {
      const simulatedDb = getSimulatedDb();
      const index = simulatedDb.users.findIndex(u => u.username === username);
      let response = new Response(null, `user: ${username} does not exist`);
      if (index !== -1) {
        // delete from all groups
        let guIndex = simulatedDb.groupsUsers.findIndex(gu => gu.username === username);
        while (guIndex !== -1) {
          simulatedDb.groupsUsers.splice(guIndex, 1);
          guIndex = simulatedDb.groupsUsers.findIndex(gu => gu.username === username);
        }
        // delete user
        simulatedDb.users.splice(index, 1);
        localStorage.setItem(dbKey, JSON.stringify(simulatedDb));
        response = new Response('success');
      }
      return response;
    },
    getAllGroups() {
      const simulatedDb = getSimulatedDb();
      const groups = [];
      for (let i = 0; i < simulatedDb.groups.length; i++) {
        groups.push(this.getGroup(simulatedDb.groups[i].groupName).data);
      }
      return new Response(groups);
    },
    getGroup(groupName) {
      const simulatedDb = getSimulatedDb();
      const group = simulatedDb.groups.find(g => g.groupName === groupName);
      if (group) {
        // get group users
        group.users = this.getGroupUsers(groupName).data;
      }
      return new Response(group);
    },
    addGroup(groupName, description) {
      const simulatedDb = getSimulatedDb();
      let response = new Response(null, `group ${groupName} already exists`);
      // check if group exists
      if (!simulatedDb.groups.find(g => g.groupName === groupName)) {
        simulatedDb.groups.push(new Group(groupName, description));
        localStorage.setItem(dbKey, JSON.stringify(simulatedDb));
        response = new Response('success');
      }
      return response;
    },
    deleteGroup(groupName) {
      const simulatedDb = getSimulatedDb();
      const index = simulatedDb.groups.findIndex(g => g.groupName === groupName);
      let response = new Response(null, `group: ${groupName} does not exist`);
      if (index !== -1) {
        // make sure group has no users
        // const guIndex = simulatedDb.groupsUsers.findIndex(gu => gu.groupName === groupName);
        const groupUsers = this.getGroupUsers(groupName).data;
        if (!(groupUsers && groupUsers.length)) {
          simulatedDb.groups.splice(index, 1);
          localStorage.setItem(dbKey, JSON.stringify(simulatedDb));
          response = new Response('success');
        } else {
          // group is not empty
          response = new Response(null,
            `group: ${groupName} is not empty, please make sure its empty before trying to delete it`
          );
        }
      }
      return response;
    },
    getGroupUsers(groupName) {
      const simulatedDb = getSimulatedDb();
      const group = simulatedDb.groups.find(g => g.groupName === groupName);
      if (group) {
        const users = [];
        for (let i = 0; i < simulatedDb.groupsUsers.length; i++) {
          if (simulatedDb.groupsUsers[i].groupName === groupName) {
            users.push(simulatedDb.users.find(u => u.username === simulatedDb.groupsUsers[i].username));
          }
        }
        return new Response(users);
      }
      return new Response(null, `no group found with name: ${groupName}`);
    }
  };
  return simulatedServer;
});
