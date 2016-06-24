define(['ko', 'swal', 'app', 'dataProvider'], (ko, swal, app, dataProvider) => {
  const controller = (user) => {
    const ViewModel = function () {
      const self = this;
      self.groups = ko.observableArray();
      self.currentFilter = ko.observable();
      self.filteredResults = ko.computed(() => {
        let results = null;
        if (!self.currentFilter()) {
          results = self.groups();
        } else {
          results = self.groups().filter(g => g.groupName.indexOf(self.currentFilter()) !==
            -1);
        }
        return results;
      });
      self.handleGroupSelected = function (group) {
        if (user.groups.findIndex(g => g.groupName === group.groupName) !== -1) {
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
      self.addGroup = function() {
        // open add group page
        app.openPage('add-group');
      };
    };
    const viewModel = new ViewModel();
    // get data from dataProvider
    dataProvider.getAllGroups()
      .done((groups) => {
        viewModel.groups(groups);
      })
      .fail((error) => {
        swal({
          title: 'error',
          text: error,
          type: 'error'
        });
      });

    // data binding
    const element = document.getElementById('group-list');
    ko.cleanNode(element);
    ko.applyBindings(viewModel, element);
  };
  return controller;
});
