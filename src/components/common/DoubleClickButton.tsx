import { useState } from "react";

interface Iprops {
  children: React.ReactNode;
  className?: string;
  callback?: () => void;
  id?: string;
}

export default function DoubleClickButton(props: Iprops) {
  const [click, setClick] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (click) {
      props.callback && props.callback();
    } else {
      e.stopPropagation();
      setClick(true);
      setTimeout(() => {
        setClick(false);
      }, 400);
    }
  };

  return (
    <div className={"tooltip"} data-tip="双击确认" onClick={handleClick}>
      <button id={props.id} className={props.className}>
        {props.children}
      </button>
    </div>
  );
}
