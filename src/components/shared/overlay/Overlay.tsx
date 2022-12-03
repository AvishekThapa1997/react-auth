import styles from "./Overlay.module.css";
import classnames from "classnames";
const Overlay: React.FC = () => {
  const { overlay } = styles;
  return (
    <div
      className={classnames(
        "position-fixed h-100 w-100 bg-black opacity-75",
        overlay
      )}
    ></div>
  );
};
export default Overlay;
