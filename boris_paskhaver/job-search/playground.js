const axios = require('axios')

const fetchJobsV1 = () => {
  axios.get('http://localhost:3000/jobs').then((response) => {
    console.log(response.data)
  })
}

fetchJobsV1()

// async-await syntax
const fetchJobsV2 = async () => {
  const response = await axios.get('http://localhost:3000/jobs')
  console.log(response.data)
}

fetchJobsV2()
