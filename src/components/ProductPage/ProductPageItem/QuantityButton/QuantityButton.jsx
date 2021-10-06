import { useState } from "react";

export default function QuantityButton({pick}) {
  const [int, setInt] = useState(1);

  const inc = () => {
    if (int < 10) setInt(int+1);
    pick(int);
  };

  const dec = () => {
    if (int > 1) setInt(int-1);
    pick(int);
  };
  
  return (
    <span className="btn-group btn-group-sm pl-2">
      <button className="btn btn-secondary" onClick={dec}>-</button>
      <span className="btn btn-outline-primary">{int}</span>
      <button className="btn btn-secondary" onClick={inc}>+</button>
    </span>
  );
}
