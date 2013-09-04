Meteor.startup(function () {
  // code to run on server at startup
  Hives.remove({});
  var mikey_id = Hives.insert({
    name: 'Mikey'
  });
  var daniel_id = Hives.insert({
    name: 'Daniel'
  });
  var ernest_id = Hives.insert({
    name: 'Ernest'
  });
  var peter_id = Hives.insert({
    name: 'Peter'
  });
  var cloyne_id = Hives.insert({
    name: 'Cloyne'
  });
  var davis_id = Hives.insert({
    name: 'Davis'
  });
  var bsc_id = Hives.insert({
    name: 'BSC'
  });
  Hives.update(mikey_id, {
    $set: { parent: [cloyne_id] }
  });
  Hives.update(daniel_id, {
    $set: { parent: [cloyne_id] }
  });
  Hives.update(ernest_id, {
    $set: { parent: [davis_id] }
  });
  Hives.update(peter_id, {
    $set: { parent: [davis_id] }
  });
  Hives.update(cloyne_id, {
    $set: { parent: [bsc_id], children: [mikey_id, daniel_id] }
  });
  Hives.update(davis_id, {
    $set: { parent: [bsc_id], children: [ernest_id, peter_id] }
  });
  Hives.update(bsc_id, {
    $set: { children: [cloyne_id, davis_id]}
  })
});

Meteor.publish('hives', function () {
  return Hives.find();
});
