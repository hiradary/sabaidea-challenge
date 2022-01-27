import { useRef, useEffect } from "react";
import { useIntersectionObserver } from "../../hooks";
import "./Card.css";

const Card = (Props: any) => {
  const cardEl = useRef<HTMLDivElement | null>(null);
  const videoEl = useRef<HTMLVideoElement | null>(null);
  const entry = useIntersectionObserver(cardEl, { threshold: 0.7 });
  const isVisible = entry?.isIntersecting;

  const { id, preview_src, title } = Props;

  const pauseOtherVideos = () => {
    [...document.querySelectorAll(`video`)].forEach((item) => {
      const isCurrentVideo = item.getAttribute("data-id") === id;
      if (isCurrentVideo) return;

      item.pause();
    });
  };

  useEffect(() => {
    if (!isVisible || !entry.target || !videoEl.current) return;

    videoEl.current.play();
    pauseOtherVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return (
    <section className="cardContainer" ref={cardEl}>
      <div className="card">
        <video
          title={title}
          src={preview_src}
          ref={videoEl}
          controls
          data-id={id}
        />
        <h3>{title}</h3>
      </div>
    </section>
  );
};

export default Card;
