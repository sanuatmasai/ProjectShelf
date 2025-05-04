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
public class CaseStudyDto {
	private Long id;
	private String uid;
    private String title;
    private String overview;
    private String startTime;
    private String endTime;
    private List<String> toolsUsed;
    private List<String> outcomes;
    private List<String> mediaUrls;
    private String youTubeUrl;
    private String themeId;
    private int totalViews;
    private int uniqueViews;
    private Long createdUserId;
    
    public static CaseStudyDto mapToResponse(CaseStudy cs) {
    	return CaseStudyDto.builder()
    			.id(cs.getId())
    			.uid(cs.getUid())
    			.title(cs.getTitle())
    			.overview(cs.getOverview())
    			.startTime(cs.getStartTime())
    			.endTime(cs.getEndTime())
    			.toolsUsed(cs.getToolsUsed())
    			.outcomes(cs.getOutcomes())
    			.youTubeUrl(cs.getYouTubeUrl())
    			.mediaUrls(cs.getMediaUrls())
    			.themeId(cs.getThemeId())
    			.totalViews(cs.getTotalViews())
    			.uniqueViews(cs.getUniqueViews())
    			.createdUserId(cs.getCreator().getId())
    			.build();
    }
}