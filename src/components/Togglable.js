import { useState, forwardRef, useImperativeHandle } from "react";

const Togglable = forwardRef(({ buttonLabel, children }, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = {
    display: visible ? "none" : "",
  };
  const showWhenVisible = {
    display: visible ? "" : "none",
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return { toggleVisibility };
  });

  const togglableStyles = {
    margin: "10px 0",
  };

  return (
    <div style={togglableStyles}>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

Togglable.displayName = "Toggable";

export default Togglable;
