package com.masai.projectshelf.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class CaseStudy {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@Column(name = "uid", columnDefinition = "VARCHAR(255)")
	private String uid = UUID.randomUUID().toString();

    @NotBlank(message = "Title is required")
    private String title;

    @Column(columnDefinition = "TEXT")
    private String overview;

    private String startTime;
    
    private String endTime;

    @ElementCollection
    @CollectionTable(name = "tools_used", joinColumns = @JoinColumn(name = "case_study_id"))
    @Column(name = "tool")
    private List<String> toolsUsed = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "outcomes", joinColumns = @JoinColumn(name = "case_study_id"))
    @Column(name = "outcome")
    private List<String> outcomes;
    
    @ElementCollection
    @CollectionTable(name = "mediaUrls", joinColumns = @JoinColumn(name = "media_url_id"))
    @Column(name = "mediaUrls")
    private List<String> mediaUrls;
    
    private String youTubeUrl;
    
    private String themeId;
    
    @Column(columnDefinition = "INT DEFAULT 0")
    private int totalViews = 0;

    @Column(columnDefinition = "INT DEFAULT 0")
    private int uniqueViews = 0;

    @ElementCollection(fetch = FetchType.EAGER)
    private Set<String> uniqueViewIps = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_id", nullable = false)
    private User creator;
}
