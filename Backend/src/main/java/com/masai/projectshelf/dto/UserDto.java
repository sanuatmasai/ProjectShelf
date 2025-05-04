package com.masai.projectshelf.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

import com.masai.projectshelf.model.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
	private Long id;
    private String firstName;
    private String lastName;

    @Email(message = "Email Format is not correct")
    private String email;
    
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;
    private String role;
    
    private String mobileNumber;
    
    private String displayName;
    private String bio;
    private String profilePicUrl;
    private String templateId;
    
    private String linkedinUrl;
    private String twitterUrl;
    private String facebookUrl;
    private String designation;
    private String address;
    private String uniqueName;
    private int totalViews;
    private int uniqueViews;
    
    public static UserDto fromUser(User user) {
        return new UserDto().builder()
        		.id(user.getId())
        		.firstName(user.getFirstName())
        		.lastName(user.getLastName())
        		.email(user.getEmail())
        		.role(user.getRole().toString())
        		.mobileNumber(user.getMobileNumber())
        		.displayName(user.getDisplayName())
        		.bio(user.getBio())
        		.profilePicUrl(user.getProfilePicUrl())
        		.templateId(user.getTemplateId())
        		.linkedinUrl(user.getLinkedinUrl())
        		.twitterUrl(user.getTwitterUrl())
        		.facebookUrl(user.getFacebookUrl())
        		.designation(user.getDesignation())
        		.address(user.getAddress())
        		.uniqueName(user.getUniqueName())
        		.totalViews(user.getTotalViews())
        		.uniqueViews(user.getUniqueViews())
        		.build();
    }
}
