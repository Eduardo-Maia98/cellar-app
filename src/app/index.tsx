import { AuthContext } from "@/context/AuthContext";
import { Redirect } from "expo-router";
import { useContext } from "react";


export default function Index() {
  const { user } = useContext(AuthContext);
   return user ? <Redirect href="/home" /> : <Redirect href="/login" />;
}
