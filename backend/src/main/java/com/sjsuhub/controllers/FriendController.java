package com.sjsuhub.controllers;

import com.sjsuhub.entities.User;
import com.sjsuhub.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


/**
 * APIs: GET user's info includes the following lists:
 * 1) all friends
 * 2) all friend requests
 * 3) all sent friend requests
 *
 * User POV:
 *  1) [x] send request - add a friend to friend request list, add friend to sent-request list
 *  2) [x] cancel a sent request - remove request from friend's request list
 *  3) [x] accept request - add friend to friend list
 *  4) [x] decline request - remove friend from request list
 *  5) [x] unfriend a bad friend - remove bad friend from both parties friend lists
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

        return "Send request success.";
    }

    @PutMapping(path="/cancel-sent-request")
    public @ResponseBody String cancelSentRequest(@RequestBody User user) {

        String userEmail = user.getEmail();
        String friendEmail =  user.getSentFriendRequests().stream().findFirst().get();

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

    @PutMapping(path="/accept-request")
    public @ResponseBody String acceptRequest(@RequestBody User user) {

        String userEmail = user.getEmail();
        String friendEmail =  user.getFriendRequests().stream().findFirst().get();

        /* move request to friends */
        User u = userRepository.findByEmail(userEmail);
        u.getSentFriendRequests().remove(friendEmail);
        u.getFriends().add(friendEmail);
        userRepository.save(u);

        /* move request to friends */
        User f = userRepository.findByEmail(friendEmail);
        f.getFriendRequests().remove(userEmail);
        f.getFriends().add(userEmail);
        userRepository.save(f);

        return "Accept request success.";
    }

    @PutMapping(path="/decline-request")
    public @ResponseBody String declineRequest(@RequestBody User user) {

        String userEmail = user.getEmail();
        String friendEmail =  user.getFriendRequests().stream().findFirst().get();

        /* remove request from friend requests list */
        User u = userRepository.findByEmail(userEmail);
        u.getFriendRequests().remove(friendEmail);
        userRepository.save(u);

        /* remove request from sent requests list */
        User f = userRepository.findByEmail(friendEmail);
        f.getSentFriendRequests().remove(userEmail);
        userRepository.save(f);

        return "Decline request success.";
    }

    @PutMapping(path="/unfriend")
    public @ResponseBody String unfriend(@RequestBody User user) {

        String userEmail = user.getEmail();
        String friendEmail =  user.getFriends().stream().findFirst().get();

        /* remove friend's email from user's friends list */
        User u = userRepository.findByEmail(userEmail);
        u.getFriends().remove(friendEmail);
        userRepository.save(u);

        /* remove user's email from friend's friends list */
        User f = userRepository.findByEmail(friendEmail);
        f.getFriends().remove(userEmail);
        userRepository.save(f);

        return "Unfriend success.";
    }
}
