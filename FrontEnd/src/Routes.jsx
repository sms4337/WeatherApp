import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Home from "./Components/Home/Home";
import Landing from "./Components/Landing/Landing";
import WeatherForecast from "./Components//WeatherForecast/WeatherForecast";
import WeatherData from "./Components/WeatherData/WeatherData";
import DataAddedSuccess from "./Components/DataAddedSuccess/DataAddedSuccess";
import DataAddedError from "./Components/DataAddedError/DataAddedError";
import UploadFile from "./Components/UploadFile/uploadFile";

const Routes = props => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/landing" component={Landing} />
        <Route path="/weatherForecast" component={WeatherForecast} />
        <Route path="/weatherData" component={WeatherData} />
        <Route path="/added-data" component={DataAddedSuccess} />
        <Route path="/noData-added" component={DataAddedError} />
        <Route path="/" component={UploadFile} />
      </Switch>
    </BrowserRouter>
  );
};
export default Routes;
