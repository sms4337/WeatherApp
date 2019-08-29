import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import axios from "axios";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import WeatherDetailsTable from "../WeatherDetailsTable/weatherDetailsTable";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      cityName: "",
      startDate: moment(),
      weatherDetails: [],
      cityDetails: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleCityChange = event => {
    this.setState({
      cityName: event.target.value
    });
  };

  // componentWillReceiveProps(nextProps) {
  //   this.setState({ weatherDetails: nextProps.data });
  // }

  // componentDidMount() {
  //   console.log("hello" + this.state.weatherDetails);
  // }

  componentDidMount() {
    axios({
      method: "GET",
      url: `http://localhost:8765/weatherUI/fetchcity/India`,
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
  }

  handleSubmit = e => {
    console.log("button clicked");
    e.preventDefault();
    let requestData = {
      cityName: this.state.cityName,
      date: moment(this.state.startDate).format()
    };

    const cityVal = this.state.cityName;
    const dateVal = moment(this.state.startDate).format();

    axios({
      method: "GET",
      url: `http://localhost:8765/weatherUI/weather/citydate/${cityVal}/${dateVal}`,
      headers: {
        "Content-Type": "application/json"
      },
      data: requestData
    })
      .then(response => {
        console.log(response.data);
        this.setState({
          weatherDetails: response.data
        });
        //this.props.history.push('/weather-details');
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        {/* <Header /> */}
        <section className="container del-body">
          <form className="weatherdateForm" onSubmit={this.handleSubmit}>
            <div className="center">
              <div className="container tracker-row">
                <div className="col-sm-2 col-desc">City Name</div>
                <div className="col-sm-8 col-desc">
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
                <div className="col-sm-2 col-desc">Date</div>
                <div className="col-sm-6 col-desc">
                  <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 button-style">
                  <button type="submit" className="lg-cta del-btn">
                    Click to get Weather details
                  </button>
                </div>
              </div>
            </div>
            <WeatherDetailsTable weatherDetails={this.state.weatherDetails} />
            {/* <BootstrapTable data={this.state.weatherDetails}>
              <TableHeaderColumn dataField="cityName" isKey>
                City name
              </TableHeaderColumn>
              <TableHeaderColumn dataField="countryName">
                Country Name
              </TableHeaderColumn>
              <TableHeaderColumn dataField="temperature">
                Temperature
              </TableHeaderColumn>
              <TableHeaderColumn dataField="cloudsDescription">
                Clouds Description
              </TableHeaderColumn>
              <TableHeaderColumn dataField="windDescription">
                Wind Description
              </TableHeaderColumn>
              <TableHeaderColumn dataField="pressure">
                Pressure
              </TableHeaderColumn>
              <TableHeaderColumn dataField="humidityPercentage">
                Humidity Percentage
              </TableHeaderColumn>
              <TableHeaderColumn dataField="date">Date</TableHeaderColumn>
              <TableHeaderColumn dataField="weatherDescription">
                WeatherDescription
              </TableHeaderColumn>
            </BootstrapTable> */}
          </form>
        </section>

        {/* <Footer /> */}
      </div>
    );
  }
}

export default Landing;
