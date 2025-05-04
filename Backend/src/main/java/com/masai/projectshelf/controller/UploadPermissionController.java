package com.masai.projectshelf.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.amazonaws.HttpMethod;
import com.masai.projectshelf.dto.PreSignedUrlRequest;
import com.masai.projectshelf.service.AwsS3Service;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/users")
@Tag(name = "Upload Permission Controller")
public class UploadPermissionController {
	@Autowired
	private AwsS3Service awsS3Service;
	
	@Operation( summary = "Get Pre-Signed URL for PUT method")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "URL Generated Successfully"),
			@ApiResponse(responseCode = "400", description = "Bad Request"),
			@ApiResponse(responseCode = "500", description = "Internal Server Error") })
	@PutMapping("/aws-put-url")
	public ResponseEntity<?> getPreSignedPutUrl(@RequestBody @Valid PreSignedUrlRequest request){
		return ResponseEntity.ok().body(awsS3Service.generatePerSignedUrl(request,HttpMethod.PUT));
	}
	
	@Operation( summary = "Get Pre-Signed URL for GET method")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "URL Generated Successfully"),
			@ApiResponse(responseCode = "400", description = "Bad Request"),
			@ApiResponse(responseCode = "500", description = "Internal Server Error") })
	@PutMapping("/aws-get-url")
	public ResponseEntity<?> getPreSignedGetUrl(@RequestBody @Valid PreSignedUrlRequest request){
		return ResponseEntity.ok().body(awsS3Service.generatePerSignedUrl(request,HttpMethod.GET));
	}
	
//	@Operation( summary = "Get Pre-Signed URL for GET method")
//	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "URL Generated Successfully"),
//			@ApiResponse(responseCode = "400", description = "Bad Request"),
//			@ApiResponse(responseCode = "500", description = "Internal Server Error") })
//	@PutMapping("/aws-open-get-url")
//	public ResponseEntity<?> getPreSignedGetUrlInsecurely(@RequestBody @Valid InsecurePreSignedUrlRequest request){
//		return ResponseEntity.ok().body(awsS3Service.generatePerSignedUrl(request,HttpMethod.GET));
//	}
//	
//	@Operation( summary = "Get Pre-Signed URL for PUT method")
//	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "URL Generated Successfully"),
//			@ApiResponse(responseCode = "400", description = "Bad Request"),
//			@ApiResponse(responseCode = "500", description = "Internal Server Error") })
//	@PutMapping("/aws-open-put-url")
//	public ResponseEntity<?> getPreSignedPutUrlInsecurely(@RequestBody @Valid PreSignedUrlRequest request){
//		return ResponseEntity.ok().body(awsS3Service.generatePerSignedUrl(request,HttpMethod.PUT));
//	}
//	
//	@Operation( summary = "Get Pre-Signed URL for DELETE method")
//	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "URL Generated Successfully"),
//			@ApiResponse(responseCode = "400", description = "Bad Request"),
//			@ApiResponse(responseCode = "500", description = "Internal Server Error") })
//	@PutMapping("/aws-delete-url")
//	public ResponseEntity<?> getPreSignedDeleteUrl(@RequestBody @Valid PreSignedUrlRequest request){
//		awsS3Service.deleteFile(request);
//		return ResponseEntity.ok().body("File Deleted");
//	}
}

