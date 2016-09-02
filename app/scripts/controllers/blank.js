var app = angular.module('sbAdminApp', ['ngDialog']);
 
app.controller('BlankCtrl', function ($scope, ngDialog) {
  $scope.openContactForm = function() {
    console.log("Ich bin da");
    ngDialog.openConfirm({template: 'views/pages/contact_us.html',
      scope: $scope //Pass the scope object if you need to access in the template
    }).then(
      function(value) {
$scope.bilel="bilel";
      },
      function(value) {
        //Cancel or do nothing
      }
    );
  };
});