function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array
}

let images = [
  "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
  "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80",
  "https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688?k=20&m=517188688&s=612x612&w=0&h=i38qBm2P-6V4vZVEaMy_TaTEaoCMkYhvLCysE7yJQ5Q=",
  "https://media.istockphoto.com/photos/humayun-tomb-new-delhi-india-picture-id505239248?k=20&m=505239248&s=612x612&w=0&h=-VDBIaBQquH4MEiLgeCwzhndOAGhIBjKseW_trSmWqo=",
  "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  "https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg",
  "https://image.shutterstock.com/image-photo/ancient-temple-ruins-gadi-sagar-260nw-786126286.jpg",
  "https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg",
];

images = [...images, ...images];
images = shuffleArray(images);

let firstClick = null,
  secondClick = null;

let score = 0,
  moves = 0;

const imageCollage = document.getElementById("image-collage");
let c = 0;

for (let i in images) {
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("imageContainer");
  imageContainer.classList.add("imageContainer" + c);
  c++;

  const image = document.createElement("img");
  image.classList.add("image");
  image.src = images[i];

  imageContainer.appendChild(image);
  imageCollage.appendChild(imageContainer);
}

const imageContainer = document.getElementsByClassName("imageContainer");
Array.from(imageContainer).map((imgCnt) => {
  imgCnt.addEventListener("click", () => {
    const image = imgCnt.children[0];
    if (image.style.visibility !== "unset") {
      image.style.visibility = "unset";
      moves++;
      document.getElementById("moves1").innerHTML = moves;
    }
    if (firstClick === null) {
      firstClick = imgCnt;
    } else if (secondClick == null) {
      if (
        Array.from(imgCnt.classList)[1] !== Array.from(firstClick.classList)[1]
      ) {
        secondClick = imgCnt;
        if (firstClick.children[0].src !== secondClick.children[0].src) {
          setTimeout(() => {
            let firstClickImage = firstClick.children[0];
            firstClickImage.style.visibility = "hidden";

            let secondClickImage = secondClick.children[0];
            secondClickImage.style.visibility = "hidden";
            firstClick = null;
            secondClick = null;
          }, 500);
        } else {
          score++;
          document.getElementById("score1").innerHTML = score;
          firstClick = null;
          secondClick = null;

          if (score >= 8) {
            alert("Game Over");
            setTimeout(() => {
              location.reload();
            }, 1000);
          }
        }
      }
    }
  });
});

let h = 0,
  m = 0,
  s = 0;

setInterval(() => {
  s++;
  if (s >= 60) {
    s = 0;
    m++;
  }
  if (m >= 60) {
    m = 0;
    h++;
  }

  let timer = "";
  if (h < 10) {
    timer += "0";
  }
  timer += h + ":";
  if (m < 10) {
    timer += "0";
  }
  timer += m + ":";
  if (s < 10) {
    timer += "0";
  }
  timer += s;
  document.getElementById("time1").innerHTML = timer;
}, 1000);
