import axios from "axios";
export const sendUserPic = async (userPic: File[]) => {
  try {
    const formData = new FormData();

    userPic.forEach((file) => {
      formData.append("files", file);
    });
    const res = axios.post(
      "http://localhost:8080/api/v1/test-multiupload",
      formData
    );
    const { data } = await res;
    console.log(data?.files[0].dataUrl);
  } catch (error) {
    console.log("Error while sending user pic ---> " + error);
  }
};
