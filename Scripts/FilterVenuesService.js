angular.module('ActionDriveApp')
    .service('FilterVenuesService', [FilterVenuesService]);

function FilterVenuesService() {

    var FilterVenuesService = {};
    var distanceFromSpot = 0.0008;


    var _filterVenues = function (venues, travelSpots) {

        var filtered = {
            venues: [],
            spots: [],
            combination: []

        };

        for (var i = 0 ; i < venues.length; i++) {

            for (var j = 0 ; j < travelSpots.length; j++) {

                var latDif = venues[i].venue.location.lat - travelSpots[j].Latitude;
                var lngDif = venues[i].venue.location.lng - travelSpots[j].Longitude;
                if ((-distanceFromSpot < latDif && latDif < distanceFromSpot) && (-distanceFromSpot < lngDif && lngDif < distanceFromSpot)) {

                    if (filtered.venues.indexOf(venues[i]) == -1) {

                        var venueToAdd = { 'venue': venues[i], 'time': travelSpots[j].Timestamp, include: false, spotIndex: filtered.spots.indexOf(travelSpots[j]), tagged: travelSpots[j].Tagged };
                        filtered.venues.push(venueToAdd);
                        if (filtered.spots.indexOf(travelSpots[j]) == -1)
                            filtered.spots.push(travelSpots[j]);

                        filtered.combination.push({ venue: venues[i], spotIndex: filtered.spots.indexOf(travelSpots[j]), include: false });
                    }
                }
                else if (travelSpots[j].Tagged == true && i == 0) {

                    var _venue = { venue: { name: 'Tagged Location' } };
                    var venueToAdd = { 'venue': _venue, 'time': travelSpots[j].Timestamp, include: false, spotIndex: filtered.spots.indexOf(travelSpots[j]), tagged: travelSpots[j].Tagged };
                    if (filtered.venues.indexOf(venueToAdd) == -1) {

                        filtered.venues.push(venueToAdd);
                        filtered.combination.push({ venue: _venue, spotIndex: filtered.spots.indexOf(travelSpots[j]), include: false });
                    }
                }
            }
        }
        return filtered;
    }

    FilterVenuesService.FilterVenues = _filterVenues;

    return FilterVenuesService;
}