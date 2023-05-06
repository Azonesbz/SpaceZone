import axios from "axios"

export let payNowWithCard = (data) => {
    return (dispatch) => {
        console.log(data)
        return axios.post(`http://localhost:3001/payNow`, data).then(res => {
            return res
        })
    }
}