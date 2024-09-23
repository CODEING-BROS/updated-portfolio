import React, { useEffect, useRef } from 'react';
import $ from 'jquery';

const Background = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadScripts = async () => {
      const jQueryUrl = "https://code.jquery.com/jquery-3.6.0.min.js";
      const matterUrls = [
        "https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.12.0/matter.min.js",
        "https://cdn.jsdelivr.net/npm/matter-wrap@0.2.0/build/matter-wrap.min.js",
        "https://cdn.jsdelivr.net/npm/matter-attractors@0.1.6/build/matter-attractors.min.js",
      ];

      // Load jQuery first
      await new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = jQueryUrl;
        script.onload = resolve;
        document.body.appendChild(script);
      });

      // Load Matter.js scripts
      await Promise.all(
        matterUrls.map(url => {
          return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = url;
            script.onload = resolve;
            document.body.appendChild(script);
          });
        })
      );

      // Now that all scripts are loaded, run the Matter.js code
      runMatter();
    };

    loadScripts();

    return () => {
      const scripts = document.querySelectorAll('script[src*="jquery"], script[src*="matter-js"], script[src*="matter-wrap"], script[src*="matter-attractors"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  const runMatter = () => {
    const canvas = canvasRef.current;

    const dimensions = {
      width: $(window).width(),
      height: $(window).height(),
    };

    Matter.use('matter-attractors');
    Matter.use('matter-wrap');

    const { Engine, Render, World, Bodies, Mouse, Common, Events } = Matter;

    const engine = Engine.create();
    engine.world.gravity.y = 0;
    engine.world.gravity.x = 0;

    // Create the render object with the existing canvas
    const render = Render.create({
      element: canvas.parentNode,
      engine: engine,
      canvas: canvas,
      options: {
        width: dimensions.width,
        height: dimensions.height,
        wireframes: false,
        background: 'transparent',
      },
    });

    const attractiveBody = Bodies.circle(
      render.options.width / 2,
      render.options.height / 2,
      Math.max(dimensions.width / 25, dimensions.height / 25) / 2,
      {
        isStatic: true,
        render: {
          fillStyle: '#000',
          strokeStyle: '#000',
          lineWidth: 0,
        },
        plugin: {
          attractors: [
            (bodyA, bodyB) => ({
              x: (bodyA.position.x - bodyB.position.x) * 1e-6,
              y: (bodyA.position.y - bodyB.position.y) * 1e-6,
            }),
          ],
        },
      }
    );

    World.add(engine.world, attractiveBody);

    for (let i = 0; i < 120; i++) {
      const x = Common.random(0, render.options.width);
      const y = Common.random(0, render.options.height);
      const s = Common.random() > 0.6 ? Common.random(10, 80) : Common.random(4, 60);
      const polygonNumber = Common.random(3, 6);

      const body = Bodies.polygon(x, y, polygonNumber, s, {
        mass: s / 20,
        friction: 0,
        frictionAir: 0.02,
        angle: Math.round(Math.random() * 360),
        render: {
          fillStyle: '#222222',
          strokeStyle: '#000000',
          lineWidth: 2,
        },
      });

      World.add(engine.world, body);

      const r = Common.random(0, 1);
      const circle = Bodies.circle(x, y, Common.random(2, 8), {
        mass: 0.1,
        friction: 0,
        frictionAir: 0.01,
        render: {
          fillStyle: r > 0.3 ? `#27292d` : `#444444`,
          strokeStyle: '#000000',
          lineWidth: 2,
        },
      });

      World.add(engine.world, circle);
    }

    const mouse = Mouse.create(render.canvas);
    Events.on(engine, 'afterUpdate', () => {
      if (!mouse.position.x) return;
      Matter.Body.translate(attractiveBody, {
        x: (mouse.position.x - attractiveBody.position.x) * 0.12,
        y: (mouse.position.y - attractiveBody.position.y) * 0.12,
      });
    });

    const setWindowSize = () => {
      render.canvas.width = $(window).width();
      render.canvas.height = $(window).height();
    };

    $(window).resize(setWindowSize);
    setWindowSize();

    // Run the Matter.js engine and render
    Matter.Runner.run(Matter.Runner.create(), engine);
    Matter.Render.run(render);
  };

  return (
    <div className='absolute inset-0'>
        <canvas
      ref={canvasRef}
      
      style={{ width: '100%', height: '100%' }}
    />
    </div>
  );
};

export default Background;
