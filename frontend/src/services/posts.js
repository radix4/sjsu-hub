
import axios from 'axios'
const baseUrl = 'http://localhost:8080'

//${baseUrl}
const postForum = async (postedForum) => {

    try {
        const response = await axios.post(`${baseUrl}/posts/add`, {
            withCredentials: true,
            postTitle: postedForum.postTitle,
            postContent: postedForum.postContent,
            userName: postedForum.userName,
            postCategory: postedForum.postCategory,
            //dont think we need to add comments;
        });
        return response.data;
    } catch (error) {
        throw(error);
    }
}

const getPosts = async () =>{
    let responseArr = [];
    try {
        responseArr = await axios.get(`${baseUrl}/posts/all`);
        return responseArr;
    } catch (error) {
        throw(error);
    }
}


const getForumPostById = async (id) => {
    try {
        let response = await axios.get(`http://localhost:8080/posts/${id}`);
        return response.data;

    } catch (error) {
        throw(error);
    }
}

//making the correct call.
//check these two functions...
//add comment works
const addComment = async (id, comment) => {
    
    try {
        const response = await axios.put(`${baseUrl}/posts/${id}/comment`, {
            withCredentials: true,
            comment: comment.comment,
            userEmail: comment.userEmail
        })
        return response.data;
    } catch (error) {
        console.log("error in add comment")
        throw(error);
    }

}


const getAllComments = async (id) => {

    let responseArr = [];
    try {
        responseArr = await axios.get(`${baseUrl}/posts/${id}/getAllComments`);
        if(responseArr.data == null){
            return "there are no comments here";
        }else{
            console.log(responseArr.data)
            return responseArr.data;
        }
        
        
    } catch (error) {
        throw(error);
    }    
}


export default { postForum, getPosts, getForumPostById, addComment, getAllComments}