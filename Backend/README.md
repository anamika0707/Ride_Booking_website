# User API Documentation

## Endpoints

### 1. **User Registration**

`POST /users/register`

#### Description

Registers a new user in the system. This endpoint validates the input, hashes the password, creates a new user, and returns an authentication token along with the user data.

#### Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

#### Fields

- `fullname.firstname` (string, required): First name, minimum 3 characters.
- `fullname.lastname` (string, required): Last name, minimum 3 characters.
- `email` (string, required): Valid email address.
- `password` (string, required): Password, minimum 6 characters.

#### Responses

##### Success

- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "<jwt_token>",
    "user": {
      "_id": "<user_id>",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

##### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      }
    ]
  }
  ```

##### Missing Fields

- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "message": "All fields are required"
  }
  ```

---

### 2. **User Login**

`POST /users/login`

#### Description

Authenticates a user by validating their email and password. Returns a JWT token and user data upon successful login.

#### Request Body

Send a JSON object with the following structure:

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

#### Fields

- `email` (string, required): Valid email address.
- `password` (string, required): Password, minimum 6 characters.

#### Responses

##### Success

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "token": "<jwt_token>",
    "user": {
      "_id": "<user_id>",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

##### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      }
    ]
  }
  ```

##### Invalid Credentials

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

---

### 3. **Get User Profile**

`GET /users/profile`

#### Description

Fetches the profile of the currently authenticated user. Requires a valid JWT token in the request headers or cookies.

#### Headers

- `Authorization` (string, required): Bearer token for authentication.

#### Responses

##### Success

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "_id": "<user_id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
  ```

##### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Authentication required"
  }
  ```

---

### 4. **User Logout**

`GET /users/logout`

#### Description

Logs out the currently authenticated user by clearing the JWT token from cookies and blacklisting the token.

#### Headers

- `Authorization` (string, required): Bearer token for authentication.

#### Responses

##### Success

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Logout successfully"
  }
  ```

##### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Authentication required"
  }
  ```

---

## Example Requests

### Get User Profile

```bash
curl -X GET http://localhost:4000/users/profile \
  -H "Authorization: Bearer <jwt_token>"
```

### Logout User

```bash
curl -X GET http://localhost:4000/users/logout \
  -H "Authorization: Bearer <jwt_token>"
```

# Captain API Documentation

## Endpoints

### 1. **Captain Registration**

`POST /captains/register`

#### Description

Registers a new captain in the system. This endpoint validates the input, hashes the password, creates a new captain, and stores their vehicle details.

#### Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Fields

- `fullname.firstname` (string, required): First name, minimum 3 characters.
- `fullname.lastname` (string, required): Last name, minimum 3 characters.
- `email` (string, required): Valid email address.
- `password` (string, required): Password, minimum 6 characters.
- `vehicle.color` (string, required): Color of the vehicle, minimum 3 characters.
- `vehicle.plate` (string, required): Vehicle plate number, minimum 3 characters.
- `vehicle.capacity` (number, required): Capacity of the vehicle (number of passengers).
- `vehicle.vehicleType` (string, required): Type of the vehicle. Must be one of the following: `car`, `motorcycle`, `auto`.

#### Responses

##### Success

- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "_id": "<captain_id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
  ```

##### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "First name must be at least 3 characters long",
        "param": "fullname.firstname",
        "location": "body"
      },
      {
        "msg": "Please enter a valid email address",
        "param": "email",
        "location": "body"
      }
    ]
  }
  ```

##### Missing Fields

- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "message": "All fields are required"
  }
  ```

---

## Example Request

### Register Captain

```bash
curl -X POST http://localhost:4000/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "yourpassword",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }'
```