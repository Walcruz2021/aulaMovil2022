import axios from 'axios'

const UseFetchPost = async (url, keyword, method) => {
    let data;
    try {
        let response;
        if (method === "put") {
            response = await axios.put(url, {
                ...keyword
            })
        } else {
            response = await axios.post(url, {
                ...keyword
            })
        }

        data = response
    } catch (error) {
        console.log(error)
    }

    return data
}

export default UseFetchPost;
