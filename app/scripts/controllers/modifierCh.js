angular.module('sbAdminApp')
.controller('modifierChCtrl', function ($scope,$state, $stateParams, serviceAjax) {
	var numero = $stateParams.numero;

	serviceAjax.detailCheque(numero).success(function(data){
		$scope.cheque = data;
		console.log(data);
	})
	$scope.save = function(item, event) {
        formData = $scope.cheque;

        serviceAjax.updateCheque(formData).success(function(data){
        	$state.go('dashboard.cheque')

        })
    };
});