package com.masai.projectshelf.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.masai.projectshelf.dto.CaseStudyDto;
import com.masai.projectshelf.exception.BadRequestException;
import com.masai.projectshelf.model.CaseStudy;
import com.masai.projectshelf.model.User;
import com.masai.projectshelf.repository.CaseStudyRepository;

@Service
public class CaseStudyService {
	@Autowired
	private CaseStudyRepository caseStudyRepo;
	@Autowired
    private contextService contextService;

    public CaseStudy createCaseStudy(CaseStudyDto dto) {
        User currentUser = contextService.getCurrentUser();

        CaseStudy cs = new CaseStudy();
        cs.setTitle(dto.getTitle());
        cs.setOverview(dto.getOverview());
        cs.setStartTime(dto.getStartTime());
        cs.setEndTime(dto.getEndTime());
        cs.setToolsUsed(dto.getToolsUsed());
        cs.setOutcomes(dto.getOutcomes());
        cs.setMediaUrls(dto.getMediaUrls());
        cs.setYouTubeUrl(dto.getYouTubeUrl());
        cs.setThemeId(dto.getThemeId());
        cs.setCreator(currentUser);

        return caseStudyRepo.save(cs);
    }

    public CaseStudy updateCaseStudy(Long id, CaseStudyDto dto) {
        CaseStudy cs = caseStudyRepo.findById(id)
                .orElseThrow(() -> new BadRequestException("Case Study not found"));

        User currentUser = contextService.getCurrentUser();
        if (!(cs.getCreator().getId() == currentUser.getId())) {
            throw new BadRequestException("Unauthorized to update this case study");
        }

        cs.setTitle(dto.getTitle());
        cs.setOverview(dto.getOverview());
        cs.setStartTime(dto.getStartTime());
        cs.setEndTime(dto.getEndTime());
        cs.setToolsUsed(dto.getToolsUsed());
        cs.setOutcomes(dto.getOutcomes());
        cs.setMediaUrls(dto.getMediaUrls());
        cs.setYouTubeUrl(dto.getYouTubeUrl());
        cs.setThemeId(dto.getThemeId());

        return caseStudyRepo.save(cs);
    }

    public CaseStudy getCaseStudyById(Long id) {
        return caseStudyRepo.findById(id)
                .orElseThrow(() -> new BadRequestException("Case Study not found"));
    }
    
    public void deleteCaseStudyById(Long id) {
        CaseStudy cy = caseStudyRepo.findById(id)
                .orElseThrow(() -> new BadRequestException("Case Study not found"));
        caseStudyRepo.delete(cy);
    }

    public List<CaseStudy> getCaseStudiesByCurrentUser() {
        User currentUser = contextService.getCurrentUser();
        return caseStudyRepo.findByCreator(currentUser);
    }
}
