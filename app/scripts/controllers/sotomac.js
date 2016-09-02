'use strict';

angular.module('sbAdminApp')
.controller('SotomacCtrl', function ($scope, serviceAjax) {


  var loadCheques = function(){

    


    serviceAjax.sotomac().success(function(data){
         //   $scope.loading = true;
         $scope.cheques = data;
               // $scope.loading = false;


             });

  };

  $scope.removeItem = function(cheque){
    var index = $scope.cheques.indexOf(cheque);
    serviceAjax.removeCheque(cheque.numero).success(function(){
      if (index !== -1) {
        $scope.cheques.splice(index, 1);
      }
    });
  };
  loadCheques();

});