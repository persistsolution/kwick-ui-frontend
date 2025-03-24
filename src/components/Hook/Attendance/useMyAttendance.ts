import { useEffect, useState } from "react";
import {
  fetchAllAttendance,
} from "../../api/Attendance/apiDayAttendance";
import { useNavigate } from "react-router-dom";

const useMyAttendance = () => {
  const [attendanceModal, setAttendanceModal] = useState(false);
  const [allAttendance, setAllAttendance] = useState([]);
  const [token] = useState<string | null>(
      localStorage.getItem("authToken")
    );
  const navigate = useNavigate();
  
    useEffect(() => {
      if (!token) {
        navigate("/");
      }
    }, [token, navigate]);

    useEffect(()=>{
      fetchAllAttendence();
    },[])

  const handleButtonClick = () => {};
  const toggleAttendanceModal = () => setAttendanceModal(!attendanceModal);

  const fetchAllAttendence = async () => {
    const userId = Number(localStorage.getItem("userid") || 0);;
    try {
      const response: any = await fetchAllAttendance(userId);
      setAllAttendance(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  return {
    handleButtonClick,
    toggleAttendanceModal,
    attendanceModal,
    allAttendance
  };
};

export default useMyAttendance;
