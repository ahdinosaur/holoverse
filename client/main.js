Router.configure({
  layout: 'layout',
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading'
});

Router.map(function () {
  this.route('home', {
    path: '/'
  });
  this.route('hive_all', {
    path: '/hives',
    controller: HiveAllController
  });
});
