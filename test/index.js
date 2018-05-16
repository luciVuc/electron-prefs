/* eslint no-undef: off */
const assert = require("assert");
const NodePrefs = require("node-prefs");

describe("ElectronPrefs testing", () => {
  const ElectronPrefs = require("../src/index");
  let prefs = new ElectronPrefs({
    fileName: "config.js",
    defaults: {
      window: {
        width: 600,
        height: 300
      }
    }
  });

  it("init", () => {
    assert.ok(typeof ElectronPrefs === "function" && ElectronPrefs.name === "ElectronPrefs");
    assert.ok(prefs instanceof ElectronPrefs);
  });

  it("has superClass", () => {
    assert.ok(ElectronPrefs.superClass === NodePrefs);
  });

  it("sets a new property", () => {
    assert.ok(prefs.get("foo") === undefined);
    prefs.set("foo", "bar");
    assert.ok(prefs.get("foo") === "bar");
  });

  it("flattens default nested object", () => {
    let mObj = prefs.get("window");
    assert.ok(typeof mObj === "object" && mObj.width === 600 && mObj.height === 300);
    assert.ok(prefs.get("window.width") === 600);
    assert.ok(prefs.get("window.height") === 300);
  });

  it("gets all settings", () => {
    let mObj = prefs.get();
    assert.ok(typeof mObj === "object" && mObj.foo === "bar" && mObj["window.width"] === 600 && mObj["window.height"] === 300);
  });

  it("sets new value to existing settings", () => {
    assert.ok(prefs.get("window.width") === 600);
    prefs.set("window.width", 700);
    assert.ok(prefs.get("window.width") === 700);
  });

  it("gets the requested item", () => {
    assert.ok(prefs.get("window.width") === 700);
    assert.ok(prefs.get("window.height") === 300);
    assert.ok(prefs.get("foo") === "bar");
    assert.ok(prefs.get("foo.") === undefined);
    assert.ok(prefs.get("bar") === undefined);
    let mObj = prefs.get("window");
    assert.ok(typeof mObj === "object" && mObj.width === 700 && mObj.height === 300);
  });

  it("deletes a value from existing settings", () => {
    assert.ok(prefs.get("foo") === "bar");
    prefs.delete("foo");
    assert.ok(prefs.get("foo") === undefined);
    let mObj = prefs.get();
    assert.ok(typeof mObj === "object" && mObj.foo === undefined && mObj["window.width"] === 700 && mObj["window.height"] === 300);
  });

  it("has a settings item", () => {
    assert.ok(prefs.has("foo") === false);
    prefs.set("foo", "bar");
    assert.ok(prefs.has("foo") === true);
    assert.ok(prefs.get("foo") === "bar");
    let mObj = prefs.get();
    assert.ok(typeof mObj === "object" && mObj.foo === "bar" && mObj["window.width"] === 700 && mObj["window.height"] === 300);
  });

  it("entries", () => {
    let mObj = prefs.entries();
    assert.ok(mObj instanceof Array && mObj[0][0] === "window.width" && mObj[0][1] === 700 && mObj[1][0] === "window.height" && mObj[1][1] === 300 && mObj[2][0] === "foo" && mObj[2][1] === "bar");
  });

  it("forEach", () => {
    let mObj = [];
    assert.ok(mObj instanceof Array && mObj.length === 0);
    prefs.forEach((item) => {
      mObj.push(item);
    }, prefs);
    assert.ok(mObj instanceof Array && mObj[0][0] === "window.width" && mObj[0][1] === 700 && mObj[1][0] === "window.height" && mObj[1][1] === 300 && mObj[2][0] === "foo" && mObj[2][1] === "bar");
  });

  it("length and size match", () => {
    let mObj = prefs.entries();
    assert.ok(prefs.length === 3);
    assert.ok(prefs.size === 3);
    assert.ok(mObj instanceof Array && mObj[0][0] === "window.width" && mObj[0][1] === 700 && mObj[1][0] === "window.height" && mObj[1][1] === 300 && mObj[2][0] === "foo" && mObj[2][1] === "bar");
  });

  it("clears all", () => {
    let mObj = prefs.get();
    assert.ok(prefs.length === 3);
    assert.ok(prefs.size === 3);
    assert.ok(typeof mObj === "object" && mObj.foo === "bar" && mObj["window.width"] === 700 && mObj["window.height"] === 300);
    prefs.clear();
    mObj = prefs.get();
    assert.ok(typeof mObj === "object" && mObj.foo === undefined && mObj["window.width"] === undefined && mObj["window.height"] === undefined);
    assert.ok(prefs.length === 0);
    assert.ok(prefs.size === 0);
  });
});