import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080/api/v1";

const fdsAxios = axios.create({
  baseURL: baseURL,
});

export const sendUserPic = async (userPic: File[]) => {
  try {
    const formData = new FormData();

    userPic.forEach((file) => {
      formData.append("files", file);
    });
    const res = fdsAxios.post("/login-with-faceId", formData);
    const { data } = await res;
    console.log(data?.files[0].dataUrl);
  } catch (error) {
    console.error("Error while sending user pic ---> " + error);
  }
};
