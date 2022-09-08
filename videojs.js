class Video {
    chunks = [];

    addChunk(duration, draw) {
        this.chunks.push({ duration: duration, draw: draw });
    }
}


const video = new Video();

let startChunk = Date.now();

let i = 0;
function loop() {
    const t = Date.now() - startChunk;

    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    if (video.chunks[i]) {
        video.chunks[i].draw(canvas.getContext("2d"), t);
        if (video.chunks[i].duration < t) {
            startChunk = Date.now();
            i++;
        }

    }

    requestAnimationFrame(loop);
}


window.onload = loop;





/**
 * sound
 */

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();


class Sound {
    static freqs = {};


    static playNote(note, duration) {
        const freq = 150 * 2** (note /12); 
        this.play(freq, duration)
    }
    static play(freq, duration) {
        if (Sound.freqs[freq])
            return;
        Sound.freqs[freq] = true;
        const oscillator = audioCtx.createOscillator();
        oscillator.type = 'sin';
        oscillator.set
        oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime); // value in hertz
        oscillator.connect(audioCtx.destination);
        oscillator.start();
        setInterval(() => { oscillator.stop(); Sound.freqs[freq] = undefined }, duration);
        return oscillator;
    }



}