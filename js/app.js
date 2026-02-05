// Toogle between screens & tab : the first one has activated.

// Tab doc:
const tabs = document.querySelector(".tabs");
const screens = document.querySelector(".screens");
let currentActiveTab = tabs.children[0];
let currentActiveScreen = screens.children[0];

tabs.addEventListener("click", (e) => {
  let target = e.target.closest(".tab");
  if (!target) return null;
  let targetedTab = target.classList[1];

  // Remove the activated class from the 'currentActiveTab' & 'currentActiveScreen';
  currentActiveTab.classList.remove("activated");
  currentActiveScreen.classList.remove("activated");

  // Add the activated class to the 'targeted Tab' & 'targeted Screen';
  let targetScreen = screens.children.item(+targetedTab);
  target.classList.add("activated");
  targetScreen.classList.add("activated");

  // Assign
  currentActiveTab = target;
  currentActiveScreen = targetScreen;
});



