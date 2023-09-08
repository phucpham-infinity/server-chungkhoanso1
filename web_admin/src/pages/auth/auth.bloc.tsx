const useAuthBloc = () => {
  const handleLogin = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    console.log("email", email);
    console.log("password", password);
  };
  return { handleLogin };
};

export default useAuthBloc;
