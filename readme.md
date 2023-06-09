# AIR TICKET BOOKING
    Air Ticket booking system that allows users to book flights for their desired destinations.
<br>

---

<br>

| METHOD | ENDPOINT | DESCRIPTION | STATUS CODE |
| --- | --- | --- | --- |
| POST | /api/register | This endpoint should allow users to register. | 201 |
| POST | /api/login | This endpoint should allow users to login. | 201 |
| GET | /api/flights | This endpoint should return a list of all available flights. | 200 |
| GET | /api/flights/:id | This endpoint should return the details of a specific flight identified by its ID. | 200 |
| POST | /api/flights | This endpoint should allow users to add new flights to the system. | 201 |
| PUT / PATCH | /api/flights/:id | This endpoint should allow users to update the details of a specific flight identified by its ID. | 204 |
| DELETE | /api/flights/:id | This endpoint should allow users to delete a specific flight identified by its ID. | 202 |
| POST | /api/booking | This endpoint should allow the user to book flights. | 201 |
| GET | /api/dashboard | This point should list all the bookings so far with the user and flight details. | 200 |

---
<br>

# Dependencies

- brcypt
- dotenv
- express
- jsonwebtoken
- mongoose
- nodemon

# Models


1. User model
    ```
        {
            _id: ObjectId,
            name: String,
            email: String,
            password: String
        }
    ```
2. Flight model
    ```
        {
            _id: ObjectId,
            airline: String,
            flightNo: String,
            departure: String,
            arrival: String,
            departureTime: Date,
            arrivalTime: Date,
            seats: Number,
            price: Number
        }
    ```
3. Booking model
    ```
        {
            _id: ObjectId,
            user : { type: ObjectId, ref: 'User' },
            flight : { type: ObjectId, ref: 'Flight' }
        }

    ```