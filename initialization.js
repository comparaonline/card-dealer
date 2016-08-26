'use strict';

/* eslint no-native-reassign: 0 */
/* eslint no-undef: 0 */
const appModulePath = require('app-module-path');

global.projectRoot = __dirname;
appModulePath.addPath(global.projectRoot);
