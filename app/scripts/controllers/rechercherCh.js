'use strict';

angular.module('sbAdminApp')
.filter('sumByKey', function () {
    return function (data, key) {
        if (typeof (data) === 'undefined' || typeof (key) === 'undefined') {
            return 0;
        }

        var sum = 0;
        for (var i = data.length - 1; i >= 0; i--) {
            sum += parseInt(data[i][key]);
        }

        return sum;
    };
})
.controller('RechercheChCtrl', function ($scope, $state, ngDialog,serviceAjax) {

  $scope.openTitulaireForm = function() {
    ngDialog.openConfirm({template: 'views/pages/titulaireSearch.html',
      scope: $scope //Pass the scope object if you need to access in the template
    }).then(
    function(value) {

    },
    function(value) {
        //Cancel or do nothing
      }
      );
  };
  $scope.checkPersonne = function(personne){

    console.log(personne);
    $scope.nom=personne.nom;
    ngDialog.closeAll();

  };
  $scope.chercher = function(){

    var nom = $scope.nom;
    var debut =$scope.debut;
    var fin = $scope.fin;
    if (nom != null && debut == null && fin == null){
    serviceAjax.rechecheChequeTitulaire(nom).success(function(data){
         //   $scope.loading = true;
         $scope.cheques = data;
         console.log(data);
               // $scope.loading = false;


             });
  };
      if (nom != null && debut != null && fin == null){
    serviceAjax.rechecheChequeTitulaireDate(nom,date).success(function(data){
         //   $scope.loading = true;
         $scope.cheques = data;
         console.log(data);
               // $scope.loading = false;


             });
  };
    if (nom != null && debut != null && fin != null){
    serviceAjax.rechecheChequeTitulaireDebutFin(nom,debut,fin).success(function(data){
         //   $scope.loading = true;
         $scope.cheques = data;
         console.log(data);
               // $scope.loading = false;


             });
     };
    if (nom == null && debut != null && fin == null){
    serviceAjax.rechecheChequeDate(debut).success(function(data){
         //   $scope.loading = true;
         $scope.cheques = data;
         console.log(data);
               // $scope.loading = false;


             });
  };
      if (nom == null && debut != null && fin != null){
    serviceAjax.rechecheChequeDebutFin(debut,fin).success(function(data){
         //   $scope.loading = true;
         $scope.cheques = data;
         console.log(data);
               // $scope.loading = false;


             });
  };
      if (nom == null && debut != null && fin == null){
    serviceAjax.rechecheChequeDate(debut).success(function(data){
         //   $scope.loading = true;
         $scope.cheques = data;
         console.log(data);
               // $scope.loading = false;


             });
  };
  if (nom == null && debut == null && fin != null){
    serviceAjax.rechecheChequeDate(fin).success(function(data){
         //   $scope.loading = true;
         $scope.cheques = data;
         console.log(data);
               // $scope.loading = false;


             });
  };
  };

  $scope.removeItem = function(cheque){
    console.log(cheque);
   
  }
var loadPersonnes = function(){



    serviceAjax.personne().success(function(data){
         //   $scope.loading = true;
         $scope.personnes = data;


       });

  };

  loadPersonnes();
$scope.getTotal = function(){
    var total = 0;
    for(var i = 0; i < $scope.cheques.length; i++){
        var cheque = $scope.cheques[i];
        total += cheque.montant;
    }
    return total;
}

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




  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };


  $scope.popup1 = {
    opened: false
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