/// Reproduction of FR-121 by Michał Misiak

import {P5CanvasInstance, ReactP5Wrapper, SketchProps} from "@p5-wrapper/react";
import {linearGradientBackground} from "../common/2d/background/tsx.ts";
import fr116 from '../../assets/fr-116-oil-on-canvas-195x195-cm-2023.jpg';
import {useState} from "react";
import {CheckboxInput, RangeInput} from "../../components/inputs.tsx";

type FR116SketchProps = SketchProps & {
  debug: boolean;
  goldenLineConfig: IGoldenLineInput;
};

interface IGoldenLineInput {
  nodes: number;
  emittedLines: number;
  adjustFactor?: number;
  nodeVerticalOffset: number;
  nodeVerticalOffsetFactor?: number;
  debug?: boolean;
  adjustFactorNodeSource?: number;
  lineColorFactor?: number;
}

function drawDebugLines(p5: P5CanvasInstance<FR116SketchProps>, leftMax: number, h: number, rightMax: number, centerX: number, centerY: number) {
  p5.push();
  p5.stroke(255, 0, 0);
  // left
  p5.line(leftMax, 0, leftMax, h);
  // right
  p5.line(rightMax, 0, rightMax, h);
  // center
  p5.stroke(0, 255, 0);
  p5.line(centerX, 0, centerX, h);

  // draw point at center
  p5.stroke(255, 255, 255);
  p5.strokeWeight(7);
  p5.point(centerX, centerY);
  p5.pop();
}

function goldenLines(p5: P5CanvasInstance<FR116SketchProps>, input: IGoldenLineInput) {
  const w = p5.width;
  const h = p5.height;
  let nodes = input.nodes;
  const nodeWidth = w / nodes;
  const halfNodeWidth = nodeWidth / 2;
  const adjustFactor = input.adjustFactor || 1;
  const adjustFactorNodeSource = input.adjustFactorNodeSource || 1;
  const nodeVerticalOffsetFactor = input.nodeVerticalOffsetFactor || 1;
  const endColor = p5.color('rgba(104, 94, 94, 0.8)');
  const startColor = p5.color(24, 26, 64, 0.8);
  const lineColorFactor = input.lineColorFactor || 1;
  p5.push();

  p5.translate(-halfNodeWidth,0);
  nodes += 1;

  let centerY = (h / 2) - (nodes / 2) * input.nodeVerticalOffset;
  for (let i = 0; i < nodes; i++) {
    const leftMax = i * nodeWidth;
    const rightMax = (i + 1) * nodeWidth;
    const centerX = (leftMax + rightMax) / 2;
    centerY += input.nodeVerticalOffset * nodeVerticalOffsetFactor;

    if (input.debug) {
      drawDebugLines(p5, leftMax, h, rightMax, centerX, centerY);
    }

    const halfEmittedLines = input.emittedLines / 2;

    p5.stroke(endColor);
    p5.line(centerX, 0, centerX, h);
    for (let j = 0; j < halfEmittedLines; j++) {
      const adjust = p5.pow(j / halfEmittedLines, adjustFactor);
      const adjustTest = p5.pow(j / halfEmittedLines, adjustFactor * adjustFactorNodeSource);
      const lineAngleY = p5.lerp(leftMax, centerX, adjust);
      const lineAngleX = p5.lerp(lineAngleY, centerX, adjustTest);
      const finalColor = p5.lerpColor(startColor, endColor, adjust * lineColorFactor);
      p5.stroke(finalColor);
      p5.line(lineAngleX, centerY, lineAngleY, 0);
      p5.line(lineAngleX, centerY, lineAngleY, h);
    }

    for (let j = 0; j < halfEmittedLines; j++) {
      const adjust = p5.pow(j / halfEmittedLines, adjustFactor);
      const adjustTest = p5.pow(j / halfEmittedLines, adjustFactor * adjustFactorNodeSource);
      const lineAngleY = p5.lerp(rightMax, centerX, adjust);
      const lineAngleX = p5.lerp(lineAngleY, centerX, adjustTest);
      const finalColor = p5.lerpColor(startColor, endColor, adjust * lineColorFactor);
      p5.stroke(finalColor);
      p5.line(lineAngleX, centerY, lineAngleY , 0);
      p5.line(lineAngleX, centerY, lineAngleY, h);
    }
  }

  p5.pop();
}

function sketch(p5: P5CanvasInstance<FR116SketchProps>) {
  let debug = false;
  let goldenLineConfig: IGoldenLineInput = {
    nodes: 6,
    emittedLines: 26,
    adjustFactor: 1.95,
    adjustFactorNodeSource: 1,
    nodeVerticalOffset: 40,
    nodeVerticalOffsetFactor: 0.8,
    debug: false,
    lineColorFactor: 1.5,
  };

  const background = {
    steps: [
      { color: p5.color(15, 16, 48, 255), range: { start: 0 } },
      { color: p5.color(24, 26, 64, 255), range: { start: 0.5 } },
      { color: p5.color(17, 20, 53, 255), range: { start: 1 } },
    ],
    deg: 90,
  };

  p5.updateWithProps = (props) => {
    debug = props.debug || false;
    goldenLineConfig = { ...goldenLineConfig, ...props.goldenLineConfig };
  };

  p5.setup = () => p5.createCanvas(800, 800);

  p5.draw = () => {

    linearGradientBackground(p5 as P5CanvasInstance, background);
    goldenLines(p5, { ...goldenLineConfig, debug });
  };
}

export const ArtworkFr121 = () => {
  const [opacity, setOpacity] = useState(0);
  const [debug, setDebug] = useState(false);
  const [goldenLineConfig, setGoldenLineConfig] = useState({
    nodes: 6,
    emittedLines: 26,
    adjustFactor: 1.95,
    adjustFactorNodeSource: 1,
    nodeVerticalOffset: 40,
    nodeVerticalOffsetFactor: 0.8,
    lineColorFactor: 1,
  });

  const handleConfigChange = (key: string, value: number) => {
    setGoldenLineConfig((prevConfig) => ({
      ...prevConfig,
      [key]: value,
    }));
  };

  return (
    <div>
      <div className="relative">
        <img
          src={fr116}
          alt="fr-116"
          className="w-[800px] h-[800px] top-0 left-0 absolute z-0"
          style={{ opacity: opacity }}
        />
        <ReactP5Wrapper
          sketch={sketch}
          debug={debug}
          goldenLineConfig={goldenLineConfig}
        />
      </div>
      <div className="pt-5 fixed top-0 right-5 max-w-[300px] h-dvh overflow-scroll">
        <h1>Configuration</h1>
        <p>Compare with the original (opacity):</p>
        <RangeInput
          min={0}
          max={1}
          step={0.01}
          initialValue={opacity}
          onChange={setOpacity}
        />
        <CheckboxInput label={"Debug"} checked={debug} onChange={setDebug} />
        <div className="mt-4">
          <h2>Golden Line Config</h2>
          <div className="mb-4">
            <label>Number of Nodes:</label>
            <p className="text-sm text-gray-500">
              Defines the number of points from which lines are emitted.
            </p>
            <RangeInput
              min={2}
              max={20}
              step={1}
              initialValue={goldenLineConfig.nodes}
              onChange={(value) => handleConfigChange("nodes", value)}
            />
          </div>
          <div className="mb-4">
            <label>Emitted Lines per Node:</label>
            <p className="text-sm text-gray-500">
              Number of lines emitted from each node.
            </p>
            <RangeInput
              min={2}
              max={50}
              step={1}
              initialValue={goldenLineConfig.emittedLines}
              onChange={(value) => handleConfigChange("emittedLines", value)}
            />
          </div>
          <div className="mb-4">
            <label>Adjust Factor:</label>
            <p className="text-sm text-gray-500">
              Controls the curvature of the emitted lines.
            </p>
            <RangeInput
              min={0.5}
              max={5}
              step={0.1}
              initialValue={goldenLineConfig.adjustFactor}
              onChange={(value) => handleConfigChange("adjustFactor", value)}
            />
          </div>
          <div className="mb-4">
            <label>Adjust Factor for Node Source:</label>
            <p className="text-sm text-gray-500">
              Adjusts the angle of emitted lines closer to the node's center.
            </p>
            <RangeInput
              min={0.5}
              max={5}
              step={0.1}
              initialValue={goldenLineConfig.adjustFactorNodeSource}
              onChange={(value) =>
                handleConfigChange("adjustFactorNodeSource", value)
              }
            />
          </div>
          <div className="mb-4">
            <label>Node Vertical Offset:</label>
            <p className="text-sm text-gray-500">
              Distance between nodes along the vertical axis.
            </p>
            <RangeInput
              min={-100}
              max={100}
              step={0.01}
              initialValue={goldenLineConfig.nodeVerticalOffset}
              onChange={(value) =>
                handleConfigChange("nodeVerticalOffset", value)
              }
            />
          </div>
          <div className="mb-4">
            <label>Node Vertical Offset Factor:</label>
            <p className="text-sm text-gray-500">
              Multiplier for vertical spacing between nodes.
            </p>
            <RangeInput
              min={-5}
              max={3}
              step={0.1}
              initialValue={goldenLineConfig.nodeVerticalOffsetFactor}
              onChange={(value) =>
                handleConfigChange("nodeVerticalOffsetFactor", value)
              }
            />
          </div>
          <div className="mb-4">
            <label>Line Color Factor:</label>
            <p className="text-sm text-gray-500">
              Multiplier for the color of the emitted lines.
            </p>
            <RangeInput
              min={0}
              max={5}
              step={0.1}
              initialValue={goldenLineConfig.lineColorFactor}
              onChange={(value) =>
                handleConfigChange("lineColorFactor", value)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
