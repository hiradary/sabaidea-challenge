import { useEffect } from "react";

import Card from "./components/Card";
import { fetchVideos } from "./store";
import { useAppDispatch, useAppSelector } from "./hooks";
import "./App.css";

function App() {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.app.status);
  const videos = useAppSelector((state) => state.app.videos);

  // useEffect(() => {
  //   // dispatch(fetchVideos());

  //   if (status !== 'succeeded') return;
  // }, [status]);

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="App">
      {videos.map((item) => {
        return <Card key={item.id} {...item.attributes} />;
      })}
    </div>
  );
}

export default App;
