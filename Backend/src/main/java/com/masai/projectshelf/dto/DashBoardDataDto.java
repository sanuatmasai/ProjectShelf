package com.masai.projectshelf.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.masai.projectshelf.model.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashBoardDataDto {
	 private int totalViews;
	 private int uniqueViews;
	 private List<CaseStudyViewCount> caseStudyDataCount;
	 
	 public static DashBoardDataDto mapToResponse(User u) {
		 return DashBoardDataDto.builder()
				 .totalViews(u.getTotalViews())
				 .uniqueViews(u.getUniqueViews())
				 .caseStudyDataCount(u.getCaseStudies().stream().map(CaseStudyViewCount::maptoResponse).collect(Collectors.toList()))
				 .build();
	 }
}
