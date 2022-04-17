package com.sjsuhub.controllers;

import java.util.HashSet;
import java.util.Set;

import com.sjsuhub.entities.User;
import com.sjsuhub.repositories.UserRepository;

import com.sjsuhub.security.SecurityEscape;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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


    ///////////////////////// GET MAPPINGS ///////////////////////////////

    @PostMapping(path="/getAllFriends")
    public @ResponseBody Iterable<User> getAllFriendsByEmail(@RequestBody User user) {
        user = sanitizedUser(user);
        User u = userRepository.findByEmail(user.getEmail());

        if (u == null) return new HashSet<User>();

        Set<String> friendsEmails = u.getFriends();
        Set<User> friends = new HashSet<User>();

        if (!friendsEmails.isEmpty()) {
            for (String f : friendsEmails) {
                friends.add(userRepository.findByEmail(f));
            }
        }

        return friends;
    }


    @PostMapping(path="/getAllFriendsRequests")
    public @ResponseBody Iterable<User> getAllFriendsRequestsByEmail(@RequestBody User user) {
        user = sanitizedUser(user);
        User u = userRepository.findByEmail(user.getEmail());

        if (u == null) return new HashSet<User>();

        Set<String> friendRequestEmails = u.getFriendRequests();
        Set<User> friends = new HashSet<User>();
        
        if (!friendRequestEmails.isEmpty()) {
            for (String f : friendRequestEmails) {
                friends.add(userRepository.findByEmail(f));
            }
        }
        
        return friends;
    }


    @PostMapping(path="/getAllSentFriendsRequests")
    public @ResponseBody Iterable<User> getAllSentFriendsRequestsByEmail(@RequestBody User user) {
        user = sanitizedUser(user);
        User u = userRepository.findByEmail(user.getEmail());

        if (u == null) return new HashSet<User>();

        Set<String> sentFriendRequestEmails = u.getSentFriendRequests();
        Set<User> sentFriendRequests = new HashSet<User>();
        
        if (!sentFriendRequestEmails.isEmpty()) {
            for (String f : sentFriendRequestEmails) {
                sentFriendRequests.add(userRepository.findByEmail(f));
            }
        }
        

        return sentFriendRequests;
    }


    ///////////////////////// PUT MAPPINGS ///////////////////////////////

    @PostMapping(path="/send-request")
    public @ResponseBody String sendRequest(@RequestBody User user) {
        user = sanitizedUser(user);
        String userEmail = user.getEmail();
        if (user.getFriendRequests().isEmpty()) return "Fail";
        String friendEmail =  user.getFriendRequests().stream().findFirst().get();

        /* add friend's email to user's sent-friend-request list */
        User u = userRepository.findByEmail(userEmail);
        User f = userRepository.findByEmail(friendEmail);

        if (u == null || f == null) return "Fail";

        u.getSentFriendRequests().add(friendEmail);
        userRepository.save(u);

        /* add user's email to friend's friend-request list */
        
        f.getFriendRequests().add(userEmail);
        userRepository.save(f);

        return "Send request success.";
    }

    @PostMapping(path="/cancel-sent-request")
    public @ResponseBody String cancelSentRequest(@RequestBody User user) {
        user = sanitizedUser(user);

        String userEmail = user.getEmail();
        System.out.println("137 Cancel sent request email: " + userEmail);
        System.out.println("Sent friend requests " + user.getSentFriendRequests());
        if (user.getSentFriendRequests().isEmpty()) return "Fail";
        String friendEmail =  user.getSentFriendRequests().stream().findFirst().get();
        System.out.println("140 Cancel sent request friendEmail: " + friendEmail);

        
        

        /* remove friend's email from user's sent-friend-request list */
        User u = userRepository.findByEmail(userEmail);
        User f = userRepository.findByEmail(friendEmail);

        if (u == null || f == null) return "Fail";
        System.out.println("Line 147 cancel sent request");
        u.getSentFriendRequests().remove(friendEmail);
        userRepository.save(u);

        /* remove user's email from friend's friend-request list */
        
        f.getFriendRequests().remove(userEmail);
        userRepository.save(f);

        return "Cancel sent request success.";
    }

    @PostMapping(path="/accept-request")
    public @ResponseBody String acceptRequest(@RequestBody User user) {
        user = sanitizedUser(user);

        String userEmail = user.getEmail();
        String friendEmail =  user.getFriendRequests().stream().findFirst().get();

        /* move request to friends */
        User u = userRepository.findByEmail(userEmail);
        User f = userRepository.findByEmail(friendEmail);

        if (u == null || f == null) return "Fail";

        u.getSentFriendRequests().remove(friendEmail);
        u.getFriends().add(friendEmail);
        userRepository.save(u);

        /* move request to friends */
        
        f.getFriendRequests().remove(userEmail);
        f.getFriends().add(userEmail);
        userRepository.save(f);

        return "Accept request success.";
    }

    @PostMapping(path="/decline-request")
    public @ResponseBody String declineRequest(@RequestBody User user) {
        user = sanitizedUser(user);

        String userEmail = user.getEmail();
        String friendEmail =  user.getFriendRequests().stream().findFirst().get();

        /* remove request from friend requests list */
        User u = userRepository.findByEmail(userEmail);
        User f = userRepository.findByEmail(friendEmail);

        if (u == null || f == null) return "Fail";

        u.getFriendRequests().remove(friendEmail);
        userRepository.save(u);

        /* remove request from sent requests list */
        
        f.getSentFriendRequests().remove(userEmail);
        userRepository.save(f);

        return "Decline request success.";
    }

    @PostMapping(path="/unfriend")
    public @ResponseBody String unfriend(@RequestBody User user) {
        user = sanitizedUser(user);
        String userEmail = user.getEmail();
        String friendEmail =  user.getFriends().stream().findFirst().get();

        /* remove friend's email from user's friends list */
        User u = userRepository.findByEmail(userEmail);
        User f = userRepository.findByEmail(friendEmail);

        if (u == null || f == null) return "Fail";

        u.getFriends().remove(friendEmail);
        userRepository.save(u);

        /* remove user's email from friend's friends list */
        
        f.getFriends().remove(userEmail);
        userRepository.save(f);

        return "Unfriend success.";
    }

    private User sanitizedUser(User user) {
        if (user == null) return user;

        if (user.getEmail() != null) user.setEmail(SecurityEscape.sanitizeString(user.getEmail()));
        if (user.getFirstName() != null) user.setFirstName(SecurityEscape.sanitizeString(user.getFirstName()));
        if (user.getLastName() != null) user.setLastName(SecurityEscape.sanitizeString(user.getLastName()));
        if (user.getPassword() != null) user.setPassword(SecurityEscape.sanitizeString(user.getPassword()));

        return user;
    }
}
