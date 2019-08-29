package com.deloitte.fi.bulkinsert.util;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

/**
 * 
 * @author Ashok This class is used to Format the Date while writing json file
 *
 */
public class DateSerializer extends JsonSerializer<Date> {

	@Override
	public void serialize(Date dt, JsonGenerator jsonGen, SerializerProvider sp)
			throws IOException, JsonProcessingException {
		DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String formattedDate = sdf.format(dt);
		jsonGen.writeString(formattedDate);
	}
}
