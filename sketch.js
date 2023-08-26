const dadaManifesto = "buy it. use it. break it. fix it. trash it. change it. upgrade it. charge it. point it. zoom it. press it. snap it. work it. erase it. write it. cut it. paste it. save it. load it. check it. rewrite it. plug it. play it. burn it. rip it. technologic technologic technologic. drag it. drop it. zip it. lock it. fill it. call it. find it. view it. code it. unlock it. surf it. scroll it. pause it. click it. cross it. crack it. update it. name it. read it. tune it. print it. robot robottt rrrobo_ot. scan it. send it. rename it. touch it. bring it. pay it. watch it. turn it. leave it. format it. technologic technologic technologic"; //continúa aquí con tu texto

let str_arr = [];
let fonts = [];
let sentences;
let sentence;

const opts = {
  debug: 1,
  pitch: 64,
  speed: 72,
  mouth: 128,
  throat: 128
};

function preload() {
  fonts[0] = loadFont("JSE_Commodore64.ttf");
  // añadir más fuentes según sea necesario
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB, 360, 100, 100, 100);
  sentences = getShortSentences(dadaManifesto, 45);  // Removed "const"
  sentence = random(sentences);
  changeSentence();

  sam = new SamJs(opts);
  sam.speak(sentence);
}

function draw() {
  background(1,100,80);
  orbitControl();
  for (let i = 0; i < str_arr.length; i++) {
    str_arr[i].update();
    str_arr[i].display();
  }
}

function mouseClicked() {
  changeSentence();
  sam.speak(sentence);
}

function changeSentence() {
  str_arr = [];
  sentence = random(sentences);
  if (sentence) {
    let strs = sentence.split(" ");
    for (let i = 0; i < strs.length*80; i++) {
      let x = random(-width / 2, width / 2);
      let y = random(-height / 2, height / 2);
      let z = random(-width*5, width/2);
      let fontIndex = i % fonts.length; // calcula el índice de la fuente en función de la palabra
      str_arr.push(new Type(strs[i%strs.length], x, y, z, fontIndex));
    }
  }
}

function getShortSentences(text, maxLength) {
  const allSentences = text.split('.'); // cambiamos a '.' para que se divida por sentencias
  return allSentences.filter(sentence => sentence.length <= maxLength);
}

class Type {
  constructor(_str, _x, _y, _z, _fontIndex) {
    this.str = _str;
    this.x = _x;
    this.y = _y;
    this.z = _z;
    this.font = fonts[_fontIndex]; // asigna una fuente basada en el índice de fuente
  }

  update() {
    this.z += 10;
    if(this.z > width/2){
      this.z = -width*5;
    }
  }

  display() {
    push();
    translate(this.x, this.y, this.z);
    textAlign(CENTER, CENTER);
    textFont(this.font); // usa la fuente seleccionada
    textSize(20);
    fill(49,214,109);
    text(this.str, 0, 0);
    pop();
  }
}
