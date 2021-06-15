## Description
This is the backend for Toptal assignment

## Installation

```bash
yarn install
```

## Running the app

```bash
# development
yarn start

# development watch mode
yarn start:dev

# production mode
yarn start:prod
```

## Common Commands
```
 # for new module
 $ nest g module new_module

 # for new controller
 $ nest g controller new_controller

 # for new service
 $ nest g module new_service
```


## Use Libraries and Features
```
 1. This project has firebase authentication enabled . it is done using the firebase-admin package
 2. The flow of the requests are middlewares -> guardd -> controller -> service -> repository
 3. For Storage aws s3 is used with the help of library aws-sdk
 4. For Validation of Incoming requests class-validator and class-transformer library is used
 5. the api documentation is done using swagger. can be found in http://localhost:3000/api/
 7. The environment files can be found under the folder env
```


car@test.com
carspecialist

customer1@test.com
customer1

superadmin@test.com
superadmin
