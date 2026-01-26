import { Button } from "@components/button";

export const HelloButton = () => {
  return (
    <Button variant="primary" onClick={() => alert("Hello from Doc Helper!")}>
      Click Me!
    </Button>
  );
};
