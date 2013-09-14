Router.configure({
  layout: 'layout',
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading',
  renderTemplates: {
    'navbar': {to: 'navbar'}
  }
});

Router.map(function () {
  this.route('home', {
    path: '/',
    data: function () {
      return {
        holon: Holons.findOne('0')
      };
    },
    waitOn: Meteor.subscribe('holons'),
    template: Template.holon_get
  });
  this.route('hive_all', {
    path: '/holons',
    data: function () {
      return {
        holon: Holons.findOne('0')
      };
    },
    waitOn: Meteor.subscribe('holons'),
    template: Template.holon_get
  });
  this.route('holon_get', {
    path: '/holons/:id',
    data: function () {
      return {
        holon: Holons.findOne(this.params.id)
      };
    },
    waitOn: Meteor.subscribe('holons'),
    template: Template.holon_get
  });
});
