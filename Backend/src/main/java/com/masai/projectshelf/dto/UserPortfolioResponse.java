package com.masai.projectshelf.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserPortfolioResponse {
    private String firstName;
    private String lastName;
    private String email;
    private String displayName;
    private String bio;
    private String mobileNumber;
    private String profilePicUrl;
    private String linkedinUrl;
    private String twitterUrl;
    private String facebookUrl;
    private String designation;
    private String address;
    private String uniqueName;
    private List<CaseStudyDto> caseStudies;
}

