import { useEffect, useState } from "react";

import Card from "./components/Card";
import { fetchVideos } from "./store";
import { useAppDispatch, useAppSelector } from "./hooks";
import "./App.css";

function App() {
  const [showApp, setShowApp] = useState(false);
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.app.status);
  const videos = useAppSelector((state) => state.app.videos);

  useEffect(() => {
    dispatch(fetchVideos());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="App">
      {showApp ? (
        videos.map((item) => {
          return <Card key={item.id} {...item.attributes} />;
        })
      ) : (
        <div className="showAppBtnContainer">
          <button
            onClick={() => {
              setShowApp(true);
            }}
          >
            Show app!
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
