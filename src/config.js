function config($stateProvider, $locationProvider, $urlRouterProvider, $ocLazyLoadProvider) {
  const helloState = {
    name: 'hello',
    url: '/hello',
    views: {
      side: 'helloSide',
      content: 'hello',
    }
  };
  const homeState = {
    name: 'home',
    url: '/home',
    views: {
      
      content: 'home',
    }
  };

  const appState = {
    name: 'app',
    url: "/",
    redirectTo: 'hello'
  };
  const oneState = {
    name: 'about',
    url: '/about',
    lazyLoad: function determineDate() {
      return import('moment').then(function(moment) {
        console.log(moment().format());
      }).catch(function(err) {
        console.log('Failed to load moment', err);
      });
},
views: {
  side: 'helloSide',
    content: 'about',
      }
    };
const twoState = {
  name: 'two',
  url: '/two',
  views: {
    side: 'helloSide',
    content: 'two',
  }
};
const lazyState = {
  name: 'lazy.**',
  url: '/lazy',
  lazyLoad: (transition) => {
    console.log(transition);
    const $ocLazyLoad = transition.injector().get('$ocLazyLoad');
    return import('./lazy/lazy.module.js').then(function (module) {
      console.log(module);
      $ocLazyLoad.load({ name: 'lazy' });
    }).catch(function(err) {
      console.log('Failed to load module', err);
    });
    }
    // NOTE: old resolve method here for reference
    // resolve: {
    //   foo: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
    //      let deferred = $q.defer();
    //      require.ensure([], function () {
    //          let module = require('./lazy/lazy.module.js');
    //          $ocLazyLoad.load({
    //              name: 'lazy'
    //          });
    //          deferred.resolve(module);
    //      });
    //
    //      return deferred.promise;
    //   }]
    // }
  };
$stateProvider.state(helloState);
$stateProvider.state(appState);
$stateProvider.state(oneState);
$stateProvider.state(twoState);
$stateProvider.state(lazyState);
$stateProvider.state(homeState);
$locationProvider.html5Mode(true);
$urlRouterProvider.otherwise("/hello");
$ocLazyLoadProvider.config({ debug: true });
    // https://github.com/ui-router/sample-app-angularjs/blob/080cdc2cd16bca839de41fff2b5078b99628b71f/app/bootstrap/ngmodule.js
}
config.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];
export default config;
