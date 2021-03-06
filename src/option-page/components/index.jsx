import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Home from "./Home";
import WindTurbineAnimation from "../../assets/WindTurbine";
import Loader from "./Loader";
import ErrorComponent from "./Error";

const queryString = require("query-string");

function App() {
  const [ocr, setOcr] = useState("Recognizing...");
  const [err, setError] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const doOCR = async () => {
    const parsed = queryString.parse(location.search);
    const urlString = decodeURIComponent(parsed.url ? parsed.url : "");
    setUrl(urlString);
    console.log({ urlString });
    chrome.runtime.sendMessage({ path: "/recognize", url: url }, response => {
      console.log({ response });
      const { status, error, data } = response;
      console.log({ url, respUrl: response.url, error });
      if (url == "") {
        return;
      }
      if (url == response.url) {
        console.log("if");
        if (status == "SUCCESS") {
          setOcr(data);
        } else {
          console.log("else");
          setError("Error!");
          setOcr("Error Occurred!");
        }
        setLoading(false);
      }
    });
  };
  useEffect(() => {
    doOCR();
  });
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        {loading ? (
          <Loader json={WindTurbineAnimation} text="loading..." />
        ) : err != "" ? (
          <ErrorComponent text="" />
        ) : (
          <Home ocrText={ocr} url={url} />
        )}
      </Container>
    </React.Fragment>
  );
}

export default App;
