/*
 angular-matrix-distance.js  AngularJS directive
 --------------------
 Description: AngularJS directive distance between two points in drive 
 Authors: Felipe Quiroga (Developer) & María del Mar Vives (CEO)
 Contact:
     web: www.okenit.com
     email: hola@okenit.com

 Copyrighted by Oken Innovation & Technology SL 
 License: LGPLv3 (http://www.gnu.org/licenses/lgpl.html)
 
*/

(function () {
    angular.module('angularMatrixDistance', [])
    .directive('matrixDistance', function () {
        return {
            restrict: 'E',
            template: '',
            link: function (scope, element, attrs) {
                var distance = new google.maps.DistanceMatrixService();

                var olat = parseFloat(attrs.originlat);
                var olng = parseFloat(attrs.originlng);
                var dlat = parseFloat(attrs.destinationlat);
                var dlng = parseFloat(attrs.destinationlng);

                var origin = new google.maps.LatLng(olat, olng);
                var destination = new google.maps.LatLng(dlat, dlng);

                distance.getDistanceMatrix({
                  origins: [origin],
                  destinations: [destination],
                  travelMode: google.maps.TravelMode.DRIVING,
                  avoidHighways: false,
                  avoidTolls: false
                }, 
                function (results, status) {
                    if (status == google.maps.DistanceMatrixStatus.OK) {
                        if (results.rows) {
                            element.text(results.rows[0].elements[0].distance.text);
                        } else {
                            element.text('Distance not found');
                        }
                    } else {
                        element.text('Distance Matrix failed due to: ' + status);
                    }
                });
            },
            replace: true
        }
    });
})();