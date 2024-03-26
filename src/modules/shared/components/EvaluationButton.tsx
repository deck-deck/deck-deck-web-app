import {
  FaRegularFaceDizzy,
  FaRegularFaceFrownOpen,
  FaRegularFaceGrinStars,
  FaRegularFaceMeh,
  FaRegularFaceSmile,
} from "solid-icons/fa";

function EvaluationButton(props: {
  type: Type;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      class="text-5xl text-white hover:text-yellow-300"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.type === Type.VeryBad && <FaRegularFaceDizzy />}
      {props.type === Type.Bad && <FaRegularFaceFrownOpen />}
      {props.type === Type.Normal && <FaRegularFaceMeh />}
      {props.type === Type.Good && <FaRegularFaceSmile />}
      {props.type === Type.VeryGood && <FaRegularFaceGrinStars />}
    </button>
  );
}

enum Type {
  VeryBad,
  Bad,
  Normal,
  Good,
  VeryGood,
}

EvaluationButton.Type = Type;

export default EvaluationButton;
