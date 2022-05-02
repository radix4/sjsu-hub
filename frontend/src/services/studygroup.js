import axios from 'axios'
const baseUrl = 'http://localhost:8080'


const createStudyGroup = async (studyGroup) => {
    try {
        const response = axios.post(`${baseUrl}/studygroups/add`, {
            withCredentials: true,
            subject: studyGroup.subject,
            description: studyGroup.description,
            meetingDay: studyGroup.meetingDay,
            meetingTime: studyGroup.meetingTime,
            meridiem: studyGroup.meridiem,
            members: studyGroup.members,
        });

        console.log("study group created and added")
        return response.data;
    } catch (error) {
        console.log(error);
        console.log("error in Create Study Group");
    }
}


const getStudyGroups = async () =>{
    let responseArr = [];
    try {
        responseArr = await axios.get(`${baseUrl}/studygroups/all`);
        return responseArr;
    } catch (error) {
        console.log(error);
        console.log("error in getStudyGroups")
    }
}


const getGroupById = async (id) => {
    try {
        console.log("inside get groupbyId parameter is: " + id);
        let response = await axios.get(`http://localhost:8080/studygroups/${id}`);
        console.log(response.data.subject);
        return response.data;

    } catch (error) {
        console.log(error);
        console.log("error in getStudyGroupsById");
    }
}


const addToGroup = async (id,Newuser) => {
    //add a check to see if this newUser is null, prlly just make it all required. 
    try {
        //group might not matter might have to get by Id then pass that in. 
        console.log("inside of join study group, groupid: " + id);
        const response = await axios.put(`${baseUrl}/studygroups/${id}/join`, {
            withCredentials: true,
            user: Newuser
        })
        console.log("response data: " + response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        console.log("error in addToGroup");
        //console.log(error.stackTrace());
    }
}


const getAllUsers = async (id) => {

    //return all users 
    let responseArr = [];
    try {
        const responseArr = await axios.get(`${baseUrl}/studygroups/${id}/getAllUsers`);
        console.log("response arr: " + responseArr.data);
        /*if(responseArr.data[0] == "") {
            responseArr.data[0] = "hello"
        }*/
        console.log(responseArr.data);
        return responseArr.data;
    } catch (error) {
        console.log(error);
        console.log("error in getAllUsers");
    }
}


export default {createStudyGroup, getStudyGroups, getGroupById, addToGroup, getAllUsers}