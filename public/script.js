// ======================
// Hero Slideshow
// ======================

const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

function changeSlide() {

    if (slides.length === 0) return;

    slides[currentSlide].classList.remove("active");

    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    slides[currentSlide].classList.add("active");

}

if (slides.length > 0) {
    setInterval(changeSlide, 4000);
}


// ======================
// Variables
// ======================

let allRooms = [];

let allBookings = [];

let editingRoomId = null;


// ======================
// Rooms Page
// ======================

const roomsContainer = document.getElementById("rooms-container");

if (roomsContainer) {

    async function loadRooms() {

        const response = await fetch("/api/rooms");

        const rooms = await response.json();

        rooms.forEach(function(room) {

            roomsContainer.innerHTML += `
<div class="room-box">

    <img src="images/${room.image}" alt="${room.name}">

    <div class="room-info">

        <h3>${room.name}</h3>

        <p>${room.description}</p>

        <h4>$${room.price} / Night</h4>

    </div>

</div>
`;

        });

    }

    loadRooms();

}


// ======================
// Admin Dashboard
// ======================

const bookingsBody = document.getElementById("bookings-body");

if (bookingsBody) {

    async function loadBookings() {

        const response = await fetch("/api/bookings");

        const bookings = await response.json();

        allBookings = bookings;

        bookings.forEach(function(booking) {

    bookingsBody.innerHTML += `
        <tr>
            <td>${booking.full_name}</td>
            <td>${booking.room_id}</td>
            <td>${booking.check_in}</td>
            <td>${booking.check_out}</td>
            <td>${booking.guests}</td>
            <td>
    <button
        class="delete-booking-btn"
        data-id="${booking.id}">
        Delete
    </button>
</td>
        </tr>
    `;

});

    }

    loadBookings();

    bookingsBody.addEventListener("click", async function(event) {

    if (event.target.classList.contains("delete-booking-btn")) {

        const bookingId = event.target.dataset.id;

        const booking = allBookings.find(function(booking) {
            return booking.id == bookingId;
        });

        const confirmed = confirm(
    `Delete booking for ${booking.full_name}?`
);

if (!confirmed) {
    return;
}

await fetch(`/api/bookings/${bookingId}`, {
    method: "DELETE"
});

location.reload();

    }

});

}


const roomsBody = document.getElementById("rooms-body");

if (roomsBody) {

    async function loadAdminRooms() {

        const response = await fetch("/api/rooms");

        const rooms = await response.json();

        allRooms = rooms;

        roomsBody.innerHTML = "";

        rooms.forEach(function(room) {

            roomsBody.innerHTML += `
<tr>

    <td>${room.name}</td>

    <td>$${room.price}</td>

    <td>${room.capacity}</td>

    <td>

        <button class="edit-btn" data-id="${room.id}">
            Edit
        </button>

        <button class="delete-btn" data-id="${room.id}">
            Delete
        </button>

    </td>

</tr>
`;

        });

    }

    loadAdminRooms();


    roomsBody.addEventListener("click", async function(event) {

        // ======================
        // DELETE
        // ======================

        if (event.target.classList.contains("delete-btn")) {

            const roomId = event.target.dataset.id;

            const confirmed = confirm("Are you sure you want to delete this room?");

            if (!confirmed) {
                return;
            }

            await fetch(`/api/rooms/${roomId}`, {
                method: "DELETE"
            });

            location.reload();

        }

        // ======================
        // EDIT
        // ======================

        if (event.target.classList.contains("edit-btn")) {

            const roomId = event.target.dataset.id;

            const room = allRooms.find(function(room) {
                return room.id == roomId;
            });

            editingRoomId = roomId;

            console.log("Editing Room:", editingRoomId);

            console.log(room);

            document.getElementById("room-name").value = room.name;
            document.getElementById("room-price").value = room.price;
            document.getElementById("room-capacity").value = room.capacity;
            document.getElementById("room-image").value = room.image;
            document.getElementById("room-description").value = room.description;

            document.getElementById("submit-room-btn").textContent = "Update Room";

        }

    });

}

// ======================
// Add / Update Room Form
// ======================

const addRoomForm = document.getElementById("add-room-form");

if (addRoomForm) {

    addRoomForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const roomName = document.getElementById("room-name").value;
        const roomPrice = document.getElementById("room-price").value;
        const roomCapacity = document.getElementById("room-capacity").value;
        const roomImage = document.getElementById("room-image").value;
        const roomDescription = document.getElementById("room-description").value;

        if (editingRoomId === null) {

            // CREATE ROOM

            await fetch("/api/rooms", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: roomName,
                    price: roomPrice,
                    capacity: roomCapacity,
                    image: roomImage,
                    description: roomDescription
                })
            });

        } else {

            // UPDATE ROOM

            await fetch(`/api/rooms/${editingRoomId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: roomName,
                    price: roomPrice,
                    capacity: roomCapacity,
                    image: roomImage,
                    description: roomDescription
                })
            });

               editingRoomId = null;

               document.getElementById("submit-room-btn").textContent = "Add Room";

               addRoomForm.reset();

             alert("Room updated successfully!");

        }
         

        location.reload();

    });

}

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const contactName = document.getElementById("contact-name").value;
        const contactEmail = document.getElementById("contact-email").value;
        const contactPhone = document.getElementById("contact-phone").value;
        const contactMessage = document.getElementById("contact-message").value;

        await fetch("/api/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                full_name: contactName,
                email: contactEmail,
                phone: contactPhone,
                message: contactMessage
            })
        });

        contactForm.reset();

        alert("✅ Thank you! Your message has been sent successfully.");

    });

}

let allMessages = [];

const messagesBody = document.getElementById("messages-body");

if (messagesBody) {

    async function loadMessages() {

        const response = await fetch("/api/messages");

        const messages = await response.json();

        allMessages = messages;

        messages.forEach(function(message) {

    messagesBody.innerHTML += `
        <tr>
            <td>${message.full_name}</td>
            <td>${message.email}</td>
            <td>${message.message}</td>
            <td>
                <button
                    class="delete-message-btn"
                    data-id="${message.id}">
                    Delete
                </button>
            </td>
        </tr>
    `;

});

    }

    loadMessages();

    messagesBody.addEventListener("click", async function(event) {

    if (event.target.classList.contains("delete-message-btn")) {

        const messageId = event.target.dataset.id;

        const message = allMessages.find(function(message) {
            return message.id == messageId;
        });

        const confirmed = confirm(
    `Delete message from ${message.full_name}?`
);

if (!confirmed) {
    return;
}

await fetch(`/api/messages/${messageId}`, {
    method: "DELETE"
});

location.reload();

    }

    

});

} 

// ======================
// Booking Success Message
// ======================

const bookingSuccess = document.getElementById("booking-success");
const bookingSuccessOk = document.getElementById("booking-success-ok");

if (bookingSuccess) {

    const params = new URLSearchParams(window.location.search);

    if (params.get("success") === "1") {

        bookingSuccess.style.display = "block";

        if (bookingSuccessOk) {

            bookingSuccessOk.addEventListener("click", function() {

                bookingSuccess.style.display = "none";

                window.history.replaceState(
                    {},
                    document.title,
                    "booking.html"
                );

            });

        }

    }

}