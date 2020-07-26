var toggleBtn = document.getElementById("start1")
var reset1 = document.getElementById("reset1")
var timer1 = document.getElementById("timer1")
var minutes1 = document.getElementById("minutes1")
var seconds1 = document.getElementById("seconds1")
var milli1 = document.getElementById("milli1")

var watch = new Stopwatch(minutes1, seconds1, milli1);

toggleBtn.addEventListener('click', function(){
    if(watch.isOn){
        watch.stop();
        toggleBtn.textContent = "Start";
        toggleBtn.classList.remove("btn-danger")
        toggleBtn.classList.add("btn-primary")
        reset1.textContent = "Reset";
        
    }else{
        watch.start();
        toggleBtn.textContent = "Stop";
        toggleBtn.classList.remove("btn-primary")
        toggleBtn.classList.add("btn-danger")
        reset1.textContent = "Lap";
    }
})

reset1.addEventListener('click', function(){
    if(!watch.isOn){
        watch.reset();
        document.getElementById("lap_list").innerHTML = "";
    } else {
        var lap_value = watch.lap();
        var node=document.createElement("LI");
        var textnode=document.createTextNode(lap_value);
        node.appendChild(textnode);
        document.getElementById("lap_list").appendChild(node);
    }
})

$('#taba').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
  })
$('#tabb').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
})  
// function setInputFilter(textbox, inputFilter) {
//     ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
//       textbox.oldValue = "";
//       textbox.addEventListener(event, function() {
//         if (inputFilter(this.value)) {
//           this.oldValue = this.value;
//           this.oldSelectionStart = this.selectionStart;
//           this.oldSelectionEnd = this.selectionEnd;
//         } else if (this.hasOwnProperty("oldValue")) {
//           this.value = this.oldValue;
//           this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
//         }
//       });
//     });
//   }
  
//  // Restrict input to digits and '.' by using a regular expression filter.
// setInputFilter(document.getElementById("minutes1"), function(value) {
//     return /^\d*$/.test(value);
//   });
document.querySelector("#minutes1").addEventListener("keypress", function (evt) {
    if (evt.which < 48 || evt.which > 57)
    {
        evt.preventDefault();
    }
});