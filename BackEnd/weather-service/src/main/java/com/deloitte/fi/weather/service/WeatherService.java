package com.deloitte.fi.weather.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.deloitte.fi.weather.exception.InternalServerException;
import com.deloitte.fi.weather.model.Weather;
import com.deloitte.fi.weather.repository.WeatherRepository;

@Service
public class WeatherService {
	
	private static final Logger log = LoggerFactory.getLogger(WeatherService.class);
	
	@Autowired
	WeatherRepository weatherRepository;
	
	public Iterable<Weather> getAllWeatherDetails() {
		
		log.info("--- Inside getAllWeatherDetails method of " + this.getClass().getSimpleName() +" ---");
		try {
			return weatherRepository.findAll();
		} catch (Exception e) {
			log.error("-- Exception occured in getAllWeatherDetails method of " + this.getClass().getSimpleName()
					 + " --");
			throw new InternalServerException(e.getMessage());
		}
	}
	
	public Iterable<Weather> getWeatherByCityAndDate(String cityName, String date) {
		
		log.info("--- Inside getWeatherByCityAndDate method of " + this.getClass().getSimpleName() + " ---");
		try {
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
			date = date.substring(0, 10);
			LocalDate dd = LocalDate.parse(date, formatter);
			return weatherRepository.findByCityNameAndDate(cityName,dd);
		} catch (Exception e) {
			log.error(" --- Exception occured in getWeatherByCityAndDate method of " +
					this.getClass().getSimpleName() + " ---");
			throw new InternalServerException(e.getMessage());
		}
	}
	
	/*public Iterable<Weather> insertMultipleDetails(Iterable<Weather> weather) {
		
		log.info("--- Inside insertMultipleDetails method of " + this.getClass().getSimpleName() + " ---");
		try {
			return weatherRepository.saveAll(weather);
		} catch (Exception e) {
			log.error(" --- Exception occured in insertMultipleDetails method of " +
					this.getClass().getSimpleName() + " ---");
			throw new InternalServerException(e.getMessage());
		}
		
	}*/
	
}
