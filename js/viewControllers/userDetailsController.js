define(['ko', 'swal', 'app', 'dataProvider'], (ko, swal, app, dataProvider) => {
  const controller = (user) => {
    const ViewModel = function () {
      const self = this;
      self.user = ko.observable();
      self.addToGroup = function () {
        // open groups preview
        app.openPage('add-to-group', user);
      };
      self.leaveGroup = function (group) {
        if (self.user().groups.length === 1) {
          swal({
            title: 'Operation Not Allowed',
            text: 'A user should be a memeber of at least one group',
            type: 'error'
          });
        } else {
          swal({
            title: 'Are you sure?',
            text: 'User will be removed from group',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes',
            closeOnConfirm: false
          }, () => {
            dataProvider.removeUserFromGroup(self.user().username, group.groupName)
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
        }
      };
      self.deleteUser = function () {
        swal({
          title: 'Are you sure?',
          text: 'User will be removed from the system',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Yes',
          closeOnConfirm: false
        }, () => {
          dataProvider.deleteUser(self.user().username)
            .done(() => {
              swal({
                title: 'Success',
                text: 'User deleted.',
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
    };

    const viewModel = new ViewModel();
    viewModel.user(user);

    // get data from dataProvider
    dataProvider.getUser(viewModel.user().username)
      .done((usr) => {
        viewModel.user(usr);
      })
      .fail((error) => {
        swal({
          title: 'error',
          text: error,
          type: 'error'
        });
      });
    // data binding
    const element = document.getElementById('user-details');
    ko.cleanNode(element);
    ko.applyBindings(viewModel, element);
  };

  return controller;
});
