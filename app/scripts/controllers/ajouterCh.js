'use strict';

angular.module('sbAdminApp')

.controller('AjouterChCtrl', function ($scope, $state, ngDialog,serviceAjax) {

  $scope.openTitulaireForm = function() {
    console.log("Ich bin da");
    ngDialog.openConfirm({template: 'views/pages/titulaire.html',
      scope: $scope //Pass the scope object if you need to access in the template
    }).then(
    function(value) {

    },
    function(value) {
        //Cancel or do nothing
      }
      );
  };
  $scope.openSourceForm = function() {
    ngDialog.openConfirm({template: 'views/pages/source.html',
      scope: $scope //Pass the scope object if you need to access in the template
    }).then(
    function(value) {

    },
    function(value) {
        //Cancel or do nothing
      }
      );
  };
  $scope.openDestinationForm = function() {
    ngDialog.openConfirm({template: 'views/pages/destination.html',
      scope: $scope //Pass the scope object if you need to access in the template
    }).then(
    function(value) {

    },
    function(value) {
        //Cancel or do nothing
      }
      );
  };
  var loadPersonnes = function(){



    serviceAjax.personne().success(function(data){
         //   $scope.loading = true;
         $scope.personnes = data;


       });

  };

  $scope.removePersonne = function(personne){
    console.log(personne);

  }


  loadPersonnes();

  $scope.checkPersonne = function(personne){

    console.log(personne);
    $scope.titulaire=personne;
    ngDialog.closeAll();

  };
  $scope.checkSource = function(personne){

    console.log(personne);
    $scope.source=personne;
    ngDialog.closeAll();

  };
  $scope.checkDestination = function(personne){

    console.log(personne);
    $scope.destination=personne;
    ngDialog.closeAll();

  };

  $scope.ajouterTitulaire = function(perso){

    serviceAjax.ajouterPersonne(perso).success(function(data){
      $scope.titulaire=perso;
      loadPersonnes();
      ngDialog.closeAll();


    });
  };
  $scope.ajouterSource = function(perso){

    serviceAjax.ajouterPersonne(perso).success(function(data){
      $scope.source=perso;
      loadPersonnes();
      ngDialog.closeAll();


    });
  };
  $scope.ajouterDestination = function(perso){

    serviceAjax.ajouterPersonne(perso).success(function(data){
      $scope.destination=perso;
      loadPersonnes();
      ngDialog.closeAll();


    });


  };
  $scope.save = function(item, event) {

    serviceAjax.ajouterCheque($scope.cheque).success(function(data){
      serviceAjax.titulaireCheque($scope.cheque.numero,$scope.titulaire.nom).success(function(data){

        if (angular.isDefined($scope.source) && angular.isDefined($scope.destination)){
          serviceAjax.sourceCheque($scope.cheque.numero,$scope.source.nom).success(function(data){
            serviceAjax.destinationCheque($scope.cheque.numero,$scope.destination.nom).success(function(data){
             $state.go("dashboard.cheque");
           })
          })
        }
        if (angular.isDefined($scope.destination) && !angular.isDefined($scope.source)){
          serviceAjax.destinationCheque($scope.cheque.numero,$scope.destination.nom).success(function(data){
            $state.go("dashboard.cheque");
          })
        }
        if (!angular.isDefined($scope.destination) && angular.isDefined($scope.source)){
          serviceAjax.sourceCheque($scope.cheque.numero,$scope.source.nom).success(function(data){
            $state.go("dashboard.cheque");
          })
        }
        if (!angular.isDefined($scope.source) && !angular.isDefined($scope.destination)){
          $state.go("dashboard.cheque");
        };
      })
    })
  };

  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };





  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };


  $scope.popup2 = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
  {
    date: tomorrow,
    status: 'full'
  },
  {
    date: afterTomorrow,
    status: 'partially'
  }
  ];

  function getDayClass(data) {
    var date = data.date,
    mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }
});