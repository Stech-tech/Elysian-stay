console.log("=== THIS IS THE SERVER.JS I AM RUNNING ===");
const express = require("express");
const path = require("path");
 


const pool = require("./config/db");

const app = express();


const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Serve static files
app.use(express.static(path.join(__dirname, "public")));


// Home Route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

pool.connect()
 .then(() => { 
  console.log("✅ Connected to PostgreSQL successfully!"); 
}) 
.catch((err) => { 
  console.error("❌ Database connection failed:", err.message);
 });

 app.post("/book", async (req, res) => {

    const {
        full_name,
        email,
        phone,
        check_in,
        check_out,
        room_id,
        guests,
        special_requests
    } = req.body;

    await pool.query(
        `INSERT INTO bookings
        (full_name, email, phone, check_in, check_out, room_id, guests, special_requests)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
            full_name,
            email,
            phone,
            check_in,
            check_out,
            room_id,
            guests,
            special_requests
        ]
    );

    res.redirect("/booking.html?success=1");
});



app.post("/api/messages", async (req, res) => {

    console.log("POST message route reached!");

    console.log(req.body);

    const {
        full_name,
        email,
        phone,
        message
    } = req.body;

    await pool.query(
        `INSERT INTO messages
        (full_name, email, phone, message)
        VALUES ($1, $2, $3, $4)`,
        [
            full_name,
            email,
            phone,
            message
        ]
    );

    res.send("Message saved successfully!");

});

app.get("/api/rooms", async (req, res) => {
    const result = await pool.query("SELECT * FROM rooms");
    res.json(result.rows);
});



app.get("/api/bookings", async (req, res) => {

    const result = await pool.query("SELECT * FROM bookings");

    res.json(result.rows);

});

app.get("/api/messages", async (req, res) => {

    const result = await pool.query(
        "SELECT * FROM messages ORDER BY created_at DESC"
    );

    res.json(result.rows);

});

app.delete("/api/bookings/:id", async (req, res) => {

    console.log("DELETE Booking route reached!");

    const bookingId = req.params.id;

    console.log("Booking ID:", bookingId);

    await pool.query(
        "DELETE FROM bookings WHERE id = $1",
        [bookingId]
    );

    console.log("Booking deleted!");

    res.send("Booking deleted successfully!");

});

app.delete("/api/messages/:id", async (req, res) => {

    console.log("DELETE message route reached!");

    const messageId = req.params.id;

    console.log("Message ID:", messageId);

    await pool.query(
        "DELETE FROM messages WHERE id = $1",
        [messageId]
    );

    console.log("Message deleted!");

    res.send("Message deleted successfully!");

});

app.post("/api/rooms", async (req, res) => {

    const { name, description, price, capacity, image } = req.body;

    await pool.query(
        `INSERT INTO rooms
        (name, description, price, capacity, image)
        VALUES ($1, $2, $3, $4, $5)`,
        [name, description, price, capacity, image]
    );

    res.send("Room added successfully!");

});

app.put("/api/rooms/:id", async (req, res) => {

    const roomId = req.params.id;

    const {
        name,
        description,
        price,
        capacity,
        image
    } = req.body;

    await pool.query(
        `UPDATE rooms
         SET
            name = $1,
            description = $2,
            price = $3,
            capacity = $4,
            image = $5
         WHERE id = $6`,
        [
            name,
            description,
            price,
            capacity,
            image,
            roomId
        ]
    );

    res.send("Room updated successfully!");

});


app.delete("/api/rooms/:id", async (req, res) => {

    console.log("DELETE route reached!");

    const roomId = req.params.id;

    console.log("Room ID:", roomId);

    await pool.query(
        "DELETE FROM rooms WHERE id = $1",
        [roomId]
    );

    console.log("Room deleted!");

    res.send("Room deleted successfully!");

});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
