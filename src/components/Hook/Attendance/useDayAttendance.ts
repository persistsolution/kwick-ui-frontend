import { useEffect, useState } from "react";
import {
  fetchStartAttendance,
  fetchEndAttendance,
  fetchAllAttendance,
  submitDayAttendanceApi,
} from "../../api/Attendance/apiDayAttendance";
import { useMap } from "react-leaflet";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  width: "100%",
  height: "300px",
};

const useAttendance = () => {
  const [attendanceModal, setAttendanceModal] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [directions, setDirections] = useState(null);
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [franchiseLocationLat, setfranchiseLocationLat] = useState(0);
  const [franchiseLocationLng, setfranchiseLocationLng] = useState(0);
  const [totalDistance, settotalDistance] = useState(0);
  const [endcurrentDate, setEndCurrentDate] = useState("");
  const [endcurrentTime, setendCurrentTime] = useState("");
  const [endfranchiseLocationLat, setendfranchiseLocationLat] = useState(0);
  const [endfranchiseLocationLng, setendfranchiseLocationLng] = useState(0);
  const [allAttendance, setAllAttendance] = useState([]);
  const [token] = useState<string | null>(localStorage.getItem("authToken"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const franchiseLocation = {
    lat: Number(franchiseLocationLat),
    lng: Number(franchiseLocationLng),
  };

  useEffect(() => {
    fetchAllAttendence();
    handelfetchStartAttendenceApi();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(userCoords);
      },
      (error) => console.error(error),
      { enableHighAccuracy: true }
    );
  }, []);

  const toggleAttendanceModal = () => {
    setAttendanceModal(!attendanceModal);
    handelfetchStartAttendenceApi();
  };

  const handleSubmitAttendence = async () => {
    const userId = Number(localStorage.getItem("userid") || 0);
    const currentDateTime = new Date();
    const istOffset = 5.5 * 60;
    const utcOffset = currentDateTime.getTimezoneOffset();
    const istTime = new Date(
      currentDateTime.getTime() + (istOffset + utcOffset) * 60000
    );
    const currentDate = istTime.toISOString().split("T")[0];
    const hours = currentDateTime.getHours().toString().padStart(2, "0");
    const minutes = currentDateTime.getMinutes().toString().padStart(2, "0");
    const seconds = currentDateTime.getSeconds().toString().padStart(2, "0");

    const raw = {
      attendance_details: [
        {
          date: currentDate,
          time: `${hours}:${minutes}:${seconds}`,
          latitude: userLocation?.lat,
          longitude: userLocation?.lng,
          fr_lattitude: franchiseLocation?.lat,
          fr_longitude: franchiseLocation?.lng,
          tot_dist: distance,
          userid: userId,
        },
      ],
    };
    try {
      const response: any = await submitDayAttendanceApi(raw);
      console.log(response);
      setAttendanceModal(!attendanceModal);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  const fetchAllAttendence = async () => {
    const userId = Number(localStorage.getItem("userid") || 0);
    try {
      const response: any = await fetchAllAttendance(userId);
      setAllAttendance(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handelfetchStartAttendenceApi = async () => {
    const userId = Number(localStorage.getItem("userid") || 0);
    try {
      const response: any = await fetchStartAttendance(userId);
      const result = response?.data;
      setCurrentDate(formatDate(result[0]?.date));
      setCurrentTime(result[0]?.time);
      setfranchiseLocationLat(result[0]?.fr_lattitude);
      setfranchiseLocationLng(result[0]?.fr_longitude);
      settotalDistance(result[0]?.tot_dist);
      calculateDistance(userLocation, {
        lat: result[0]?.fr_lattitude,
        lng: result[0]?.fr_longitude,
      });
      getDirections(userLocation, {
        lat: result[0]?.fr_lattitude,
        lng: result[0]?.fr_longitude,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handelfetchEndAttendenceApi = async () => {
    const userId = Number(localStorage.getItem("userid") || 0);
    const currentDateTime = new Date();
    const istOffset = 5.5 * 60;
    const utcOffset = currentDateTime.getTimezoneOffset();
    const istTime = new Date(
      currentDateTime.getTime() + (istOffset + utcOffset) * 60000
    );
    const currentDate = istTime.toISOString().split("T")[0];
    const hours = currentDateTime.getHours().toString().padStart(2, "0");
    const minutes = currentDateTime.getMinutes().toString().padStart(2, "0");
    const seconds = currentDateTime.getSeconds().toString().padStart(2, "0");

    const raw = {
      attendance_details: [
        {
          date: currentDate,
          time: `${hours}:${minutes}:${seconds}`,
          latitude: userLocation?.lat,
          longitude: userLocation?.lng,
          fr_lattitude: franchiseLocation?.lat,
          fr_longitude: franchiseLocation?.lng,
          tot_dist: distance,
          userid: userId,
        },
      ],
    };

    try {
      const response: any = await fetchEndAttendance(raw);
      setEndCurrentDate(formatDate(response[0]?.date));
      setendCurrentTime(response[0]?.time);
      setendfranchiseLocationLat(response[0]?.fr_lattitude);
      setendfranchiseLocationLng(response[0]?.fr_longitude);
      fetchAllAttendence();
    } catch (error) {
      console.log(error);
    }
  };

  const MapUpdater = ({ positions }) => {
    const map = useMap();
    useEffect(() => {
      if (positions.every((pos) => pos)) {
        map.fitBounds(positions);
      }
    }, [positions, map]);

    return null;
  };

  const calculateDistance = (origin, destination) => {
    const R = 6371;
    const dLat = ((destination.lat - origin.lat) * Math.PI) / 180;
    const dLng = ((destination.lng - origin.lng) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((origin.lat * Math.PI) / 180) *
        Math.cos((destination.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    setDistance(distance.toFixed(2));
  };

  const getDirections = (origin, destination) => {
    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error("Error fetching directions", status);
        }
      }
    );
  };

  return {
    toggleAttendanceModal,
    handelfetchEndAttendenceApi,
    MapUpdater,
    handleSubmitAttendence,
    attendanceModal,
    userLocation,
    distance,
    directions,
    containerStyle,
    franchiseLocation,
    currentTime,
    currentDate,
    allAttendance,
    totalDistance,
    endcurrentDate,
    endcurrentTime,
    endfranchiseLocationLng,
    endfranchiseLocationLat,
  };
};

export default useAttendance;
