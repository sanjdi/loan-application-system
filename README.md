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
1. Execute bellow commands in a terminal window. 
```sh
mkdir repo
cd ./repo
git clone https://github.com/sanjdi/loan-application-system.git
cd .\loan-application-system | docker compose up -d
```
2. Run the web interface in a browser. url is http://localhost:3000
![image](https://github.com/sanjdi/loan-application-system/assets/135525812/cd8694f0-d12c-40a7-9bde-d1fd7e6c775a)

3. Balance sheet will be shown after selecting values for both Business Name and Accounting Provider  
![image](https://github.com/sanjdi/loan-application-system/assets/135525812/a2e2605d-a700-4b29-b483-cc065874be70)

4. Press Submit to view the Application Status.
![image](https://github.com/sanjdi/loan-application-system/assets/135525812/b4972490-c4e2-49ad-8eec-a15a60182e7e)

4. Press Try Again a with different founding date. ie. if the business was started less than a one year ago.
![image](https://github.com/sanjdi/loan-application-system/assets/135525812/11bd2187-74d6-484d-a773-16a121458819)





