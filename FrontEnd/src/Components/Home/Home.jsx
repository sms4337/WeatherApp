import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Landing from "../Landing/Landing";
import WeatherForecast from "../WeatherForecast/WeatherForecast";
import WeatherData from "../WeatherData/WeatherData";
import Dashboard from "../Dashboard/Dashboard";
import "./home.css";
import UploadFile from "../UploadFile/uploadFile";

class Home extends React.Component {
  constructor(props, context) {
    super(props, context);
    // this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      tabIndex: 0,
      data: {
        cityName: "",
        startDate: new Date().toUTCString(),
        endDate: new Date().toUTCString()
      }
    };
  }

  formWeatherForecast(params) {
    console.log(params);
    this.setState({
      data: {
        ...this.state.data,
        cityName: params.cityName,
        startDate: params.startDate,
        endDate: params.endDate
      }
    });
  }
  // handleSelect(key) {
  //     alert(`selected ${key}`);
  //     this.setState({ key });
  // }

  render() {
    return (
      <div className="homePage">
        <Header />
        <section className="del-body">
          <div className="container">
            <div className="col-md-12">
              <Tabs
                selectedIndex={this.state.tabIndex}
                onSelect={tabIndex => this.setState({ tabIndex })}
              >
                <TabList>
                  <Tab>Dashboard </Tab>
                  <Tab>Weather Details By Date </Tab>
                  <Tab>Weather Forecast By Date Range</Tab>
                  <Tab>Add Weather Data</Tab>
                  <Tab>Upload File</Tab>
                </TabList>
                <TabPanel>
                  <Dashboard data={this.state.data} />
                </TabPanel>
                <TabPanel>
                  <Landing />
                </TabPanel>
                <TabPanel>
                  <WeatherForecast
                    callback={this.formWeatherForecast.bind(this)}
                  />
                </TabPanel>
                <TabPanel>
                  <WeatherData />
                </TabPanel>
                <TabPanel>
                  <UploadFile />
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default Home;
