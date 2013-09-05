Meteor.startup(function () {
  // code to run on server at startup
  Hives.remove({});

  var allID = Hives.insert({
    _id: '0',
    name: 'all'
  });

  var mikeyID = Hives.insert({
    name: 'Mikey'
  });
  var danielID = Hives.insert({
    name: 'Daniel'
  });
  var ernestID = Hives.insert({
    name: 'Ernest'
  });
  var peterID = Hives.insert({
    name: 'Peter'
  });
  var cloyneID = Hives.insert({
    name: 'Cloyne'
  });
  var davisID = Hives.insert({
    name: 'Davis'
  });
  var bscID = Hives.insert({
    name: 'BSC'
  });
  Hives.update(mikeyID, {
    $set: { parent: [cloyneID] }
  });
  Hives.update(danielID, {
    $set: { parent: [cloyneID] }
  });
  Hives.update(ernestID, {
    $set: { parent: [davisID] }
  });
  Hives.update(peterID, {
    $set: { parent: [davisID] }
  });
  Hives.update(cloyneID, {
    $set: { parent: [bscID], children: [mikeyID, danielID] }
  });
  Hives.update(davisID, {
    $set: { parent: [bscID], children: [ernestID, peterID] }
  });
  Hives.update(bscID, {
    $set: { parent: [allID], children: [cloyneID, davisID]}
  })

  var recohoID = Hives.insert({
    name: 'Red Region Co-Housing'
  });
  var cvcohoID = Hives.insert({
    name: 'Cityville Co-Housing'
  });
  var hhcohoID = Hives.insert({
    name: 'Happy Hills Co-Housing'
  });
  var lucianID = Hives.insert({
    name: 'Lucian'
  });
  var samaraID = Hives.insert({
    name: 'Sumara'
  });
  var caitlinID = Hives.insert({
    name: 'Caitlin'
  });
  var benedictID = Hives.insert({
    name: 'Benedict'
  });
  var keatonID = Hives.insert({
    name: 'Keaton'
  })
  Hives.update(recohoID, {
    $set: { parent: [allID], children: [cvcohoID, hhcohoID]}
  });
  Hives.update(cvcohoID, {
    $set: { parent: [recohoID], children: [lucianID, caitlinID, keatonID]}
  });
  Hives.update(hhcohoID, {
    $set: { parent: [recohoID], children: [samaraID, benedictID] }
  });
  Hives.update(lucianID, {
    $set: { parent: [cvcohoID] }
  });
  Hives.update(caitlinID, {
    $set: { parent: [cvcohoID] }
  });
  Hives.update(keatonID, {
    $set: { parent: [cvcohoID] }
  });
  Hives.update(samaraID, {
    $set: { parent: [hhcohoID] }
  });
  Hives.update(benedictID, {
    $set: { parent: [hhcohoID] }
  });

  Hives.update(allID, {
    $set: { children: [bscID, recohoID] }
  });
});

Meteor.publish('hives', function () {
  return Hives.find();
});
