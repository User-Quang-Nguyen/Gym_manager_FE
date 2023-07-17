import axios from "axios";

const getUserById = async (response) => {
    let data = [];
    await Promise.all(
        response.data.map(async (item) => {
            const author = await axios.get(`http://localhost:8081/user/${item.user_id}`);
            var fullName = author.data.first_name + " " + author.data.last_name;
            var newData = {
                "id": item.id,
                "createdAt": item.created_at,
                "message": item.content,
                "author": {
                    "id": author.data.id,
                    "avatar": author.data.avatar,
                    "name": fullName
                },
                "parentFeedbackId": item.parent_feedback_id
            }
            data.push(newData);
        })
    );
    return data;
}

export default getUserById;