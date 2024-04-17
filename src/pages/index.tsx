import Head from 'next/head';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

export default function Home() {
  const component = useRef(null);

  useEffect(() => {
    gsap.set('.c', { x: 0, y: 100, opacity: 0 });
    gsap.to('.c', { x: 0, y: 0, opacity: 1, duration: 1, delay: 0.5 });
    gsap.set('.o', { x: 0, y: 100, opacity: 0 });
    gsap.to('.o', { x: 0, y: 0, opacity: 1, duration: 1, delay: 0.4 });
    gsap.set('.m', { x: 0, y: 100, opacity: 0 });
    gsap.to('.m', { x: 0, y: 0, opacity: 1, duration: 1, delay: 0.3 });
    gsap.set('.i', { x: 0, y: 100, opacity: 0 });
    gsap.to('.i', { x: 0, y: 0, opacity: 1, duration: 1, delay: 0.2 });
    gsap.set('.n', { x: 0, y: 100, opacity: 0 });
    gsap.to('.n', { x: 0, y: 0, opacity: 1, duration: 1, delay: 0.1 });
    gsap.set('.g', { x: 0, y: 100, opacity: 0 });
    gsap.to('.g', { x: 0, y: 0, opacity: 1, duration: 1, delay: 0 });
    gsap.set('.s', { x: 0, y: 100, opacity: 0 });
    gsap.to('.s', { x: 0, y: 0, opacity: 1, duration: 1, delay: 0.1 });
    gsap.set('.o2', { x: 0, y: 100, opacity: 0 });
    gsap.to('.o2', { x: 0, y: 0, opacity: 1, duration: 1, delay: 0.3 });
    gsap.set('.o3', { x: 0, y: 100, opacity: 0 });
    gsap.to('.o3', { x: 0, y: 0, opacity: 1, duration: 1, delay: 0.4 });
    gsap.set('.n2', { x: 0, y: 100, opacity: 0 });
    gsap.to('.n2', { x: 0, y: 0, opacity: 1, duration: 1, delay: 0.5 });
    let ctx = gsap.context((self) => {
      let mouseMoved = 0;
      let timer: any;

      self.add('onMove', (e: any) => {
        // clear the timer every time the mouse moves
        clearTimeout(timer);
        // set a timer for 0.2 second
        timer = setTimeout(mouseStopped, 10);

        function mouseStopped() {
          mouseMoved >= 100 ? (mouseMoved = 0) : mouseMoved++;
          const object = document.createElement('img');
          object.src = `/images/flower-${Math.floor(mouseMoved % 24)}.png`;
          object.className = `object object-${mouseMoved}`;
          //@ts-ignore
          component.current.appendChild(object);
          gsap.set(`.object-${mouseMoved}`, {
            x: e.clientX + Math.random() * 30,
            y: e.clientY + Math.random() * 30,
            scale: 0,
            opacity: 0.5,
            rotate: Math.random() * 360,
          });
          gsap
            .timeline({
              //@ts-ignore
              onComplete: () => component.current.removeChild(object),
            })
            .to(`.object-${mouseMoved}`, {
              duration: 2,
              opacity: 1,
              scale: 1,
              ease: 'power3.out',
            })
            .to(`.object-${mouseMoved}`, {
              opacity: 0,
              scale: 0,
              duration: 2,
              ease: 'power1.out',
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
        <span className="c">C</span>
        <span className="o">O</span>
        <span className="m">M</span>
        <span className="i">I</span>
        <span className="n">N</span>
        <span className="g">G</span>
        <span style={{ width: '50px' }} />
        <span className="s">S</span>
        <span className="o2">O</span>
        <span className="o3">O</span>
        <span className="n2">N</span>
      </div>
    </>
  );
}
