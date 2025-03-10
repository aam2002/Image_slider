const image = document.querySelectorAll("img");
const LeftBtn = document.getElementById("left");
const RightBtn = document.getElementById("right");
let dots = document.getElementById("navDots");
let dotElement = document.getElementsByClassName("dot");
let container = document.getElementById("container");

//Dot Creater()
function dotCreater() {
  dots.innerHTML = "";
  image.forEach((img, i) => {
    const dotElement = document.createElement("div");
    dotElement.innerHTML = `
<div class="dot ${i == 0 ? "active" : ""}" id="slide${
      i + 1
    }" attr="${i}" onclick= "slideNavigate(this)"></div>`;
    dots.append(dotElement);
  });
}
dotCreater();

var counter = 0;

//Right button
const moveRight = () => {
  image[counter].style.animation = "right1 .5s ease-in forwards";
  image[counter].classList.remove("active");
  dotElement[counter].classList.remove("active");
  if (counter >= image.length - 1) {
    counter = 0;
  } else {
    counter++;
  }
  image[counter].style.animation = "right2 .5s ease-in forwards";
  dotElement[counter].classList.add("active");
};

//Left Button
const moveLeft = () => {
  image[counter].style.animation = "left1 .5s ease-in forwards";
  dotElement[counter].classList.remove("active");

  if (counter == 0) {
    counter = image.length - 1;
  } else {
    counter--;
  }
  image[counter].style.animation = "left2 .5s ease-in forwards";
  dotElement[counter].classList.add("active");
};

RightBtn.addEventListener("click", moveRight);
LeftBtn.addEventListener("click", moveLeft);

function autoPlay() {
  slider = setInterval(() => {
    moveRight();
  }, 1000);
}
autoPlay();

//Autoplay off
container.addEventListener("mouseover", () => {
  clearInterval(slider);
});

//Autoplay on
container.addEventListener("mouseout", () => {
  autoPlay();
});

function dotIndicator(count) {
  for (let i = 0; i < image.length; i++) {
    dots.children[i].children[0].classList.remove("active");
  }
  dots.children[count].children[0].classList.add("active");
}

function slideNavigate(currentImg) {
  let ImageId = Number(currentImg.getAttribute("attr"));
  if (ImageId > counter) {
    image[counter].style.animation = "left1 .5s ease-in forwards";
    counter = ImageId;
    image[counter].style.animation = "left2 .5s ease-in forwards";
    dotIndicator(counter);
  } else if (counter == ImageId) {
    return;
  } else {
    image[counter].style.animation = "right1 .5s ease-in forwards";
    counter = ImageId;
    image[counter].style.animation = "right2 .5s ease-in forwards";
    dotIndicator(counter);
  }
}
