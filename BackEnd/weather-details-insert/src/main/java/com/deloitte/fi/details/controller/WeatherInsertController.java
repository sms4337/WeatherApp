package com.deloitte.fi.details.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.deloitte.fi.details.exception.InternalServerException;
import com.deloitte.fi.details.model.Weather;
import com.deloitte.fi.details.service.WeatherInsertService;

@RestController
@RequestMapping("/insert")
@CrossOrigin("*")
public class WeatherInsertController {
	
	private static final Logger log = LoggerFactory.getLogger(WeatherInsertController.class);
	
	@Autowired
	WeatherInsertService insertService;
	
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	public Weather insertDetails(@RequestBody Weather weather) {
		log.info("--- Inside insertDetails method of " + this.getClass().getSimpleName() +
				" ---");
		try {
			return insertService.insertDetails(weather);
		} catch (InternalServerException e) {
			log.error(" --- Exception occured in insertDetails method of " +
					this.getClass().getSimpleName() + " ---");
			throw new InternalServerException(e.getMessage());
	}
		
	}
	
}
