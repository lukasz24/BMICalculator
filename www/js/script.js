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
    screen.screenOrientation.lock(screen.screenOrientation.ORIENTATIONS.PORTRAIT);

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

});