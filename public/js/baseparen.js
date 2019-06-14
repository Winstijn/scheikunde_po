//
//  Scheikunde PO
//  Joren Hofmeester, Fyor Klein Gunnewiek,
//  Yvonne Wijfjes, Winstijn Smit 
//
//  Created by Winstijn Smit
//  Copyright © 2019 Kaziaat B.V. All rights reserved.
//

//TODO: Fix use of copy and pase.
//TODO: Scroll through input when further than width, etc - autoscroll.
//TODO: Maybe add a count of the 'base'.
//TODO: Deploy on server. DONE!

var baseInput;
var __COLOR_CYCLE = true

// De mode de applicatie is in met de volgende mogelijke waarde:
// 1. DNA
// 2. RNA
// 3. AMINO
var __APP_MODE;
var __TRANSLATE_DNA_MODE = 1 // index of selection in HTML.
var __ALLOWED_CHARS;


// RNA naar aminozuren

$(document).ready(() => {
    baseInput = $("#base-input")[0]
    baseInput.value = ""
    setMode("DNA")
    startColorCycle()
    addEventListeners()
})

function addEventListeners(){
    baseInput.addEventListener('input', e => checkInput(e))

    $("select").change(function() {
        console.log(this, this.selectedIndex)
        __TRANSLATE_DNA_MODE = this.selectedIndex + 1
    });
}

function startColorCycle(){
    const rgbString = "rgb(255,127,x)"
    let rgbValue = 50
    let reverse = false

    setInterval(() => {
        if (!__COLOR_CYCLE) return
        if (rgbValue >= 200) reverse = true
        if (rgbValue <= 50) reverse = false
        reverse ? rgbValue-- : rgbValue++

        document.body.style.backgroundColor = rgbString.replace("x", rgbValue)
    }, 100)
}

function checkInput(event){
    if (event.data == null) return

    const typedChar = event.data.toUpperCase()
    const allowedChar = __ALLOWED_CHARS.includes(typedChar)
    baseInput.value = baseInput.value.substring(0, baseInput.value.length - 1)
    if (!allowedChar) return

    baseInput.value += typedChar
}

function transDNALiteral(string){
    return string.toUpperCase().replace(/T/g, "U")
}

function transDNAComplementair(dnaString, reverse=false) {
    if (reverse) dnaString = dnaString.reverse().toString().replace(/,/g, "")
    const dnaArray = dnaString.split('');
    const rnaArray = []
    dnaArray.forEach(base => {
        rnaArray.push(__TRANSLATE_RNA[base.toUpperCase()])
    });
    return rnaArray.toString().replace(/,/g, "")
}

function transDNAToRNA(dnaString){
    console.log("[Scheikunde App] Translating DNA to RNA:", dnaString)
    dnaString.includes("U") && alert("Dit is geen DNA!"); 
    
    var rnaString = ""
    if (__TRANSLATE_DNA_MODE == 1) rnaString = transDNALiteral(dnaString)
    if (__TRANSLATE_DNA_MODE == 2) rnaString = transDNAComplementair(dnaString)
    if (__TRANSLATE_DNA_MODE == 3) rnaString = transDNAComplementair(dnaString, true)
    if (!rnaString) { alert("Translatie mode is niet goed ingesteld!"); return}
    setMode("RNA")

    document.getElementById("base-input").value = rnaString
    return rnaString
}

function transRNAtoAmino(rnaString){
    console.log("[Scheikunde App] Translating RNA to AMINO:", rnaString)

    // Checking whether it is possible to convert to AMINO.
    if (rnaString.length % 3 > 0) {
        alert("Deze RNA reeks is niet compleet. " + (3 - (rnaString.length % 3)) + " base te weinig in de RNA reeks. Het laatste paar werd genegeerd.", 2500)
        rnaString = rnaString.substr(0, rnaString.length - rnaString.length % 3)
    } 
    const baseParen = rnaString.length / 3
    var aminoString = ""
    for (let i = 0; i < baseParen; i++) {
        const basePaar = rnaString.substr(i * 3, 3);

        // Getting the code found in the Binas for the 'basepaar'
        const aminoZuurCode = __AMINO_DICTONARY[__BASE_DICTONARY[basePaar].toLowerCase()]
        if (aminoZuurCode) aminoString += aminoZuurCode
    }
    setMode("AMINO");
    fillAminoZurenList(aminoString);
    document.getElementById("base-input").value = aminoString
    return aminoString
}

function fillAminoZurenList(aminoString){
    clearAminoZurenList()
    $("#amino-list").show();

    const list = $("#amino-list");
    aminoString.split("").forEach( (code, index) => {
        const aminoZuur = __AMINO_ZUREN[code.toUpperCase()]
        const li = document.createElement('li')
        if (!aminoZuur) {
            alert("Kan een Amino zuur niet vinden!")
            return
        }
        li.innerText = `${index + 1}. ${aminoZuur.shortCode.upcase()} - ${aminoZuur.name.upcase()}`
        list.append(li)
    })
}

function clearAminoZurenList(){
    $("#amino-list").html("");
}

// Only used once.
function rearrangeDictonary(shortCode){
    var __AMINO_DICTONARY = {}
    for (var key in __AMINO_ZUREN){
        const zuur = __AMINO_ZUREN[key]
        __AMINO_DICTONARY[zuur.shortCode] = key
    }
}


function setMode(mode, clearInput) {
     __APP_MODE = mode 
     if (clearInput) document.getElementById("base-input").value = ""
     updateSelectors()
     updateInputPlaceholder()

     if (__APP_MODE == "DNA") __ALLOWED_CHARS = ["T", "A", "C", "G"]
     if (__APP_MODE == "RNA") __ALLOWED_CHARS = ["A", "C", "G", "U"] 
     if (__APP_MODE == "AMINO") __ALLOWED_CHARS = Object.keys(__AMINO_ZUREN) 

     if (mode == "AMINO"){
        clearAminoZurenList()
        $("input").addClass("amino-mode");
     } else {
        $("input").removeClass("amino-mode");
        $("#amino-list").hide();
     }

}

function updateSelectors(){
    $("#top .selected").removeClass("selected")
    $(`#${__APP_MODE}-mode`).addClass("selected")
}

function updateInputPlaceholder(){
    $("#base-input")[0].placeholder = `Vul een ${__APP_MODE} reeks in...`
}

function scrollThroughInput(){
    // TODO: put in a loop.
    $("input")[0].scrollLeft = 10
}

function alert(string, time= 1500){
    M.toast({html: string, displayLength: time,})
}

document.onkeypress = e => {

    if (e.key == "Enter") {
        const input = document.getElementById("base-input").value.replace(/\s/g, "")
        switch (__APP_MODE) {
            case "DNA":
                transDNAToRNA(input) 
                break;

            case "RNA":
                transRNAtoAmino(input);
            break;

            case "AMINO":
                fillAminoZurenList(input)
            break;
        
            default:
                break;
        }
    } 

    if (e.key == 1) setMode("DNA", true);
    if (e.key == 2) setMode("RNA", true);
    if (e.key == 3) setMode("AMINO", true);
}


String.prototype.upcase = function(){
    return this[0].toUpperCase() + this.substring(1)
}

String.prototype.reverse = function(){
    return this.split("").reverse().toString().replace(/,/g, "")
}

