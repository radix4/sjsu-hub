package com.sjsuhub.repositories;

import com.sjsuhub.entities.StudyGroup;
import org.springframework.data.repository.CrudRepository;


public interface StudyGroupRepository extends CrudRepository<StudyGroup, Integer> {
        
    StudyGroup findBySubject(String subject);
    StudyGroup getStudyGroupById(Integer id);
}

