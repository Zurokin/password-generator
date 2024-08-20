import PasswordGenerator from "../components/PasswordGenerator";
import DarkModeBtn from "./DarkModeBtn";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <DarkModeBtn />
      <PasswordGenerator />
    </div>
  );
}
