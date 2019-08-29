package com.deloitte.fi.bulkinsert.controller;

import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.deloitte.fi.bulkinsert.exception.InternalServerException;
import com.deloitte.fi.bulkinsert.model.Weather;
import com.deloitte.fi.bulkinsert.service.FileUploadService;
import com.deloitte.fi.bulkinsert.service.KafkaProducerService;
import com.deloitte.fi.bulkinsert.service.WeatherDetailsBulkInsertService;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper; 

@RestController
@RequestMapping("/bulkInsert")
@CrossOrigin("*")
public class WeatherDetailsBulkInsertController {

	private static final Logger log = LoggerFactory.getLogger(WeatherDetailsBulkInsertController.class);

	@Autowired
	KafkaProducerService kafkaProduceService;

	@Autowired
	WeatherDetailsBulkInsertService bulkInsertService;
	
	@Autowired
    private FileUploadService fileUploadService;

	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	public Iterable<Weather> insertMultipleDetails(@RequestBody Iterable<Weather> weather) {

		log.info("--- Inside insertMultipleDetails method of " + this.getClass().getSimpleName() + " ---");
		try {
			return bulkInsertService.insertMultipleDetails(weather);
		} catch (InternalServerException e) {
			log.error(" --- Exception occured in insertMultipleDetails method of " + this.getClass().getSimpleName()
					+ " ---");
			throw new InternalServerException(e.getMessage());
		}
	}

	/**
	 * This method is used to read file from front end and publish messages to
	 * Kafka Server
	 * 
	 * @return String
	 */
	@PostMapping("/fileUpload")
	public String fileUpload() {
		ObjectMapper mapper = new ObjectMapper();
		try {
			// TODO:Need to fetch File from UI
			FileReader fr = new FileReader("Weather-Data.json");
			List<Weather> weatherDtos = mapper.readValue(fr,
					mapper.getTypeFactory().constructCollectionType(List.class, Weather.class));

			// TODO:Need to change this logic to use Executor-Services for
			// parallel processing
			if (!weatherDtos.isEmpty()) {
				for (Weather dto : weatherDtos) {
					kafkaProduceService.sendData(dto);
				}
			}
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "file uploaded successfully";
	}
	
	@PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile uploadfile) {

        if (uploadfile.isEmpty()) {
            return new ResponseEntity("please select a file!", HttpStatus.OK);
        }
        try {
            saveUploadedFiles(Arrays.asList(uploadfile));
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity("Successfully uploaded - " +
                uploadfile.getOriginalFilename(), new HttpHeaders(), HttpStatus.OK);
    }


   
   
    //private static String UPLOADED_FOLDER = "C:\\STS 3.8.4 Workspace\\weather-details-bulk-insert\\";
    
    //save file
    private void saveUploadedFiles(List<MultipartFile> files) throws IOException {

    	ObjectMapper mapper = new ObjectMapper(); 
        for (MultipartFile file : files) {

            if (file.isEmpty()) {
                continue; //next pls
            }
            
            String fileName = fileUploadService.storeFile(file);
           
            /*byte[] bytes = file.getBytes();
            Path path = Paths.get(UPLOADED_FOLDER + file.getOriginalFilename());
            Files.write(path, bytes);*/
            
            //System.out.println("File Path-->"+fileName);
            
            FileReader fr = new FileReader(fileName);
            List<Weather> objs = mapper.readValue(fr,
					mapper.getTypeFactory().constructCollectionType(List.class, Weather.class)); 
            
            System.out.println(objs);
            
            bulkInsertService.insertMultipleDetails(objs);

        }

    }


}
