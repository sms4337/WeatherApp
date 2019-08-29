package com.deloitte.fi.details.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.deloitte.fi.details.exception.InternalServerException;
import com.deloitte.fi.details.model.Weather;
import com.deloitte.fi.details.repository.WeatherInsertRepository;

@Service
public class WeatherInsertService {
	
	private static final Logger log = LoggerFactory.getLogger(WeatherInsertService.class);
	
	@Autowired
	WeatherInsertRepository insertRepository;
	
	public Weather insertDetails(Weather weather) {
		log.info("--- Inside insertDetails method of " + this.getClass().getSimpleName() + 
				" ---");
		try {
			return insertRepository.save(weather);
		} catch (Exception e) {
			log.error(" --- Exception occured in insertDetails method of " +
					this.getClass().getSimpleName() + " ---");
			throw new InternalServerException(e.getMessage()); 
		}
	}
	
}
