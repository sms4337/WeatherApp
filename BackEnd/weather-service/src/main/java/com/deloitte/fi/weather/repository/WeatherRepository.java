package com.deloitte.fi.weather.repository;

import java.time.LocalDate;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.deloitte.fi.weather.model.Weather;

@Repository
public interface WeatherRepository extends MongoRepository<Weather, String>{

	Iterable<Weather> findByCityNameAndDate(String cityName, LocalDate dd);

}
