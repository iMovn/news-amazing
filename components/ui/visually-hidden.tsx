import { Slot } from "@radix-ui/react-slot";

export function VisuallyHidden({ children }: { children: React.ReactNode }) {
  return (
    <Slot
      style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: "0",
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        border: "0",
      }}
    >
      {children}
    </Slot>
  );
}
