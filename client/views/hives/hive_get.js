Template.hive_get.rendered = function () {
  return hivePacking(this.data);
};

Template.hive_get.hasChildren = function () {
  return (this.children || []).length > 0;
}