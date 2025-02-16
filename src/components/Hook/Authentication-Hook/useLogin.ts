import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchOTPAPi,
  fetchUserApi,
} from "../../api/Authentication-Api/LoginApi";

const useLogin = () => {
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [otp, setOtp] = useState<string | any>("");
  const [enteredOtp, setEnteredOtp] = useState<string>("");
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("authToken")
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  // const checkEmployeeExists = async (mobileNumber: string): Promise<boolean> => {
  //     try {
  //         const response = await fetch(EMPLOYEE_API_URL);
  //         if (!response.ok) {
  //             throw new Error("Failed to fetch employee data");
  //         }

  //         const data = await response.json();
  //         console.log("API Response:", data);

  //         if (!data || !Array.isArray(data)) {
  //             console.error("Invalid API response format");
  //             return false;
  //         }

  //         const isExists = data.some((employee: any) => employee.email?.trim() === mobileNumber.trim());
  //         return isExists;
  //     } catch (error) {
  //         console.error("Error checking employee:", error);
  //         return false;
  //     }
  // };

  const checkEmployeeExists = async (mobileNumber: string) => {
    try {
      const response: any = await fetchUserApi();
      if (!response || !Array.isArray(response)) {
        console.error("Invalid API response format");
        return false;
      }
      const isExists = response.some(
        (employee: any) => employee.email?.trim() === mobileNumber.trim()
      );
      return isExists;
    } catch (error) {
      console.error("Error checking employee:", error);
    }
  };

  const sendOtpApi = async (mobileNumber: string) => {
    const apikey = "4a8797-801f87-21e9d2-5fc4c2-5745fa";
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpMessage = `Please enter ${generatedOtp} OTP on our platform to complete the verification process. Thank you for choosing Maha Chai.`;
    const url = `/${mobileNumber}/${encodeURIComponent(
      otpMessage
    )}/TXT?apikey=${apikey}`;
    try {
      const response: any = await fetchOTPAPi(url);
      return { success: true, otp: generatedOtp, response: response };
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleSendOtp = async () => {
    if (!mobileNumber.trim() || !/^\d{10}$/.test(mobileNumber)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    // const isEmployeeExists = await checkEmployeeExists(mobileNumber);
    // if (!isEmployeeExists) {
    //   setError("Mobile number not found in the employee database.");
    //   return;
    // }

    const otpResponse: any = await sendOtpApi(mobileNumber);
    if (otpResponse.response.status === 200) {
      setOtp(otpResponse);
      setIsOtpSent(true);
      setError(null);
    } else {
      setError("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = () => {
    console.log(enteredOtp, otp);
    if (enteredOtp !== otp.otp) {
      setError("Invalid OTP. Please try again.");
      return;
    }
    setError(null);
    login(mobileNumber);
  };

  const login = (mobile: string) => {
    const authToken = `auth_${mobile}_${new Date().getTime()}`;
    const loginTime = new Date().toISOString();
    localStorage.setItem("authToken", authToken);
    localStorage.setItem("loginTime", loginTime);
    navigate(`${import.meta.env.BASE_URL}Dashboard/IndexPage`);
    setToken(authToken);
  };

  return {
    mobileNumber,
    setMobileNumber,
    error,
    setError,
    isOtpSent,
    setIsOtpSent,
    otp,
    setOtp,
    enteredOtp,
    setEnteredOtp,
    handleVerifyOtp,
    handleSendOtp,
  };
};

export default useLogin;
