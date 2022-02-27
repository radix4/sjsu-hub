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
 *  1) [x] send request - add a friend to friend request list, add friend to sent-request list
 *  2) [x] cancel a sent request - remove request from friend's request list
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

    @PutMapping(path="/send-request")
    public @ResponseBody String sendRequest(@RequestBody User user) {

        String userEmail = user.getEmail();
        String friendEmail =  user.getFriendRequests().stream().findFirst().get();

        /* add friend's email to user's sent-friend-request list */
        User u = userRepository.findByEmail(userEmail);
        u.getSentFriendRequests().add(friendEmail);
        userRepository.save(u);

        /* add user's email to friend's friend-request list */
        User f = userRepository.findByEmail(friendEmail);
        f.getFriendRequests().add(userEmail);
        userRepository.save(f);

        return "Add friend success.";
    }

    @PutMapping(path="/cancel-sent-request")
    public @ResponseBody String cancelSentRequest(@RequestBody User user) {

        String userEmail = user.getEmail();
        String friendEmail =  user.getFriendRequests().stream().findFirst().get();

        /* remove friend's email from user's sent-friend-request list */
        User u = userRepository.findByEmail(userEmail);
        u.getSentFriendRequests().remove(friendEmail);
        userRepository.save(u);

        /* remove user's email from friend's friend-request list */
        User f = userRepository.findByEmail(friendEmail);
        f.getFriendRequests().remove(userEmail);
        userRepository.save(f);

        return "Cancel sent request success.";
    }
}
