# Slidemenu for Alloy
## Overview
This is a widget for the [Appcelerator](http://www.appcelerator.com) [Alloy](http://projects.appcelerator.com/alloy/docs/Alloy-bootstrap/index.html) MVC framework which provides a slide out menu for both iOS and Android similar to those found in Android Apps.

This is an Alloy 1.3 / Titanium 3.2 only widget currently.

### NOTE: This is very much "work in progress" and I'm tweaking as I use this in current projects

![TabFonts](https://raw.github.com/jasonkneen/images/master/slidemenu/slidemenu.png)

## Quick Start
* [Download the latest version](https://github.com/jasonkneen/com.jasonkneen.slidemenu) of the widget as a ZIP file.
* Unzip the folder to your project under `app/widgets/com.jasonkneen.slidemenu`.
* Add the widget as a dependency to your `app/config.json` file:

```javascript
"dependencies": {
	"com.jasonkneen.slidemenu":"1.0"
}
```

* Ensure you have legacy support for lightweight windows in Ti 3.2
```xml
<property name="ti.android.useLegacyWindow" type="bool">true</property>
```

* Add the widget to your first / primary window (note added twice here for iOS and Android)

```xml
<Alloy>
	<TabGroup platform="ios">
		<Tab title="Home" icon="530-scooter.png" >
			<Require id="home" src="home" src="home">				
				<Widget id="slideMenu" src="com.jasonkneen.slidemenu"/>				
			</Require>

		</Tab>
		<Tab title="New" icon="533-helicopter.png">
			<Window class="container" title= "New">
				<Label id="label2">This will open a subwindow</Label>
			</Window>
		</Tab>
	</TabGroup>
	<Require id="home" platform="android" src="home">
		<Widget id="slideMenu" src="com.jasonkneen.slidemenu"/>
	</Require>
</Alloy>
```

* Configure the widget from the index.js file (current properties supported shown here)

```js
$.slideMenu.init({
	parent : OS_IOS ? $ : $.home, // note in iOS we're attached to the Tabgroup, in Android the Window
	menuTitle : "My Menu"
});

// Add menu items as follows, each one containing it's callback

$.menu.addMenuItem({
	icon : "/530-scooter.png",
	title : "Scooter",
	onClick : function() {
		alert("You clicked Scooter");
	}
});

$.menu.addMenuItem({
	icon : "/533-helicopter.png",
	title : "Helicopter",
	onClick : function() {
		alert("You clicked Helicopter");
	}
});

// If you're opening a new main window, and want to have a button on that which will toggle
// the menu, then use the setParent method to reassign the window to be moved to the 
// current one

$.menu.setParent(controller) // make sure it's a controller!

// Finally, you can toggle the menu from your window using

$.menu.toggleMenu();
```
## License

<pre>
Copyright 2014 Jason Kneen

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
</pre>
