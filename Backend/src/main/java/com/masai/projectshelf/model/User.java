package com.masai.projectshelf.model;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.masai.projectshelf.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String uniqueName;

    @NotBlank(message = "Name is mandatory")
    private String firstName;

    private String lastName;

    @Email(message = "Email format is not correct")
    @NotBlank(message = "Email is a mandatory field")
    private String email;

    @NotBlank(message = "Password is mandatory")
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role = Role.ADMIN;  
    
    private String mobileNumber; 
    
    private String displayName;
    private String bio;
    private String profilePicUrl;
    private String templateId;
    
    private String linkedinUrl;
    private String twitterUrl;
    private String facebookUrl;
    
    private String address; 
    private String designation;
    
    @Column(columnDefinition = "INT DEFAULT 0")
    private int totalViews = 0;

    @Column(columnDefinition = "INT DEFAULT 0")
    private int uniqueViews = 0;

    @ElementCollection(fetch = FetchType.EAGER)
    private Set<String> uniqueViewPortfolioIps = new HashSet<>();
    
    @OneToMany(mappedBy = "creator", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CaseStudy> caseStudies;
}
