package com.deloitte.fi.weather.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "country-city-details")
public class CountryCityDetails {

	@Id
	private String id;
	private String countryName;
	private String cityName;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getCountryName() {
		return countryName;
	}
	public void setCountryName(String countryName) {
		this.countryName = countryName;
	}
	public String getCityName() {
		return cityName;
	}
	public void setCityName(String cityName) {
		this.cityName = cityName;
	}
	
	@Override
	public String toString() {
		return "CountryCityDetails [countryName=" + countryName + ", cityName=" + cityName + "]";
	}
	
	
}
