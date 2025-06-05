import React, { CSSProperties } from "react";
import * as Icons from "@ant-design/icons";

const Icon: React.FC<{ name: string; style?: CSSProperties }> = ({
  name,
  style,
}) => {
  const IconComponent = (Icons as any)[name] || <></>;
  return <IconComponent style={style} />;
};

export default Icon;
