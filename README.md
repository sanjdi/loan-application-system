# Loan Application System
This simple business loan application system comes with following services and capabilities.

## Design

### Architecture
A microservices architecture with a modular and extensible design pattern is used to implement the functionality.

![image](https://github.com/sanjdi/loan-application-system/assets/135525812/45e44488-1ab5-4a11-bc8a-aaad949b60ab)

Accounting Service interface defines the getBalanceSheet() prtotype. All client services of external accounting providers (such as Xero and MYOB) will implement this interface.

### Class Diagram
![image](https://github.com/sanjdi/loan-application-system/assets/135525812/5d2a46c0-4a41-48e2-a98c-454b5dc6f7a1)

## Implementation

### Frontend

* Implemented with [ReactJS](https://react.dev/) in [TypeScript](https://www.typescriptlang.org/)
* Runs on a [Docker](https://www.docker.com/) container.

#### Loan Application Form

* On initiation, fetch bellow initital form data from the backend.
  - List of Businesses
  - List of Accounting Providers
* On selecting a value for Accoung Provider, fetch Balance Sheet data of the Business from the backend by selected Accounting Provider.
* On submit the form, fetch Pre Assessment and Loan Approval data from the backend.

### Backend

* Runs on several [Docker](https://www.docker.com/) containers that host [Nodejs](https://nodejs.org/en) and [MongoDB](https://www.mongodb.com/).
* Implemented with [NestJS](https://nestjs.com/) in [TypeScript](https://www.typescriptlang.org/).

#### API Gateway

* A [NestJS](https://nestjs.com/) module that implement routing of requests to backend services.
  
#### Loan Service

* A [NestJS](https://nestjs.com/) microservice with a set of modules that implement Application and Service Provider logic.
* Use a [MongoDB](https://www.mongodb.com/) to store application records.
  
#### Business Service

* A [NestJS](https://nestjs.com/) microservice with a module that implement logic for storing and retriving Businesses.
* Use a [MongoDB](https://www.mongodb.com/) to store records.

#### Xero and MYOB

* Simulated with [NestJS](https://nestjs.com/) service that implements the Accounting Service interface.

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





