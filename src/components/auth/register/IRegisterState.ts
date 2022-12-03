import IInputState from "../IInputState";

export default interface IRegisterState {
  userName: IInputState;
  email: IInputState;
  password: IInputState;
  confirmPassword: IInputState;
  phoneNumber: IInputState;
}
