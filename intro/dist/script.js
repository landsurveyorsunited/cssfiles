//Initialize the app container
const app = document.getElementById("app");

//Add some classes to the app container
app.classList.add(
  "bg-indigo-100",
  "h-screen",
  "w-width",
  "flex",
  "items-center",
  "relative"
);

//Array of majors to list out:
const ourMajors = [
  "Africa Land Surveyors",
"Angola Land Surveyors",
"Algeria Land Surveyors",
"Benin Land Surveyors",
"Botswana Land Surveyors",
"Cameroon Land Surveyors",
"Ethiopia Land Surveyors",
"Egypt Land Surveyors",
"Ghana Land Surveyors",
"Ivory Coast Land Surveyors",
"Liberia Land Surveyors",
"Kenya Land Surveyors",
"Malawi Land Surveyors",
"Madagascar Land Surveyors",
"Morocco Land Surveyors",
"Mozambique Land Surveyors",
"Namibia Land Surveyors",
"Nigeria Land Surveyors",
"Uganda Land Surveyors",
"Rwanda Land Surveyors",
"South Africa Land Surveyors",
"Senegal Land Surveyors",
"Sudan Land Surveyors",
"Zimbabwe Land Surveyors",
"Asia Land Surveyors",
"Afghanistan Land Surveyors",
"China Land Surveyors",
"Japan Land Surveyors",
"India Land Surveyors",
"Sri Lanka Land Surveyors",
"Philippines Land Surveyors",
"Malaysia Land Surveyors",
"Singapore Land Surveyors",
"Taiwan Land Surveyors",
"Thailand Land Surveyors",
"Nepal Land Surveyors",
"Pakistan Land Surveyors",
"North America Land Surveyors",
"Canada Land Surveyors",
"Mexico Land Surveyors",
"United States Land Surveyors",
"Arizona Land Surveyors",
"Alabama Land Surveyors",
"Alaska Land Surveyors",
"Arkansas Land Surveyors",
"California Land Surveyors",
"Connecticut Land Surveyors",
"Delaware Land Surveyors",
"Florida Land Surveyors",
"Georgia Land Surveyors",
"Hawaii Land Surveyors",
"Illinois Land Surveyors",
"Indiana Land Surveyors",
"Iowa Land Surveyors",
"Kansas Land Surveyors",
"Kentucky Land Surveyors",
"Maine Land Surveyors",
"Maryland Land Surveyors",
"Massachusetts Land Surveyors",
"Michigan Land Surveyors",
"Minnesota Land Surveyors",
"Missouri Land Surveyors",
"Montana Land Surveyors",
"Nebraska Land Surveyors",
"Nevada Land Surveyors",
"New Hampshire Land Surveyors",
"New York Land Surveyors",
"North Carolina Land Surveyors",
"North Dakota Land Surveyors",
"New Mexico Land Surveyors",
"Oklahoma Land Surveyors",
"Ohio Land Surveyors",
"Oregon Land Surveyors",
"Pennsylvania Land Surveyors",
"Rhode Island Land Surveyors",
"South Carolina Land Surveyors",
"South Dakota Land Surveyors",
"Texas Land Surveyors",
"Utah Land Surveyors",
"Vermont Land Surveyors",
"Virginia Land Surveyors",
"Washington Land Surveyors",
"Wyoming Land Surveyors",
"Wisconsin Land Surveyors",
"West Virginia Land Surveyors",
"USA Surveying Events Land Surveyors",
"South America Land Surveyors",
"Brazil Land Surveyors",
"Colombia Land Surveyors",
"Argentina Land Surveyors",
"Peru Land Surveyors",
"Venezuela Land Surveyors",
"Chile Land Surveyors",
"Ecuador Land Surveyors",
"Bolivia Land Surveyors",
"Paraguay Land Surveyors",
"Uruguay Land Surveyors",
"Guyana Land Surveyors",
"Suriname Land Surveyors",
"French Guiana Land Surveyors",
"Falkland Islands Land Surveyors",
"Europe Land Surveyors",
"France Land Surveyors",
"Spain Land Surveyors",
"UK Land Surveyors",
"Germany Land Surveyors",
"Poland Land Surveyors",
"Switzerland Land Surveyors",
"Ireland Land Surveyors",
"Hungary Land Surveyors",
"Romania Land Surveyors",
"Italy Land Surveyors",
"Bulgaria Land Surveyors",
"Greece Land Surveyors",
"Portugal Land Surveyors",
"Serbia Land Surveyors",
"Belgium Land Surveyors",
"Russia Land Surveyors",
"Turkey Land Surveyors",
"Ukraine Land Surveyors",
"Sweden Land Surveyors",
"Norway Land Surveyors",
"Denmark Land Surveyors",
"Albania Land Surveyors",
"Middle Eastern Surveyors",
"Bahrain Land Surveyors",
"Cyprus Land Surveyors",
"Egypt Land Surveyors",
"Iran Land Surveyors",
"Iraq Land Surveyors",
"Israel Land Surveyors",
"Jordan Land Surveyors",
"Kuwait Land Surveyors",
"Lebanon Land Surveyors",
"Oman Land Surveyors",
"Palestine Land Surveyors",
"Qatar Land Surveyors",
"Saudi Arabia Land Surveyors",
"Syria Land Surveyors",
"Turkey Land Surveyors",
"United Arab Emirates Land Surveyors",
"Yemen Land Surveyors",
"Oceania Surveyors", 
"Australia Land Surveyors",
"New Zealand Land Surveyors",
"Fiji Land Surveyors",
"Marshall Islands Land Surveyors",
"Papua New Guinea Land Surveyors",
"Palau Land Surveyors",
"Kiribati Land Surveyors",
"Vanuatu Land Surveyors",
"Samoa Land Surveyors",
"Solomon Islands Land Surveyors"
];

//Create the container that will hold our rows of lists
const listContainer = () => {
  const listContainer = document.createElement("div");
  listContainer.classList.add(
    "majors__container",
    "mx-auto",
    "overflow-hidden",
    "bg-white"
  );

  //Add another div to rotate the lists to make a little more interesting
  const slantContainer = document.createElement("div");
  slantContainer.classList.add("majors__slant");

  //This is to alternate classes between odd + even
  let even = false;

  //Loop to create the multiple rows
  for (i = 0; i < 15; i++) {
    //Shuffle the array so that the lists appear randomized
    ourMajors.sort(() => {
      return 0.5 - Math.random();
    });

    //Pass the array into the list parameter as well as the even parameter
    slantContainer.appendChild(list(ourMajors, even));

    //toggle the variable to make sure it differentiates on the next iteration
    even = !even;
  }

  //Add the slanted container to the list container
  listContainer.appendChild(slantContainer);

  //Add the list container to the app
  app.appendChild(listContainer);
};

//Creates the list
const list = (items, even) => {
  const listEl = document.createElement("ul");
  listEl.classList.add("majors__list", "flex");

  //Uses the even parameter to determine if the --even or --odd modifier classes should be applied
  if (even) {
    listEl.classList.add("majors__list--even");
  } else {
    listEl.classList.add("majors__list--odd");
  }

  items.forEach((item) => {
    listEl.appendChild(listItem(item));
  });
  return listEl;
};

//Creates the list item
const listItem = (item) => {
  const listItemEl = document.createElement("li");
  listItemEl.classList.add(
    "majors__list-item",
    "whitespace-no-wrap",
    "mx-4",
    "my-2",
    "text-3xl",
    "uppercase",
    "text-gray-500"
  );
  listItemEl.innerText = item;
  return listItemEl;
};

//initializes the listContainer and renders it in the DOM
listContainer();

//Store the odd and even elements into arrays
const evenRows = document.querySelectorAll(".majors__list--even");
const oddRows = document.querySelectorAll(".majors__list--odd");

//Animation will be a very slow, gentle sliding effect that alternates directions between rows

//Add animation for the even rows
evenRows.forEach((row) => {
  const rowTL = gsap.timeline();

  rowTL.to(row, {
    transform: "translate(0)",
    duration: 800,
    ease: "power2"
  });
});

//Add animation for the odd rows
oddRows.forEach((row) => {
  const rowTL = gsap.timeline();

  rowTL.to(row, {
    transform: "translate(-100%)",
    duration: 800,
    ease: "power2"
  });
});

//For the overlay, we want it to be semi-opaque so that the background still appears, but we still want the message to be readable

const overlay = () => {
  //Create the overlay
  const messageOverlay = document.createElement("div");
  messageOverlay.classList.add(
    "majors__overlay",
    "absolute",
    "top-0",
    "h-full",
    "w-full",
    "left-0",
    "flex",
    "items-center",
    "justify-center"
  );

  //Create the inner message container
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("majors__message-container");

  //Add the inner Message HTML
  messageContainer.innerHTML = `
    <div class="message flex flex-col">
      <div class="message__content flex items-center justify-center w-full mb-4">
        <div class="message__callout flex flex-col items-center justify-center w-24">
          <span class="text-6xl text-indigo-500 font-black leading-none">17k</span>
          <span class="p-0 m-0 text-xl uppercase font-black leading-none">Surveyors</span>
        </div>
        <div class="message__text mx-2">
          <p class="text-3xl w-56 uppercase font-black leading-none">GLobal Surveyor COMMUNITY </p>
        </div>
      </div>
      <div class="message__actions flex items-center justify-center">
        <a class="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 text-white text-xl font-bold uppercase rounded-lg" href="https://landsurveyorsunited.com/hubs">Find Your Local Survey Community</a>
      </div>
    </div>

  `;

  //Add the message to the overlay
  messageOverlay.appendChild(messageContainer);

  return messageOverlay;
};

//Add the overlay to the app
app.appendChild(overlay());

//create the animation for the overlay
const messageOverlay = document.querySelector(".majors__overlay");
const messageOverlayTL = gsap.timeline();

messageOverlayTL.to(messageOverlay, {
  opacity: 1,
  duration: 0.5,
  delay: 4,
  ease: "power2"
});