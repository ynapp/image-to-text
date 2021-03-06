import React from "react";
import Lottie from "lottie-react-web";

export default props => {
  return (
    <React.Fragment>
      <Lottie
        options={{
          animationData: props.json
        }}
      />
      <h2>{props.text}</h2>
    </React.Fragment>
  );
};
