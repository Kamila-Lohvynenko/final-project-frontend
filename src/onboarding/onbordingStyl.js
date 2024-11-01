
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

export const disableBody = () => {
  console.log("Body scroll disabled");
  disableBodyScroll(document.body);
};

export const enableBody = () => {
  console.log("Body scroll enabled");
  enableBodyScroll(document.body);
};

export const styles = {
  popover: (base) => ({
    ...base,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
  }),

  close: (base) => ({
    ...base,
    position: 'absolute',
    top: '13px',
    right: '13px',
    cursor: 'pointer',
    fontSize: '20px',
    color: '#323f47', 
  }),
};