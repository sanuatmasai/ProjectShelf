package com.masai.projectshelf.dto;

import lombok.RequiredArgsConstructor;

import java.io.Serializable;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@RequiredArgsConstructor
public class PreSignedUrlResponse implements Serializable{
	private static final long serialVersionUID = 1L;
	private final String url;
	private final String fileName;
}
