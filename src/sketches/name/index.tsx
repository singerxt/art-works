import { P5CanvasInstance, ReactP5Wrapper } from "@p5-wrapper/react";
import { Shader } from "p5";


const vertexShader = `
  precision highp float;

  attribute vec3 aPosition;
  attribute vec2 aTexCoord;

  // The transform of the object being drawn
  uniform mat4 uModelViewMatrix;

  // Transforms 3D coordinates to 2D screen coordinates
  uniform mat4 uProjectionMatrix;

  // A custom uniform with the time in milliseconds
  uniform float time;
  varying vec2 pos;
  void main() {
    pos = aTexCoord;
    vec4 position = vec4(aPosition, 1.0);
    position.xy = position.xy * 2. - 1.;

    gl_Position = position;
  }
`;

const fragmentShader = `
  precision highp float;
  varying vec2 pos;

  void main() {
    vec4 myColor = vec4(pos, 1., 1.);
    gl_FragColor = myColor;
  }
`;



const sketch = (p5: P5CanvasInstance) => {
  let myShader: Shader | null = null;

  p5.setup = () => {
    p5.createCanvas(800, 800, p5.WEBGL);
    p5.noStroke();
    p5.background('#00ff00')

    // Tworzenie shakera bezpośrednio z kodu
    myShader = p5.createShader(vertexShader, fragmentShader);
  };


  p5.draw = () => {
    p5.background(255);
    p5.noStroke();

    if (myShader) {
      // Use our custom shader
      p5.shader(myShader);

      // Pass the time from p5 to the shader
      myShader.setUniform('time', p5.millis());
    };

    // Draw a shape using the shader
    p5.ellipse(0, 0, p5.width, p5.height, 150);
  };
};

export const Name = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <ReactP5Wrapper sketch={sketch} />
    </div>
  );
};
