package com.masai.projectshelf.service;

import java.io.ByteArrayInputStream;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.masai.projectshelf.dto.PreSignedUrlRequest;
import com.masai.projectshelf.dto.PreSignedUrlResponse;
import com.masai.projectshelf.exception.BadRequestException;

@Service
public class AwsS3Service {
	
	private static final String NO_PATH_DEFINED_ERROR = "No path defined for requested tagname";
	private static final String FILE_NOT_FOUND_ERROR = "File not found";
	private static final String FILE_NAME_EMPTY_ERROR = "Filename cannot be empty";
	private static final String BASE_FOLDER_NAME = "uploads/";

	@Autowired
	private AmazonS3 amazonS3;

	@Value("${aws.bucket}")
	private String webCmsBucketName;
	
	public PreSignedUrlResponse generatePerSignedUrl(PreSignedUrlRequest request, HttpMethod method) {
		String folderName = "profileinfo/";
		String fileName = null;
		if (request.getFileName() == null || request.getFileName().isEmpty()) {
			if (request.getFileExtension() == null || request.getFileExtension().isEmpty())
				throw new BadRequestException("fileName or fileExtension either one of them is required");
			fileName = getRandomFileName(request.getFileExtension());
		}
		createFolderIfNotExists(folderName, webCmsBucketName);
		String url = generatePreSignedUrl(folderName + fileName, request.getContentType(), webCmsBucketName, method,request.isContentDispositionInline());
		
		if(request.isGetS3FileUrl() && method.equals(HttpMethod.GET))
			url = "https://"+ webCmsBucketName +".s3.ap-south-1.amazonaws.com/"+folderName + fileName;
		return PreSignedUrlResponse.builder().url(url).fileName(fileName).build();
	}
	
	private void createFolderIfNotExists(String folderName, String targetBucketName) {
		try {
			amazonS3.getObjectMetadata(targetBucketName, folderName);
		} catch (AmazonS3Exception e) {
			amazonS3.putObject(targetBucketName, folderName, new ByteArrayInputStream(new byte[0]),
					new ObjectMetadata());
		}
	}
	
	private String getRandomFileName(String fileExtension) {
		return "UploadFile" + LocalDateTime.now().toString().replace(':', '_').replace('.', '_') + "." + fileExtension;
	}
	
	public String generatePreSignedUrl(String filePath, String contentType, String targetBucketName,
			HttpMethod httpMethod,boolean contentDispositionInline) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new Date());
		calendar.add(Calendar.MINUTE, 10); // validity of 10 minutes
		GeneratePresignedUrlRequest request = new GeneratePresignedUrlRequest(targetBucketName, filePath, httpMethod);
		request.setExpiration(calendar.getTime());
		if (httpMethod.equals(HttpMethod.GET))
			if(contentDispositionInline)
				request.addRequestParameter("response-content-disposition", "inline");
			else
				request.addRequestParameter("response-content-disposition", "attachment");
		if (httpMethod.equals(HttpMethod.PUT) && contentType != null && !contentType.isBlank())
			request.setContentType(contentType);
		return amazonS3.generatePresignedUrl(request).toString();
	}
}
