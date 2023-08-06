import axios from 'axios'
import { useSelector } from 'react-redux'

const AxiosPost = async ({ data, endPoint }) => {
  const reduxToken = useSelector(state => state.authReducer.token)

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: endPoint,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + reduxToken
    },
    data: { ...data }
  }
  axios
    .request(config)
    .then(response => {
      console.log(JSON.stringify(response.data))
    })
    .catch(error => {
      console.log(error)
    })
}

export default AxiosPost
