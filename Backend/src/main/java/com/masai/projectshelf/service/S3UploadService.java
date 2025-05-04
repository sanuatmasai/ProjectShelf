package com.masai.projectshelf.service;

import java.io.IOException;
import java.util.UUID;

import org.hibernate.annotations.common.util.impl.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;

import ch.qos.logback.classic.Logger;

@Service
public class S3UploadService {

//	private static final Logger logger = LoggerFactory.getLogger(S3UploadService.class);

	@Autowired
	private AmazonS3 amazonS3;

	@Value("${aws.bucket}")
	private String bucketName;

//	public String uploadFile(MultipartFile file) throws IOException {
//		logger.info("Initiating file upload for: {}", file.getOriginalFilename());
//
//		String uniqueFileName = generateFileName(file.getOriginalFilename());
//		ObjectMetadata metadata = new ObjectMetadata();
//		metadata.setContentLength(file.getSize());
//		metadata.setContentType(file.getContentType());
//
//		try {
//			logger.info("Uploading file to S3 with generated file name: {}", uniqueFileName);
//			amazonS3.putObject(new PutObjectRequest(bucketName, uniqueFileName, file.getInputStream(), metadata));
//			logger.info("File uploaded successfully to S3 bucket: {}", bucketName);
//		} catch (Exception e) {
//			logger.error("Error uploading file to S3 for file: {}", file.getOriginalFilename(), e);
//			throw new IOException("Error uploading file to S3", e);
//		}
//
//		String fileUrl = amazonS3.getUrl(bucketName, uniqueFileName).toString();
//		logger.info("File available at URL: {}", fileUrl);
//		return fileUrl;
//	}

	public String updateFile(String existingFileKey, MultipartFile newFile) throws IOException {
//		logger.info("Initiating file update for: {}", existingFileKey);

		// Remove the old file
		deleteFile(existingFileKey); 
//		logger.info("Old file deleted for key: {}", existingFileKey);

		// Upload the new file
		return uploadFile(newFile);
	}

	public void deleteFile(String fileKey) {
		try {
//			logger.info("Deleting file with key: {} from bucket: {}", fileKey, bucketName);
			amazonS3.deleteObject(bucketName, fileKey);
//			logger.info("File deleted successfully from S3 bucket: {}", bucketName);
		} catch (Exception e) {
//			logger.error("Error deleting file from S3 with key: {}", fileKey, e);
			throw new RuntimeException("Error deleting file from S3", e);
		}
	}

	public String getFileUrl(String fileKey) {
//		logger.info("Retrieving URL for file with key: {}", fileKey);
		try {
			String fileUrl = amazonS3.getUrl(bucketName, fileKey).toString();
//			logger.info("File URL retrieved successfully: {}", fileUrl);
			return fileUrl;
		} catch (Exception e) {
//			logger.error("Error retrieving file URL from S3 for key: {}", fileKey, e);
			throw new RuntimeException("Error retrieving file URL from S3", e);
		}
	}

	private String generateFileName(String originalFileName) {
		String uniqueFileName = UUID.randomUUID().toString() + "_" + originalFileName;
//		logger.debug("Generated unique file name: {}", uniqueFileName);
		return uniqueFileName;
	}
	
	
	public String uploadFile(MultipartFile file) {
        try {
            String key = "uploads/" + file.getOriginalFilename(); // File path in S3 bucket
            amazonS3.putObject(bucketName, key, file.getInputStream(), null);
             
            // Return public URL
            return amazonS3.getUrl(bucketName, key).toString();
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload file to S3", e);
        }
    }
}
