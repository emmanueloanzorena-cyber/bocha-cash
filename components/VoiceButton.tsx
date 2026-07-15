"use client";

import { Mic } from "lucide-react";

type Props = {
  onClick: () => void;
};

export default function VoiceButton({
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
      rounded-2xl
      bg-sky-500
      hover:bg-sky-400
      transition
      px-4
      flex
      items-center
      justify-center
      "
    >
      <Mic size={22} />
    </button>
  );
}