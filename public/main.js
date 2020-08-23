/* eslint-disable import/no-extraneous-dependencies */

/* ********** desabilitado advetencias porque no me gusta verlas **************** */
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "1";
/* ****************************************************************************** */
/* ************************** importando electron ******************************* */
const { app, BrowserWindow, Menu, screen } = require("electron");
/* *********************** Dependencias para Electron  ************************** */
const isDev = require("electron-is-dev");
const path = require("path");
const url = require("url");
// const server = require('../../backend/bin/www');
/* ************************** Eliminar electron ******************************* */
Menu.setApplicationMenu(null);
/* ****************************************************************************** */
/* ******************** Objetos Para iniciarlizar Ventanas ********************** */

/* ****************************************************************************** */
/* ************************* constantes para Url ******************************** */
const mainUrl = isDev
  ? "http://localhost:3000/"
  : url.format({
      pathname: path.join(__dirname, "../build/index.html"),
      hash: "/",
      protocol: "file",
      slashes: true
    });
/* ************************************************************************************ */
/* ******** funcion principal para la creacion de ventans y envots de estas *********** */
function createWindow() {
  /* ***** determina el alto y ancho de la pantala para usar pantalla completa ******** */
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  /* ********************************************************************************** */
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width,
    height,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js")
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(mainUrl);

  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
