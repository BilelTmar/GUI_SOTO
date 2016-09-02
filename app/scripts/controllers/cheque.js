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
.controller('ChequeCtrl', function ($scope, serviceAjax) {


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
$scope.getTotal = function(){
    var total = 0;
    for(var i = 0; i < $scope.cheques.length; i++){
        var cheque = $scope.cheques[i];
        total += cheque.montant;
    }
    return total;
}
});