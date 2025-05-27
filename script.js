const container = document.querySelector(".container");

const cardData = [
  {
    src: "images/Mask group (2).png",
    title: "Val Thorens",
  },
  {
    src: "images/pexels-kassandre-pedro-8639743 1.png",
    title: "Restaurant terrace",
  },
  {
    src: "images/Mask group (3).png",
    title: "An outdoor cafe",
  },
  {
    src: "images/Mask group (4).png",
    title: "A very long bridge, over the forest...",
  },
  {
    src: "images/pexels-kassandre-pedro-8639743 1 (1).png",
    title: "Tunnel with morning light",
  },
  {
    src: "images/pexels-kassandre-pedro-8639743 1 (2).png",
    title: "Mountain house",
  },
];


// create card function
function createCard({ src, title }) {
  const cardImgDiv = document.createElement("div");

  const image = document.createElement("img");
  image.classList.add("img-card");
  image.src = src;

  image.addEventListener("click", () => {
    document.getElementById("previewImage").src = src;
    document.getElementById("previewTitle").textContent = title;
    document.getElementById("imagePreviewModal").style.display = "flex";
    document.querySelector(".non-modals").classList.add("blurred");
  });

  const likeText = document.createElement("div");
  likeText.classList.add("img-text");
  const imgText = document.createElement("span");
  imgText.textContent = title;

  const likeImg = document.createElement("img");
  likeImg.classList.add("like");
  likeImg.src = "images/Union.png";
  likeImg.alt = "like-img";

  likeImg.addEventListener("click", (e) => {
    e.stopPropagation();
    likeImg.classList.toggle("liked");
    likeImg.src = likeImg.classList.contains("liked")
      ? "images/heart.png"
      : "images/Union.png";
  });

  likeText.append(imgText, likeImg);
  cardImgDiv.append(image, likeText);

  return cardImgDiv;
}


// render the images for each card in the create card
const renderImages = () => {
  for (let i = 0; i < cardData.length; i += 3) {
    const cardSpace = document.createElement("div");
    cardSpace.classList.add("card-space");

    const rowCard = cardData.slice(i, i + 3);
    rowCard.forEach((card) => {
      const cardImgDiv = createCard(card);
      cardSpace.append(cardImgDiv);
    });

    container.append(cardSpace);
  }
};

renderImages();

// Edit Profile Modal
const editBtn = document.querySelector(".edit-profile");
const editModal = document.getElementById("editModal");
const closeModalBtn = document.getElementById("closeModal");
const editForm = document.getElementById("editForm");

const nameInput = document.getElementById("nameInput");
const titleInput = document.getElementById("titleInput");
const avatarInput = document.getElementById("avatarInput");

const nameDisplay = document.querySelector(".header-name");
const titleDisplay = document.querySelector(".header-title");
const avatarDisplay = document.querySelector(".profile-pic");

editBtn.addEventListener("click", () => {
  editModal.style.display = "block";
  nameInput.value = nameDisplay.textContent;
  titleInput.value = titleDisplay.textContent;
  document.querySelector(".non-modals").classList.add("blurred");
});

closeModalBtn.addEventListener("click", () => {
  editModal.style.display = "none";
  document.querySelector(".non-modals").classList.remove("blurred");
});

editForm.addEventListener("submit", function (e) {
  e.preventDefault();

  nameDisplay.textContent = nameInput.value;
  titleDisplay.textContent = titleInput.value;

  const file = avatarInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      avatarDisplay.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  editModal.style.display = "none";
  document.querySelector(".non-modals").classList.remove("blurred");
});

// Image Preview Modal
const modal = document.getElementById("imagePreviewModal");
const closeImgModal = document.querySelector(".close");

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    document.querySelector(".non-modals").classList.remove("blurred");
  }
});

const modalContent = document.querySelector("#imagePreviewModal .modal-content");
modalContent.addEventListener("click", (e) => {
  e.stopPropagation();
});

closeImgModal.addEventListener("click", () => {
  modal.style.display = "none";
  document.querySelector(".non-modals").classList.remove("blurred");
});

// New Post Modal
const newPostBtn = document.querySelector(".new-post");
const newPostModal = document.getElementById("newPostModal");
const closeNewPostModal = document.getElementById("closeNewPostModal");
const newPostForm = document.getElementById("newPostForm");
const newImageInput = document.getElementById("newImageInput");
const newTitleInput = document.getElementById("newTitleInput");

newPostBtn.addEventListener("click", () => {
  newPostModal.style.display = "flex";
  document.querySelector(".non-modals").classList.add("blurred");
});

closeNewPostModal.addEventListener("click", () => {
  newPostModal.style.display = "none";
  newPostForm.reset();
  document.querySelector(".non-modals").classList.remove("blurred");
});

newPostForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const file = newImageInput.files[0];
  const title = newTitleInput.value.trim();

  if (file && title) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const newCard = createCard({ src: event.target.result, title });

      let cardSpace = document.querySelector(".card-space:last-child");

      // Ensure new row if last row has 3 cards
      if (cardSpace && cardSpace.children.length < 3) {
        cardSpace.appendChild(newCard);
      } else {
        cardSpace = document.createElement("div");
        cardSpace.classList.add("card-space");
        cardSpace.appendChild(newCard);
        container.appendChild(cardSpace);
      }
    };
    reader.readAsDataURL(file);
  }

  newPostForm.reset();
  newPostModal.style.display = "none";
  document.querySelector(".non-modals").classList.remove("blurred");
});
