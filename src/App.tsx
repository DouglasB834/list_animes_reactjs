import { Button } from "./components/ui/button";

import "./global.css";

const api: string = "https://kitsu.io/api/edge/";

export function App() {
  const handleClick = () => {
    console.log("Button clicked", api);
  };
  return (
    <div className="App">
      <h1>Animes</h1>
      <Button onClick={handleClick}>Click me</Button>
    </div>
  );
}
