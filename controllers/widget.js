// vars required to capture parent view and a blocker
// that covers the parent view to avoid clicks when menu is open
var parentView, blocker, slid;
var screenWidth =  Ti.Platform.displayCaps.platformWidth / (Ti.Platform.displayCaps.dpi / 160);


// initialise some settings based on OS / version
$.header.height = Ti.Platform.version.split(".")[0] == 7 ? 64 : 45;
$.title.top = Ti.Platform.version.split(".")[0] == 7 ? 30 : 12;
$.table.top = Ti.Platform.version.split(".")[0] == 7 ? 65 : 46;

// init - called from the parent controller passing
// the host view.
// 		args.parent
//		args.menuTitle
exports.init = function(args) {
	parentView = args.parent;
	$.title.text = args.menuTitle || $.title.text;
};

exports.setParent = function(controller){	
	parentView = controller;
};

// add a menu item with: -
//		args.icon = path to image
// 		args.title = text
//		args.onClick = callback on click

exports.addMenuItem = function(args) {
	var row = Ti.UI.createTableViewRow({
		backgroundSelectedColor : "#AAA",
		selectedBackgroundColor : "#AAA",
		height : 35,
		className : "menuItem"
	});

	var label = Ti.UI.createLabel({
		color : "#fff",
		left : 45,
		text : args.title,
		font : {
			fontSize : 15
		}
	});

	var icon = Ti.UI.createImageView({
		image : args.icon,
		left : 15,
		width : 20
	});

	row.add(icon);
	row.add(label);

	row.addEventListener("click", function() {
		if ( typeof args.onClick === "function") {
			args.onClick();
		}
	});

	$.table.appendRow(row);
};

// obvious!
exports.toggleMenu = function() {
	toggleMenu();
};

// click the title, closes menu, nice usability trick
// to avoid moving your finger / mouse to close the menu
$.title.addEventListener("click", toggleMenu);

// initially hidden on creation, let's change that and open it
$.getView().visible = true;
$.getView().open();

// function to open / close menu
function toggleMenu() {

	parentView.getView().applyProperties({
		width : screenWidth
	});

	if (slid) {

		parentView.getView().animate({
			left : 0,
			duration : 100,
		});

		slid = false;
		blocker.parent.remove(blocker);

	} else {
		blocker = Ti.UI.createView({
			top : 60,
			height : Ti.UI.FILL,
		});
		parentView.getView().animate({
			left : 200,
			duration : 100,
			//opacity : 0.7
		});
		slid = true;
		parentView.getView().add(blocker);
	}
}
