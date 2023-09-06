// Définissez d'abord la fonction onClickedEstimatePrice
function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("uiSqft").value;
    var housetypeElement = document.querySelector('input[name="housetype"]:checked');
    var housetype = housetypeElement ? housetypeElement.value : '0';
    var bed = document.getElementById("bed").value;
    var bath = document.getElementById("bath").value;
    var recpt = document.getElementById("recpt").value;
    var Area = document.getElementById("uiArea").value;
    var estPrice = document.getElementById("uiEstimatedPrice");

    // Vérifiez que toutes les variables sont définies et ont des valeurs valides
    if (
        sqft !== '' && !isNaN(sqft) &&
        bed !== '' && !isNaN(bed) &&
        bath !== '' && !isNaN(bath) &&
        recpt !== '' && !isNaN(recpt) &&
        Area !== ''
    ) {
        // Toutes les variables sont définies et ont des valeurs valides
        // Vous pouvez maintenant effectuer une requête POST pour obtenir le prix estimé
        $.post("http://127.0.0.1:5000/predict_home_price", {
            Area: Area,
            "house type": housetype,
            "area in sq ft": sqft,
            "no. of bedrooms": bed,
            "no. of bathrooms": bath,
            "no. of receptions": recpt
        }, function(data, status) {
            console.log(data.estimated_price);
            estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Pound</h2>";
            console.log(status);
        });
    } else {
        // Au moins une des variables n'est pas définie ou a une valeur invalide
        console.log("Erreur : Certaines variables ne sont pas définies ou ont des valeurs invalides.");
    }
}

// Ensuite, attachez la fonction au chargement du document
document.addEventListener("DOMContentLoaded", function() {
    // Appelez votre fonction onPageLoad ici si nécessaire

    // Sélectionnez l'élément du bouton et ajoutez un écouteur d'événement
    var estimateButton = document.querySelector(".submit");
    estimateButton.addEventListener("click", onClickedEstimatePrice);

    onPageLoad();

});


function onPageLoad() {
    console.log("document loaded");
    var url = "http://127.0.0.1:5000/get_area_names"; // Use this if you are NOT using nginx which is first 7 tutorials
    //var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
    $.get(url,function(data, _status) {
        console.log("got response for get_location_names request");
        if(data) {
            var Area = data.Area;
            var uiArea = document.getElementById("uiArea");
            $('#uiArea').empty();
            for(var i in Area) {
                var opt = new Option(Area[i]);
                $('#uiArea').append(opt);
            }
        }
    });
}
window.onload = onPageLoad;