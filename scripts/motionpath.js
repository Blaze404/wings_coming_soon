gsap.registerPlugin(MotionPathPlugin, DrawSVGPlugin);
console.clear();
let paths = document.querySelectorAll("path");
const svgns = "http://www.w3.org/2000/svg";
let container = document.querySelector("#container");
let targets = [];
let targetArrays = [];
let localTargets = [];
let size = 10; // use for width and height of rectangles
let fillFactor = 0.65; // percentage - how densely packed each path is with rectangles
const color = "#46a2e0";
const anim = gsap.timeline({ delay: 0.75 });




// make a bunch of rectangles to put on the 14 paths
for (let i = 0; i < paths.length; i++) {
  let pathPoints = MotionPathPlugin.getRawPath(paths[i])[0];
  let pathLength = MotionPathPlugin.getLength(paths[i]);
  let count = Math.floor(pathLength / size * fillFactor);
  let newX = pathPoints[0];
  let newY = pathPoints[1];
  localTargets = [];
  for (let j = 0; j < count; j++) {
    let newRect = document.createElementNS(svgns, "rect");
    container.appendChild(newRect);
    gsap.set(newRect, {
      x: newX,
      y: newY,
      fill: color,
      attr: {
        rx: 0,
        ry: 0,
        x: 0,
        y: 0,
        width: size,
        height: size
        }
    });
    localTargets.push(newRect);
    targets.push(newRect);
  }

  targetArrays.push(localTargets);
}

gsap.set("svg", { opacity: 1 });

// get the rectangles centered and ready for motion
gsap.set(targets, {
  xPercent: -50,
  yPercent: -50,
  transformOrigin: "50% 50%",
  scale: 0
});

// use drawSVG to animate in the paths
anim.from("path", {
  drawSVG: 0,
  duration: 1,
  stagger: {
    each: 0.1
  },
  ease: "none"
});

anim.to(targets, { scale: 1, ease: "elastic", duration: 1.25 });

// make an amimation for all 14 paths and the targets
for (let i = 0; i < targetArrays.length; i++) {
  anim.to(targetArrays[i], {
    motionPath: {
      path: paths[i],
      autoRotate: true,
      start: 0,
      end: gsap.utils.distribute({
        base: 0,
        amount: 1
      })
    },
    duration: 0.4
  });
}

// random colors
anim.to(targets, {
  fill: "random([#1bb1a5, #94c356, #e3aa59, #a63ba0, #cf5b21, #46a4cc])",
  duration: 0.45,
  ease: "none",
  stagger: {
    amount: 2,
    from: "end"
  }
});

// cycle scale with wrap()
anim.to(targets, {
  scale: gsap.utils.wrap([1.3, 1.6, 1.9, 2.2]),
  duration: 0.35,
  ease: "power3.inOut",
  stagger: {
    amount: 3,
    yoyo: true,
    repeat: 1
  }
});
// rectangles to circles and change to GreenSock green
anim.to(targets, {
  rotation: "+=360",
  duration: 0.75,
  fill: "#88ce02",
  attr: {
    rx: size / 2,
    ry: size / 2
  },
  stagger: {
    amount: 3,
    from: "end"
  }
});
// back to rectangles
anim.to(targets, {
  attr: {
    rx: 0,
    ry: 0
  }
});
// move all targets to central point
anim.to(
  targets,
  {
    x: 500,
    y: 300,
    rotation: 0,
    attr: {
      height: 2,
      width: 40
    },

    stagger: {
      amount: 1.3,
      from: "center"
    }
  },
  "+=0.5"
);
// bye bye targets
anim.set(targets, {
  opacity: 0
});
// hello underline
anim.set("#underline", {
  opacity: 1
});
// expand underline
anim.to("#underline", {
  attr: {
    x1: 200,
    x2: 800
  },
  ease: "power3.inOut"
});
// reveal GSAP 3.0 text with clipPath
anim.from("#end", {
  duration: 0.65,
  y: 340
});
