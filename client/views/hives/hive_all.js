
HiveAllController = RouteController.extend({
  template: 'hive_all',
  waitOn: function () {
    return Meteor.subscribe('hives');
  },
  data: function () {
    return {
      hives: Hives.find()
    };
  },
  run: function () {
    this.render('hive_all');
  }
});

Template.hive_all.rendered = hivePacking;