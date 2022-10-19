import React from "react";
import Popup from "./Popup";

const ImagePopup = (props) => {
  return (
    <Popup isOpen={props.isOpen} name={props.name} onClose={props.onClose}>
      {/* <figure className="image-popup__container"> */}
      <img className="popup__image" src={props.card.link} alt="place" />
      <p className="popup__caption">{props.card.name}</p>
      {/* </figure> */}
    </Popup>
  );
};

export default ImagePopup;
