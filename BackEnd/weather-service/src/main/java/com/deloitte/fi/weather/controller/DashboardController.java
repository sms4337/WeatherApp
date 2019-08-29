package com.deloitte.fi.weather.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.deloitte.fi.weather.exception.InternalServerException;
import com.deloitte.fi.weather.model.CountryCityDetails;
import com.deloitte.fi.weather.repository.CountryCityRepository;

@RestController
@RequestMapping("/fetchcity")
@CrossOrigin("*")
public class DashboardController {
	
	private static final Logger log = LoggerFactory.getLogger(DashboardController.class);
	
	@Autowired
	CountryCityRepository countryCityRepository;
	
	@GetMapping(value = "/{countryName}",produces = MediaType.APPLICATION_JSON_VALUE)
	public List<String> getCityNamesForACountryName(@PathVariable String countryName) {
		
		log.info("--- Inside getCityNamesForACountryName method of " + this.getClass().getSimpleName()
				+ " ---");
		
		try {
			Iterable<CountryCityDetails> w = countryCityRepository.findByCountryName(countryName);
			List<String> cityNames = new ArrayList<>();
			w.forEach(w1 -> cityNames.add(w1.getCityName()));
			return cityNames;
		} catch (InternalServerException e) {
			log.error(" --- Exception occured in getCityNamesForACountryName method of " +
					this.getClass().getSimpleName() + " ---");
			throw new InternalServerException(e.getMessage());
		}
		
	}

}
