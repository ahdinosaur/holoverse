Template.holon_get.rendered = function () {
  return holonPacking(this.data.holon);
};

Template.holon_get.hasChildren = function () {
  return (this.holon.childrenIDs || []).length > 0;
};

Template.holon_get.listChildren = function () {
  return expandChildren(this.holon.childrenIDs || []);
};