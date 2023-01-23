import axios from "axios";

const getCourses = async (URL: string) => {
  try {
    const response = await axios.get(URL);
    // const data = response.json()
    console.log(response);
  } catch (error) {}
};

export { getCourses };
