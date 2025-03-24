import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useNightAttendance = () => {
  const [attendanceModal, setAttendanceModal] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [displayTime, setDisplayTime] = useState("");
  const [location, setLocation] = useState(null);
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
  const toggleAttendanceModal = () => setAttendanceModal(!attendanceModal);

  useEffect(()=>{
    const now = new Date();
    const formattedDate = now.toISOString().split("T")[0];
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; 
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const time24 = `${hours.toString().padStart(2, "0")}:${formattedMinutes}`;
    const time12 = `${formattedHours}:${formattedMinutes} ${ampm}`;
    setCurrentDate(formattedDate);
    setCurrentTime(time24); 
    setDisplayTime(time12); 
    getLocation();
  },[])


  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };


  return {
    handleButtonClick,
    toggleAttendanceModal,
    attendanceModal,
    currentTime,
    currentDate,
    displayTime,
    location
  };
};

export default useNightAttendance;
