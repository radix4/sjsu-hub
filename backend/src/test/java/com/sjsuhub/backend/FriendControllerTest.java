package com.sjsuhub.backend;

import com.sjsuhub.Main;
import com.sjsuhub.entities.User;
import com.sjsuhub.repositories.UserRepository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@SpringBootTest(classes = Main.class,
        webEnvironment = WebEnvironment.RANDOM_PORT)
public class FriendControllerTest {
    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;

    @Test
    public void sendFriendRequest() {
        String sendRequestUrl = "http://localhost:" + port + "/users/friends/send-request"; 

        User u1 = new User();
        u1.setEmail("Luna@gmail.com");
        u1.setPassword("Luna");
        Set<String> friendRequests = new HashSet<String>();
        friendRequests.add("Rhea@gmail.com");
        u1.setFriendRequests(friendRequests);

        User u2 = new User();
        u2.setEmail("Rhea@gmail.com");
        u2.setPassword("Rhea");

        // Case 1. User and friend exist, should be successful
        String response1 = this.restTemplate.postForObject(sendRequestUrl, u1, String.class);

        assertEquals("Send request success.", response1);

        // Case 2. Check that request exists in recipient's friend requests.

        String getAllRequestsUrl = "http://localhost:" + port + "/users/friends/getAllFriendsRequests";
        
        Set<User> response2 = this.restTemplate.postForObject(getAllRequestsUrl, u2, Set.class);
        assertTrue(!response2.isEmpty());

        // Case 3. Check that request exists in recipient's friend requests.

        String getAllSentRequestsUrl = "http://localhost:" + port + "/users/friends/getAllSentFriendsRequests";
        
        Set<User> response3 = this.restTemplate.postForObject(getAllSentRequestsUrl, u1, Set.class);
        assertTrue(!response3.isEmpty());

        // Case 4. Friend does not exist.
        friendRequests = new HashSet<String>();
        friendRequests.add("doesnotexist@gmail.com");
        u1.setFriendRequests(friendRequests);
    
        String response4 = this.restTemplate.postForObject(sendRequestUrl, u1, String.class);

        assertEquals("Fail", response4);

        // Case 5. User does not exist.
        User u3 = new User();
        u3.setEmail("tobeornottobe@gmail.com");
        u3.setPassword("DNE");
    
        String response5 = this.restTemplate.postForObject(sendRequestUrl, u3, String.class);

        assertEquals( "Fail", response5);

    }

    @Test
    public void cancelSentFriendRequest() {
        String sendRequestUrl = "http://localhost:" + port + "/users/friends/send-request"; 

        User u1 = new User();
        u1.setEmail("Luna@gmail.com");
        u1.setPassword("Luna");
        Set<String> friendRequests = new HashSet<String>();
        friendRequests.add("Rhea@gmail.com");
        u1.setFriendRequests(friendRequests);

        User u2 = new User();
        u2.setEmail("Rhea@gmail.com");
        u2.setPassword("Rhea");

        // Part 1. Check that request is successfully sent.
        String response1 = this.restTemplate.postForObject(sendRequestUrl, u1, String.class);

        assertEquals("Send request success.", response1);

        String getAllRequestsUrl = "http://localhost:" + port + "/users/friends/getAllFriendsRequests";
        
        Set<User> response2 = this.restTemplate.postForObject(getAllRequestsUrl, u2, Set.class);
        System.out.println("u2 requests: " + response2.toString());
        assertTrue(!response2.isEmpty());

        String getAllSentRequestsUrl = "http://localhost:" + port + "/users/friends/getAllSentFriendsRequests";
        
        Set<User> response3 = this.restTemplate.postForObject(getAllSentRequestsUrl, u1, Set.class);
        System.out.println("u1 sent requests: " + response3.toString());
        assertTrue(!response3.isEmpty());

        // Part 2. Cancel sent request.

        String deleteRequestUrl = "http://localhost:" + port + "/users/friends/cancel-sent-request";
        
        String response4 = this.restTemplate.postForObject(deleteRequestUrl, u1, String.class);
        assertEquals("Cancel sent request success.", response4);

        Set<User> response5 = this.restTemplate.postForObject(getAllRequestsUrl, u2, Set.class);
        assertTrue(response5.isEmpty());
         
        Set<User> response6 = this.restTemplate.postForObject(getAllSentRequestsUrl, u1, Set.class);
        assertTrue(response6.isEmpty());

    }

    @Test
    public void acceptFriendRequest() {

    }

    @Test
    public void declineFriendRequest() {

    }

    @Test
    public void unfriend() {

    }

    @Test
    public void getAllFriends() {
        String getAllUrl = "http://localhost:" + port + "/users/friends/getAllFriends";

        User u1 = new User();
        u1.setEmail("Luna@gmail.com");
        u1.setPassword("Luna");

        User u2 = new User();
        u2.setEmail("Rhea@gmail.com");
        u2.setPassword("Rhea");

        Set<User> response = this.restTemplate.postForObject(getAllUrl, u1, Set.class);
        assertTrue(!response.isEmpty());

    }

    @Test
    public void getAllFriendRequests() {
        
    }

    @Test
    public void getAllSentFriendRequests() {
        
    }

    


}
