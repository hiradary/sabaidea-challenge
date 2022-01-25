import { useRef, useEffect } from "react";
import { useIntersectionObserver } from "../../hooks";
import "./Card.css";

const Card = (Props: any) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, { threshold: 0.6 });
  const isVisible = entry?.isIntersecting;

  const { id, preview_src, title } = Props;

  const pauseAllVideos = () => {
    [...document.querySelectorAll(`video`)].forEach((item) => {
      item.pause();
    });
  };

  useEffect(() => {
    if (!isVisible || !entry.target) return;

    const videoEl: HTMLVideoElement | null = document.querySelector(
      `[data-videoId="${id}"]`
    );

    if (!videoEl) return;

    pauseAllVideos();

    videoEl.play();

    console.log({ videoEl });
  }, [isVisible]);

  return (
    <section className="cardContainer" ref={ref}>
      <div className="card">
        <video title={title} src={preview_src} controls data-videoId={id} />
      </div>
    </section>
  );
};

export default Card;
