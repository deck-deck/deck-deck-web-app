import { JSX } from "solid-js";

export default function MainTemplate(props: { children: JSX.Element }) {
  return (
    <div class="h-full">
      <main class="flex flex-col justify-center items-center gap-5 bg-slate-700 h-full">
        {props.children}
      </main>
    </div>
  );
}
