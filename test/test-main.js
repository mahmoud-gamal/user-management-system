var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
    allTestFiles.push(normalizedTestModule);
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base',
  paths: {
    app: 'js/app',
    ko: '../bower_components/knockout/dist/knockout',
    swal: '../bower_components/sweetalert/dist/sweetalert.min',
    dataProvider: 'js/core/dataProvider',
    simulatedServer: 'js/simulatedServer/simulatedServer',
    Group: 'js/simulatedServer/model/Group',
    GroupUser: 'js/simulatedServer/model/GroupUser',
    User: 'js/simulatedServer/model/User',
    mockGenerator: 'js/simulatedServer/mocks/mockGenerator',
    userListViewController: 'js/viewControllers/userListViewController',
    userDetailsController: 'js/viewControllers/userDetailsController',
    addUserController: 'js/viewControllers/addUserController',
    addToGroupController: 'js/viewControllers/addToGroupController',
    groupListViewController: 'js/viewControllers/groupListViewController',
    groupDetailsController: 'js/viewControllers/groupDetailsController',
    aquireUserController: 'js/viewControllers/aquireUserController',
    addGroupController: 'js/viewControllers/addGroupController'
  },
  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
