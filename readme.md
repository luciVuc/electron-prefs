# Electron-prefs

> *User preferences and configuration settings persistence feature for `Electron`-based apps.*

## Overview

As `Electron` doesn't provide a built-in mechanism to easily persist and retrieve user preferences and configuration settings, install and include the `electron-prefs` module in your `Electron` project and let it handle that for you, so you can focus on your app development.

You can use the `electron-prefs` module directly in both the main and renderer process.

All user preferences and configuration settings are stored locally in a JSON file and can be accessed using `app.getPath('userData')`.

## Installation

`npm install electron-prefs`

or

`npm install --save electron-prefs`

---

## Usage

```js

const electron = require("electron");
const ElectronPrefs = require('electron-prefs');
const prefs = new ElectronPrefs({
  fileName: "config.js",
  defaults: {
    window: {
      width: 600,
      height: 300
    }
  }
});

prefs.set('foo', 'bar');
console.log(prefs.get('foo'));
//=> bar

console.log(prefs.get("window"));
//=> { width: 600, height: 300 }

// use dot-notation to access nested properties
prefs.set('window.width', 700);
console.log(prefs.get("window"));
//=> { width: 700, height: 300 }
console.log(prefs.get('window.width'));
//=> 700

prefs.delete('foo');
console.log(prefs.get('foo'));
//=> undefined

```

---

## API

* ### ***Constructor:***

  ▸ **`new ElectronPrefs(mOptions)`**

  Creates an instance of `ElectronPrefs`.

  *Parameters:*

  |Type|Name|Description|
  |:---|:---|:----------|
  |`Object`|`mOptions`|A JSON-like object containing instance options|
  |`String`|`mOptions.fileName`|The name of the file where preferences are stored|
  |`String`|`mOptions.sFilePath`|The full path to the settings data file.|
  |`Object`|`mOptions.defaults`|A set of default settings and/or preferences|

  ---

* ### ***Properties:***

  |Type|Name|Description|Read-only|Static|
  |:---|:---|:---|:---|:---|
  |`Object`|**`defaults`**|The default values for this instance.|Yes|No|
  |`String`|**`path`**|The full path to the configuration data file.|Yes|No|
  |`Number`|**`size`**|he number of entries in the settings file (same as `length`).|Yes|No|
  |`Number`|**`length`**|he number of entries in the settings file (same as `size`).|Yes|No|
  |`Function`|**`superClass`**|Returns a reference to the super class.|Yes|Yes|

  ---

* ### ***Methods:***

  ▸ **`ElectronPrefs.superClass.parseDataFile(sFilePath, mDefaults)`**

    Reads the settings data file and returns its content as a `JSON` object.

    ***Parameters:***

    |Type|Name|Description|
    |:---|:---|:----------|
    |`String`|`sFilePath`|The full path to the settings data file.|
    |`Object`|`mDefaults`|A set of default values to return if it fails loading the settings data file.|

    ***Returns:*** `Object` - A `JSON`-like object containing the settings and user preferences iub the data file.

    ---

  ▸ **`ElectronPrefs.superClass.flattenObject(oObj, sSeparator)`**

    *Flattens* nested objects into a single-depth object. For example:

    `{ foo: 'bar', baz: { foo: 'bar' } }`

    will turn into:

    `{ foo: 'bar', 'baz.foo': 'bar' }`

    ***Parameters:***

    |Type|Name|Description|
    |:---|:---|:----------|
    |`Object`|`oObj`|The object (with nested objects) to *flatten*.|
    |`String`|`sSeparator`|A string to use as separator between the keys. By default, the separator is `.` (dot).|

    ***Returns:*** `Object` - The *flatten* object.

    ---

  ▸ **`ElectronPrefs.prototype.clear()`**

    Removes all the settings in the settings list.

    ***Parameters:*** None

    ***Returns:*** `ElectronPrefs` - Self-reference for method chaining calls.

    ---

  ▸ **`ElectronPrefs.prototype.delete(sKey)`**

    Removes the specified settings item from the settings list.

    ***Parameters:***

    |Type|Name|Description|
    |:---|:---|:----------|
    |`String`|`sKey`|The settings item to remove.|

    ***Returns:*** `ElectronPrefs` - Self-reference for method chaining calls.

    ---

  ▸ **`ElectronPrefs.prototype.entries()`**

    Returns a array containing all the `[key, value]` pairs for each settings item in the settings list.

    ***Parameters:*** None

    ***Returns:*** `Array` - The `[key, value]` pairs array.

    ---

  ▸ **`ElectronPrefs.prototype.forEach(fCallback, thisArg)`**

    Executes the given function once for each `key-value` pair in the settings list.

    ***Parameters:***

    |Type|Name|Description|
    |:---|:---|:----------|
    |`Function`|`fCallback`|The function to execute for each `key-value` pair.|
    |`Object`|`thisArg`|The value of `this` when executing the callback function.|

    ***Returns:*** `ElectronPrefs` - Self-reference for method chaining calls.

    ---

  ▸ **`ElectronPrefs.prototype.has(sKey)`**

    Returns whether the settings list contains a settings item with the given key or not.

    ***Parameters:***

    |Type|Name|Description|
    |:---|:---|:----------|
    |`String`|`sKey`|The key to check the settings list for.|

    ***Returns:*** `Boolean` - `true` if the settings list contains a settings item with given key, or `false` otherwise.

    ---

  ▸ **`ElectronPrefs.prototype.get(sKey)`**

    Gets the value of the settings item referenced by the given key in the settings list, or the whole list if no key is given.

    ***Parameters:***

    |Type|Name|Description|
    |:---|:---|:----------|
    |`String`|`sKey`|The key of a settings item in the settings list.|

    ***Returns:*** `any` - The value of the settings item referenced by the key in the settings list, or the whole list if no key is given.

    ---

  ▸ **`ElectronPrefs.prototype.set(sKey, sValue)`**

    Sets the given value as the value of the settings item referenced by the given key in the settings list.

    ***Parameters:***

    |Type|Name|Description|
    |:---|:---|:----------|
    |`String`|`sKey`|The key of a settings item in the settings list.|
    |`any`|`sValue`|The value to assign to the settings item referenced by the key in the settings list.|

    ***Returns:*** `ElectronPrefs` - Self-reference for method chaining calls.

    ---

  ▸ **`ElectronPrefs.prototype.keys()`**

    Returns the names of all enumerable settings and preferences of this object.

    ***Parameters:*** None

    ***Returns:*** `String[]` - The names of the enumerable settings and preferences.

    ---

  ▸ **`ElectronPrefs.prototype.values()`**

    Returns the names of all enumerable settings and preferences of this object.

    ***Parameters:*** None

    ***Returns:*** `String[]` - The values of the enumerable settings and preferences.

---

## Version

  1.0.7

---