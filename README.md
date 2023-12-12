# Loan Application System
A simple business loan application system

## Setup and Run

Please follow bellow steps to install and run the application in your local machine. 
### Prerequisites
* [Node.js](https://nodejs.org/en/docs) - Please install Node.js in your local machine.

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
4. To run the loan-microservice and database, execute
```sh
cd .\loan-application-system\server\loan-microservice | npm install
cd .\loan-application-system\server\loan-microservice | docker-compose up
```
5. Open a new terminal window and execute
```sh
cd .\loan-application-system\server\loan-microservice | npm run start:dev
```
6. To run xero-microservice, open a new terminal window and execute
```sh
cd .\loan-application-system\server\xero-microservice | npm install
cd .\loan-application-system\server\xero-microservice | npm run start:dev
```
6. To run front-end application, open a new terminal window and execute
```sh
cd .\loan-application-system\client | npm install
cd .\loan-application-system\client | npm start
```
8. If all went ok, front-end application will be launched in a new browser on http://localhost:3000
![image](https://github.com/sanjdi/loan-application-system/assets/135525812/342c703d-1465-4fe8-949b-712e33c15095)


