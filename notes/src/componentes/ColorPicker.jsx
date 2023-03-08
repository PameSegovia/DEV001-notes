import React from "react";

const ColorPicker = ({ colors, onChange }) => {
    return (
      <div>
        {colors.map((color, index) => (
          <button key={index} style={{ backgroundColor: color }} onClick={() => onChange(color)} />
        ))}
      </div>
    );
  };
  
  export default ColorPicker;