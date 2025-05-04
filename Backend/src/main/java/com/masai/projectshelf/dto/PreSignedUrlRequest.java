package com.masai.projectshelf.dto;

import java.util.List;
import java.util.Map;

import lombok.Data;

@Data
public class PreSignedUrlRequest {
	private String tagname;

	private String fileExtension;

	private String fileName;

	private String path;

	private String contentType;

	private String schoolUid;

	private String sessionUid;
	
	private String admissionNo;

	private boolean contentDispositionInline;

	private boolean getS3FileUrl;

	private List<String> classSectionUids;

	private List<String>fields;

	private Map<String, String> classSectionMap;
	
	private Map<String, String> groupMap;
	
	private Map<String, String> houseMap;

}

