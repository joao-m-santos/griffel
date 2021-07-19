# Griffel

> Totally not Griffle!

A React/Redux-Sagas app done as a technical assignment for a Frontend recruitment process.

## Goals

- Fetch data from GraphQL API
- Manage side effects with Redux-Sagas
- Render the fetched data

## Approach

Before jumping into code, I quickly sketched out the app views in Figma ([click here to see!](https://www.figma.com/file/LNdakZPwc85xApdtsqRpDB/griffel?node-id=0%3A1)).

I started by initializing a new project via Create React App. Then, I installed a few dependencies:

- React Router Dom for app routing
- Redux / React-Redux / Redux-Sagas
- Apollo Client / GraphQL
- Material UI

After that, I coded the views/components with mock data, without too much attention to detail (since it wasn't the goal of the assignment). I added some filters for the training list as an example. Then, I did all the Redux logic and finally created a small service to fetch the data from the API.

In the end, I wrote unit tests for the Sagas logic and called it a day!

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
