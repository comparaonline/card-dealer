'use strict';

/* eslint no-native-reassign: 0 */
/* eslint no-global-assign: 0 */
/* eslint no-undef: 0 */
const appModulePath = require('app-module-path');
const bluebird = require('bluebird');

global.projectRoot = __dirname;
appModulePath.addPath(global.projectRoot);
Promise = bluebird;
