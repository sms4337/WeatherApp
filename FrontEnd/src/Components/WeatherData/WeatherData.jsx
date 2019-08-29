import React from "react";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import moment from "moment";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class WeatherData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      cityName: "",
      countryName: "",
      temperature: "",
      cloudsDescription: "",
      windDescription: "",
      weatherDescription: "",
      pressure: "",
      humidityPercentage: "",
      date: moment(),
      cityDetails: []
    };
  }

  handleDateChange = date => {
    this.setState({
      date: date
    });
  };

  handleCityChange = event => {
    this.setState({
      cityName: event.target.value
    });
  };

  handleCountryChange = event => {
    this.setState({
      countryName: event.target.value
    });
    const c = event.target.value;
    axios({
      method: "GET",
      url: `http://localhost:8765/weatherUI/fetchcity/${c}`,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        this.setState({
          cityDetails: response.data
        });
        console.log(this.state.cityDetails);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleTemperatureChange = event => {
    this.setState({
      temperature: event.target.value
    });
  };

  handleCloudDesc = event => {
    this.setState({
      cloudsDescription: event.target.value
    });
  };

  handleWindDesc = event => {
    this.setState({
      windDescription: event.target.value
    });
  };

  handleWeatherDesc = event => {
    this.setState({
      weatherDescription: event.target.value
    });
  };

  handlePressureChange = event => {
    this.setState({
      pressure: event.target.value
    });
  };

  handleHumidityChange = event => {
    this.setState({
      humidityPercentage: event.target.value
    });
  };

  handleSubmitWeatherData = e => {
    e.preventDefault();
    this.setState({
      isLoading: true
    });
    const insertRequestData = {
      cityName: this.state.cityName,
      countryName: this.state.countryName,
      temperature: this.state.temperature,
      cloudsDescription: this.state.cloudsDescription,
      weatherDescription: this.state.weatherDescription,
      windDescription: this.state.windDescription,
      pressure: this.state.pressure,
      humidityPercentage: this.state.humidityPercentage,
      date: moment(this.state.date).format()
    };
    insertRequestData.date = insertRequestData.date.substring(0, 10);
    //alert(JSON.stringify(insertRequestData));
    axios({
      method: "POST",
      url: `http://localhost:8765/addweather/insert`,
      headers: {
        "Content-Type": "application/json"
      },
      data: insertRequestData
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
    this.setState({
      cityName: "",
      countryName: "",
      temperature: "",
      cloudsDescription: "",
      windDescription: "",
      weatherDescription: "",
      pressure: "",
      humidityPercentage: "",
      date: moment()
    });
  };

  render() {
    return (
      <div className="row">
        {/* <Header /> */}
        <section className="container del-body">
          <form
            className="weatherdateForm"
            onSubmit={this.handleSubmitWeatherData}
          >
            <div className="container tracker-row">
              <div className="col-xs-6 col-sm-4 col-desc">Country Name</div>
              <div className="col-xs-6 col-sm-8 col-desc">
                <div className="select">
                  <select
                    value={this.state.countryName}
                    required={true}
                    onChange={this.handleCountryChange}
                  >
                    <option value="">Select any Country..</option>
                    <option value="India">India</option>
                    <option value="Us">Us</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Uk">Uk</option>
                    <option value="Netherland">Netherland</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="container tracker-row">
              <div className="col-xs-6 col-sm-4 col-desc">City Name</div>
              <div className="col-xs-6 col-sm-8 col-desc">
                <div className="select">
                  <select
                    value={this.state.cityName}
                    required={true}
                    onChange={this.handleCityChange}
                  >
                    <option value="">Select any city..</option>
                    {/* <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Pune">Pune</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Delhi">Delhi</option> */}
                    {this.state.cityDetails.map((city, index) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="container tracker-row">
              <div className="col-xs-6 col-sm-4 col-desc">
                Temperature ( &#8451;)
              </div>
              <div className="col-xs-6 col-sm-8 col-desc">
                <input
                  type="text"
                  value={this.state.temperature}
                  placeholder="Enter Temperature in &#8451;"
                  required={true}
                  onChange={this.handleTemperatureChange}
                />
              </div>
            </div>
            <div className="container tracker-row">
              <div className="col-xs-6 col-sm-4 col-desc">
                Cloud Description
              </div>
              <div className="col-xs-6 col-sm-8 col-desc">
                <input
                  type="text"
                  value={this.state.cloudsDescription}
                  placeholder="Enter Cloud Description"
                  required={true}
                  onChange={this.handleCloudDesc}
                />
              </div>
            </div>
            <div className="container tracker-row">
              <div className="col-xs-6 col-sm-4 col-desc">Wind Description</div>
              <div className="col-xs-6 col-sm-8 col-desc">
                <input
                  type="text"
                  value={this.state.windDescription}
                  placeholder="Enter Wind Description"
                  required={true}
                  onChange={this.handleWindDesc}
                />
              </div>
            </div>
            <div className="container tracker-row">
              <div className="col-xs-6 col-sm-4 col-desc">
                Weather Description
              </div>
              <div className="col-xs-6 col-sm-8 col-desc">
                <input
                  type="text"
                  value={this.state.weatherDescription}
                  placeholder="Enter Weather Description"
                  required={true}
                  onChange={this.handleWeatherDesc}
                />
              </div>
            </div>
            <div className="container tracker-row">
              <div className="col-xs-6 col-sm-4 col-desc">Pressure (hPa)</div>
              <div className="col-xs-6 col-sm-8 col-desc">
                <input
                  type="text"
                  value={this.state.pressure}
                  placeholder="Enter Pressure in hPa"
                  required={true}
                  onChange={this.handlePressureChange}
                />
              </div>
            </div>
            <div className="container tracker-row">
              <div className="col-xs-6 col-sm-4 col-desc">
                Humidity Percentage (%)
              </div>
              <div className="col-xs-6 col-sm-8 col-desc">
                <input
                  type="text"
                  value={this.state.humidityPercentage}
                  placeholder="Enter Humidity %"
                  required={true}
                  onChange={this.handleHumidityChange}
                />
              </div>
            </div>
            <div className="container tracker-row">
              <div className="col-xs-6 col-sm-4 col-desc">Date</div>
              <div className="col-xs-6 col-sm-8 col-desc">
                <DatePicker
                  selected={this.state.date}
                  required
                  onChange={this.handleDateChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <button type="submit" className="lg-cta del-btn">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </section>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default WeatherData;
