var carousel = $(".carousel"),
currdeg  = 0;
console.log(currdeg);

index = 0;
all_events = ["hackathon", "dronix", "robowar", "nitro", "mig", "coty", "cicada", "cycloway"];
// event_backgrounds = ["hackathon.jpg"]

$(".next").on("click", { d: "n" }, rotate);
$(".prev").on("click", { d: "p" }, rotate);

var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
}

if (isMobile){
    $('.nav-btn').css("visibility", "hidden");
    // alert('mobile device');
}

function getCurrentEventFromDegree(ind){
    
    if(ind == 0){
        return ['hakathon', 'Hackathon'];
    }
    else if (ind == 1){
        return ['dronix', 'Dronix'];
    }
    else if (ind == 2){
       return ['robowar', 'Robowars'];
   }
   else if (ind == 3){
       return ['nitro', 'Nitro Racing'];
   }
   else if (ind == 4){
       return ['mig', 'Make in GECA'];
   }
   else if (ind == 5){
       return ['coty', 'Coder of the Year'];
   }
   else if (ind == 6){
       return ['cicada', 'Cicada 3301'];
   }
   else {
       return ['cycloway', 'Cycloway'];
   }
}

function updateView(ind){
    data = getCurrentEventFromDegree(ind);
    document.getElementById('page-title').innerHTML = data[1];
    $(".background").css("background-image", "url(../assets/images/" + all_events[ind] +".jpg)");
    $('#next-loc').attr("href", "events" + data[i] + "html");
}

function rotate(e){
    
    if(e.data.d=="n"){
    currdeg = currdeg - 45;
    index = index + 1;
    if (index == 8){
        index = 0;
    }
    }
    if(e.data.d=="p"){
    currdeg = currdeg + 45;
    index =  index - 1;
    if (index == -1){
        index = 7;
    }

    }
    console.log(currdeg, index);
    updateView(index);
    carousel.css({
    "-webkit-transform": "rotateX("+currdeg+"deg)",
    "-moz-transform": "rotateX("+currdeg+"deg)",
    "-o-transform": "rotateX("+currdeg+"deg)",
    "transform": "rotateX("+currdeg+"deg)"
    });
}

document.getElementById('carousel').addEventListener('swiped-down', function(e) {
// console.log(e.target); // the element that was swiped
        rotate({
            data: {d: "n"}
        });
});
document.getElementById('carousel').addEventListener('swiped-up', function(e) {
    // console.log(e.target); // the element that was swiped
            rotate({
                data: {d: "p"}
            });
    });
