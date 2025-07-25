import * as React from "react";
import Svg, { Path } from "react-native-svg";

function YoutubeSvg({ width = 100, height = 16, ...props }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 28.57 20" {...props}>
      <Path
        d="M27.973 3.123A3.578 3.578 0 0025.447.597C23.22 0 14.285 0 14.285 0S5.35 0 3.123.597A3.578 3.578 0 00.597 3.123C0 5.35 0 10 0 10s0 4.65.597 6.877a3.578 3.578 0 002.526 2.526C5.35 20 14.285 20 14.285 20s8.935 0 11.162-.597a3.578 3.578 0 002.526-2.526C28.57 14.65 28.57 10 28.57 10s-.002-4.65-.597-6.877z"
        fill="red"
      />
      <Path d="M11.425 14.285L18.848 10l-7.423-4.285v8.57z" fill="#fff" />
    </Svg>
  );
}

export default YoutubeSvg;
