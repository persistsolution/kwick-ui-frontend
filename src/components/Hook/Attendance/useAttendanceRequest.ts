import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useAttendanceRequest = () => {
  const [attendanceRequestModal, setattendanceRequestModal] = useState(false);
    const [token] = useState<string | null>(
      localStorage.getItem("authToken")
    );
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!token) {
        navigate("/");
      }
    }, [token, navigate]);

  const handleButtonClick = () => {};
  const toggleAttendanceModal = () => setattendanceRequestModal(!attendanceRequestModal);

  return {
    handleButtonClick,
    toggleAttendanceModal,
    attendanceRequestModal
  };
};

export default useAttendanceRequest;
