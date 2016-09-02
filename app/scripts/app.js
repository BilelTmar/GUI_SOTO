'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
 angular
 .module('sbAdminApp', [
  'oc.lazyLoad',
  'ui.router',
  'ui.bootstrap',
  'angular-loading-bar',
  'ngSanitize',
  'ngWYSIWYG',
  'textAngular',
  'ngDialog',
  'jkuri.datepicker'
    ])
 .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {
  
  $ocLazyLoadProvider.config({
    debug:false,
    events:true,
  });

  $urlRouterProvider.otherwise('/dashboard/cheque');

  $stateProvider
  .state('dashboard', {
    url:'/dashboard',
    templateUrl: 'views/dashboard/main.html',
    resolve: {
      loadMyDirectives:function($ocLazyLoad){
        return $ocLazyLoad.load(
        {
          name:'sbAdminApp',
          files:[
          'scripts/directives/header/header.js',
          'scripts/directives/sidebar/sidebar.js',
          'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
          ]
        }),
        $ocLazyLoad.load(
        {
         name:'toggle-switch',
         files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
         "bower_components/angular-toggle-switch/angular-toggle-switch.css"
         ]
       }),
        $ocLazyLoad.load(
        {
          name:'ngAnimate',
          files:['bower_components/angular-animate/angular-animate.js']
        })
        $ocLazyLoad.load(
        {
          name:'ngCookies',
          files:['bower_components/angular-cookies/angular-cookies.js']
        })
        $ocLazyLoad.load(
        {
          name:'ngResource',
          files:['bower_components/angular-resource/angular-resource.js']
        })
        $ocLazyLoad.load(
        {
          name:'ngSanitize',
          files:['bower_components/angular-sanitize/angular-sanitize.js']
        })
        $ocLazyLoad.load(
        {
          name:'ngTouch',
          files:['bower_components/angular-touch/angular-touch.js']
        })
      }
    }
  })
  .state('dashboard.home',{
    url:'/home',
    controller: 'MainCtrl',
    templateUrl:'views/dashboard/home.html',
    resolve: {
      loadMyFiles:function($ocLazyLoad) {
        return $ocLazyLoad.load({
          name:'sbAdminApp',
          files:[
          'scripts/controllers/main.js'           

          ]
        })
      }
    }
  })
  .state('dashboard.sotomac',{
    templateUrl:'views/sotomac.html',
    url:'/form'
  })
  .state('dashboard.ajouterCh',{
    templateUrl:'views/pages/ajouterCh.html',
    controller:'AjouterChCtrl',
    url:'/ajouter/Cheque',
     resolve: {
      loadMyFiles:function($ocLazyLoad) {
        return $ocLazyLoad.load({
          name:'sbAdminApp',
          files:[
          'scripts/controllers/ajouterCh.js'           

          ]
        })
      }
    }
  })
  .state('dashboard.blank',{
    templateUrl:'views/pages/blank.html',
    url:'/blank',
     controller:'BlankCtrl',
     resolve: {
      loadMyFiles:function($ocLazyLoad) {
        return $ocLazyLoad.load({
          name:'sbAdminApp',
          files:[
          'scripts/controllers/blank.js'           

          ]
        })
      }
    }
    
  })
  .state('dashboard.rechercherCh',{
    templateUrl:'views/pages/rechercherCh.html',
    url:'/search',
    controller:'RechercheChCtrl',
     resolve: {
      loadMyFiles:function($ocLazyLoad) {
        return $ocLazyLoad.load({
          name:'sbAdminApp',
          files:[
          'scripts/controllers/rechercherCh.js'           

          ]
        })
      }
    }
  })

  .state('dashboard.modifierCh',{
    templateUrl:'views/pages/modifierCh.html',
    url:'/modifier/cheque/:numero',
    controller:'modifierChCtrl',
     resolve: {
      loadMyFiles:function($ocLazyLoad) {
        return $ocLazyLoad.load({
          name:'sbAdminApp',
          files:[
          'scripts/controllers/modifierCh.js'           

          ]
        })
      }
    }
    
  })
  .state('login',{
    templateUrl:'views/pages/login.html',
    url:'/login'
  })
  .state('dashboard.cheque',{
    templateUrl:'views/cheque.html',
    url:'/cheque',
    controller:'ChequeCtrl',
    resolve: {
      loadMyFiles:function($ocLazyLoad) {
        return $ocLazyLoad.load({
          name:'sbAdminApp',
          files:[
          'scripts/controllers/cheque.js'
          ]
        })
      }
    }
  })
}]);


