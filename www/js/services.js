app.service("authenticationService",['$q', '$http', '$cookieStore', '$rootScope', '$timeout', '$base64' ,
    function($q, $http, $cookieStore, $rootScope, $timeout, $base64) {

        var service = {};
        service.updateCallingRates = updateCallingRates;
        service.monthlytraffic = monthlytraffic;
        service.monthlybill = monthlybill;
        service.commission = commission;
        service.rateSheet = rateSheet;
        service.getServices = getServices;

        return service;

        var deff;

        function getServices(data) {

            console.log("inside getservices");

            deff = $q.defer();

            $http.post('/getServices', data)
               .then(function (response) {

                   deff.resolve(response);

                }, function(err) {
                    
                    console.log(err);
                    deff.reject(err);
                }
            );

            return deff.promise;
        }

        function rateSheet(data) {

            console.log("inside ratesheet");

            deff = $q.defer();

            $http.post('/ratesheet', data)
               .then(function (response) {

                   deff.resolve(response);

                }, function(err) {
                    
                    console.log(err);
                    deff.reject(err);
                }
            );

            return deff.promise;
        }

        function commission(data) {

            console.log("inside monthly commission");

            deff = $q.defer();

            $http.post('/commission', data)
               .then(function (response) {

                   deff.resolve(response);

                }, function(err) {
                    
                    console.log(err);
                    deff.reject(err);
                }
            );

            return deff.promise;
        }

        function monthlybill(data) {

            console.log("inside monthly bill");

            deff = $q.defer();

            $http.post('/monthlybill', data)
               .then(function (response) {

                   deff.resolve(response);

                }, function(err) {
                    
                    console.log(err);
                    deff.reject(err);
                }
            );

            return deff.promise;
        }

        function monthlytraffic(data) {

            console.log("inside here");

            deff = $q.defer();

            $http.post('/monthlyTraffic', data)
               .then(function (response) {

                   deff.resolve(response);

                }, function(err) {
                    
                    console.log(err);
                    deff.reject(err);
                }
            );

            return deff.promise;
        }
 
        function updateCallingRates(link) {

            console.log("inside here");

            deff = $q.defer();

            $http.post('/callingRates', { link: link})
               .then(function (response) {

                   deff.resolve(response);

                }, function(err) {
                    
                    console.log(err);
                    deff.reject(err);
                }
            );

            return deff.promise;
        }
    }    
]);

app.filter('uptoTwo', function() {
    return function(input, scope) {
        if(input == undefined) return;
        return input.toFixed(2);
    }
});

app.filter('removeTime', function() {
    return function(input, scope) {
        return input.split("T")[0];
    }
});