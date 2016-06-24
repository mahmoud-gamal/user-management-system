define(['ko', 'swal', 'app', 'dataProvider'], (ko, swal, app, dataProvider) => {
  const controller = (group) => {
    const ViewModel = function () {
      const self = this;
      self.group = ko.observable();

      self.acquireUser = function () {
        // open groups preview
        app.openPage('acquire-user', self.group());
      };
      self.removeUserFromGroup = (user) => {
        swal({
          title: 'Are you sure?',
          text: 'User will be removed from group',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Yes',
          closeOnConfirm: false
        }, () => {
          dataProvider.removeUserFromGroup(user.username, self.group().groupName)
            .done(() => {
              swal({
                title: 'Success',
                text: 'User removed from group.',
                type: 'success'
              }, () => {
                history.back();
              });
            })
            .fail((err) => {
              swal('Error', err, 'error');
            });
        });
      };
      self.deleteGroup = function () {
        if (!(self.group().users && self.group().users.length)) {
          swal({
            title: 'Are you sure?',
            text: 'Group will be removed from the system',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes',
            closeOnConfirm: false
          }, () => {
            dataProvider.deleteGroup(self.group().groupName)
              .done(() => {
                swal({
                  title: 'Success',
                  text: 'Group deleted.',
                  type: 'success'
                }, () => {
                  history.back();
                });
              })
              .fail((err) => {
                swal('Error', err, 'error');
              });
          });
        } else {
          swal('Operation Not Allowed', 'Group is Not empty, make sure group has no users before deleting it', 'error');
        }
      };
    };

    const viewModel = new ViewModel();
    viewModel.group(group);

    // get data from dataProvider
    dataProvider.getGroup(viewModel.group().groupName)
      .done((_group) => {
        viewModel.group(_group);
      })
      .fail((error) => {
        swal({
          title: 'error',
          text: error,
          type: 'error'
        });
      });
    // data binding
    const element = document.getElementById('group-details');
    ko.cleanNode(element);
    ko.applyBindings(viewModel, element);
  };

  return controller;
});
