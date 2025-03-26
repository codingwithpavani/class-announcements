
// // POST ANNOUNCEMENT
// function postAnnouncement() {
//     let text = document.getElementById("announcement-input").value.trim();
//     let link = document.getElementById("link-input").value.trim();
//     let isPinned = document.getElementById("pin-checkbox").checked;

//     if (text === "") {
//         alert("Please enter an announcement.");
//         return;
//     }
    

//     let announcements = JSON.parse(localStorage.getItem("announcements")) || [];
//     let announcement = { text, link, isPinned };

//     if (isPinned) {
//         announcements.unshift(announcement);
//     } else {
//         announcements.push(announcement);
//     }

//     localStorage.setItem("announcements", JSON.stringify(announcements));
//     displayAnnouncements();

//     let imageFile = document.getElementById("image-input").files[0];
// if (imageFile) {
//     let reader = new FileReader();
//     reader.onload = function(e) {
//         let img = document.createElement("img");
//         img.src = e.target.result;
//         img.style.maxWidth = "100px";
//         listItem.appendChild(img);
//     };
//     reader.readAsDataURL(imageFile);
// }


//     document.getElementById("announcement-input").value = "";
//     document.getElementById("link-input").value = "";
//     document.getElementById("pin-checkbox").checked = false;

//     updateNotificationBadge();


// }


function postAnnouncement() {
    let text = document.getElementById("announcement-input").value.trim();
    let link = document.getElementById("link-input").value.trim();
    let isPinned = document.getElementById("pin-checkbox").checked;
    let imageInput = document.getElementById("image-input").files[0];

    if (text === "") {
        alert("Please enter an announcement.");
        return;
    }

    let announcements = JSON.parse(localStorage.getItem("announcements")) || [];

    let announcement = { text, link, isPinned, image: null }; // Default image to null

    if (imageInput) {
        let reader = new FileReader();
        reader.onload = function (e) {
            announcement.image = e.target.result; // Store Base64 image

            if (isPinned) {
                announcements.unshift(announcement);
            } else {
                announcements.push(announcement);
            }

            localStorage.setItem("announcements", JSON.stringify(announcements));
            displayAnnouncements();
        };

        reader.readAsDataURL(imageInput);
    } else {
        if (isPinned) {
            announcements.unshift(announcement);
        } else {
            announcements.push(announcement);
        }

        localStorage.setItem("announcements", JSON.stringify(announcements));
        displayAnnouncements();
    }

    // Clear inputs
    document.getElementById("announcement-input").value = "";
    document.getElementById("link-input").value = "";
    document.getElementById("pin-checkbox").checked = false;
    document.getElementById("image-input").value = "";

    updateNotificationBadge();
}

// DISPLAY ANNOUNCEMENTS
function displayAnnouncements() {
    let list = document.getElementById("announcement-list"); // fixed ID here
    list.innerHTML = "";
    

    let announcements = JSON.parse(localStorage.getItem("announcements")) || [];
    announcements.forEach((announcement, index) => {
        let listItem = document.createElement("li");

        // Text
        if (announcement.text) {
            let textNode = document.createElement("p");
            textNode.textContent = announcement.text;
            listItem.appendChild(textNode);
        }

        // Link
        if (announcement.link) {
            let linkNode = document.createElement("a");
            linkNode.href = announcement.link;
            linkNode.textContent = "Click here";
            linkNode.target = "_blank";
            listItem.appendChild(linkNode);
        }

        
        // Image
        if (announcement.image) {
            let img = document.createElement("img");
            img.src = announcement.image;
            img.style.maxWidth = "150px";
            img.style.display = "block";
            img.style.marginTop = "10px";
            img.style.marginLeft = "1600px";
            listItem.appendChild(img);
            
        }

        // Delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = `<button id="delete">delete</button>`;
        deleteBtn.style.marginLeft = "10px";
        deleteBtn.onclick = function () {
            deleteAnnouncement(index);
        };

        listItem.appendChild(deleteBtn);
        list.appendChild(listItem);
    });
}

function deleteAnnouncement(index) {
    let announcements = JSON.parse(localStorage.getItem("announcements")) || [];
    announcements.splice(index, 1);
    localStorage.setItem("announcements", JSON.stringify(announcements));
    displayAnnouncements();
}

// STUDY RESOURCE FUNCTIONS
function addResource() {
    let title = document.getElementById("resource-title").value.trim();
    let link = document.getElementById("resource-link").value.trim();
    if (title === "" || link === "") {
        alert("Please enter both title and link.");
        return;
    }

    let resources = JSON.parse(localStorage.getItem("studyResources")) || [];
    resources.push({ title, link });
    localStorage.setItem("studyResources", JSON.stringify(resources));

    displayResources();
    document.getElementById("resource-title").value = "";
    document.getElementById("resource-link").value = "";
}

function displayResources() {
    let list = document.getElementById("resource-list");
    list.innerHTML = "";
    
    list.classList.add("relist");
    let resources = JSON.parse(localStorage.getItem("studyResources")) || [];
    resources.forEach((resource, index) => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `<a href="${resource.link}" target="_blank">${resource.title}</a> 
        <button class="delete-btn" onclick="deleteResource(${index})">delete</button>`;
        
        list.appendChild(listItem);
    
    });
}

function deleteResource(index) {
    let resources = JSON.parse(localStorage.getItem("studyResources")) || [];
    resources.splice(index, 1);
    localStorage.setItem("studyResources", JSON.stringify(resources));
    displayResources();
}

// POLL FUNCTIONS
function createPoll() {
    let question = document.getElementById("poll-question").value.trim();
    if (question === "") {
        alert("Please enter a question.");
        return;
    }

    let poll = { question, votes: { Yes: 0, No: 0 } };
    localStorage.setItem("poll", JSON.stringify(poll));

    displayPoll();
    document.getElementById("poll-question").value = "";
}

function displayPoll() {
    let pollContainer = document.getElementById("poll-container");
    pollContainer.innerHTML = "";

    let poll = JSON.parse(localStorage.getItem("poll"));
    if (!poll) return;

    let questionEl = document.createElement("h3");
    questionEl.textContent = poll.question;

    let yesButton = document.createElement("button");
    yesButton.textContent = `Yes (${poll.votes.Yes})`;
    yesButton.onclick = function () { vote("Yes"); };
    yesButton.style.marginRight = "10px";


    let noButton = document.createElement("button");
    noButton.textContent = `No (${poll.votes.No})`;
    noButton.onclick = function () { vote("No"); };

    pollContainer.appendChild(questionEl);
    pollContainer.appendChild(yesButton);
    pollContainer.appendChild(noButton);
}

function vote(option) {
    let poll = JSON.parse(localStorage.getItem("poll"));
    if (!poll) return;

    poll.votes[option]++;
    localStorage.setItem("poll", JSON.stringify(poll));

    displayPoll();
}

// DOMContentLoaded handlers
document.addEventListener("DOMContentLoaded", function () {
    displayAnnouncements();
    displayResources();
    displayPoll();
});


if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker.register("service-worker.js")
            .then((registration) => {
                console.log("Service Worker registered with scope:", registration.scope);
            })
            .catch((error) => {
                console.log("Service Worker registration failed:", error);
            });
    });
}
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js")
        .then(() => console.log("Service Worker Registered"));
}



