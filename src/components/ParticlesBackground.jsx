import React, { useCallback, useMemo } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const ParticlesBackground = () => {
  // Memoized init callback for tsParticles
  const particlesInit = useCallback(async engine => {
    // loads the slim feature set onto the engine
    await loadSlim(engine);
  }, []);

  // Memoized callback once particles are loaded (optional)
  const particlesLoaded = useCallback(async () => {}, []);

  // Your existing particles options
  const options = useMemo(() => ({
    background: {
      color: { value: 'transparent' },
    },
    fullScreen: {
      enable: true,
      zIndex: -1,
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: { enable: false, mode: 'push' },
        onHover: { enable: true, mode: 'grab' },
        resize: true,
      },
      modes: {
        push: { quantity: 4 },
        grab: { distance: 140, links: { opacity: 0.15 } },
      },
    },
    particles: {
      color: { value: '#5ecfff' },
      links: {
        color: '#7b5cff',
        distance: 140,
        enable: true,
        opacity: 0.1,
        width: 0.8,
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: { default: 'bounce' },
        random: false,
        speed: 0.22,
        straight: false,
      },
      number: {
        density: { enable: true, area: 800 },
        value: 42,
      },
      opacity: {
        value: 0.28,
        animation: {
          enable: true,
          speed: 0.5,
          sync: false,
          startValue: 'random',
          destroy: 'none',
        },
      },
      shape: { type: 'circle' },
      size: {
        value: { min: 1, max: 2 },
        animation: {
          enable: true,
          speed: 2,
          sync: false,
          startValue: 'random',
          destroy: 'none',
        },
      },
    },
    detectRetina: true,
  }), []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={options}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    />
  );
};

export default ParticlesBackground;
