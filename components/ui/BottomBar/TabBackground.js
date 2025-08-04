import React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../../../context/ThemeContext";

function TabBackground({ tabWidth }) {
  const height = 30; // bombe yüksekliği
  const curveWidth = tabWidth * 0.7; // biraz daraltıldı
  const offset = (tabWidth - curveWidth) / 2; // kenar boşluğu

  const StyleColors = useTheme();

  return (
    <Svg
      width={tabWidth}
      height={height}
      viewBox={`0 0 ${tabWidth} ${height}`}
      style={{ position: "absolute", top: -height + 8 }}
    >
      <Path
        d={`
          M0,${height}
          L${offset},${height}
          Q${tabWidth / 2},-12 ${tabWidth - offset},${height}
          L${tabWidth},${height}
          Z
        `}
        fill={StyleColors.bottomBarContainer}
      />
    </Svg>
  );
}

export default TabBackground;
