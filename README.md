# holospace

meteor app intended to replace http://bsc.coop/

## [meteorite](http://oortcloud.github.com/meteorite/) packages

- bootstrap-3: http://getbootstrap.com/
- animate-css: http://daneden.me/animate/
- font-awesome: http://fortawesome.github.io/Font-Awesome/
- iron-router https://github.com/EventedMind/iron-router
- accounts-ui-bootstrap-dropdown
- accounts-password
- momentjs
- d3

## overall design

below is a description of the overall design for all the cooperative systems..

### holon

a holon is defined as either an individual person or group of holons

### proposal

a proposal is an action that is brought to a holon for discussion and possible implementation

### action

an action is a list of instructions that can be implemented by a holon

### inventory

inventory is a list of objects, either physical or virtual, that are controlled by a holon

### workshift

a workshift is an action that must be completed before, after, or between some times by a holon.

#### workshift "hours"

upon completion of workshift the respective holon receives an inventory item representing the "hours" spent working. on regular time intervals holons may have to transfer an amount of these "hours" to a parent holon.
