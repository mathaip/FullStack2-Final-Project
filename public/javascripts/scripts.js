console.log('our app code goes here');


// Accessing Api and taking the user search value and appending api to search for that country
$("#search").click(function(e) {
    e.preventDefault();
    $('#display').empty();
    var searchValue = $("#searchbox").val();
    var searchValue1 = JSON.stringify(searchValue);
    fetch("https://restcountries-v1.p.rapidapi.com/name/" + searchValue, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
                "x-rapidapi-key": "9f24baf32fmshbb4ae565ad2c065p11499ajsn78a07e72d500"
            }
        })
        .then(function(response) {
            // console.log (response)
            return response.json();
        })
        .then(function(data) {
            displayJSON(data)
        })
});
// Handling JSON data that was returned and dynamically adding to webpage.
function displayJSON(data) {
    for (var i = 0; i < data.length; i++) {

        var countryName = data[i].name;
        var languages = data[i].languages;
        var capital = data[i].capital;
        if (capital == "") {
            var capital = countryName
        }
        var area = data[i].area + " million square kilometres";
        if (area < 100) {
            var area = data[i].area + " square kilometres ";
        } else if (area < 100000) {
            var area = data[i].area + " thousand square kilometres";

        }
        var population = "The population is " + data[i].population;
        var areaCode = data[i].callingCodes;
        var borders = data[i].borders
        if (borders == 0) {
            var borders = "nobody";
        }
        var currency = data[i].currencies;
        var region = data[i].region;
        var timeZone = data[i].timezones;
        var alternativeSpelling = data[i].altSpellings;


        var container = document.getElementById('contain');
        var pTag = document.createElement('p');

        pTag.innerHTML =
            "The languages in " + " " + countryName + " are " + languages + " . " + countryName + " is located in " + region + " . " +
            "<br>" + "The Capital of " + countryName + " is " + capital + " . " + " The area of " + countryName + " is " + area + " . " + population +
            "<br>" + "If you want to call " + countryName + " use the area code " + areaCode + "." + countryName + " borders " + borders + " and the timezone is " +
            "<br>" + timeZone + "." + "The alternative spellings for " + countryName + " are " + alternativeSpelling;
        var newTag = container.appendChild(pTag);
        newTag.clear();

    }
};