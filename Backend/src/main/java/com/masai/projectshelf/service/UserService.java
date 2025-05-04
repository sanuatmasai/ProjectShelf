package com.masai.projectshelf.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.masai.projectshelf.dto.DashBoardDataDto;
import com.masai.projectshelf.dto.UserDto;
import com.masai.projectshelf.enums.Role;
import com.masai.projectshelf.exception.BadRequestException;
import com.masai.projectshelf.model.User;
import com.masai.projectshelf.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private contextService contextService;

    public User register(UserDto userDTO) {
        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists");
        }

        User user = new User();
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setMobileNumber(userDTO.getMobileNumber());
        user.setRole(Role.valueOf("ADMIN"));
        return userRepository.save(user);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    public User updateProfile(UserDto profileDto) {
        User user = contextService.getCurrentUser();

        if (profileDto.getFirstName() != null) user.setFirstName(profileDto.getFirstName());
        if (profileDto.getLastName() != null) user.setLastName(profileDto.getLastName());
        if (profileDto.getDisplayName() != null) user.setDisplayName(profileDto.getDisplayName());
        if (profileDto.getBio() != null) user.setBio(profileDto.getBio());
        if (profileDto.getProfilePicUrl() != null) user.setProfilePicUrl(profileDto.getProfilePicUrl());
        if (profileDto.getMobileNumber() != null) user.setMobileNumber(profileDto.getMobileNumber());
        if (profileDto.getTemplateId() != null) user.setTemplateId(profileDto.getTemplateId());
        
        if (profileDto.getLinkedinUrl() != null) user.setLinkedinUrl(profileDto.getLinkedinUrl());
        if (profileDto.getTwitterUrl() != null) user.setTwitterUrl(profileDto.getTwitterUrl());
        if (profileDto.getFacebookUrl() != null) user.setFacebookUrl(profileDto.getFacebookUrl());
        if (profileDto.getAddress() != null) user.setAddress(profileDto.getAddress());
        if (profileDto.getDesignation() != null) user.setDesignation(profileDto.getDesignation());
        
        if(user.getUniqueName() == null && profileDto.getUniqueName() != null) {
        	if(userRepository.existsByUniqueNameIgnoreCase(profileDto.getUniqueName())) {
        		throw new BadRequestException("Oops! That username is already in use.");
        	}else {
        		user.setUniqueName(profileDto.getUniqueName());
        	}
        }
        return userRepository.save(user);
    }
    
    public DashBoardDataDto getDashBoardData() {
    	User user = contextService.getCurrentUser();
    	return DashBoardDataDto.mapToResponse(user);
    }

}
