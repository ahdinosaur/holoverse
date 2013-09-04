var expandChildren = function (hive) {
    if (hive.children) {
      hive.children = hive.children.map(function (id) {
        return expandChildren(Hives.findOne({ _id: id }));
      });
    }
    return hive
  };

var metaRootName = 'universe';

hivesTree = function (root) {
  var metaRoot = { name: metaRootName }
  if (root) {
    metaRoot.children = [expandChildren(root)];
  } else {
    metaRoot.children = Hives.find({parent: null}).map(expandChildren);
  }
  return metaRoot;
};

hivePacking = function (rootHive) {
  var diameter = 960,
      format = d3.format(",d");

  var pack = d3.layout.pack()
      .size([diameter - 4, diameter - 4])
      .value(function(d) { return 1 });//d.size; });

  var svg = d3.select("#circlePacking").append("svg")
      .attr("width", diameter)
      .attr("height", diameter)
      .append("g")
      .attr("transform", "translate(2,2)");

  var root = hivesTree(rootHive),
      node = svg.datum(root).selectAll(".node")
      .data(pack.nodes)
      .enter().append("g")
      .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("title")
      .text(function(d) { return d.name });

  node.append("circle")
      .attr("r", function(d) { return d.r; })
      .on("click", function(d) { if (d.name !== metaRootName) location.href = "/hives/" + d._id; });

  node.filter(function(d) { return !d.children; }).append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.name.substring(0, d.r / 3); });
  
  d3.select(self.frameElement).style("height", diameter + "px");
};