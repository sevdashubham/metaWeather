In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# Features
Weather app with the following features:

- [x] Get user's geolocation and display weather information.  Screen should display the city name and a row of cards with the weather state image and queried/useful information.  The screen must be responsive.
- [x] search bar with a search button for user to search for a specific city.  If the city name is ambiguous, show a screen with the list of cities to choose from. Search bar should be fixed on the top.
- [x] css spinner when reetriving data from the api.  Disable search bar input when loading.
- [x] Show no results screen if no results are returned.
- [x] login page. Show this screen first if someone tries to access previous screens if they are not logged in.  Hard code a password in Redux.  Set authorization state in redux.
