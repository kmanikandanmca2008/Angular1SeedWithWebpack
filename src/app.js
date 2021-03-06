import helloCtrl from "./hello/hello.ctrl";
import "style-loader!css-loader!sass-loader!../node_modules/angular-material/angular-material.scss";

import config from './config';
import leftCtrl from './sidenav/left.ctrl';
import aboutCtrl from './about/about.ctrl';
import homeCtrl from './home/home.ctrl';
import sidenavService from './sidenav/sidenav.service';


angular.module('app', [
  'ui.router',
  'ngMaterial',
  'oc.lazyLoad'
])
.config(config)
.service('sidenavService', sidenavService)
.component('hello', {
  template: require('./hello/hello.html'),
  controller: helloCtrl
})
.component('helloSide', {
  template: '<h1>helloSide</h1>',
})
.component('sideNav', {
  controller: leftCtrl,
  template: require('./sidenav/sidenav.html'),
})
.component('about', {
  controller: aboutCtrl,
  template: require('./about/about.html'),
})
.component('home', {
  controller: homeCtrl,
  template: require('./home/home.html'),
})
.component('two', {
  template: '<h1>two</h1>'
})
// .config(function($mdThemingProvider) {
//   $mdThemingProvider.disableTheming();
// })
;
