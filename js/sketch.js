//////////////////////////
/* EDIT VALUES BELOW TO MATCH DEVICE SLIDERS*/
const CCSLIDER1 = 2;
const CCSLIDER2 = 3;
const CCSLIDER3 = 4;
const CCSLIDER4 = 5;
const CCSLIDER5 = 6;
const CCSLIDER6 = 8;
const CCSLIDER7 = 9;
const CCSLIDER8 = 12;
//const CCSLIDER9 = 12;
const sliderData = [0,0,0,0,0,0,0,0];
let Colours;
//////////////////////////
// built in P5 function gets called at the beginning
function setup() {
    createCanvas(innerWidth, innerHeight);
    background(0);
    Colours = ["rgba(255, 0, 0, 0.5)", "rgba(0, 255, 0, 0.5)", "rgba(252, 186, 3)", "rgba(96, 125, 24)","rgba(166, 12, 96)", "rgba(166, 12, 96)","rgba(166, 12, 96)","rgba(214, 217, 24)","rgba(77, 140, 137)"]
    WebMidi
        .enable()
        .then(onEnabled)
        .catch(err => alert(err));
}
// gets called by MIDI library once MIDI enabled
function onEnabled() {
    // Display available MIDI input devices
    if (WebMidi.inputs.length < 1) {
        console.log("No device detected.");
    } else {
        WebMidi.inputs.forEach((device, index) => {
            console.log(`${index}: ${device.name}`);
        });
    }
    myController = WebMidi.inputs[0];
    myController.channels[1].addListener("noteon", noteOn);
    myController.channels[1].addListener("controlchange", allCC);

}
// gets called when a MIDI note its intercepted 
function noteOn(e) {
    // for APC Mini
    // console.log(e.note.name, e.note.accidental || null, e.note.octave);
    // calculate the postion of the note in the grid of notes
    let pos = returnXY(e.note.name, e.note.accidental || '', e.note.octave);
    // calculate the x y pixel equivalent 
    // add offset values to position in the middle of an notional 8 x8 grid cell
    // width / 16 = half of cell size
    let hSpace = width / 16;
    let vSpace = height / 16;
    let x = pos.x * width + hSpace;
    let y = pos.y * height + vSpace
    // TODO - use these values to draw something at the note position?
    // for example: circle(x, y, 20)
}
// gets called when a MIDI control change message is intercepted
function allCC(e) {
    console.log(e.data[2]);
    // calculate slider data a a valeu 0 to 1
    let ratio = e.data[2] / 127
    switch (e.controller.number) {
        case CCSLIDER1: 
        sliderData[0] = ratio;
            break;
        case CCSLIDER2: 
        sliderData[1] = ratio;
            break;
        case CCSLIDER3: 
        sliderData[2] = ratio;
            break;
        case CCSLIDER4: 
        sliderData[3] = ratio;
            break;
        case CCSLIDER5: 
        sliderData[4] = ratio;
            break;
        case CCSLIDER6: 
        sliderData[5] = ratio;
            break;
        case CCSLIDER7: 
        sliderData[6] = ratio;
            break;
        case CCSLIDER8: 
        sliderData[7] = ratio;
            break;
        //case CCSLIDER9:
        //sliderData[8] = ratio;
            //break;
    }
}
function draw() {
    console.log(sliderData[0])
    //clear();
    background(0, 10);
    let rectHeight = height/sliderData.length;
    for(let i = 0;i < sliderData.length;i++){
        let baseNoise = 500;
        let noiseShift = random(-baseNoise *sliderData[i], baseNoise * sliderData[i]);
        // x, y, width, height
        //circle(width/4, i * rectHeight, width/2 * sliderData[i], rectHeight)
        beginShape();
        //top left
        vertex(width/4 + noiseShift, i * rectHeight + noiseShift);
        noiseShift = random(-baseNoise *sliderData[i], baseNoise * sliderData[i]);
        //top right
        vertex(width*0.75 + noiseShift, i * rectHeight + noiseShift)
        noiseShift = random(-baseNoise *sliderData[i], baseNoise * sliderData[i]);
        //bottom right
        vertex(width*0.75 + noiseShift, i * rectHeight + rectHeight + noiseShift);
        noiseShift = random(-baseNoise *sliderData[i], baseNoise * sliderData[i]);
        //bottom left
        vertex(width/4 + noiseShift, i * rectHeight + rectHeight + noiseShift);
        noiseShift = random(-baseNoise *sliderData[i], baseNoise * sliderData[i]);
        //end hape cloe
        endShape(close);
        //console.log("draw rect")
        fill(random(Colours))
        //rect(width/4, rectHeight * i, width/2, rectHeight)
        
    }

}
