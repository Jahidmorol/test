# Course Review

## Overview

This project is a Node.js Express application developed in TypeScript. It integrates MongoDB with Mongoose use course data. The application focuses on achieving CRUD operations with data integrity through validation using Zod.

## Prerequisites

Before you begin, ensure you have know the following requirements:

- Programming Language: TypeScript
- Web Framework: Express.js
- Object Data Modeling (ODM) and Validation Library: Mongoose for MongoDB

## Getting Started

To run this project locally, follow these steps:

1. _Clone the repository:_

   bash
   git clone https://github.com/Porgramming-Hero-web-course/l2b2a3-course-review-mehedihasan8.git

2. _Navigate to the project directory:_

   typescript
   cd l2b2a3-course-review-mehedihasan8

3. _Install dependencies:_

   typescript
   npm install

4. _Run the server_

   typescript
   npm run start:prod
   or
   npm run start:dev

then access the API, make requests to http://localhost:5000 your local server.

# API Endpoints

### Create new User

- _Method:_ POST
- _URL:_ http://localhost:5000/api/course
- _Description:_ Create new course

### Get User by ID

- _Method:_ GET
- _URL:_ http://localhost:5000/api/course
- _Description:_ Get all course

### Update User by ID

- _Method:_ PUT
- _URL:_ http://localhost:5000/api/courses/:{courseId}
- _Description:_ Update User by ID

# Create a Category

### Create Category

- _Method:_ get
- _URL:_ http://localhost:5000/api/categories
- _Description:_ get all Category

### Create Category

- _Method:_ post
- _URL:_ http://localhost:5000/api/categories
- _Description:_ Create Category

# create revew

### create review

- _Method:_ post
- _URL:_ http://localhost:5000/api/reviews
- _Description:_ create review

### get review

- _Method:_ get
- _URL:_ http://localhost:5000/api/reviews
- _Description:_ get review

# Get Course by ID with Reviews

### get course with reviews

- _Method:_ get
- _URL:_ http://localhost:5000/api/courses/:courseId/reviews
- _Description:_ Get Course by ID with Reviews

# Get the Best Course Based on Average Review (Rating)

### get best course

- _Method:_ get
- _URL:_ http://localhost:5000/api/course/best
- _Description:_ Get the Best Course Based on Average Review (Rating)

## host on vercel

- [Vercel lInk](https://assignment-3-rose-psi.vercel.app/)
