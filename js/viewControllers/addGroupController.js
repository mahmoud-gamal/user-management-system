define(['ko', 'swal', 'app', 'dataProvider'], (ko, swal, app, dataProvider) => {
  const controller = () => {
    const ViewModel = function () {
      const self = this;
      self.groupName = ko.observable();
      self.description = ko.observable();
      self.addGroup = function () {
        dataProvider.addGroup(self.groupName(), self.description())
          .done(() => {
            swal({
              title: 'Success',
              text: 'Group created succesfully.',
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

    // data binding
    const element = document.getElementById('add-group');
    ko.cleanNode(element);
    ko.applyBindings(viewModel, element);
  };
  return controller;
});
