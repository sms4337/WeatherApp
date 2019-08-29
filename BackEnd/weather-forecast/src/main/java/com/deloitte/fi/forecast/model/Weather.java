package com.deloitte.fi.forecast.model;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "weather")
@CompoundIndex(def="{'cityName':1,'date':1}",name="compound_index",unique=true)
public class Weather {
	
	@Id
	private String id;
	private String cityName;
	private String countryName;
	private String weatherDescription;
	private String temperature;
	private String cloudsDescription;
	private String windDescription;
	private String pressure;
	private String humidityPercentage;
	
	private LocalDate date;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}

	public String getCountryName() {
		return countryName;
	}

	public void setCountryName(String countryName) {
		this.countryName = countryName;
	}

	public String getWeatherDescription() {
		return weatherDescription;
	}

	public void setWeatherDescription(String weatherDescription) {
		this.weatherDescription = weatherDescription;
	}

	public String getTemperature() {
		return temperature;
	}

	public void setTemperature(String temperature) {
		this.temperature = temperature;
	}

	public String getCloudsDescription() {
		return cloudsDescription;
	}

	public void setCloudsDescription(String cloudsDescription) {
		this.cloudsDescription = cloudsDescription;
	}

	public String getWindDescription() {
		return windDescription;
	}

	public void setWindDescription(String windDescription) {
		this.windDescription = windDescription;
	}

	public String getPressure() {
		return pressure;
	}

	public void setPressure(String pressure) {
		this.pressure = pressure;
	}

	public String getHumidityPercentage() {
		return humidityPercentage;
	}

	public void setHumidityPercentage(String humidityPercentage) {
		this.humidityPercentage = humidityPercentage;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	@Override
	public String toString() {
		return "Weather [id=" + id + ", cityName=" + cityName + ", countryName=" + countryName + ", weatherDescription="
				+ weatherDescription + ", temperature=" + temperature + ", cloudsDescription=" + cloudsDescription
				+ ", windDescription=" + windDescription + ", pressure=" + pressure + ", humidityPercentage="
				+ humidityPercentage + ", date=" + date + "]";
	}
	
	
	
}
