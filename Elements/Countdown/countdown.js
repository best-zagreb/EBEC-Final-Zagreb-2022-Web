
// const OpeningDay = new Date(2022, 06, 22, 10); // 22nd July 2022 at 10 am
const OpeningDay = new Date(2022, 00, 09, 20); // random testing date

var dateDifference, hoursLeft, minutesLeft, secondsLeft;
calculateTime();
var daysLeft = Math.floor(dateDifference / 24 / 60 / 60 / 1000);
if(daysLeft < 10)
    daysLeft = "0" + daysLeft;

function calculateTime(){
    dateDifference = OpeningDay - new Date();

    hoursLeft = Math.floor(dateDifference / 60 / 60 / 1000 % 24);
    if(hoursLeft < 10)
        hoursLeft = "0" + hoursLeft;
    minutesLeft = Math.floor(dateDifference / 60 / 1000 % 60);
    if(minutesLeft < 10)
        minutesLeft = "0" + minutesLeft;
    secondsLeft = Math.floor(dateDifference / 1000 % 60);
    if(secondsLeft < 10)
        secondsLeft = "0" + secondsLeft;
}


if(OpeningDay - new Date() < 0){ // event has started
    document.getElementById('timer').innerHTML = "00:00";
}else if(hoursLeft <= 0 && daysLeft <= 0){ // last hour

    document.getElementById('timer').innerHTML = minutesLeft + "m:" + secondsLeft + "s";

    // set interval to update element every 0.5 second
    setInterval(function(){
        calculateTime();

        // could be optimized by checking if the values differ, then update
        document.getElementById('timer').innerHTML = minutesLeft + "m:" + secondsLeft + "s";
    }, 1000 * 0.5);

}else if(daysLeft <= 0){ // last day

    document.getElementById('timer').innerHTML = hoursLeft + "h:" + minutesLeft + "m";

    // set interval to update element every 30 seconds
    setInterval(function(){
        calculateTime();

        // could be optimized by checking if the values differ, then update
        document.getElementById('timer').innerHTML = hoursLeft + "h:" + minutesLeft + "m";
    }, 1000 * 30);

}else if(daysLeft <= 10){ // last day
    if(daysLeft == 1)
        document.getElementById('timer').innerHTML = daysLeft + " Day, ";
    else
        document.getElementById('timer').innerHTML = daysLeft + " Days, ";

    if(hoursLeft == 1)
        document.getElementById('timer').innerHTML += hoursLeft + " Hour";
    else
        document.getElementById('timer').innerHTML += hoursLeft + " Hours";

    // set interval to update element every 30 minutes
    setInterval(function(){
        calculateTime();

        // could be optimized by checking if the values differ, then update    
        if(daysLeft == 1)
            document.getElementById('timer').innerHTML = daysLeft + " Day, ";
        else
            document.getElementById('timer').innerHTML = daysLeft + " Days, ";
    
        if(hoursLeft == 1)
            document.getElementById('timer').innerHTML += hoursLeft + " Hour";
        else
            document.getElementById('timer').innerHTML += hoursLeft + " Hours";
    }, 1000 * 60 * 30);

}else{
    document.getElementById('timer').innerHTML = daysLeft + " Days";

    // set interval to update every 4 hours
    setInterval(function(){
        calculateTime();

        // could be optimized by checking if the values differ, then update
        document.getElementById('timer').innerHTML = daysLeft + " Days";
    }, 1000 * 60 * 60 * 4);
}
