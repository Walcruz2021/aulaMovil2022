import axios from 'axios';

const UseFetch = async (url) => {
    let data ;
    try {
        let response = await axios(url)
        data = response
        console.log(data)
    } catch (error) {
        console.log(error)
    }

    return data
}

export default UseFetch;
