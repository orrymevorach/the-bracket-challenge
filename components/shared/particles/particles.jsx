import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
// import { loadAll } from "@/tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from '@tsparticles/slim'; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

export default function ParticlesContainer({
  opacity = 0.5,
  color = '#ffffff',
}) {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async engine => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = container => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      particles: {
        links: {
          enable: true,
        },
        collisions: {
          enable: true,
        },
        move: {
          directions: 'none',
          enable: true,
          outModes: {
            default: 'bounce',
          },
          random: false,
          speed: 3,
          straight: false,
        },
        shape: {
          type: 'circle',
        },
        number: {
          value: 100,
          density: {
            enable: true,
            value_area: 700,
          },
        },
        color: {
          value: ['#fff'],
        },
        opacity: {
          value: opacity,
          random: true,
        },
        size: {
          value: 4,
          random: true,
        },
        line_linked: {
          enable: false,
          distance: 200,
          color: '#ffffff',
          opacity: 0.6,
          width: 1,
        },
      },
      interactivity: {
        events: {
          onclick: {
            enable: true,
            mode: 'push',
          },
          onhover: {
            enable: true,
            mode: 'repulse',
          },
          resize: true,
        },
        modes: {
          repulse: {
            distance: 50,
            duration: 0.4,
          },
        },
      },
      retina_detect: true,
    }),
    []
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>;
}
