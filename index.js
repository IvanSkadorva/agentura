/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import './localization/i18n';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
