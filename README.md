# Furniture Backend API Documentation

## Overview

This backend service manages a collection of furniture items, allowing you to create, fetch, update, delete, and filter products. It also supports pagination, sorting, and fetching featured products.

## Base URL

Assuming the service runs locally, the base URL is:

```
http://localhost:PORT/
```

## API Endpoints

### 1. Create Furniture

- **Endpoint:** `POST /create`
- **Description:** Create a new furniture item.
- **Request Body Example:**

```json
{
  "name": "Modern Sofa",
  "price": 500,
  "description": "A comfortable modern sofa.",
  "image": "image_url",
  "category": "Sofa",
  "color": ["red", "blue"],
  "sizes": ["large"],
  "brandName": "FurniCo",
  "additionalImages": ["image_url2"]
}
```

- **Success Response:**
  - **Status Code:** 201 – Created
  - **Response Body:**

```json
{
  "_id": "603e2f8e2fa3b72b9c19c120",
  "name": "Modern Sofa",
  "price": 500,
  "description": "A comfortable modern sofa.",
  "image": "image_url",
  "category": "Sofa",
  "color": ["red", "blue"],
  "sizes": ["large"],
  "brandName": "FurniCo",
  "additionalImages": ["image_url2"],
  "ratings": 4,
  "__v": 0
}
```

- **Error Response:**
  - **Status Code:** 400 – Bad Request (e.g., missing required fields or validation errors)
  - **Response Example:**

```json
{
  "message": "Error creating furniture: <error details>"
}
```

### 2. Get All Furniture

- **Endpoint:** `GET /all`
- **Description:** Retrieve all furniture items with pagination, sorting, and filtering.
- **Query Parameters:**
  - `page` (optional, default: 1) – Page number.
  - `limit` (optional, default: 10) – Items per page.
  - `sort` (optional) – Sorting order (e.g., `name_asc`, `price_low`).
  - `priceRange` (optional) – JSON string (example: `{"min": 100, "max": 1000}`).
  - `brands` (optional) – JSON array string (example: `["FurniCo"]`).
  - `categories` (optional) – JSON array string (example: `["Sofa"]`).
- **Success Response:**
  - **Status Code:** 200 – OK
  - **Response Body:**

```json
{
  "furniture": [
    /* array of furniture objects */
  ],
  "total": 25,
  "page": 1,
  "pages": 3
}
```

- **Error Response:**
  - **Status Code:** 500 – Internal Server Error (e.g., parsing filters error)
  - **Response Example:**

```json
{
  "message": "Error fetching furniture: <error details>",
  "details": "Error parsing filters"
}
```

### 3. Get Single Furniture by ID

- **Endpoint:** `GET /:id`
- **Description:** Retrieve a single furniture item using its MongoDB ObjectId.
- **Path Parameter:** `id`
- **Success Response:**
  - **Status Code:** 200 – OK
  - **Response Body:**

```json
{
  "_id": "603e2f8e2fa3b72b9c19c120",
  "name": "Modern Sofa",
  "price": 500,
  "description": "A comfortable modern sofa.",
  "image": "image_url",
  "category": "Sofa",
  "color": ["red", "blue"],
  "sizes": ["large"],
  "brandName": "FurniCo",
  "additionalImages": ["image_url2"],
  "ratings": 4,
  "__v": 0
}
```

- **Error Response:**
  - **Status Code:** 404 – Not Found (if furniture does not exist)
  - **Response Example:**

```json
{
  "message": "Furniture not found"
}
```

### 4. Update Furniture

- **Endpoint:** `PUT /:id`
- **Description:** Update an existing furniture item.
- **Path Parameter:** `id`
- **Request Body Example:**

```json
{
  "price": 550,
  "color": "green", // Can be a string or an array
  "sizes": "medium" // Can be a string or an array
}
```

- **Success Response:**
  - **Status Code:** 200 – OK
  - **Response Body:**

```json
{
  "_id": "603e2f8e2fa3b72b9c19c120",
  "name": "Modern Sofa",
  "price": 550,
  "description": "A comfortable modern sofa.",
  "image": "image_url",
  "category": "Sofa",
  "color": ["green"],
  "sizes": ["medium"],
  "brandName": "FurniCo",
  "additionalImages": ["image_url2"],
  "ratings": 4,
  "__v": 0
}
```

- **Error Response:**
  - **Status Code:** 400 – Bad Request (if update fails or validation errors occur)
  - **Response Example:**

```json
{
  "message": "Error updating furniture: <error details>"
}
```

### 5. Delete Furniture

- **Endpoint:** `DELETE /:id`
- **Description:** Delete a furniture item by its ID.
- **Path Parameter:** `id`
- **Success Response:**
  - **Status Code:** 200 – OK
  - **Response Body:**

```json
{
  "message": "Furniture deleted successfully",
  "furniture": {
    /* deleted furniture object */
  }
}
```

- **Error Response:**
  - **Status Code:** 404 – Not Found (if the furniture item does not exist)
  - **Response Example:**

```json
{
  "message": "Furniture not found"
}
```

### 6. Get Filter Options

- **Endpoint:** `GET /filter-options`
- **Description:** Retrieve unique brands and categories from the furniture collection.
- **Success Response:**
  - **Status Code:** 200 – OK
  - **Response Body:**

```json
{
  "brands": ["FurniCo", "AnotherBrand"],
  "categories": ["Sofa", "Chair"]
}
```

- **Error Response:**
  - **Status Code:** 500 – Internal Server Error
  - **Response Example:**

```json
{
  "message": "Error fetching filter options: <error details>"
}
```

### 7. Get Featured Products

- **Endpoint:** `GET /featured`
- **Description:** Retrieve a limited random selection of featured furniture products.
- **Query Parameter:** `limit` (optional, default: 8)
- **Success Response:**
  - **Status Code:** 200 – OK
  - **Response Body:** Array of furniture objects.

```json
[
  {
    /* furniture object */
  },
  {
    /* furniture object */
  }
]
```

- **Error Response:**
  - **Status Code:** 500 – Internal Server Error
  - **Response Example:**

```json
{
  "message": "Error fetching featured products: <error details>"
}
```

## Error Status Codes Summary

- **200 (OK):** Request was successfully processed.
- **201 (Created):** Resource was successfully created.
- **400 (Bad Request):** The request data is invalid.
- **404 (Not Found):** The requested resource does not exist.
- **500 (Internal Server Error):** An unexpected error occurred on the server.

## Setup & Running the Backend

1. Install dependencies:

```
npm install
```

2. Start the server:

```
npm start
```

3. Ensure MongoDB is running and configured.
4. The server will listen on the configured port (e.g., `http://localhost:PORT/`).
