require("jest-localstorage-mock");

global.window.require = function() {
  return {
    ipcRenderer: {
      send: function() {
        // Fake sending message to ipcMain
      },
      on: function() {},
      removeAllListeners: function() {}
    },
    remote: {
      dialog: jest.fn()
    }
  };
};

global.window.alert = function() {};
