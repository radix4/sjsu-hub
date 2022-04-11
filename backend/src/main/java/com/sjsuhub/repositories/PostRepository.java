package com.sjsuhub.repositories;

import com.sjsuhub.entities.Post;
import org.springframework.data.repository.CrudRepository;

public interface PostRepository extends CrudRepository<Post, Integer>{
    
    Post findByUserName(String userName);
    
}
