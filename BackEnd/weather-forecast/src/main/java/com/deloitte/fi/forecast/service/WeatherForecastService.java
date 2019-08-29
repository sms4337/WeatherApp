package com.deloitte.fi.forecast.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.deloitte.fi.forecast.exception.InternalServerException;
import com.deloitte.fi.forecast.model.Weather;
import com.deloitte.fi.forecast.repository.WeatherForecastRepository;

@Service
public class WeatherForecastService {
	private static final Logger log = LoggerFactory.getLogger(WeatherForecastService.class);
	
	@Autowired
	WeatherForecastRepository forecastRepository;
	
	public Iterable<Weather> getWeatherByDateRange(String cityName,String fromdate,String todate) {
		
		log.info("--- Inside getWeatherByDateRange method of " + this.getClass().getSimpleName() + 
				" ---");
		try {
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
			fromdate = fromdate.substring(0, 10);
			todate = todate.substring(0, 10);
			LocalDate dd1 = LocalDate.parse(fromdate, formatter);
			LocalDate dd2 = LocalDate.parse(todate, formatter);
			return forecastRepository.findByCityNameAndDateRange(cityName,dd1,dd2);
		} catch (Exception e) {
			log.error(" --- Exception occured in getWeatherByDateRange method of " +
					this.getClass().getSimpleName() + " ---");
			throw new InternalServerException(e.getMessage());
		}
		
	}
	
	
}
