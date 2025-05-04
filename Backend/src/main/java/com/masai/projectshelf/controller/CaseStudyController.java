package com.masai.projectshelf.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.masai.projectshelf.dto.CaseStudyDto;
import com.masai.projectshelf.dto.MessageResponse;
import com.masai.projectshelf.model.CaseStudy;
import com.masai.projectshelf.service.CaseStudyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/case-studies")
@RequiredArgsConstructor
public class CaseStudyController {

	@Autowired
    private CaseStudyService caseStudyService;

    @PostMapping
    public ResponseEntity<?> createCaseStudy(@RequestBody CaseStudyDto dto) {
        CaseStudy cs = caseStudyService.createCaseStudy(dto);
        return ResponseEntity.ok(new MessageResponse("Case Study created successfully"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCaseStudy(@PathVariable Long id, @RequestBody CaseStudyDto dto) {
        CaseStudy cs = caseStudyService.updateCaseStudy(id, dto);
        return ResponseEntity.ok(new MessageResponse("Case Study updated successfully"));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCaseStudy(@PathVariable Long id) {
        caseStudyService.deleteCaseStudyById(id);
        return ResponseEntity.ok(new MessageResponse("Case Study deleted successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCaseStudyById(@PathVariable Long id) {
        CaseStudy cs = caseStudyService.getCaseStudyById(id);
        return ResponseEntity.ok(new MessageResponse("Case Study fetched successfully", CaseStudyDto.mapToResponse(cs)));
    }

    @GetMapping()
    public ResponseEntity<?> getCaseStudiesByUser() {
        List<CaseStudy> caseStudies = caseStudyService.getCaseStudiesByCurrentUser();
        return ResponseEntity.ok(new MessageResponse("Your Case Studies fetched successfully", caseStudies.stream().map(CaseStudyDto::mapToResponse).collect(Collectors.toList())));
    }
}

