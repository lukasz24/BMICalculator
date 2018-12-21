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
            let bmi = wagaInput.val()/(wzrostInput*wzrostInput/10000);
            bmiScore.html(bmi);
            goToSite('scorePage');
            toast('123',600);
        }        
    });    

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