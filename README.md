# crud-api
## _To review task_
- Copy repo
- npm install
- npm run start:dev
- to test crud-app run 'npm run test' (before adding users);

### _To test Crud api methods use Postman_

Url for requests:

GET http://localhost:3000/api/users
GET http://localhost:3000/api/users/userId
POST http://localhost:3000/api/users
   - body in POST request should be in JSON format, example { "username": "Julia","age": 38, "hobbies": ["reading"]};
    
PUT http://localhost:3000/api/users/userId