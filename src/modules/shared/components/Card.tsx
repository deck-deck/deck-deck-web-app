import { JSX, createEffect, createSignal } from "solid-js";

function Card(props: {
  children: JSX.Element;
  size?: "md";
  status?: () => Status;
  setStatus?: (status: Status) => void;
  onClick?: () => void;
}) {
  const [status, setStatus] = createSignal(
    props.status ? props.status() : Status.Front
  );
  createEffect(() => {
    if (props.status) setStatus(props.status());
  });
  return (
    <div
      onClick={() => {
        if (props.onClick) {
          props.onClick();
          return;
        }
        const newStatus =
          status() === Status.Front ? Status.Back : Status.Front;
        setStatus(newStatus);
        if (props.setStatus) props.setStatus(newStatus);
      }}
      class="flex justify-stretch items-stretch bg-white shadow-xl rounded-lg cursor-pointer overflow-hidden aspect-[5/7] card"
      classList={{
        "w-[300px]": props.size === "md",
        "card__front--hidden": status() !== Status.Front,
        "card__back--hidden": status() !== Status.Back,
      }}
    >
      {props.children}
    </div>
  );
}

function Face(props: { children: JSX.Element; type: "front" | "back" }) {
  return (
    <div
      class={`card__${props.type} w-full p-1 flex justify-center items-center select-none cursor-pointer`}
    >
      {props.children}
    </div>
  );
}

function Front(props: { children: JSX.Element }) {
  return <Face type="front">{props.children}</Face>;
}

function Back(props: { children: JSX.Element }) {
  return <Face type="back">{props.children}</Face>;
}

enum Status {
  Front,
  Back,
}

Card.Front = Front;
Card.Back = Back;
Card.Status = Status;

export default Card;
