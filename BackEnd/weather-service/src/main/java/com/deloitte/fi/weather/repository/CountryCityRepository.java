package com.deloitte.fi.weather.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.deloitte.fi.weather.model.CountryCityDetails;

@Repository
public interface CountryCityRepository extends MongoRepository<CountryCityDetails, String>{

	Iterable<CountryCityDetails> findByCountryName(String countryName);
	
}
