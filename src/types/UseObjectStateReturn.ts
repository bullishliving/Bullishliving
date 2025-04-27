import OnChangeParams from "./OnChangeParams";

export default interface UseObjectStateReturn<T>  {
  value: T;
  set: (params: OnChangeParams) => void;
  setDeep: (params: OnChangeParams) => void;
  reset: () => void;
  setValue: React.Dispatch<React.SetStateAction<T>>;
};
