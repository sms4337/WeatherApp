package com.deloitte.fi.forecast.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.deloitte.fi.forecast.exception.InternalServerException;
import com.deloitte.fi.forecast.model.Weather;
import com.deloitte.fi.forecast.service.WeatherForecastService;

@RestController
@RequestMapping("/forecast")
@CrossOrigin("*")
public class WeatherForeCastController {

	private static final Logger log = LoggerFactory.getLogger(WeatherForeCastController.class);
	
	@Autowired
	WeatherForecastService forecastService;
	
	@GetMapping(value = "{city}/{fromdate}/{todate}", produces = MediaType.APPLICATION_JSON_VALUE)
	public Iterable<Weather> getWeatherByDateRange(@PathVariable String city,@PathVariable String fromdate,
			@PathVariable String todate) {
		log.info("--- Inside getWeatherByDateRange method of " + this.getClass().getSimpleName() 
				+ " ---");
		try {
			return forecastService.getWeatherByDateRange(city, fromdate, todate);
		} catch (InternalServerException e) {
			log.error(" --- Exception occured in getWeatherByDateRange method of " +
					this.getClass().getSimpleName() + " ---");
			throw new InternalServerException(e.getMessage());
		}
	}
	
}
