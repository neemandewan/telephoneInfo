function mainCtrl($scope, $anchorScroll, $rootScope, $location, $interval, $window, $timeout, $sce, $compile, usSpinnerService, authenticationService) {
    console.log("mainCtrl");

    // Sub-templates for single page application
    $scope.templates = [
        { title: 'UPDATE DATA',                  content: "/templates/main/updateData.html"},
        { title: 'MONTHLY TRAFFIC',                  content: "/templates/main/monthlytraffic.html"},
        { title: 'GENERATE BILL',                  content: "/templates/main/generatebill.html"},
        { title: 'MONTHLY COMMISSION',                  content: "/templates/main/commission.html"},
        { title: 'RATE SHEET',                  content: "/templates/main/ratesheet.html"}
    ];

    $scope.callinglink = "";

    $scope.mt = {
        year: "",
        month: ""
    }

    $scope.gt = {
        tel: "",
        year: "",
        month: ""
    }

    $scope.rt = {
        serviceId: "",
        year: "",
        month: ""
    }

    // Main template is initialized here
    $scope.getTemplateUrl = function() {
        if ($scope.view == undefined && window.location.search == '') {

            $scope.view = '/templates/main/dashboard.html';
            $scope.template = $scope.templates[0];

        }

        return $scope.view;
    }

    // Side Navigation is initialized here
    $scope.sideNav = function() {
        var elementExists = function() {
            var screenElement = document.getElementsByClassName("gn-open-all");            
            if(screenElement != null){
                return true;
            }
            return false;
        }
        var elementData = elementExists();
        if(elementData == true) {
            $('.gn-icon-menu').removeClass('gn-selected');
            $('.gn-menu-wrapper').removeClass('gn-open-all');
        }
    }

    $scope.changePage = function(data) {
        if(data == 4) {
            authenticationService.getServices({"id": 4}).then(function(res) {
                console.log(res);

                $scope.services = res.data;

            },function(err) {
                console.log(err);
            });
        }
        $scope.template = $scope.templates[parseInt(data)];
        $scope.showMonthlyTraffic = false;
        $scope.showBill = false;
        $scope.showMonthlyCommission = false;
        $scope.showRateSheet = false;
    }

    $scope.updateCallingRates = function(data) {
        if(data == "") {
            alert("No data");
            return;
        }

        if(!data.includes(".xlsx")) {
            alert("Insert correct path");
            return;
        }

        authenticationService.updateCallingRates(data).then(function(res) {
            console.log(res);

            $scope.callinglink = "";

        },function(err) {
            console.log(err);
        });
    }

    $scope.generateMonthlyTraffic = function(data) {
        if(data == "") {
            alert("No data");
            return;
        }

        console.log(data);

        authenticationService.monthlytraffic(data).then(function(res) {
            console.log(res);

            $scope.mt = {
                year: "",
                month: ""
            }

            $scope.monthlyTraffic = res.data;
            $scope.showMonthlyTraffic = true;

        },function(err) {
            console.log(err);
        });
    }

    $scope.generateMonthlyCommission = function(data) {
        console.log(data);

        authenticationService.commission(data).then(function(res) {
            console.log(res);



            $scope.commissions = res.data;
            $scope.showMonthlyCommission = true;

        },function(err) {
            console.log(err);
        });
    }

    $scope.printDiv = function () {
        var printContents = document.getElementById("printDiv").innerHTML;
        //var originalContents = document.body.innerHTML;      

        if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
            var popupWin = window.open('', '_blank', 'width=600,height=600,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
            popupWin.window.focus();
            popupWin.document.write('<!DOCTYPE html><html><head>' +
                '<link rel="stylesheet" type="text/css" href="lib/bootstrap/dist/css/bootstrap.min.css"/>'+
                '<link rel="stylesheet" type="text/css" href="css/style.css"/>'+
                '</head>'+
                '<body onload="window.print()">'+
                    '<div class="reward-body">' + printContents + '</div>'+
                '</body>'+
                '</html>');
            popupWin.onbeforeunload = function (event) {
                popupWin.close();
                return '.\n';
            };
            popupWin.onabort = function (event) {
                popupWin.document.close();
                popupWin.close();
            }
        } else {
            var popupWin = window.open('', '_blank', 'width=800,height=600');
            popupWin.document.open();
            popupWin.document.write('<html><head>'+
                '<link rel="stylesheet" type="text/css" href="lib/bootstrap/dist/css/bootstrap.min.css"/>'+
                '<link rel="stylesheet" type="text/css" href="css/style.css"/>'+
                '</head><body onload="window.print()">' + printContents + 
                '</body></html>');
            popupWin.document.close();
        }
        popupWin.document.close();

        return true;
    }

    $scope.generatemonthlybill = function(data) {

        console.log(data);

        authenticationService.monthlybill(data).then(function(res) {
            console.log(res);

            $scope.gt = {
                tel: "",
                year: "",
                month: ""
            }

            $scope.customer = res.data.customer[0];
            $scope.customerBills = res.data.amt;

            var totalbills = res.data.amt;
            var sum = 0;
            for(var i=0; i< totalbills.length; i++) {
                sum += parseFloat(totalbills[i].totalAmt);
            }
            $scope.totalCustomerBill = sum;
            //$scope.customerAmt.totalAmt = $scope.customerAmt.totalAmt.toFixed(2);
            $scope.showBill = true;

        },function(err) {
            console.log(err);
        });
    }

    $scope.generateratesheet = function(data) {

        console.log(data);

        authenticationService.rateSheet(data).then(function(res) {
            console.log(res);

            $scope.rt = {
                serviceId: "",
                year: "",
                month: ""
            }

            $scope.ratesheets = res.data;

            $scope.showRateSheet = true;

        },function(err) {
            console.log(err);
        });
    }
}