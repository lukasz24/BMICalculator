function goToSite(id){
    var anch = document.createElement('a');
    anch.setAttribute("href", "#"+id);
    anch.click();
}

$(document).ready(function(){
    const calculateButton = $('#calculateButton');
    const bmiScore = $('#bmi');
    const wagaInput = $('#waga');
    const wzrostInput = $('#wzrost');

    calculateButton.on('click', function(){
        if((wzrostInput.is(':empty') )|| wagaInput.is(':empty')){
            toast('Niektóre pola są puste!',600);
        }else{
            bmiScore.html();
            goToSite('scorePage');
            toast('123',600);
        }
        toast('Niektóre pola są puste!',600);
    });


    const emailInput = $('#email');
    const passInput = $('#haslo');
    const btnLogIn = $('#zaloguj');
    const btnGLogIn = $("#zalogujG");
    const btnFBLogIn = $("#zalogujFB");
    const btnRegis = $("#zarejestruj");
    var info = $('#logInfo');

    emailInput.on('focus', function(){
		$(this).css("box-shadow", "none");
	});

    passInput.on('focus', function(){
		$(this).css("box-shadow", "none");
	});
}

var toast = function(msg, time){
    $("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h3>"+msg+"</h3></div>")
    .css({ display: "block", 'background-color': 'rgba(121, 154, 192, 1)',
        opacity: 1, 
        position: "fixed",
        padding: "7px", "text-align": "center",
        color: 'rgba(255, 255, 255, 1)',
        width: "270px",
        left: ($(window).width() - 284)/2,
        top: $(window).height()/2 })
    .appendTo( $.mobile.pageContainer ).delay( 1500 )
    .fadeOut( time, function(){
        $(this).remove();
    });
};
   

function addUserToDB(email, nick, userKey) {
    var userData = {
        email: email,
        name: nick,
        watched: [],
        added: []
    };
    firebase.database().ref().child('users/' + userKey).set(userData);
}

function getChartData() {
    var database = firebase.database().ref();
    var ilosc = [0,0,0,0,0,0,0];
    var daty = ['','','','','','',''];
    database.child('classifieds/').once("value", function(data) {
        var newAnn = data.val();
        for(var i = 0; i < 7; i++) {
            let today = getYesterdayDate(i);
            daty[i] = today;
            for (var iter in newAnn) {
                var dat = newAnn[iter].addDate;
                if (dat == today) {
                    ilosc[i] = ilosc[i] + 1;
                }
            }
        }
        chartClick(ilosc, daty);
    });
}

function getYesterdayDate(yesDay) {
    let nowaData = new Date();
    nowaData.setDate(nowaData.getDate() - yesDay);
    return formatDate(nowaData);
}

function chartClick(dbData, days) {
    var ctx = document.getElementById("chart").getContext('2d');
    var il = dbData;
    var d = days;
    var myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: [d[0], d[1], d[2], d[3], d[4], d[5], d[6]],
            datasets: [{
                label: 'ilość dodanych ogłoszeń',
                data: [il[0], il[1], il[2], il[3], il[4], il[5], il[6], 0],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                    'rgba(123, 232, 157, 0.8)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(123, 232, 157, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            legend: {
                labels: {
                    boxWidth: 0,
                }
            },
            scales: {
                yAxes: [{}]
            }
        }
    });
    goToSite('chartPage');
}

function sendEmail() {
    cordova.plugins.email.isAvailable(
        function (isAvailable) {
            if (isAvailable) {
                cordova.plugins.email.open({
                    to:      ['asia_p99@tlen.pl', 'rsmyksy@gmail.com', 'lukasz.pudzisz@gmail.com', 'p.grzyb1995@gmail.com'],
                    subject: 'LearnWithMe - wsparcie',
                    body:    'Chciałbym zgłosić następujące błędy:\n'
                });
            } else {
                var ms = 'Brak skonfigurowanej poczty e-mail.';
                toast(ms, 3000);
            }
        }
    );
}

function checkNotify(userID){
	database.child('users/' + userID + '/notifications/').on('value', function(snap) {
		let menu1 = $(" div[data-role='panel'] > div > ul > :first-child > :first-child ");
	    if (snap.val() == null) {        	
	      menu1.removeClass('notifyStar');
	    }else{        	
	      menu1.addClass('notifyStar');        	
	    }
  	});
  	database.child('users/' + userID + '/notifications/').once('value', function(snap) {		
	    if (snap.val() != null) { 
	      toast("Masz nieusunięte powiadomienia!", 1000);
	    }
	});
}
