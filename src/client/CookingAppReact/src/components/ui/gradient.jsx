import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export const AnimatedGradientBorderTW = ({ children }) => {
  const boxRef = useRef(null);

  useEffect(() => {
    const boxElement = boxRef.current;

    if (!boxElement) {
      return;
    }

    const updateAnimation = () => {
      const angle =
        (parseFloat(boxElement.style.getPropertyValue("--angle")) + 0.1) % 360;
      boxElement.style.setProperty("--angle", `${angle}deg`);
      requestAnimationFrame(updateAnimation);
    };

    requestAnimationFrame(updateAnimation);
  }, []);

  return (
    <div
      ref={boxRef}
      style={{
        "--angle": "0deg",
        "--border-color": "linear-gradient(var(--angle), white, #687aff)",
        "--bg-color": "linear-gradient(white, white)",
      }}
      className="flex h-[100px] w-[400px] items-center justify-center rounded-lg border-2 border-[#0000] p-3 [background:padding-box_var(--bg-color),border-box_var(--border-color)]"
    >
      asd
    </div>
  );
};

AnimatedGradientBorderTW.propTypes = {
  children: PropTypes.node.isRequired,
};
