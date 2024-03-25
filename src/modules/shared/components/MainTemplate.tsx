import { JSX } from "solid-js";

export default function MainTemplate(props: { children: JSX.Element }) {
  return (
    <div class="h-full">
      <main class="flex justify-center items-center bg-slate-700 h-full">
        {props.children}
      </main>
    </div>
  );
}
