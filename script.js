//Credits:
//Button sample by Mellau via freesound.org
//Card press sample by NenadSimic via freesound.org
//Card snap sample by alparbalazs via freesound.org
//Background music sample by joshuaempyre via freesound.org
//Win jingle music sample by sonically_sound via freesound.org

let cards = [];
let font;
let buttonPress, cardPress, cardSnap, gameMusic, winJingle;
let Encryption, CipheredData, publicKey, privateKey, plaintext, decriptedplaint, BlackKey, loseComp, lockedComputer, Chip;
let EncryptionImg, CipheredDataImg, publicKeyImg, privateKeyImg, plaintextImg, decriptedplaintxtImg, BlackKeyImg, loseCompImg, lockedComputerImg, ChipImg;
let center1, center2, center3, center4, center5;
let slider, sliderY, volume0Img, volume1Img, gameAmp, effectAmp, muted, prevAmp;
let screen = 0;
let widthConstraint, heightConstraint;
let alphaValue = 0;
let fadeSpeed = 5;
let confirm = false;
let cancel = false;
let cardPressed = false;
let playOnce = true;
audio = true;

//start = 0
//instructions = 1
//game = 2
//restart = 3
//lose = 4

function setCardsoffScreen() { //moves images based on which screen is displayed
  plaintext.pos = { x: -100, y: -100 };
  publicKey.pos = { x: -100, y: -100 };
  CipheredData.pos = { x: -100, y: -100 };
  privateKey.pos = { x: -100, y: -100 };
  decriptedplaintxt.pos = { x: -100, y: -100 };
  Encryption.pos = { x: -400, y: -400 };
  if (screen === 0) {
    BlackKey.scale = .0007 * width;
    BlackKey.pos = { x: width * .5, y: height * .5 };
  }
  else {
    BlackKey.pos = { x: -100000, y: -200 };
  }
  if (screen === 3) {
    lockedComputer.pos = { x: width * .5, y: height * .5 };
  }
  else {
    lockedComputer.pos = { x: -100000, y: -200 };
  }
  if (screen === 4) {
    loseComp.pos = { x: width * .5, y: height * .5 };
  }
  else {
    loseComp.pos = { x: -100000, y: -200 };
  }
}

function mousePressed() {

  if (screen === 0) { //on the start screen
    if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > height - 120 && mouseY < height - 80) {
      buttonPress.play();
      showInstructionScreen();
      screen = 1;
    }
  }
  else if (screen === 1 || screen === 3 || screen === 4) {// if on the instructions/restart/lose screen
    //press begin button or restart button pressed
    if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > height - 120 && mouseY < height - 80) {
      buttonPress.play();
      if (screen == 3) {
        winJingle.stop();
        gameMusic.loop();
      }
      screen = 2;
      decriptedplaintxt.position = createVector(width * .2725, height - 95);
      publicKey.position = createVector(width * .49, height - 100);
      privateKey.position = createVector(width * .7075, height - 105);
      plaintext.position = createVector(width * .38125, height - 45);
      CipheredData.position = createVector(width * .59875, height - 45);
      Encryption.pos = { x: width / 2, y: height / 2 - 20 };
      BlackKey.pos = { x: width / 2, y: height / 2 + 100 };
    }
  }
  else if (screen === 2 && confirm && !cancel) { //checks if user wins or loses from submit prompt
    if (mouseX > width / 2 + 20 && mouseX < width / 2 + 140 && mouseY > height - 80 && mouseY < height - 40) {
      buttonPress.play();
      if (
        dist(plaintext.x, plaintext.y, center1.x, center1.y) < 1 &&
        dist(publicKey.x, publicKey.y, center2.x, center2.y) < 1 &&
        dist(CipheredData.x, CipheredData.y, center3.x, center3.y) < 1 &&
        dist(privateKey.x, privateKey.y, center4.x, center4.y) < 1 &&
        dist(decriptedplaintxt.x, decriptedplaintxt.y, center5.x, center5.y) < 1
      ) {
        console.log("you win!");
        screen = 3;
        showScreenWin();
        confirm = false;
      } else {
        console.log("you lose!");
        screen = 4;
        showScreenLose();
        confirm = false;
      }
    }
    else if (mouseX > width / 2 - 120 && mouseX < width / 2 && mouseY > height - 80 && mouseY < height - 40) { //cancel button
      buttonPress.play();
      confirm = false;
      cancel = true;
    }
  }

  //If on the game screen
  if (screen === 2) {
    // Check if the "Learn More" button is clicked
    cardPressed = true;
    if (mouseX > width - 150 && mouseX < width - 10 && mouseY > height - 55 && mouseY < height - 20) {
      buttonPress.play();
      // Display a link to a website for further learning
      window.open('https://ssd.eff.org/module/deep-dive-end-end-encryption-how-do-public-key-encryption-systems-work');
    }
  }

    // mute button pressed
    let buttonCenterDist = dist(mouseX, mouseY, 40, height - 40);
    if (buttonCenterDist < 25) { muted = !muted; }
}


function handleDragging(card) {
  if (card.mouse.dragging()) { //The card is constrained within the game window
    if (cardPressed) {
      cardPress.play();
      cardPressed = false;
    }
    cancel = false;
    confirm = false;
    widthConstraint = constrain(mouseX + card.mouse.x, card.width / 2, width - card.width / 2);
    heightConstraint = constrain(mouseY + card.mouse.y, card.height / 2, height - card.height / 2);
    card.position = createVector(widthConstraint, heightConstraint);
    card.rotationLock = true;
  } else {
    card.vel.x = 0;
    card.vel.y = 0;
    card.rotationLock = true;
  }
}

function snapToCenter(card) {
  // Snap into position and check if there is not already a card in the center position
  if (!mouseIsPressed) {
    let snapped = false;
    switch (true) {
      case dist(card.x, card.y, center1.x, center1.y) < 60 && !cards.some(c => c != card && dist(c.x, c.y, center1.x, center1.y) < 60):
        if (card.x != center1.x && card.y != center1.y) {
          cardSnap.play();
        }
        card.position = center1;
        snapped = true;
        break;
      case dist(card.x, card.y, center2.x, center2.y) < 60 && !cards.some(c => c != card && dist(c.x, c.y, center2.x, center2.y) < 60):
        if (card.x != center2.x && card.y != center2.y) {
          cardSnap.play();
        }
        card.position = center2;
        snapped = true;
        break;
      case dist(card.x, card.y, center3.x, center3.y) < 60 && !cards.some(c => c != card && dist(c.x, c.y, center3.x, center3.y) < 60):
        if (card.x != center3.x && card.y != center3.y) {
          cardSnap.play();
        }
        card.position = center3;
        snapped = true;
        break;
      case dist(card.x, card.y, center4.x, center4.y) < 60 && !cards.some(c => c != card && dist(c.x, c.y, center4.x, center4.y) < 60):
        if (card.x != center4.x && card.y != center4.y) {
          cardSnap.play();
        }
        card.position = center4;
        snapped = true;
        break;
      case dist(card.x, card.y, center5.x, center5.y) < 60 && !cards.some(c => c != card && dist(c.x, c.y, center5.x, center5.y) < 60):
        if (card.x != center5.x && card.y != center5.y) {
          cardSnap.play();
        }
        card.position = center5;
        snapped = true;
        break;
      default:
        break;
    }

    if (!snapped) {
      // Return the card to its original position
      card.position = card.originalPosition;
    }
  }
}

function checkIfConfirm() { //submit screen appears if all 5 cards have been snapped to a position
  let numSnapped = 0;
  for (let card of cards) {
    if (
      dist(card.x, card.y, center1.x, center1.y) < 1 ||
      dist(card.x, card.y, center2.x, center2.y) < 1 ||
      dist(card.x, card.y, center3.x, center3.y) < 1 ||
      dist(card.x, card.y, center4.x, center4.y) < 1 ||
      dist(card.x, card.y, center5.x, center5.y) < 1
    ) {
        numSnapped++;
    }
  }
  if (numSnapped == 5) {
    confirm = true;
  }
}

function preload() { //load fonts, images and sounds
  font = loadFont('assets/AsyEnc/MechaRx20Regular-j9Zy9.otf');
  EncryptionImg = loadImage('assets/AsyEnc/Encryption.png');
  CipheredDataImg = loadImage('assets/AsyEnc/CipheredDataImg.png');
  publicKeyImg = loadImage('assets/AsyEnc/publicKeyImg.png');
  privateKeyImg = loadImage('assets/AsyEnc/privateKeyImg.png');
  plaintextImg = loadImage('assets/AsyEnc/plaintextImg.png');
  decriptedplaintxtImg = loadImage('assets/AsyEnc/decriptedplaintxtImg.png');
  BlackKeyImg = loadImage('assets/AsyEnc/BlackKeyImg.png');
  loseCompImg = loadImage('assets/AsyEnc/LoseComp.png');
  lockedComputerImg = loadImage('assets/AsyEnc/lockedComputer.png');
  ChipImg = loadImage('assets/AsyEnc/Chip.png');
  buttonPress = loadSound('assets/AsyEnc/buttonPress.wav');
  cardPress = loadSound('assets/AsyEnc/cardPress.wav');
  cardSnap = loadSound('assets/AsyEnc/cardSnap.wav');
  gameMusic = loadSound('assets/AsyEnc/gameMusic.wav');
  winJingle = loadSound('assets/AsyEnc/winJingle.wav');
  volume0Img = loadImage('assets/AsyEnc/volume0.png');
  volume1Img = loadImage('assets/AsyEnc/volume1.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  center1 = createVector(width * .368, height * .487);
  center2 = createVector(width * .435, height * .68);
  center3 = createVector(width * .498, height * .51);
  center4 = createVector(width * .56, height * .68);
  center5 = createVector(width * .626, height * .487);

  soundFormats('wav');
  gameMusic.loop();

  Encryption = new Sprite(width / 2 + 10, 160 + 85);
  Encryption.addImage(EncryptionImg);
  Encryption.collider = 'k';
  Encryption.scale = .00055 * width;

  Chip = new Sprite(width / 2, height * .5);
  Chip.addImage(ChipImg);
  Chip.collider = 'k';

  BlackKey = new Sprite(width * .505, height * .5);
  BlackKey.addImage(BlackKeyImg);
  BlackKey.collider = 'k';
  BlackKey.scale = .0007 * width;

  loseComp = new Sprite(width / 2, height * .5);
  loseComp.addImage(loseCompImg);
  loseComp.collider = 'k';

  lockedComputer = new Sprite(width / 2, height * .5);
  lockedComputer.addImage(lockedComputerImg);
  lockedComputer.collider = 'k';

  cards = new Group();
  cards.collider = 'k';

  CipheredData = new cards.Sprite(width * .59875, height - 45);
  CipheredData.addImage(CipheredDataImg);
  CipheredData.scale = 0.00038 * width;
  cards[0] = CipheredData;
  CipheredData.originalPosition = createVector(width * .59875, height - 45);

  publicKey = new cards.Sprite(width * .49, height - 100);
  publicKey.addImage(publicKeyImg);
  publicKey.scale = 0.00038 * width;
  cards[1] = publicKey;
  publicKey.originalPosition = createVector(width * .49, height - 100);

  privateKey = new cards.Sprite(width * .7075, height - 105);
  privateKey.addImage(privateKeyImg);
  privateKey.scale = 0.00038 * width;
  cards[2] = privateKey;
  privateKey.originalPosition = createVector(width * .7075, height - 105);

  plaintext = new cards.Sprite(width * .38125, height - 45);
  plaintext.addImage(plaintextImg);
  plaintext.scale = 0.00038 * width;
  cards[3] = plaintext;
  plaintext.originalPosition = createVector(width * .38125, height - 45);

  decriptedplaintxt = new cards.Sprite(width * .2725, height - 95);
  decriptedplaintxt.addImage(decriptedplaintxtImg);
  decriptedplaintxt.scale = 0.00038 * width;
  cards[4] = decriptedplaintxt;
  decriptedplaintxt.originalPosition = createVector(width * .2725, height - 95);

  plaintext.pos = { x: -100, y: -100 };
  publicKey.pos = { x: -100, y: -100 };
  CipheredData.pos = { x: -100, y: -100 };
  privateKey.pos = { x: -100, y: -100 };
  decriptedplaintxt.pos = { x: -100, y: -100 };
  Encryption.pos = { x: -200, y: -200 };
  BlackKey.pos = { x: -400, y: -400 };
  loseComp.pos = { x: -400, y: -400 };
  lockedComputer.pos = { x: -400, y: -400 };
  Chip.pos = { x: -400, y: -400 };

  // adjust volumes
  gameAmp = 0.15;
  effectAmp = 0.5;

  gameMusic.amp(gameAmp);
  buttonPress.amp(effectAmp);
  cardPress.amp(effectAmp);
  cardSnap.amp(effectAmp);
  winJingle.amp(effectAmp);

  // set up volume control
  slider = createSlider(0, 1, 1, 0);
  muted = false;
  prevAmp = 1;
  sliderY = height + 10;
}


function draw() {
  // Set up the screen
  clear();
  background("white");


  if (screen === 0) {
    showStartScreen();
  }
  else if (screen === 1) {
    showInstructionScreen();
  }
  else if (screen === 2) {
    playOnce = true;
    // Define the text content
    // Set text properties
    const c = color(241, 180, 52);
    background(c);

    let imgX = 0;
    let imgY = 0;
    scale(.00016 * width);
    image(ChipImg, imgX, imgY);
    scale(1 / (.00016 * width));


    noStroke();
    strokeWeight(1);
    fill(255);
    rectMode(CENTER);
    rect(width / 2, 60, 1000, 100, 10);
    rectMode(CORNER);
    rect(200, 120, width - 400, height - 270, 10);
    // Display text content
    textSize(15);
    noStroke();
    fill(0);
    textAlign(CENTER, TOP); // Text alignment
    text("Asymmetric encryption, also known as public-key encryption, is a type of encryption algorithm that uses a pair of keys (public and private) to encrypt and decrypt data. The image provided is a flow chart showcasing the process of asymmetric encryption. As you can see the steps seem to have been mixed up. Rearrange the list so that it follows the steps in numerical order.", width / 2 - 500, 20, 1000, 360);

    // Learn More Button Border
    stroke(255);
    strokeWeight(2);
    fill(255);
    // Learn More Button
    noStroke();
    fill(255);
    rect(width - 150 + 1, height - 54, 138, 38, 10);
    fill(0);
    textSize(16);
    textAlign(CENTER, CENTER);
    text("Learn More", width - 80, height - 35);  // Learn More Button Text

    fill(255);
    noStroke();

    fill(0);
    noStroke();
    textSize(24);
    textAlign(CENTER);


    for (let card of cards) {
      handleDragging(card);
      snapToCenter(card);
    }
  }

  checkIfConfirm();
  //Check if we win!!!
  if (confirm && !cancel) {
    const c = color(0, 179, 115);
    fill(255);
    noStroke();
    rect(width / 2 - 140, height - 130, 300, 110, 10);
    fill(0);
    textSize(20);
    textAlign(LEFT);
    text('Submit Answer?', width / 2 - 95, height - 105);
    fill(c);
    rect(width / 2 + 20, height - 80, 120, 40, 10);
    fill(255);
    textSize(17);
    text("Submit", width / 2 + 42, height - 60);
    const r = color(195, 16, 16);
    fill(r);
    rect(width / 2 - 120, height - 80, 120, 40, 10);
    fill(255);
    text("Cancel", width / 2 - 105, height - 60);
  }

  else if (screen === 3) {
    showScreenWin();
  }

  else if (screen === 4) {
    showScreenLose();
  }

  volumeControl();
}

function windowResized() { //Adjusts size of canvas and screen elements based on screen size 
  resizeCanvas(windowWidth, windowHeight);
  Encryption.scale = .00055 * width;
  Encryption.pos = { x: width / 2, y: height / 2 - 20 };
  publicKey.scale = 0.00038 * width;
  publicKey.originalPosition = createVector(width * .49, height - 100);
  decriptedplaintxt.scale = 0.00038 * width;
  decriptedplaintxt.originalPosition = createVector(width * .2725, height - 95);
  plaintext.scale = 0.00038 * width;
  plaintext.originalPosition = createVector(width * .38125, height - 45);
  CipheredData.scale = 0.00038 * width;
  CipheredData.originalPosition = createVector(width * .59875, height - 45);
  privateKey.scale = 0.00038 * width;
  privateKey.originalPosition = createVector(width * .7075, height - 105);
  BlackKey.scale = .0007 * width;
  BlackKey.pos = { x: width * .5, y: height * .5 };
  center1 = createVector(width * .368, height * .487);
  center2 = createVector(width * .435, height * .68);
  center3 = createVector(width * .498, height * .51);
  center4 = createVector(width * .56, height * .68);
  center5 = createVector(width * .626, height * .487);
  canvas.pos = { x: 0, y: 0 }
}

function showStartScreen() {
  setCardsoffScreen();
  const c = color(241, 180, 52);
  background(c);

  let imgX = 0;
  let imgY = 0;
  scale(.00016 * width);
  image(ChipImg, imgX, imgY);
  scale(1 / (.00016 * width));

  fill(255);
  rectMode(CENTER);
  rect(width / 2, height / 8, 1000, height / 10, 10);
  rectMode(CORNER);

  // Set text properties
  fill(0); // Black color
  textSize(60);
  textFont(font);
  textAlign(CENTER, CENTER); // Text alignment
  text("Asymmetric Encryption\n\n", width / 2, height / 4.5);

  // Instructions button
  fill(255);
  noStroke();
  rect(width / 2 - 100, height - 120, 200, 40, 10);
  fill(0);
  textSize(20);
  text("Instructions", width / 2, height - 100);

  fill(255);
  rect(width * .395, height * .25, width * .21, height * .5, 10);
}


function showInstructionScreen() {
  setCardsoffScreen();
  background("white");

  let imgX = 0;
  let imgY = 0;
  scale(.00016 * width);
  image(ChipImg, imgX, imgY);
  scale(1 / (.00016 * width));

  fill(0);
  rectMode(CENTER);
  rect(width / 2, height / 3.25, 600, height / 10, 10);
  rectMode(CORNER);

  const c = color(241, 180, 52);
  // Set text properties
  fill(c); // Yellow color
  textSize(32); // Font size
  textAlign(CENTER, CENTER); // Text alignment
  text("Instructions\n\n", width / 2, height * .36);

  // Begin button
  fill(0);
  rect(width / 2 - 100, height - 120, 200, 40, 10);
  fill(255);
  textSize(20);
  text("Begin", width / 2, height - 100);


  textSize(18); // Adjusted font size
  textAlign(CENTER, TOP); // Adjusted text alignment

  // Additional text
  fill(color(0));
  let textX = width / 2 - 280; // X position for the additional text
  let textY = height / 2 - 60; // Starting Y position for the additional text
  let textLeading = 24; // Line spacing
  let textWidth = 575; // Width of the text block
  let additionalText = "Your objective is to correctly place each card into its designated slot. To play, click and hold on a card, then drag it to the slot where you think it belongs. Release the mouse to drop the card into place.\n\nRemember, each card has a specific slot it must occupy. When all cards have been placed, you'll see an option to check your answers. If you're correct, you'll have the option to play again.";

  text(additionalText, textX, textY, textWidth, height - textY); // Display additional text with specified width and height
}

function showScreenWin() {
  if (playOnce) {
    gameMusic.stop();
    winJingle.play();
  }
  playOnce = false;
  //Move extra icons off screen when win page is up
  setCardsoffScreen();
  const c = color(0, 179, 115);
  background(c);

  let imgX = 0;
  let imgY = 0;
  scale(.00016 * width);
  image(ChipImg, imgX, imgY);
  scale(1 / (.00016 * width));

  fill(255);
  rect(width * .33, height * .33, width * .35, height * .48, 10);

  //Set text properties
  fill(255, alphaValue);
  rect(width * .34, height * .1, width * .33, height * .2, 10);
  fill(0, alphaValue);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("You Win!\n\nThanks for playing!", width / 2, height * .2);

  //Animate alpha value for fading effect
  alphaValue += fadeSpeed;
  if (alphaValue > 255 || alphaValue < 0) {
    fadeSpeed *= -1; //Reverse the fade direction
  }

  //Restart button
  fill(255);
  rect(width / 2 - 100, height - 120, 200, 40, 10);
  fill(0);
  textSize(20);
  text("Restart", width / 2, height - 100);

  //display win image
  let imgX2 = lockedComputer.width + 14;
  let imgY2 = lockedComputer.height - 55;
  scale(.00095 * width);
  image(lockedComputerImg, imgX2, imgY2);
}

function showScreenLose() {
  setCardsoffScreen();
  const r = color(195, 16, 16);
  background(r);

  let imgX = 0;
  let imgY = 0;
  scale(.00016 * width);
  image(ChipImg, imgX, imgY);
  scale(1 / (.00016 * width));

  fill(255);
  rect(width * .33, height * .33, width * .35, height * .48, 10);

  //Set text properties
  fill(255, alphaValue);
  rect(width * .4, height * .1, width * .2, height * .2, 10);
  fill(0, alphaValue);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Not Quite!\n\nTry again?", width / 2, height * .2);

  //Animate alpha value for fading effect
  alphaValue += fadeSpeed;
  if (alphaValue > 255 || alphaValue < 0) {
    fadeSpeed *= -1; //Reverse the fade direction
  }

  //Restart button
  fill(255);
  rect(width / 2 - 100, height - 120, 200, 40, 10);
  fill(0);
  textSize(20);
  text("Restart", width / 2, height - 100);

  //display lose image
  let imgX2 = loseComp.width + 20;
  let imgY2 = loseComp.height - 20;
  scale(.001 * width);
  image(loseCompImg, imgX2, imgY2);
}

function volumeControl() {
    // mute button
    fill(0);
    circle(40, height - 40, 50);

    fill(235);
    circle(40, height - 40, 44);

    // button images
    let x = 990;
    let y = 34250;

    if (muted) {
        scale(.000013 * width);
        image(volume0Img, x, y);
        scale(1 / (.000013 * width));
    }
    else {
        scale(.000013 * width);
        image(volume1Img, x, y);
        scale(1 / (.000013 * width));
    }

    // volume slider movement
    let buttonCenterDist = dist(mouseX, mouseY, 40, height - 40);

    if (sliderY > height - 50 && mouseX < 250 && mouseY > height - 80) { // mouse in general area
        sliderY -= 5;
    }
    else if (sliderY <= height + 10 && (mouseX >= 250 || mouseY <= height - 80)) { // mouse outside general area
        sliderY += 5;
    }

    // volume slider
    slider.position(90, sliderY);

    fill(0);
    circle(95, sliderY + 10, 30);
    circle(220, sliderY + 10, 30);
    rectMode(CENTER);
    rect(157.5, sliderY + 10, 125, 30);

    fill(235);
    circle(95, sliderY + 10, 24);
    circle(220, sliderY + 10, 24);
    rectMode(CENTER);
    rect(157.5, sliderY + 10, 125, 24);

    // slider volume logic
    let currAmp = slider.value();

    // if the slider is moved while muted, unmute
    if (muted && (prevAmp != currAmp)) { muted = false; }

    if (currAmp <= 0) { muted = true; }

    if (!muted) {
        gameMusic.amp(gameAmp * currAmp);
        buttonPress.amp(effectAmp * currAmp);
        cardPress.amp(effectAmp * currAmp);
        cardSnap.amp(effectAmp * currAmp);
        winJingle.amp(effectAmp * currAmp);
    }
    else {
        gameMusic.amp(0);
        buttonPress.amp(0);
        cardPress.amp(0);
        cardSnap.amp(0);
        winJingle.amp(0);
    }

    prevAmp = currAmp;
}
