define(['ko', 'swal', 'app', 'dataProvider'], (ko, swal, app, dataProvider) => {
  const controller = (group) => {
    const ViewModel = function () {
      const self = this;
      self.users = ko.observableArray();
      self.currentFilter = ko.observable();
      self.filteredResults = ko.computed(() => {
        let results = null;
        if (!self.currentFilter()) {
          results = self.users();
        } else {
          results = self.users().filter(u => u.username.indexOf(self.currentFilter()) !==
            -1);
        }
        return results;
      });
      self.handleUserSelected = function (user) {
        if (group.users.findIndex(u => u.username === user.username) !== -1) {
          swal({
            title: 'Operation Not Allowed',
            text: 'User is already a member of this group',
            type: 'error'
          });
        } else {
          dataProvider.addUserToGroup(user.username, group.groupName)
            .done(() => {
              swal({
                title: 'Success',
                text: 'User added to group.',
                type: 'success'
              }, () => {
                history.back();
              });
            })
            .fail((err) => {
              swal('Error', err, 'error');
            });
        }
      };
      self.addUser = function() {
        // open add user screen
        app.openPage('add-user');
      };
    };
    const viewModel = new ViewModel();
    // get data from dataProvider
    dataProvider.getAllUsers()
      .done((users) => {
        viewModel.users(users);
      })
      .fail((error) => {
        swal({
          title: 'error',
          text: error,
          type: 'error'
        });
      });

    // data binding
    const element = document.getElementById('user-list');
    ko.cleanNode(element);
    ko.applyBindings(viewModel, element);
  };
  return controller;
});
