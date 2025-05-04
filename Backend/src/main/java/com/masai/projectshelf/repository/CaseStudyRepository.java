package com.masai.projectshelf.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.masai.projectshelf.model.CaseStudy;
import com.masai.projectshelf.model.User;

public interface CaseStudyRepository extends JpaRepository<CaseStudy, Long> {
    List<CaseStudy> findByCreator(User creator);
    CaseStudy findByUid(String uid);
}
