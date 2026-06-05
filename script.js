let events = [
    {
        name: "Web Development Workshop",
        date: "2026-06-15",
        description: "Learn modern web technologies."
    },
    {
        name: "AI Seminar",
        date: "2026-07-01",
        description: "Introduction to Artificial Intelligence."
    },
    {
        name: "Past Conference",
        date: "2025-01-10",
        description: "Completed event."
    }
];

const eventList = document.getElementById("eventList");
const form = document.getElementById("eventForm");
const warning = document.getElementById("warning");
const searchInput = document.getElementById("searchInput");

function displayEvents(filteredEvents = events) {

    eventList.innerHTML = "";

    filteredEvents.forEach((event, index) => {

        const today = new Date();
        const eventDate = new Date(event.date);

        const card = document.createElement("div");
        card.classList.add("event-card");

        if (eventDate < today) {
            card.classList.add("past");
        } else {
            card.classList.add("upcoming");
        }

        card.innerHTML = `
            <h3>${event.name}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p>${event.description}</p>
            <button class="delete-btn"
                onclick="deleteEvent(${index})">
                Delete
            </button>
        `;

        eventList.appendChild(card);
    });
}

function deleteEvent(index) {
    events.splice(index, 1);
    displayEvents();
}

form.addEventListener("submit", function(e){

    e.preventDefault();

    const name =
    document.getElementById("eventName").value;

    const date =
    document.getElementById("eventDate").value;

    const description =
    document.getElementById("eventDescription").value;

    if(!name || !date || !description){
        warning.textContent =
        "Please fill all fields.";
        return;
    }

    warning.textContent = "";

    events.push({
        name,
        date,
        description
    });

    events.sort(
        (a,b)=>
        new Date(a.date)-new Date(b.date)
    );

    displayEvents();

    form.reset();
});

searchInput.addEventListener("keyup", () => {

    const value =
    searchInput.value.toLowerCase();

    const filtered = events.filter(event =>
        event.name.toLowerCase().includes(value)
        ||
        event.date.includes(value)
    );

    displayEvents(filtered);
});

events.sort(
    (a,b)=>
    new Date(a.date)-new Date(b.date)
);

displayEvents();