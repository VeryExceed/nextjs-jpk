import React from "react";

const CustomLink = React.forwardRef(({ onClick, href }, ref) => {
  console.log("onClick", onClick);
  return (
    <a href={href} ref={ref} style={{ color: "red" }}>
      函数子组件跳转: /book/one
    </a>
  );
});

export default CustomLink;
