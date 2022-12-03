import BaseProps from "../props/BaseProps";

const FullViewPort: React.FC<BaseProps> = ({ children }) => {
  return <div className="vh-100 vw-100">{children}</div>;
};

export default FullViewPort;
