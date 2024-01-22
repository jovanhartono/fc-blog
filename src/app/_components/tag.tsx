import { ReactNode } from "react";

export default function Tag({ text }: { text: ReactNode }) {
  return (
    <small className="text-sm font-medium uppercase text-blue-500">
      {text}
    </small>
  );
}
