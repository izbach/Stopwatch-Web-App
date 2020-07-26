function Stopwatch(elemMinutes, elemSeconds, elemMilliseconds){
    var time = 0;
    var interval;
    var offset;
    var lap = 0;

    function update(){
        if(this.isOn){
            time += delta();
        }
        var minutes = timeFormatter(time)[1];
        var seconds = timeFormatter(time)[2];
        var milliseconds = timeFormatter(time)[3];
        elemMinutes.textContent = minutes;
        elemSeconds.textContent = seconds;
        elemMilliseconds.textContent = milliseconds;

    }
    function delta(){
        var now = Date.now();
        var timePassed = now - offset;
        offset = now;
        return timePassed;
    }
    function timeFormatter(timeInMilliseconds){
        var time = new Date(timeInMilliseconds);
        var minutes = time.getMinutes().toString();
        var seconds = time.getSeconds().toString();
        var milliseconds = time.getMilliseconds().toString();
        milliseconds = milliseconds.substring(0, milliseconds.length - 1);

        if(minutes.length < 2){
            minutes = "0" + minutes;
        }
        if(seconds.length <  2){
            seconds = '0' + seconds;
        }
        while (milliseconds.length < 2){
            milliseconds = '0' + milliseconds;
        }

        return [minutes + ' : ' + seconds + ' . ' + milliseconds, minutes, seconds, milliseconds]; 
    }

    this.isOn = false;

    this.start = function() {
        if(!this.On){
            interval = setInterval(update.bind(this), 10);
            offset = Date.now();
            this.isOn = true;
            lap = Date.now();
        }
        

    };
    this.stop = function() {
        if (this.isOn){
            clearInterval(interval);
            interval = null;
            this.isOn = false;

        }
    };
    this.reset = function() {

        if(!this.isOn){
            time = 0;
            update();
        }
        
    };
    this.lap = function() {
        return timeFormatter(time)[0]
    }
}

