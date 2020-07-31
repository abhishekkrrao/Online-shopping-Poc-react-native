/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Navigator from '../pschedo/src/navigator/Navigator';
import {name as appName} from './app.json';
console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => Navigator);
