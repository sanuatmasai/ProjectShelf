package com.masai.projectshelf.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.masai.projectshelf.dto.CaseStudyDto;
import com.masai.projectshelf.dto.UserPortfolioResponse;
import com.masai.projectshelf.exception.BadRequestException;
import com.masai.projectshelf.model.CaseStudy;
import com.masai.projectshelf.model.User;
import com.masai.projectshelf.repository.CaseStudyRepository;
import com.masai.projectshelf.repository.UserRepository;

@Service
public class PortfolioService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CaseStudyRepository caseStudyRepository;

    public UserPortfolioResponse getUserPortfolio(String uniqueName, String ip) {
        User user = userRepository.findByUniqueNameIgnoreCase(uniqueName)
                .orElseThrow(() -> new BadRequestException("User with unique name '" + uniqueName + "' not found"));

        List<CaseStudy> caseStudies = caseStudyRepository.findByCreator(user);
        
        
        user.setTotalViews(user.getTotalViews() + 1);
        if (user.getUniqueViewPortfolioIps().add(ip)) {
            user.setUniqueViews(user.getUniqueViews() + 1);
        }
        userRepository.save(user);

        List<CaseStudyDto> caseStudyDtos = caseStudies.stream()
                .map(CaseStudyDto :: mapToResponse)
                .collect(Collectors.toList());

        return new UserPortfolioResponse(
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getDisplayName(),
                user.getBio(),
                user.getMobileNumber(),
                user.getProfilePicUrl(),
                user.getLinkedinUrl(),
                user.getTwitterUrl(),
                user.getFacebookUrl(),
                user.getDesignation(),
                user.getAddress(),
                user.getUniqueName(),
                user.getTemplateId(),
                caseStudyDtos
        );
    }
    
    public CaseStudyDto getUserPortfolio(String uniqueName, String uid, String ip) {
        User user = userRepository.findByUniqueNameIgnoreCase(uniqueName)
                .orElseThrow(() -> new BadRequestException("User with unique name '" + uniqueName + "' not found"));
        
        CaseStudy cs = caseStudyRepository.findByUid(uid);
        if(cs == null) {
        	throw new BadRequestException("No case study found");
        }
        if(cs.getCreator().getId() != user.getId()) {
        	throw new BadRequestException("The requested case study does not belong to this user.");
        }
        
        
//        for (CaseStudy cs : caseStudies) {
            cs.setTotalViews(cs.getTotalViews() + 1);
            if (cs.getUniqueViewIps().add(ip)) {
                cs.setUniqueViews(cs.getUniqueViews() + 1);
            }
            caseStudyRepository.save(cs);
//        }
        
        return CaseStudyDto.mapToResponse(cs);
    }
    
//    @Transactional
//    public void incrementCaseStudyView(String uid) {
//        CaseStudy cs = caseStudyRepository.findByUid(uid);
//        cs.setViews(cs.getViews() + 1);
//        caseStudyRepository.save(cs);
//    }

}
