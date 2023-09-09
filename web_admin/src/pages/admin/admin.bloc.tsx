import { pb } from "@/server";
import useAppStore from "@/store";
import { useNavigate } from "react-router-dom";

const useAdminBloc = () => {
  const navigate = useNavigate();
  const user = useAppStore((s) => s.user);
  const { clear } = useAppStore();

  const handleLogout = () => {
    clear();
    pb.authStore.clear();
    navigate("/auth/login");
  };
  return { user, handleLogout };
};

export default useAdminBloc;
