import logo from "./logo.svg";
import "./App.css";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import axios from "axios";

function App() {
  const [token, setToken] = useState();
  const [validUser,setValidUser] = useState(false);

  const onChange =async (value) => {
    console.log("Captcha value:", value);
    await setToken(value);
    sendRequest();
  };

  const sendRequest = () => {
    const config = {
      url: "http://localhost:9000/api/tokens",
      data: token,
    };
    axios
      .post(config)
      .then((response) => {
        if(response.data.status){
          setValidUser(true)
        }
        else{
          setValidUser(false)
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div className="App">
      {validUser?"valid user":"not a valid user"}
      <ReCAPTCHA
        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
        onChange={onChange}
      />
    </div>
  );
}

export default App;
