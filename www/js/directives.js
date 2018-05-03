'use strict'

app.directive('aTemplate', function(){
    return {
        template: '<div class="anime" ng-include="getTemplateUrl()"></div>',
        replace: true,
        link: function(scope, element, attrs) {
        }

    }
});

app.animation('.anime', function() {
  var getScope = function(e) {
    return angular.element(e).scope();
  };
  return {
    enter : function(element, done) {
        var scope = getScope(element);
        scope.animNumber = (scope.animNumber) ? scope.animNumber : 45;
        $('.effect_' + scope.animNumber).trigger('click');
        return false;
    }
  };
});

app.directive('material', function() {
  return {
    // A = attribute, E = Element, C = Class and M = HTML Comment
    restrict:'A',
    link: function(scope, element, attrs) {
      $.material.init();
    }
  };
});

app.directive('initNav', function() {
  return {
    // A = attribute, E = Element, C = Class and M = HTML Comment
    restrict:'A',
    link: function(scope, element, attrs) {
      setTimeout(function() {
        new gnMenu( document.getElementById( 'gn-menu' ));  
      }, 10);
    }
  };
});