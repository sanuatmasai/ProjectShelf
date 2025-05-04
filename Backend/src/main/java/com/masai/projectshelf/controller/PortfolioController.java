package com.masai.projectshelf.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.masai.projectshelf.dto.CaseStudyDto;
import com.masai.projectshelf.dto.MessageResponse;
import com.masai.projectshelf.dto.UserPortfolioResponse;
import com.masai.projectshelf.service.PortfolioService;

@RestController
@RequestMapping("/public")
public class PortfolioController {
	@Autowired
    private PortfolioService portfolioService;

    @GetMapping("/{uniqueName}")
    public ResponseEntity<?> getUserProfile(@PathVariable String uniqueName, HttpServletRequest request) {
    	String ip = request.getRemoteAddr();
        UserPortfolioResponse response = portfolioService.getUserPortfolio(uniqueName, ip);
        return ResponseEntity.ok(new MessageResponse("User portfolio fetched successfully", response));
    }
    
    @GetMapping("/{uniqueName}/{uid}")
    public ResponseEntity<?> getUserProfile(@PathVariable String uniqueName, @PathVariable String uid, HttpServletRequest request) {
    	String ip = request.getRemoteAddr();
    	CaseStudyDto response = portfolioService.getUserPortfolio(uniqueName, uid, ip);
        return ResponseEntity.ok(new MessageResponse("CaseStudy fetched successfully", response));
    }
}
