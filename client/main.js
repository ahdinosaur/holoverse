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
    data: function () { return Hives.findOne('0'); },
    waitOn: Meteor.subscribe('hives'),
    template: Template.hive_get
  });
  this.route('hive_get', {
    path: '/hives/:id',
    data: function () { return Hives.findOne(this.params.id) },
    waitOn: Meteor.subscribe('hives'),
    template: Template.hive_get
  });
});
