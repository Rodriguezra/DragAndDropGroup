let cards = [];
let Encrycption, CipheredData, publicKey, privateKey, plaintext, decriptedplaint;
let EncrycptionImg, CipheredDataImg, publicKeyImg, privateKeyImg, plaintextImg, decriptedplaintxtImg;
let center1, center2, center3, center4, center5;
let screen = 0;
let widthConstraint, heightConstraint;
let alphaValue = 0;
let fadeSpeed = 5;
let confirm = false;
let cancel = false;

//start = 0
//instructions = 1
//game = 2
//restart = 3
//lose = 4

function setCardsoffScreen() {
  plaintext.pos = { x: -100, y: -100 };
  publicKey.pos = { x: -100, y: -100 };
  CipheredData.pos = { x: -100, y: -100 };
  privateKey.pos = { x: -100, y: -100 };
  decriptedplaintxt.pos = { x: -100, y: -100 };
  Encrycption.pos = { x: -200, y: -200 };
}

function mousePressed() {

  if (screen === 0) { //on the start screen
    if (mouseX > width / 2 - 50 && mouseX < width / 2 + 50 && mouseY > height / 2 + 120 && mouseY < height / 2 + 160) {
      showInstructionScreen();
      screen = 1;
    }
  }
  else if (screen === 1 || screen === 3 || screen == 4) {// if on the instructions/restart/lose screen
    //press begin button or restart button pressed
    if (mouseX > width / 2 - 50 && mouseX < width / 2 + 50 && mouseY > height / 2 + 120 && mouseY < height / 2 + 160) {
      screen = 2;
      CipheredData.position = createVector(width / 4, height - (height / 3) + 85);
      publicKey.position = createVector(width / 4, height - (height / 3) + 135);
      privateKey.position = createVector(width / 2, height - (height / 3) + 35);
      plaintext.position = createVector(width / 2, height - (height / 3) + 85);
      decriptedplaintxt.position = createVector(width / 2, height - (height / 3) + 135);
      Encrycption.pos = { x: width / 2 + 10, y: 160 + 85 };
    }
  }
  else if (screen == 2 && confirm && !cancel) {
    if (mouseX > width / 2 + 20 && mouseX < width / 2 + 140 && mouseY > height / 2 + 170 && mouseY < height / 2 + 210) {
      if (
        dist(plaintext.x, plaintext.y, center1.x, center1.y) < 1 &&
        dist(publicKey.x, publicKey.y, center2.x, center2.y) < 1 &&
        dist(CipheredData.x, CipheredData.y, center3.x, center3.y) < 1 &&
        dist(privateKey.x, privateKey.y, center4.x, center4.y) < 1 &&
        dist(decriptedplaintxt.x, decriptedplaintxt.y, center5.x, center5.y) < 1
      ) {
        console.log("you win!");
        showScreenWin();
        screen = 3;
        confirm = false;
      }
      else {
        console.log("you lose!");
        showScreenLose();
        screen = 4;
        confirm = false;
      }
    }
    else if (mouseX > width / 2 - 120 && mouseX < width / 2 && mouseY > height / 2 + 170 && mouseY < height / 2 + 210) {
      confirm = false;
      cancel = true;
    }
  }
}


function handleDragging(card) {
  if (card.mouse.dragging()) { //The card is constrained within the game window
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
        card.position = center1;
        snapped = true;
        break;
      case dist(card.x, card.y, center2.x, center2.y) < 60 && !cards.some(c => c != card && dist(c.x, c.y, center2.x, center2.y) < 60):
        card.position = center2;
        snapped = true;
        break;
      case dist(card.x, card.y, center3.x, center3.y) < 60 && !cards.some(c => c != card && dist(c.x, c.y, center3.x, center3.y) < 60):
        card.position = center3;
        snapped = true;
        break;
      case dist(card.x, card.y, center4.x, center4.y) < 60 && !cards.some(c => c != card && dist(c.x, c.y, center4.x, center4.y) < 60):
        card.position = center4;
        snapped = true;
        break;
      case dist(card.x, card.y, center5.x, center5.y) < 60 && !cards.some(c => c != card && dist(c.x, c.y, center5.x, center5.y) < 60):
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

function checkIfConfirm() {
  let numSnapped = 0;
  for (let card of cards) {
    if ((card.x == center1.x && card.y == center1.y) || (card.x == center2.x && card.y == center2.y) || (card.x == center3.x && card.y == center3.y) || (card.x == center4.x && card.y == center4.y) || (card.x == center5.x && card.y == center5.y)) {
      numSnapped++;
    }
  }
  if (numSnapped == 5) {
    confirm = true;
  }
}

function preload() {
  EncrycptionImg = loadImage('assets/EncrycptionImg.png');
  CipheredDataImg = loadImage('assets/CipheredDataImg.png');
  publicKeyImg = loadImage('assets/publicKeyImg.png');
  privateKeyImg = loadImage('assets/privateKeyImg.png');
  plaintextImg = loadImage('assets/plaintextImg.png');
  decriptedplaintxtImg = loadImage('assets/decriptedplaintxtImg.png');
}

function setup() {
  createCanvas(650, 620);

  center1 = createVector(175, 175 + 85);
  center2 = createVector(250, 280 + 85);
  center3 = createVector(333, 187 + 85);
  center4 = createVector(407, 280 + 85);
  center5 = createVector(485, 175 + 85);

  Encrycption = new Sprite(width / 2 + 10, 160 + 85);
  Encrycption.addImage(EncrycptionImg);
  Encrycption.collider = 'k';

  cards = new Group();
  cards.collider = 'k';

  CipheredData = new cards.Sprite(width / 4, (height - (height / 3)) + 85);
  CipheredData.addImage(CipheredDataImg);
  CipheredData.scale = 0.50;
  cards[0] = CipheredData;
  CipheredData.originalPosition = createVector(width / 4, (height - (height / 3)) + 85);

  publicKey = new cards.Sprite((width / 4), height - (height / 3) + 135);
  publicKey.addImage(publicKeyImg);
  publicKey.scale = 0.50;
  cards[1] = publicKey;
  publicKey.originalPosition = createVector(width / 4, height - (height / 3) + 135);

  privateKey = new cards.Sprite(width / 2, height - (height / 3) + 35);
  privateKey.addImage(privateKeyImg);
  privateKey.scale = 0.50;
  cards[2] = privateKey;
  privateKey.originalPosition = createVector(width / 2, height - (height / 3) + 35);

  plaintext = new cards.Sprite(width / 2, height - (height / 3) + 85);
  plaintext.addImage(plaintextImg);
  plaintext.scale = 0.50;
  cards[3] = plaintext;
  plaintext.originalPosition = createVector(width / 2, height - (height / 3) + 85);

  decriptedplaintxt = new cards.Sprite(width / 2, height - (height / 3) + 135);
  decriptedplaintxt.addImage(decriptedplaintxtImg);
  decriptedplaintxt.scale = 0.50;
  cards[4] = decriptedplaintxt;
  decriptedplaintxt.originalPosition = createVector(width / 2, height - (height / 3) + 135);


  plaintext.pos = { x: -100, y: -100 };
  publicKey.pos = { x: -100, y: -100 };
  CipheredData.pos = { x: -100, y: -100 };
  privateKey.pos = { x: -100, y: -100 };
  decriptedplaintxt.pos = { x: -100, y: -100 };
  Encrycption.pos = { x: -200, y: -200 };

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
    // Define the text content
    // Set text properties
    const c = color(0, 179, 115);
    stroke(0);
    fill(255); 
    rect(20, 10, 620, 74, 10);
    // Display text content
    textSize(12);
    noStroke();
    fill(0);
    textAlign(LEFT, TOP); // Text alignment
    text("Asymmetric encryption, also known as public-key encryption, is a type of encryption algorithm that uses a pair of keys (public and private) to encrypt and decrypt data. The image provided is a flow chart showcasing the process of asymmetric encryption. As you can see the steps seem to have been mixed up. Rearrange the list so that it follows steps 1-5 in the correct order.", 30, 20, 600, 360);


    for (let card of cards) {
      handleDragging(card);
      snapToCenter(card);
    }
  }

  checkIfConfirm();
  //Check if we win!!!
  if (confirm && !cancel) {
    const c = color(0, 179, 115);
    fill(c);
    noStroke();
    rect((width / 2) - 140, height / 2 + 125, 300, 100, 10);
    fill(255);
    textSize(20);
    text('Submit Answer?', width / 2 - 55, height - 170);
    fill(255);
    rect(width / 2 + 20, height / 2 + 170, 120, 40, 10);
    fill(0);
    textSize(17);
    text("Submit", width / 2 + 55, height / 2 + 182);
    fill(255);
    rect(width / 2 - 120, height / 2 + 170, 120, 40, 10);
    fill(0);
    text("Cancel", width / 2 - 85, height / 2 + 182);
  }

  else if (screen === 3) {
    showScreenWin();
  }

  else if (screen == 4) {
    showScreenLose();
  }
}

function showStartScreen() {
  setCardsoffScreen();
  const c = color(0, 179, 115);
  background(c);

  // Set text properties
  fill(255); // White color
  textSize(32); // Font size
  textAlign(CENTER, CENTER); // Text alignment
  text("Asymmetric Encryption\n\n", width / 2, height / 2 - 200);

  // Instructions button
  fill(255);
  noStroke();
  rect(width / 2 - 75, height / 2 + 120, 150, 40, 10);
  fill(0);
  textSize(20);
  text("Instructions", width / 2, height / 2 + 140);
}


function showInstructionScreen() {
  setCardsoffScreen();
  background("white");
  const c = color(0, 179, 115);
  // Set text properties
  fill(c); // Black color
  textSize(32); // Font size
  textAlign(CENTER, CENTER); // Text alignment
  text("Instructions\n\n", width / 2, height / 2 - 200);

  // Begin button
  fill(c);
  rect(width / 2 - 50, height / 2 + 120, 100, 40, 10);
  fill(255);
  textSize(20);
  text("Begin", width / 2, height / 2 + 140);


  textSize(18); // Adjusted font size
  textAlign(LEFT, TOP); // Adjusted text alignment

  // Additional text
  fill(color(0));
  let textX = 50; // X position for the additional text
  let textY = height / 2 - 150; // Starting Y position for the additional text
  let textLeading = 24; // Line spacing
  let textWidth = width - 100; // Width of the text block
  let additionalText = "Your objective is to correctly place each card into its designated slot. To play, click and hold on a card, then drag it to the slot where you think it belongs. Release the mouse to drop the card into place.\n\nRemember, each card has a specific slot it must occupy. When all cards have been placed, you'll see an option to check your answers. If you're correct, you'll have the option to play again.";

  text(additionalText, textX, textY, textWidth, height - textY); // Display additional text with specified width and height


}

function showScreenWin() {
  // Move extra icons off screen when win page is up
  setCardsoffScreen();
  const c = color(0, 179, 115);
  background(c);

  /**
  // Set text properties
  fill(255); // White color
  textSize(32); // Font size
  textAlign(CENTER, CENTER); // Text alignment
  text("You Win!\n\nThanks for playing!", width / 2, height / 2 - 100);

**/

  // Set text properties
  fill(255, alphaValue); // White color with alpha value
  textSize(32); // Font size
  textAlign(CENTER, CENTER); // Text alignment
  text("You Win!\n\nThanks for playing!", width / 2, height / 2 - 100);

  // Animate alpha value for fading effect
  alphaValue += fadeSpeed;
  if (alphaValue > 255 || alphaValue < 0) {
    fadeSpeed *= -1; // Reverse the fade direction
  }
  // Restart button
  fill(255);
  rect(width / 2 - 50, height / 2 + 120, 100, 40, 10);
  fill(0);
  textSize(20);
  text("Restart", width / 2, height / 2 + 140);
}

function showScreenLose() {
  setCardsoffScreen();
  background("red");

  // Set text properties
  fill(255); // White color
  textSize(32); // Font size
  textAlign(CENTER, CENTER); // Text alignment
  text("You Lose!\n\nTry again?", width / 2, height / 2 - 100);

  // Instructions button
  fill(255);
  rect(width / 2 - 75, height / 2 + 120, 150, 40, 10);
  fill(0);
  textSize(20);
  text("Restart", width / 2, height / 2 + 140);
}
