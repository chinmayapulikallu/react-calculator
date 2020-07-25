import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
//import redux and saga
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
//import material-ui for styling
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
//import reducers and sagas
import rootReducer from "./redux/reducers";
import rootSaga from "./redux/sagas";

const sagaMiddleware = createSagaMiddleware();

//this line creates an array of all of redux middleware we want to use
//we don't want a whole ton of console log in our production code
//logger will only be added to our project if we are in development mode
const middlewareList = process.env.NODE_ENV === "development"
  ? [sagaMiddleware, logger]
  : [sagaMiddleware];

//to use redux development tools 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  //tells the saga middleware to use the root reducer
  //rootSaga contains all of our other reducers
  rootReducer,
  // adds all middleware to our project including saga and logger
  composeEnhancers(applyMiddleware(...middlewareList))
)

// tells the saga middleware to use the rootSaga
// rootSaga contains all of our other sagas
sagaMiddleware.run(rootSaga);

//theme provider for the app
const theme = createMuiTheme({
  typography: {
    fontFamily: ['"Quicksand"', "sans-serif"].join(","),
  },
  palette: {
    primary: { main: "#bdbdbd" },
    secondary: { main: "#e57373" },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

