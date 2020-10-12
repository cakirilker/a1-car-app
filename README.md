![Tests](https://github.com/cakirilker/a1-car-app/workflows/Tests/badge.svg)
![Build and Deploy](https://github.com/cakirilker/a1-car-app/workflows/Build%20and%20Deploy/badge.svg)

# Car Market App
> This is an example project for a car market app. You can view list of cars, filter them and view detail of specific car.

This project was bootstrapped with TypeScript version of the [Create React App](https://github.com/facebook/create-react-app).

#### [View Demo](https://cakirilker.github.io/a1-car-app/)

## Installation
First, install the packages. 
```
yarn install
```
Then run following command to start the project. 
```
yarn start
```

## Available Scripts
- `yarn test` to run tests.
- `yarn cypress:open` to open cypress window and run E2E tests from that window.
- `yarn cypress:run` to run E2E test with a headless browser. It will print out the tests results to console. 

## Features
- Listing Cars
- Pagination
- Filter cars by color and/or manufacturer
- View details of a car
- Adding/Removing a car to favorites

## Thoughts on Tests
This project uses [Jest](https://jestjs.io/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) for unit/integration test, and [Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress.html) for E2E tests.

I tried to keep tests isolated as much as possible and tried to test each feature with E2E tests instead of complex integration tests. By following this philosophy I have ended up with following structure:
- Testing UI components without connecting them to store.
    - I have easily tested components without trying to mock a store or connecting it to a store. Simply passing down mock props made everything much clearer and easier. (ex. [`src/components/__tests__`](https://github.com/cakirilker/a1-car-app/tree/master/src/components/__tests__) or [`src/containers/__tests__`](https://github.com/cakirilker/a1-car-app/tree/master/src/containers/__tests__))
- Testing store/reducers without connecting them to components.
    - Without rendering any component and coupling tests of a store/reducer to other pieces of the application, I tested actions and reducers separately. These tests might seem testing the implementation detail but since the redux state is a crucial part of the application I think it's worth it. (ex. [`src/store/__tests__`](https://github.com/cakirilker/a1-car-app/tree/master/src/store/__tests__))
- Testing features with E2E tests
    - Since I have already verified that application pieces are working as expected when isolated, I also verified that they work together as expected with E2E tests. By doing that I didn't have to create complex or fragile integration tests.
What did this allow me is that developing each piece without tightly coupling to each other.

## CI/CD
This project contains two Github Actions for CI/CD purposes.
- `main.yml` Starts running whenever a pull request is open or updated. It checks unit/integration tests and E2E test. 
- `deploy.yml` controls deployment of app whenever a push happens on master branch(ex. pull request merge). It builds the project then deploys it to the GitHub Pages.

## Static Type Checking
I have configured neccessary @types and files so TypeScript is available in testing, production code and E2E tests. Yay! Also thanks to TypeScripts [`Type Inference`](https://www.typescriptlang.org/docs/handbook/type-inference.html) I didn't have to type every interface or type.

## Third Party Libraries
- [TypeScript](https://www.typescriptlang.org/) for static type checking.
- [Material UI](http://material-ui.com/) for UI components.
- [Redux](https://redux.js.org/) for state management.
- [Redux Thunk](https://github.com/reduxjs/redux-thunk) to write action creators.
- [Redux Toolkit](https://redux-toolkit.js.org/) for reducing boilerplate code of traditional redux.
- [React Router Dom](https://reactrouter.com/web/guides/quick-start) for routing.
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) for unit/integration testing.
- [Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress.html) for E2E testing.
- [Axios](https://github.com/axios/axios) for api calls.
