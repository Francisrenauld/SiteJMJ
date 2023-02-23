/* residentialsection */
var nbOccupant = 0;
var nbFloors = 0;
var nbBasements = 0;
var nbOccupantFloor = 0;
var total = 0;
var nbColumn = 0;
var nbAverageElevatorColumn = 0;
var nbElevator = 0;
var nbtotalElevators = 0;

$(document).ready(function () {

    $("#building-type").change(function () {

        if ($(this).val() == "residential") {
            $('#residentialoption').show();
            CalculateResidential();
        } else {
            $('#residentialoption').hide();
            $("#installationcost").val("");
            $("#elevatorprice").val("");
            $("#elevatorTotalCost").val("");
            $("#projectcost").val("");
            $("#numberelevator").val("");
            $("#elevatorTotalCost").val("");
            $("#numberelevator").val("")
        }
    });
    $("#building-type").trigger("change");

    /* corporatesection */

    $("#building-type").change(function () {

        if ($(this).val() == "corporate") {
            $('#corporateoption').show();
            CalculateCorporate();
        } else {
            $('#corporateoption').hide();
            $("#number-of-corporations").val('');
            $("#number-of-floors-cor").val('');
            $("#number-of-basements-cor").val('');
            $("#number-of-parking-spots-cor").val('');
            $("#maximum-occupancy-cor").val('');
            $("#installationcost").val("");
            $("#elevatorprice").val("");
            $("#elevatorTotalCost").val("");
            $("#projectcost").val("");
            $("#numberelevator").val("");
        }
    });
    $("#building-type").trigger("change");

    /* commercialsection */

    $("#building-type").change(function () {

        if ($(this).val() == "commercial") {
            $('#commercialoption').show();
            CalculateCommercial();
        } else {
            $('#commercialoption').hide();
            $("#installationcost").val("");
            $("#elevatorprice").val("");
            $("#elevatorTotalCost").val("");
            $("#projectcost").val("");
            $("#numberelevator").val("");
        }
    });
    $("#building-type").trigger("change");

    /* hybridsection */

    $("#building-type").change(function () {

        if ($(this).val() == "hybrid") {
            $('#hybridoption').show();
            CalculateHybrid();
        } else {
            $('#hybridoption').hide();
            $("#number-of-companies-hy").val('');
            $("#number-of-floors-hy").val('');
            $("#number-of-basements-hy").val('');
            $("#number-of-parking-spots-hy").val('');
            $("#maximum-occupancy-hy").val('');
            $("#business-hours-hy").val('');
            $("#installationcost").val("");
            $("#elevatorprice").val("");
            $("#elevatorTotalCost").val("");
            $("#projectcost").val("");
            $("#numberelevator").val("");
        }
    });
    $("#building-type").trigger("change");

    function CalculateResidential() {

        var averageAppartmentsFloor = 0;
        var nbAppartments = 0;
        var nbFloors = 0;
        var nbElevator = 0;
        var nbElevatorTot = 0;

        $("#residentialoption").on("keyup click blur change", function (e) {

            nbAppartments = parseInt($("#number-of-apartments").val());

            nbFloors = parseInt($("#number-of-floors").val());

            averageAppartmentsFloor = Math.ceil(nbAppartments / nbFloors);

            nbElevator = Math.ceil(averageAppartmentsFloor / 6);

            nbElevatorTot = Math.ceil(nbFloors / 20)

            nbElevatorTot *= nbElevator;

            nbElevatorTot = nbElevatorTot || 0

            CalculPrice(nbElevatorTot)

            $("#numberelevator").val(nbElevatorTot);

        });
    };

    function CalculateCommercial() {

        var nbElevator = 0;

        $("#number-of-elevators").on("keyup click blur change", function (e) {

            nbElevator = $("#number-of-elevators").val();

            nbElevator = nbElevator || 0

            CalculPrice(nbElevator)

            $("#numberelevator").val(nbElevator);

        });
    }

    function CalculateCorporate() {

        $("#maximum-occupancy-cor, #number-of-floors-cor, #number-of-basements-cor").on("keyup click blur change", function (e) {

            nbOccupant = parseInt($("#maximum-occupancy-cor").val());

            nbFloors = parseInt($("#number-of-floors-cor").val());

            nbBasements = parseInt($("#number-of-basements-cor").val());

            total = (nbFloors + nbBasements);

            nbOccupantFloor = nbOccupant * total;

            nbElevator = Math.ceil(nbOccupantFloor / 1000);

            nbColumn = Math.ceil(total / 20);

            nbAverageElevatorColumn = Math.ceil(nbElevator / nbColumn);

            nbtotalElevators = nbAverageElevatorColumn * nbColumn;

            nbtotalElevators = nbtotalElevators || 0

            CalculPrice(nbtotalElevators);

            $("#numberelevator").val(nbtotalElevators);
        });

    }

    function CalculateHybrid() {

        $("#maximum-occupancy-hy, #number-of-floors-hy, #number-of-basements-hy").on("keyup click blur change", function (e) {

            nbOccupant = parseInt($("#maximum-occupancy-hy").val());

            nbFloors = parseInt($("#number-of-floors-hy").val());

            nbBasements = parseInt($("#number-of-basements-hy").val());

            total = (nbFloors + nbBasements);

            nbOccupantFloor = nbOccupant * total;

            nbElevator = Math.ceil(nbOccupantFloor / 1000);

            nbColumn = Math.ceil(total / 20);

            nbAverageElevatorColumn = Math.ceil(nbElevator / nbColumn);

            nbtotalElevators = nbAverageElevatorColumn * nbColumn;

            nbtotalElevators = nbtotalElevators || 0

            CalculPrice(nbtotalElevators)

            $("#numberelevator").val(nbtotalElevators);
        });
    }

    function CalculPrice(nbElevator) {

        var installationPourcentage = 0;
        var installPrice = 0;
        var elevatorPriceUnit = 0;
        var elevatorTotPrice = 0;
        var bigTotal = 0;

        $("input[type=radio]").click(function () {

            if ($(this).val() == "standard") {

                installationPourcentage = 0.1;

                elevatorPriceUnit = 7565;

                elevatorTotPrice = elevatorPriceUnit * nbElevator;

                installPrice = elevatorTotPrice * installationPourcentage;

                bigTotal = installPrice + elevatorTotPrice;

                $("#installationcost").val(new Intl.NumberFormat('en-CA', {
                    style: 'currency',
                    currency: "CAD",
                }).format(installPrice));

                $("#elevatorprice").val(new Intl.NumberFormat('en-CA', {
                    style: 'currency',
                    currency: "CAD",
                }).format(elevatorPriceUnit));

                $("#elevatorTotalCost").val(new Intl.NumberFormat('en-CA', {
                    style: 'currency',
                    currency: "CAD",
                }).format(elevatorTotPrice));

                $("#projectcost").val(new Intl.NumberFormat('en-CA', {
                    style: 'currency',
                    currency: "CAD",
                }).format(bigTotal));

                $("#numberelevator").val(nbElevator);

            }
            if ($(this).val() == "premium") {

                installationPourcentage = 0.13;

                elevatorPriceUnit = 12345;

                elevatorTotPrice = elevatorPriceUnit * nbElevator;

                installPrice = elevatorTotPrice * installationPourcentage;

                bigTotal = installPrice + elevatorTotPrice;

                $("#installationcost").val(new Intl.NumberFormat('en-CA', {
                    style: 'currency',
                    currency: "CAD",
                }).format(installPrice));

                $("#elevatorprice").val(new Intl.NumberFormat('en-CA', {
                    style: 'currency',
                    currency: "CAD",
                }).format(elevatorPriceUnit));

                $("#elevatorTotalCost").val(new Intl.NumberFormat('en-CA', {
                    style: 'currency',
                    currency: "CAD",
                }).format(elevatorTotPrice));

                $("#projectcost").val(new Intl.NumberFormat('en-CA', {
                    style: 'currency',
                    currency: "CAD",
                }).format(bigTotal));

                $("#numberelevator").val(nbElevator);

            }
            if ($(this).val() == "excelium") {

                installationPourcentage = 0.16;

                elevatorPriceUnit = 15400;

                elevatorTotPrice = elevatorPriceUnit * nbElevator;

                installPrice = elevatorTotPrice * installationPourcentage;

                bigTotal = installPrice + elevatorTotPrice;

                $("#installationcost").val(new Intl.NumberFormat('en-CA', {
                    style: 'currency',
                    currency: "CAD",
                }).format(installPrice));

                $("#elevatorprice").val(new Intl.NumberFormat('en-CA', {
                    style: 'currency',
                    currency: "CAD",
                }).format(elevatorPriceUnit));

                $("#elevatorTotalCost").val(new Intl.NumberFormat('en-CA', {
                    style: 'currency',
                    currency: "CAD",
                }).format(elevatorTotPrice));

                $("#projectcost").val(new Intl.NumberFormat('en-CA', {
                    style: 'currency',
                    currency: "CAD",
                }).format(bigTotal));

                $("#numberelevator").val(nbElevator);

            }
        });
    }
});