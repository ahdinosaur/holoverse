Meteor.startup(function () {
  // code to run on server at startup
  Holons.remove({});

  var allID = Holons.insert({
    _id: '0',
    name: 'all'
  });

  var mikeyID = Holons.insert({
    name: 'Mikey'
  });
  var danielID = Holons.insert({
    name: 'Daniel'
  });
  var katieID = Holons.insert({
    name: 'Katie'
  });
  var ernestID = Holons.insert({
    name: 'Ernest'
  });
  var peterID = Holons.insert({
    name: 'Peter'
  });
  var cloyneID = Holons.insert({
    name: 'Cloyne'
  });
  var davisID = Holons.insert({
    name: 'Davis'
  });
  var bscID = Holons.insert({
    name: 'BSC'
  });
  Holons.update(mikeyID, {
    $set: { parentIDs: [cloyneID] }
  });
  Holons.update(danielID, {
    $set: { parentIDs: [cloyneID] }
  });
  Holons.update(katieID, {
    $set: { parentIDs: [cloyneID] }
  });
  Holons.update(ernestID, {
    $set: { parentIDs: [davisID] }
  });
  Holons.update(peterID, {
    $set: { parentIDs: [davisID] }
  });
  Holons.update(cloyneID, {
    $set: { parentIDs: [bscID], childrenIDs: [mikeyID, danielID, katieID] }
  });
  Holons.update(davisID, {
    $set: { parentIDs: [bscID], childrenIDs: [ernestID, peterID] }
  });
  Holons.update(bscID, {
    $set: { parentIDs: [allID], childrenIDs: [cloyneID, davisID]}
  });

  var recohoID = Holons.insert({
    name: 'Red Region Co-Housing'
  });
  var cvcohoID = Holons.insert({
    name: 'Cityville Co-Housing'
  });
  var hhcohoID = Holons.insert({
    name: 'Happy Hills Co-Housing'
  });
  var lucianID = Holons.insert({
    name: 'Lucian'
  });
  var samaraID = Holons.insert({
    name: 'Sumara'
  });
  var caitlinID = Holons.insert({
    name: 'Caitlin'
  });
  var benedictID = Holons.insert({
    name: 'Benedict'
  });
  var keatonID = Holons.insert({
    name: 'Keaton'
  })
  Holons.update(recohoID, {
    $set: { parentIDs: [allID], childrenIDs: [cvcohoID, hhcohoID]}
  });
  Holons.update(cvcohoID, {
    $set: { parentIDs: [recohoID], childrenIDs: [lucianID, caitlinID, keatonID]}
  });
  Holons.update(hhcohoID, {
    $set: { parentIDs: [recohoID], childrenIDs: [samaraID, benedictID] }
  });
  Holons.update(lucianID, {
    $set: { parentIDs: [cvcohoID] }
  });
  Holons.update(caitlinID, {
    $set: { parentIDs: [cvcohoID] }
  });
  Holons.update(keatonID, {
    $set: { parentIDs: [cvcohoID] }
  });
  Holons.update(samaraID, {
    $set: { parentIDs: [hhcohoID] }
  });
  Holons.update(benedictID, {
    $set: { parentIDs: [hhcohoID] }
  });

  Holons.update(allID, {
    $set: { childrenIDs: [bscID, recohoID] }
  });

  //console.log(process.env.MONGO_URL);
});

Meteor.publish('holons', function () {
  return Holons.find();
});
