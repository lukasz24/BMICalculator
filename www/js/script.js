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
        if((wzrostInput.val() === '' )|| wagaInput.val() === ''){
            toast('Niektóre pola są puste!',600);
        }else{
            calculateBMI(bmiScore, wagaInput, wzrostInput);
            /*
            let bmi = wagaInput.val()/(Math.pow(wzrostInput.val(),2)/10000);
            bmiScore.text(bmi);
            goToSite('scorePage');
            */
            
        }        
    }); 
});

function calculateBMI(bmiInp, waga, wzrost){
    let bmi = waga.val()/(Math.pow(wzrost.val(),2)/10000);
    bmi = Math.round(bmi*100)/100;
    bmiInp.text(bmi);
    goToSite('scorePage');
    let bmiOpis = $('#bmiOpis');

    if(bmi < 18.5){
        bmiInp.css("color", "lightblue");
        bmiOpis.css("color", "lightblue");
        bmiOpis.text("Niedowaga");
    }else if(18.5 <= bmi && bmi < 25){
        bmiInp.css("color", "green");
        bmiOpis.css("color", "green");
        bmiOpis.text("Waga prawidłowa - GRATULUJĘ!");
    }else if(25 <= bmi && bmi < 30){
        bmiInp.css("color", "yellow");
        bmiOpis.css("color", "yellow");
        bmiOpis.text("Nadwaga");
    }else if(30 <= bmi){
        bmiInp.css("color", "red");
        bmiOpis.css("color", "red");
        bmiOpis.text("OTYŁOŚĆ");
    }
}

var toast = function(msg, time){
    $("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h3>"+msg+"</h3></div>")
    .css({ display: "block", 'background-color': 'rgba(121, 121, 121, 1)',
        opacity: 1, 
        position: "fixed",
        padding: "7px", "text-align": "center",
        color: 'rgba(255, 255, 255, 1)',
        width: "270px",
        left: ($(window).width() - 284)/2,
        top: $(window).height()/2 })
    .appendTo( $('body') ).delay( 1500 )
    .fadeOut( time, function(){
        $(this).remove();
    });
};   