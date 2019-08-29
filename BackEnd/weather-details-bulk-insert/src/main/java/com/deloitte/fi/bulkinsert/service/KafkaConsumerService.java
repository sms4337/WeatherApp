package com.deloitte.fi.bulkinsert.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.deloitte.fi.bulkinsert.model.Weather;
import com.deloitte.fi.bulkinsert.repository.WeatherBulkInsertRepository;

@Service
public class KafkaConsumerService {
	private static final Logger log = LoggerFactory.getLogger(KafkaConsumerService.class);

	@Autowired
	WeatherBulkInsertRepository bulkInsertRepository;

	/**
	 * This method is used to process each record which is published to Kafka
	 * (It acts like a consumer)
	 * 
	 * @param dto
	 * @throws IOException 
	 */
	@KafkaListener(topics = "${jsa.kafka.topic}")
	public void processMessage(Weather weather) throws IOException {
		String message="",fileName = "";
		try {
			log.info("Processing started for :: " + weather);
			weather.setDate(new Date(weather.getDate().getYear(), weather.getDate().getMonth(), weather.getDate().getDate()));
			bulkInsertRepository.save(weather);
			log.info("Processing completed for :: " + weather);
			
			message = "Details saved successfully for weather details :  ["+
			weather.getCityName() + ", " + weather.getDate() + "]\r\n";
			fileName = System.getProperty("user.home")+"/Desktop/Success.txt";
			
		} catch (Exception e) {
			message = "Details were not saved for weather details : ["+
					weather.getCityName() + ", " + weather.getDate() + "]\r\n";
			fileName = System.getProperty("user.home")+"/Desktop/Failure.txt";
			
		}
		finally {
			Files.write(
				      Paths.get(fileName), 
				      message.getBytes(), 
				      StandardOpenOption.CREATE,
				      StandardOpenOption.APPEND);
		}
	}
}
