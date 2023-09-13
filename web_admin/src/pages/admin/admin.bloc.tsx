import { pb } from "@/server";
import useAppStore from "@/store";
import { useEffect, useState } from "react";
import { useNavigate , useLocation } from "react-router-dom";

const useAdminBloc = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useAppStore((s) => s.user);
  const { clear } = useAppStore();

  const [title, setTitle] = useState('')
  const [title1, setTitle1] = useState('')


  useEffect(() => {
   console.log('location', location.pathname);
   if(location.pathname.includes('/chart')){
    setTitle1('Biểu đồ')
   }
   if(location.pathname.includes('/chart_1')){
    setTitle('Thống kê giao dịch')
   }
   if(location.pathname.includes('/dashboard')){
    setTitle('Dashboard')
    setTitle1('')
   }
   
  }, [location.pathname])
  

  const handleLogout = () => {
    clear();
    pb.authStore.clear();
    navigate("/auth/login");
  };
  return { user, handleLogout, title, title1 };
};

export default useAdminBloc;
