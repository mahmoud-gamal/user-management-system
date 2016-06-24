define(['ko', 'swal', 'app', 'dataProvider'], (ko, swal, app, dataProvider) => {
  const controller = () => {
    const ViewModel = function () {
      const self = this;
      self.groups = ko.observableArray();
      self.currentFilter = ko.observable();
      self.filteredResults = ko.computed(() => {
        let results = null;
        if (!self.currentFilter()) {
          results = self.groups();
        } else {
          results = self.groups().filter(g => g.groupName.indexOf(self.currentFilter()) !== -1);
        }
        return results;
      });
      self.handleGroupSelected = function(group) {
        app.openPage('group-details', group);
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
