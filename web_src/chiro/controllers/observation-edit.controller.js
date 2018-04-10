/*
 * Edition d'une observation associée à un site
 */
angular.module('baseObservations').controller('observationEditController', function($scope, $rootScope, $routeParams, $location, configServ, dataServ, userMessages){
    $scope._appName = $routeParams.appName;
    $scope.configUrl = 'config?app=' + $scope._appName + '&vue=visite&vue=form';
    if($routeParams.id){
        $scope.saveUrl = $scope._appName + '/visite/' + $routeParams.id;
        $scope.dataUrl = $scope._appName + '/visite/' + $routeParams.id;
        $scope.data = {};
    }
    else{
        $scope.saveUrl = $scope._appName + '/visite';
        $scope.data = {id_base_site: $routeParams.site_id};
    }

    var frDate = function(dte){
        try{
            return dte.getDate() + '/' + dte.getMonth() + '/' + dte.getFullYear();
        }
        catch(e){
            return dte.replace(/^(\w+)-(\w+)-(\w+).*/, '$3/$2/$1');
        }
    }

    $scope.$on('form:init', function(ev, data){
        if(data.visit_date){
            $scope.title = "Modification de la visite du " + frDate(data.visit_date);
            // breadcrumbs
        }
        else{
            $scope.title = 'Nouvelle visite';
        }
    });

    $scope.$on('form:cancel', function(ev, data){
        if(data.id_base_visit){
            $location.url($scope._appName + '/observation/' + data.id_base_visit);
        }
        else{
            $location.url($scope._appName + '/site/' + data.id_base_site);
        }
    });

    $scope.$on('form:create', function(ev, data){
        userMessages.infoMessage = "La visite n° " + data.id_base_visit + " du " + frDate(data.visit_date) + ' a été créée avec succès.';
        $location.url($scope._appName + '/observation/' + data.id_base_visit);
    });

    $scope.$on('form:update', function(ev, data){
        userMessages.infoMessage = "La visite n° " + data.id_base_visit + " du " + frDate(data.visit_date) + ' a été mise à jour avec succès.';
        $location.url($scope._appName + '/observation/' + data.id_base_visit);
    });

    $scope.$on('form:delete', function(ev, data){
        userMessages.infoMessage = "La viste n° " + data.id_base_visit + " du " + frDate(data.visit_date) + " a été supprimée.";
        dataServ.forceReload = true;
        $location.url($scope._appName + '/site/' + data.id_base_site);
    });
});

