import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080/api/v1";

const fdsAxios = axios.create({
  baseURL: baseURL,
});

export const sendUserPic = async (
  userPic: File[],
  router: AppRouterInstance
) => {
  try {
    const formData = new FormData();

    userPic.forEach((file, i) => {
      formData.append("files", file);
    });

    const res = await fdsAxios.post("/login-with-faceId", formData);
    if (res.status === 200) {
      router.push("/dashboard");
    }
  } catch (error) {
    console.error("Error while sending user pic ---> " + error);
  }
};
