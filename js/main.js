// requirejs configuration
requirejs.config({
  baseUrl: 'js',
  paths: {
    app: 'app',
    jquery: '../bower_components/jquery/dist/jquery.min',
    ko: '../bower_components/knockout/dist/knockout',
    swal: '../bower_components/sweetalert/dist/sweetalert.min',
    dataProvider: 'core/dataProvider',
    simulatedServer: 'simulatedServer/simulatedServer',
    Group: 'simulatedServer/model/Group',
    GroupUser: 'simulatedServer/model/GroupUser',
    User: 'simulatedServer/model/User',
    mockGenerator: 'simulatedServer/mocks/mockGenerator',
    userListViewController: 'viewControllers/userListViewController',
    userDetailsController: 'viewControllers/userDetailsController',
    addUserController: 'viewControllers/addUserController',
    addToGroupController: 'viewControllers/addToGroupController',
    groupListViewController: 'viewControllers/groupListViewController',
    groupDetailsController: 'viewControllers/groupDetailsController',
    aquireUserController: 'viewControllers/aquireUserController',
    addGroupController: 'viewControllers/addGroupController'
  }
});

require(['app'], (app) => {
  // app loaded
  console.debug(app);
});
