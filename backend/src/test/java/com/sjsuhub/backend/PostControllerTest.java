package com.sjsuhub.backend;


import com.sjsuhub.Main;
import com.sjsuhub.entities.Post;
import com.sjsuhub.repositories.PostRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;


import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest(classes = Main.class,
        webEnvironment = WebEnvironment.RANDOM_PORT)
public class PostControllerTest{
    @LocalServerPort
    private int port;
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Autowired
    private PostRepository postRepository;   

    @Test
    public void addNewForumPost(){
        String forumPostUrl = "http://localhost:" + port + "/posts/add";

        String[] testString = new String[1];
        testString[0] = "test";

        Post p = new Post();
        p.setPostTitle("test");
        p.setPostContent("test");
        p.setPostCategory("test");
        p.setUserName("test");
        p.setForumComments(testString);

        String response = this.restTemplate.postForObject(forumPostUrl, p, String.class);

        String expected = "Success! forum with subject " + p.getPostTitle() + " is now created.";
        assertEquals(expected, response);       

    }

    @Test
    public void getAllForumPosts(){
        String getAllURL = "http://localhost:" + port + "/posts/all";

        ResponseEntity<Post[]> response = this.restTemplate.getForEntity(
                getAllURL, Post[].class
        );

        Post[] studyGroups = response.getBody();
        assertNotNull(studyGroups);
    }

    @Test
    public void getForumPostById(){

        String[] testString = new String[1];
        testString[0] = "test";


        Post p = new Post();
        p.setPostTitle("test");
        p.setPostContent("test");
        p.setPostCategory("test");
        p.setUserName("test");
        p.setForumComments(testString);


        int id =  postRepository.save(p).getId();

        String getOneUrl = "http://localhost:" + port + "/posts/" + id;

        Post p2 = this.restTemplate.postForObject(getOneUrl, p, Post.class);

        assertTrue(!p2.equals(null));

    }


    @Test
    public void getAllForumComments(){

        String[] testString = new String[1];
        testString[0] = "test";

        Post p = new Post();
        p.setPostTitle("test");
        p.setPostContent("test");
        p.setPostCategory("test");
        p.setUserName("test");
        p.setForumComments(testString);


        int id =  postRepository.save(p).getId();

        String getOneUrl = "http://localhost:" + port + "/posts/" + id + "getAllComments";

        Post p2 = this.restTemplate.postForObject(getOneUrl, p, Post.class);

        assertTrue(!p2.equals(null));
    }


    @Test
    public void deleteForumPost(){

        String testString[] = new String[1];
        testString[1] = "test";

        Post p = new Post();
        p.setPostTitle("test");
        p.setPostContent("test");
        p.setPostCategory("test");
        p.setUserName("test");
        p.setForumComments(testString);


        int id =  postRepository.save(p).getId();

        String deleteOneUrl = "http://localhost:" + port + "/posts/" + id + "delete";

        this.restTemplate.delete(deleteOneUrl);

        assertEquals(true, postRepository.findById(id).isEmpty());
        assertTrue(postRepository.findById(id).isEmpty());     
    }

    

}