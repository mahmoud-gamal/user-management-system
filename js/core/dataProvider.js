define(['jquery', 'app', 'simulatedServer'], ($, app, simulatedServer) => {
  const cacheKey = 'com.internations.client';

  function getClientCache() {
    const clientCache = JSON.parse(localStorage.getItem(cacheKey));
    return clientCache || {
      users: [],
      groups: []
    };
  }

  function handleWriteOperatonRequests(url, data, simulatedServerAction) {
    const deferred = $.Deferred();
    if (app.settings.simulatedOfflineMode) {
      deferred.reject('app is currently offline');
    } else if (app.settings.simulatedServerMode) {
      const response = simulatedServerAction();
      if (response.errorReason) {
        deferred.reject(response.errorReason);
      } else {
        deferred.resolve(response.data);
      }
    } else {
      // ajax request to add user
      $.post(url, data, (response => {
        if (response.errorReason) {
          deferred.reject(response.errorReason);
        } else {
          deferred.resolve(response.data);
        }
      }));
    }
    return deferred.promise();
  }

  const dataProvider = {
    getAllUsers() {
      const deferred = $.Deferred();
      const clientCache = getClientCache();
      if (app.settings.simulatedServerMode) {
        if (app.settings.simulatedOfflineMode) {
          // get data from cache
          const users = clientCache.users;
          if (users && users.length) {
            deferred.resolve(users);
          } else {
            deferred.reject('app is currently offline');
          }
        } else {
          const response = simulatedServer.getAllUsers();
          if (!response.errorReason) {
            // save to cache
            clientCache.users = response.data;
            localStorage.setItem(cacheKey, JSON.stringify(clientCache));
            deferred.resolve(response.data);
          } else {
            deferred.reject(response.errorReason);
          }
        }
      } else {
        // ajax request to get users
        $.post('/api/get_all_users', null, (response => {
          if (response.errorReason) {
            deferred.reject(response.errorReason);
          } else {
            // save to cache
            clientCache.users = response.data;
            localStorage.setItem(cacheKey, JSON.stringify(clientCache));
            deferred.resolve(response.data);
          }
        }));
      }
      return deferred.promise();
    },
    getUser(username) {
      const deferred = $.Deferred();
      if (app.settings.simulatedServerMode) {
        if (app.settings.simulatedOfflineMode) {
          // get data from cache
          const clientCache = getClientCache();
          const user = clientCache.users.find(u => u.username === username);
          if (user) {
            deferred.resolve(user);
          } else {
            deferred.reject('app is currently offline');
          }
        } else {
          const response = simulatedServer.getUser(username);
          if (!response.errorReason) {
            deferred.resolve(response.data);
          } else {
            deferred.reject(response.errorReason);
          }
        }
      } else {
        // ajax request to get users
        $.post('/api/get_user', {
          username
        }, (response => {
          if (response.errorReason) {
            deferred.reject(response.errorReason);
          } else {
            deferred.resolve(response.data);
          }
        }));
      }
      return deferred.promise();
    },
    addUser(username, role, groups) {
      return handleWriteOperatonRequests('/api/add_user', {
        username,
        role,
        groups
      }, () => simulatedServer.addUser(username, role, groups)
      );
    },
    addUserToGroup(username, groupName) {
      return handleWriteOperatonRequests('/api/add_user_to_group', {
        username,
        groupName
      }, () => simulatedServer.addUserToGroup(username, groupName));
    },
    removeUserFromGroup(username, groupName) {
      return handleWriteOperatonRequests('/api/remove_user_from_group', {
        username,
        groupName
      }, () => simulatedServer.removeUserFromGroup(username, groupName));
    },
    deleteUser(username) {
      return handleWriteOperatonRequests('delete_user', {
        username
      }, () => simulatedServer.deleteUser(username));
    },
    getAllGroups() {
      const deferred = $.Deferred();
      const clientCache = getClientCache();
      if (app.settings.simulatedServerMode) {
        if (app.settings.simulatedOfflineMode) {
          // get data from cache
          const groups = clientCache.groups;
          if (groups && groups.length) {
            deferred.resolve(groups);
          } else {
            deferred.reject('app is currently offline');
          }
        } else {
          const response = simulatedServer.getAllGroups();
          if (!response.errorReason) {
            // save to cache
            clientCache.groups = response.data;
            localStorage.setItem(cacheKey, JSON.stringify(clientCache));
            deferred.resolve(response.data);
          } else {
            deferred.reject(response.errorReason);
          }
        }
      } else {
        // ajax request to get users
        $.post('/api/get_all_groups', null)
          .done(response => {
            if (response.errorReason) {
              deferred.reject(response.errorReason);
            } else {
              // save to cache
              clientCache.groups = response.data;
              localStorage.setItem(cacheKey, JSON.stringify(clientCache));
              deferred.resolve(response.data);
            }
          })
          .fail((err) => {
            deferred.reject(err);
          });
      }
      return deferred.promise();
    },
    getGroup(groupName) {
      const deferred = $.Deferred();
      if (app.settings.simulatedServerMode) {
        if (app.settings.simulatedOfflineMode) {
          // get data from cache
          const clientCache = getClientCache();
          const group = clientCache.groups.find(g => g.groupName === groupName);
          if (group) {
            deferred.resolve(group);
          } else {
            deferred.reject('app is currently offline');
          }
        } else {
          const response = simulatedServer.getGroup(groupName);
          if (!response.errorReason) {
            deferred.resolve(response.data);
          } else {
            deferred.reject(response.errorReason);
          }
        }
      } else {
        // ajax request to get users
        $.post('/api/get_group', {
          groupName
        }, (response => {
          if (response.errorReason) {
            deferred.reject(response.errorReason);
          } else {
            deferred.resolve(response.data);
          }
        }));
      }
      return deferred.promise();
    },
    addGroup(groupName, description) {
      return handleWriteOperatonRequests('/api/add_group', {
        groupName,
        description
      }, () => simulatedServer.addGroup(groupName, description));
    },
    deleteGroup(groupName) {
      return handleWriteOperatonRequests('/api/delete_group', {
        groupName
      }, () => simulatedServer.deleteGroup(groupName));
    }
  };
  return dataProvider;
});
