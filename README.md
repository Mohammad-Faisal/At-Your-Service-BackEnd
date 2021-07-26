## Description
This is the backend for a service provider platform where we have used nestjs+postgresql with typescript

## Use Libraries and Features
```
 1. This project has firebase authentication enabled . it is done using the firebase-admin package
 2. The flow of the requests are middlewares -> guardd -> controller -> service -> repository
 3. For Storage aws s3 is used with the help of library aws-sdk
 4. For Validation of Incoming requests class-validator and class-transformer library is used
 5. the api documentation is done using swagger. can be found in http://localhost:3000/api/
 7. The environment files can be found under the folder env
```

Some example credentials
car@test.com
carspecialist

cleaning@test.com
cleaning

customer1@test.com
customer1

superadmin@test.com
superadmin
