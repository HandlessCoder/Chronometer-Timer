"use strict"

var ss=0;
var mm=0;
var hh=0;

var tempo = 1000; // milisegundos en un segundo
var crono;
var checkBox= document.getElementById('switch');
var horas;
var minutos;
var segundos;
var running=0;
var contador = document.getElementById('counter');
var bgPath;
var bgQuantity;
var num;

window.onload = function (){
    bgPath = './img/bg/';
    bgQuantity = 2;
    num = Math.round(Math.random()*(bgQuantity-1));
    document.getElementById('body').style.backgroundImage= `url(${bgPath}bg${num}.jpg)`;
    document.getElementById('contenedor_carga').style.visibility="hidden";
    document.getElementById('contenedor_carga').style.opacity='0';
}



// var audio = new Audio('./audio/audio_file.mp3');
// audio.play();

function addInput(divName,name,limit) {
    var parent = document.getElementById(divName);
    var selectHTML = "";
    selectHTML=`<select name="${name}" id="${name}" title="${name}">`;
    for(let i = 0; i < limit; ++i) {
        selectHTML += "<option value='" + (i<10?'0'+i:i) + "'>" + (i<10?'0'+i:i) + "</option>";
    }
    selectHTML += "</select>";
    parent.innerHTML += selectHTML;
    // document.getElementById(divName).appendChild(newDiv);
}


function slider() {
    if(running===0){
        if(checkBox.checked){
            document.getElementById('reloj').style.backgroundImage="url('./img/timer.png')";
            if(horas === undefined){
                addInput("cmb-grp","horas",24);
                addInput("cmb-grp","minutos",60);
                addInput("cmb-grp","segundos",60);
                horas = document.getElementById('horas');
                minutos = document.getElementById('minutos');
                segundos = document.getElementById('segundos');
            }else{
                document.getElementById('cmb-grp').style.display ='grid';
            }
            horas.value=((hh%24)<10?'0':'') +String(hh%24);
            minutos.value=((mm%60)<10?'0':'')+String(mm%60);
            segundos.value=((ss%60)<10?'0':'')+String(ss%60);
            contador.style.display = "none";

            document.getElementById('btn-grp').style.paddingTop='5%';
        }else{
            document.getElementById('btn-grp').style.paddingTop='0px';
            document.getElementById('reloj').style.backgroundImage="url('./img/favicon.png')";
            contador.style.display = "block";
            document.getElementById('cmb-grp').style.display ='none';
        }
    }else{
        checkBox.checked = !checkBox.checked;
    }
}

function start() {
    // document.getElementById("counter").style.display = "none";                   LE QUITA PRESENCIA AL ELEMENTO DE LA PAGINA, 
                                                                                    //ORIGINA DESPLAZAMIENTO DE ELEMENTOS
    // document.getElementById("counter").style.visibility = 'hidden';             SOLAMENTE DESDIBUJA EL ELEMENTO, PERO SIGUE ESTANDO PRESENTE
    if(running===0){
        if(checkBox.checked){
            if(horas.value==='00' && minutos.value==='00' && segundos.value==='00')return;
            ss=Number(horas.value)*3600 + Number(minutos.value) * 60 + Number(segundos.value);
            crono=setInterval(() => timer(), tempo);
            document.getElementById("counter").style.display = "block";
            document.getElementById('cmb-grp').style.display ='none';
            document.getElementById('btn-grp').style.paddingTop='0px';
            contador.innerText=`${horas.value}:${minutos.value}:${segundos.value}`;
            
        }else{
            crono=setInterval(() => chronometer(), tempo);
        }
        running=1;
    }
}

function pause(params) {
    // document.getElementById("counter").style.display = "block";
    // document.getElementById("counter").style.visibility = 'visible';
    if(running === 1 && checkBox.checked){
        contador.style.display = "none";
        document.getElementById('cmb-grp').style.display ='grid';
        document.getElementById('btn-grp').style.paddingTop='5%';
        horas.value=((hh%24)<10?'0':'') +String(hh%24);
        minutos.value=((mm%60)<10?'0':'')+String(mm%60);
        segundos.value=((ss%60)<10?'0':'')+String(ss%60);

        if(hh+mm+ss == 0){
            let au = new Audio("./audio/alarm2.mp3");
            let playPromise = au.play();
            au.loop=true;
            playPromise.then( () => {   alert("Out of time");   au.pause(); });
        }
        // au.pause();

        // clearInterval(alarma);
    }
    running=0;
    clearInterval(crono);
}

function stop(params) {
    clearInterval(crono);
    hh=0;
    mm=0;
    ss=0;
    contador.innerText="00:00:00";
    running=0;
}

function chronometer(params) {
    ++ss;
    mm=Math.floor(ss/60);
    hh = Math.floor(mm / 60);

    let format = (hh%24<10?'0':'')+Math.floor(hh%24)+':'+
                (mm%60<10?'0':'')+Math.floor(mm%60)+':'+
                (ss%60<10?'0':'')+Math.floor(ss%60);
    contador.innerText=format;
}

function timer() {
    if(ss === 0){ pause(); return;}
    --ss;
    mm=Math.floor(ss/60);
    hh = Math.floor(mm / 60);

    let format = (hh%24<10?'0':'')+Math.floor(hh%24)+':'+
                (mm%60<10?'0':'')+Math.floor(mm%60)+':'+
                (ss%60<10?'0':'')+Math.floor(ss%60);
    contador.innerText=format;
}