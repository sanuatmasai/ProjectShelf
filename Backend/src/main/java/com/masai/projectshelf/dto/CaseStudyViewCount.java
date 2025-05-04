package com.masai.projectshelf.dto;

import java.util.List;

import com.masai.projectshelf.model.CaseStudy;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CaseStudyViewCount {
	private String uid;
	private Long id;
	private String title;
	private int totalViews;
	private int uniqueViews;
	
	public static CaseStudyViewCount maptoResponse(CaseStudy cs) {
		return CaseStudyViewCount.builder()
				.uid(cs.getUid())
				.id(cs.getId())
				.title(cs.getTitle())
				.totalViews(cs.getTotalViews())
				.uniqueViews(cs.getUniqueViews())
				.build();
	}
	
	
}
