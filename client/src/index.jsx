import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter } from "react-router-dom";
import ListingCarousel from "./components/ListingCarousel.jsx";

class App extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/:id" component={ListingCarousel} />
      </div>
    );
  }
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("similar-container")
);
