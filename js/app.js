define(['jquery', 'mockGenerator'], ($, mockGenerator) => {
  /*
  Toggle between adding and removing the "responsive" class to topnav when the
  user clicks on the icon
  */
  window.toggleMenuButton = function () {
    $('.menu-container').toggleClass('responsive');
    $('.topnav').toggleClass('responsive');
    $('.menu-icon').toggleClass('change');
  };

  $(document).ready(() => {
    $('.topnav').on('click', () => {
      window.toggleMenuButton();
    });
  });

  // custom hash navigation
  const routes = {
    'default': 'users',
    'users': {
      path: './views/users-list.html',
      controller: 'userListViewController'
    },
    'user-details': {
      path: './views/user-details.html',
      controller: 'userDetailsController'
    },
    'add-user': {
      path: './views/add-user.html',
      controller: 'addUserController'
    },
    'groups': {
      path: './views/groups-list.html',
      controller: 'groupListViewController'
    },
    'group-details': {
      path: './views/group-details.html',
      controller: 'groupDetailsController'
    },
    'add-to-group': {
      path: './views/groups-list.html',
      controller: 'addToGroupController'
    },
    'acquire-user': {
      path: './views/users-list.html',
      controller: 'aquireUserController'
    },
    'add-group': {
      path: './views/add-group.html',
      controller: 'addGroupController'
    },
    'about': {
      path: './views/about.html'
    }

  };
  const parameterService = {};
  function navigateToPage(page) {
    const route = routes[page];
    if (route) {
      $.get(route.path, null, (html => {
        $('#single-page-container').html(html);
        require([route.controller], (controller) => {
          controller(parameterService[page]);
        });
      }));
    } else {
      // alert('invalid page');
      // navigate to default
      navigateToPage(routes['default']);
    }
  }

  window.onhashchange = function () {
    const hash = location.hash;
    navigateToPage(hash ? hash.substring(1, hash.length) : null);
  };

  // default routing
  if (location.hash) {
    window.onhashchange();
  } else {
    // default: open users list
    navigateToPage(routes['default']);
  }

  const app = {
    settings: {
      generateMockInitialData: true,
      simulatedServerMode: true,
      simulatedOfflineMode: false
    },
    openPage(path, data) {
      parameterService[path] = data;
      location.hash = `#${path}`;
    }
  };
  if (app.settings.generateMockInitialData) {
    mockGenerator();
  }
  return app;
});
