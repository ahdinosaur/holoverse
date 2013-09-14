Handlebars.registerHelper('eachChild', function(holon, options) {
  return (holon.childrenIDs || []).map(function (id) {
    return options.fn(Holons.findOne({ _id: id }));
  }).join('\n');
});

Handlebars.registerHelper('eachParent', function(holon, options) {
  return (holon.parentIDs || []).map(function (parentId) {
    return options.fn(Holons.findOne({ _id: parentId }));
  }).join('\n');
});

Handlebars.registerHelper('eachSibling', function(holon, options) {
  var sofar = [],
      out = [];
  for (var i = 0; i < (holon.parentIDs || []).length; i++) {
    var siblings = Holons.find({ parentIDs: holon.parentIDs[i] }).forEach(function(sibling) {
      if (sofar.indexOf(siblings[j]) === -1) {
        out.push(options.fn(siblings[j]));
      }
    });
  }
  return out.join('\n');
});

expandChildren = function (holon) {
    if (holon.childrenIDs) {
      holon.children = holon.childrenIDs.map(function (id) {
        return expandChildren(Holons.findOne({ _id: id }));
      });
    }
    return holon;
  };

holonsTree = function (root) {
  if (root) {
    return expandChildren(root);
  } else {
    return expandChildren(Holons.findOne({_id: '0'}));
  }
};

holonPacking = function (rootHolon) {
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

  var root = holonsTree(rootHolon),
      node = svg.datum(root).selectAll(".node")
      .data(pack.nodes)
      .enter().append("g")
      .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("title")
      .text(function(d) { return d.name; });

  node.append("circle")
      .attr("r", function(d) { return d.r; })
      .on("click", function(d) { location.href = "/holons/" + d._id; });

  node.filter(function(d) { return !d.children; }).append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.name.substring(0, d.r / 3); });

  d3.select(self.frameElement).style("height", diameter + "px");
};