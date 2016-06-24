define(['ko', 'swal', 'app', 'dataProvider'], (ko, swal, app, dataProvider) => {
  const controller = () => {
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
        app.openPage('user-details', user);
      };
      // self.deleteUser = function(user) {};
      self.addUser = function () {
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
