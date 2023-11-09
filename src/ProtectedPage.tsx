import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import { logout } from "@/redux/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";

const ProtectedRoute = (WrappedComponent) => {
  return function Auth(props) {
    const Router = useRouter();
    const toast = useToast();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.app.auth);
    const accessToken = userInfo?.token;

    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      if (!accessToken) {
        Router.push(`/creative-auth/login`);
      } else if (accessToken) {
        // check if the token is expired
        const decodedToken = jwtDecode(accessToken);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          toast({
            title: "Session expired ",
            position: "top-right",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          dispatch(logout());
        }
      }

      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default ProtectedRoute;
