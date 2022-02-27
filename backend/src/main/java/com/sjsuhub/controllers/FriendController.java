package com.sjsuhub.controllers;

import com.sjsuhub.entities.User;
import com.sjsuhub.entities.Post;
import com.sjsuhub.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.Set;

/**
 * APIs
 * 1) get all friends
 * 2) get all friend requests
 * 3) get all sent friend requests
 *
 * User POV:
 *  1) [ ] send request - add a friend to friend request list
 *  2) [ ] cancel a sent request - remove request from friend's request list
 *
 * Friend POV:
 *  3) [ ] accept request - add friend to friend list
 *  4) [ ] decline request - remove friend from request list
 */


@RestController
@RequestMapping(path="/users/friends")
public class FriendController {
    @Autowired
    private UserRepository userRepository;



}
