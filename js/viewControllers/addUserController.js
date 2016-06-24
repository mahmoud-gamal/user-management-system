define(['ko', 'swal', 'app', 'dataProvider'], (ko, swal, app, dataProvider) => {
  const controller = () => {
    const ViewModel = function () {
      const self = this;
      self.groups = ko.observableArray();
      self.selectedGroups = ko.observableArray([]);
      self.username = ko.observable();
      self.role = ko.observable();
      self.addUser = function () {
        dataProvider.addUser(self.username(), self.role(), self.selectedGroups())
          .done(() => {
            swal({
              title: 'Success',
              text: 'User created succesfully.',
              type: 'success'
            }, () => {
              history.back();
            });
          })
          .fail((err) => {
            swal('Error', err, 'error');
          });
      };
      self.cancel = function() {
        history.back();
      };
    };
    const viewModel = new ViewModel();
    // get data from dataProvider
    dataProvider.getAllGroups()
      .done((groups) => {
        viewModel.groups(groups.map(g => g.groupName));
      })
      .fail((error) => {
        swal('Error', error, 'error');
      });

    // data binding
    const element = document.getElementById('add-user');
    ko.cleanNode(element);
    ko.applyBindings(viewModel, element);
  };
  return controller;
});
