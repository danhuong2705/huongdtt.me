import Head from 'next/head';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

export default function Home() {
  const component = useRef(null);

  useEffect(() => {
    let ctx = gsap.context((self) => {
      let mouseMoved = 0;
      let timer: any;

      self.add('onMove', (e: any) => {
        // clear the timer every time the mouse moves
        clearTimeout(timer);
        // set a timer for 0.2 second
        timer = setTimeout(mouseStopped, 8);

        function mouseStopped() {
          mouseMoved >= 100 ? (mouseMoved = 0) : mouseMoved++;
          const object = document.createElement('img');
          object.src = `/images/Flair-${Math.floor(mouseMoved % 10)}.png`;
          object.className = `object object-${mouseMoved}`;
          //@ts-ignore
          component.current.appendChild(object);
          gsap
            .timeline({
              //@ts-ignore
              onComplete: () => component.current.removeChild(object),
            })
            .to(`.object-${mouseMoved}`, {
              x: e.clientX,
              y: e.clientY,
              duration: 0,
              xPercent: -50,
              yPercent: -50,
              transformOrigin: 'center',
              scale: 0,
              opacity: 1,
              rotate: Math.random() * 360,
            })
            .to(`.object-${mouseMoved}`, {
              x: e.clientX + 30,
              y: e.clientY,
              scale: 1,
              duration: 1,
              ease: 'power4.out',
            })
            .to(`.object-${mouseMoved}`, {
              opacity: 0,
              scale: 0,
              duration: 0.4,
              ease: 'power4.out',
            });
        }
      });
    }, component);

    window.addEventListener('mousemove', (e) => ctx.onMove(e));

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', ctx.onMove);
    };
  }, []);

  // use gsap to display objects follow mouse move event and hide them after 0.5s with animation effect (opacity, scale) and move them to new position after 0.5s with animation effect (opacity, scale) and hide them after 0.5s with animation effect (opacity, scale)

  return (
    <>
      <Head>
        <title>Dắn Hương nè</title>
      </Head>
      <div ref={component} className={'coming-soon'}>
        COMING SOON
        {new Array(10).fill(0).map((_, index: number) => (
          <img
            key={index}
            className={`object object-${index}`}
            src={`/images/Flair-${index}.png`}
            alt="object"
          />
        ))}
      </div>
    </>
  );
}
