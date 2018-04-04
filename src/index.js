const electron = require('electron');
const NodePrefs = require('node-prefs');

/**
 * @class ElectronPrefs
 */
class ElectronPrefs extends NodePrefs {
  /**
   * Creates an instance of `ElectronPrefs`.
   * @param  {Object} mOptions 
   * @param  {String} mOptions.fileName 
   * @param  {Object} mOptions.defaults 
   * @memberof ElectronPrefs
   */
  constructor(mOptions) {
    mOptions = mOptions && typeof mOptions === "object" ? mOptions : {};
    // The `renderer` process gets `app` instance via `remote`, whereas the `main` process gets it directly.
    // `app.getPath('userData')` will return a string of the user's app data directory path.
    mOptions.filePath = (electron.app || (electron.remote && electron.remote.app) || {
      getPath: () => {
        return process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + 'Library/Preferences' : '/var/local');
      }
    }).getPath('userData');
    mOptions.fileName = mOptions.fileName || "prefs";
    super(mOptions);
  }
}

// expose the class
module.exports = ElectronPrefs;