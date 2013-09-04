
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

var hivesTree = function () {
  var getChildren = function (hive) {
    if (hive.children) {
      hive.children = hive.children.map(function (id) {
        return getChildren(Hives.findOne({ _id: id }));
      });
    }
    return hive
  };
  var hives = [];
  Hives.find({parent: null}).forEach(function (rootHive) {
    hives.push(getChildren(rootHive));
  });
  console.log(JSON.stringify(hives, null, 2));
  return hives;
}

Template.hive_all.rendered = function () {
  var diameter = 960,
      format = d3.format(",d");

  var pack = d3.layout.pack()
      .size([diameter - 4, diameter - 4])
      .value(function(d) { return 1 });//d.size; });

  var svg = d3.select("body").append("svg")
      .attr("width", diameter)
      .attr("height", diameter)
      .append("g")
      .attr("transform", "translate(2,2)");

  hivesTree().forEach(function (root) {
    var node = svg.datum(root).selectAll(".node")
        .data(pack.nodes)
        .enter().append("g")
        .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    node.append("title")
        .text(function(d) { return d.name + (d.children ? "" : ": " + format(d.size)); });

    node.append("circle")
        .attr("r", function(d) { return d.r; });

    node.filter(function(d) { console.log(d, d.children); return !d.children; }).append("text")
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .text(function(d) { return d.name.substring(0, d.r / 3); });
  });
  
  d3.select(self.frameElement).style("height", diameter + "px");
}