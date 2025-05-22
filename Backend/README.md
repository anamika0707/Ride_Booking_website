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

## Example Login Request

```bash
curl -X POST http://localhost:4000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }'
```