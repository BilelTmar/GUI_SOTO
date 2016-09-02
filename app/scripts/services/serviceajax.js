'use strict';

/**
 * @ngdoc service
 * @name sbAdminApp.serviceAjax
 * @description
 * # serviceAjax
 * Factory in the sbAdminApp.
 */
 angular.module('sbAdminApp')
 .factory('serviceAjax', function serviceAjax($http) {

  return{
    sotomac: function(){
      return $http.get("http://localhost:8080/Cheque/query");
    },
    titulaireCheque: function(numero,titulaire){
            console.log(titulaire);
      return $http.get("http://localhost:8080/Cheque/"+numero+"/titulaire/"+titulaire);
    },
    sourceCheque: function(numero,source){
      return $http.get("http://localhost:8080/Cheque/"+numero+"/source/"+source);
    },
    destinationCheque: function(numero,destination){
      return $http.get("http://localhost:8080/Cheque/"+numero+"/destination/"+destination);
    },
    removeCheque: function(numero){
      return $http.delete("http://localhost:8080/Cheque/" + numero);
    },
    personne: function(){
      return $http.get("http://localhost:8080/Personne/query");
    },
    updateCheque: function(cheque){
      return $http.post("http://localhost:8080/Cheque", cheque);
    },
    ajouterCheque: function(cheque){
      return $http.post("http://localhost:8080/Cheque/save", cheque);
    },
    detailCheque: function(numero){
      return $http.get("http://localhost:8080/Cheque/numero/"+ numero);
    },
    rechecheChequeTitulaire: function(titulaire){
      return $http.get("http://localhost:8080/Cheque/titulaire/"+ titulaire);
    },
    rechecheChequeTitulaireDate: function(titulaire,date){
      return $http.get("http://localhost:8080/Cheque/titulaire/"+ titulaire+"/date/"+ date);
    },
    rechecheChequeTitulaireDebutFin: function(titulaire,debut,fin){
      return $http.get("http://localhost:8080/Cheque/titulaire/"+ titulaire+"/debut/"+ debut+"/fin/"+ fin);
    },
    rechecheChequeDebutFin: function(debut,fin){
      return $http.get("http://localhost:8080/Cheque/debut/"+ debut+"/fin/"+ fin);
    },
    rechecheChequeDate: function(date){
      return $http.get("http://localhost:8080/Cheque/date/"+ date);
    },
    ajouterPersonne: function(perso){
      return $http.post("http://localhost:8080/Personne/save", perso);
    }
  }
});
