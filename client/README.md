# Zeller App

This React.js application implements following capabilities.
* Fetch user data from remote [GraphQL](https://graphql.org/) API using [Apollo Client 3](https://www.apollographql.com/docs/react).
* Filter and show list of users by role. ie. Admin, Manager.
* State managemet with Apollo Client 3 [*InMemoryCache* stores](https://www.apollographql.com/docs/react/caching/overview/).
* Unit tests using [@testing-library](https://testing-library.com/docs/) family of packages.
* Writted in [TypeScript](https://www.typescriptlang.org/)

## System Design

Please refer to bellow for an explanation of system architecture.
![image](https://github.com/sanjdi/zeller-app/assets/135525812/9669b554-1ffd-4be7-b132-f16c4417342a)

**Components** - performs UI rendering and local state handling.

**Containers** - bridge the gap between Components and GraphQL cache enabling state management.

**API Client** - [Apollo Client 3](https://www.apollographql.com/docs/react) enables access to remote API server.

**Cache** - Apollo Client 3 [*InMemoryCache*](https://www.apollographql.com/docs/react/caching/overview/) provides a store for state management. *InMemoryCache* houses;
* [_Reactive variables_](https://www.apollographql.com/docs/react/local-state/reactive-variables) used for local state management.
  - Unique Role Ids: An array of *Role* objects, ie. [ADMIN, MANAGER]
  - Currently selected role Id: activeRole, ie. ADMIN
*  Results of GraphQL queries in a [_normalized_](https://www.apollographql.com/docs/react/caching/overview/) manner enablling responding to almost immediately for already-cached queries/data, without sending network requests.

**Models** - provide required data structures.

**Test Suites** - implemented using [@testing-library](https://testing-library.com/docs/) family of packages.

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
3. Clone the remote git repository. Remote repository url is https://github.com/sanjdi/zeller-app.git
```sh
git clone https://github.com/sanjdi/zeller-app.git
```
4. Navigate to project root folder.
```sh
cd ./zeller-app
```
5. Download all dependencies.
```sh
npm install
```
6. Compile GraphQL schemas to generate required dependencies.
```sh
npm run compile
```
7. Execute the unit and integration test suite to verify the application configurations.
```sh
npm run test
```
If all went ok, you will see bellow lines at the end of the terminal window. Then, press 'q' to exit.
![image](https://github.com/sanjdi/zeller-app/assets/135525812/f4801851-dae1-4081-9e14-0b287115e68b)

8. Execute the React.js application
```sh
npm start
```
9. If all went ok, application will be launched in a new browser.
![image](https://github.com/sanjdi/zeller-app/assets/135525812/27571686-7ada-4bb0-bd99-93727cef801d)


Soomething similar to this will be shown at the terminal.
![image](https://github.com/sanjdi/zeller-app/assets/135525812/84fc3425-aab6-4217-9da3-4fcd8f60f30c)



