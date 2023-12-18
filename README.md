# Loan Application System
A simple business loan application system with following capabilities.

### Frontend

#### Loan Application Form

* On initiation, fetch bellow initital form data from the backend.
  - List of Businesses
  - List of Accounting Providers
* On selecting a value for Accoung Provider, fetch Balance Sheet data of the Business from the backend by selected Accounting Provider.
* On submit the form, fetch Loan Approval data from the backend.
* On Show History request, fetch previous Loan data of the bussiness from the backend.
* Implemented in [ReactJS](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)

### Backend

#### Loan Database

* A [MongoDB](https://www.mongodb.com/) to store Business and Loan data.
* Runs on a [Docker](https://www.docker.com/) container.

#### Loan Microservice

* Set of [NestJS](https://nestjs.com/) modules to Loan bussiness logic.
* Runs on a [Nodejs](https://nodejs.org/en) server.
  
#### Accounting Provider microservice client

* A [NestJS](https://nestjs.com/) module to support Accounting Provider logic.
* This is client implementation of external Accounting Providers (ie. Xero and MYOB microservices).
* Runs on a [Nodejs](https://nodejs.org/en) server.

#### Xero microservice

* A [NestJS](https://nestjs.com/) microservice that provides Balance Sheet data on request.
* Runs on a [Nodejs](https://nodejs.org/en) server.

## Design

### Class Diagram
![image](https://github.com/sanjdi/loan-application-system/assets/135525812/22e5fd0f-6ef2-4770-aa9c-55b685c3a7de)

## Setup and Run

Please follow bellow steps to install and run the application in your local machine. 
### Prerequisites
Please install bellow tools / librraries in your local machine.
* [Git](https://www.atlassian.com/git/tutorials/install-git)
* [Node.js](https://nodejs.org/en/download)
* [Docker Engine](https://docs.docker.com/engine/install/) 

### Steps
Open a command prompt (or terminal) and execute bellow commands.
1. Create a local folder.
```sh
mkdir repo
```
2. Navigate to the local folder.
```sh
cd ./repo
```
3. Clone the remote git repository. Remote repository url is https://github.com/sanjdi/loan-application-system.git
```sh
git clone https://github.com/sanjdi/loan-application-system.git
```
4. Execute bellow commands in seperate terminal windows.
```sh
cd .\loan-application-system | docker-compose up
cd .\loan-application-system\server\gateway | npm run start:dev
cd .\loan-application-system\server\business | npm run start:dev
cd .\loan-application-system\server\loan | npm run start:dev
cd .\loan-application-system\client | npm start
```
5. If all went ok, front-end application will be launched in a new browser on http://localhost:3000
![image](https://github.com/sanjdi/loan-application-system/assets/135525812/342c703d-1465-4fe8-949b-712e33c15095)


