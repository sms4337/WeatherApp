package com.deloitte.fi.forecast.repository;

import java.time.LocalDate;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.deloitte.fi.forecast.model.Weather;

@Repository
public interface WeatherForecastRepository extends MongoRepository<Weather, String>{

	@Query("{ 'cityName' : ?0 ,'date' : {$gte : ?1, $lte : ?2} }")
	Iterable<Weather> findByCityNameAndDateRange(String cityName, LocalDate dd1, LocalDate dd2);
	
	
	

}
