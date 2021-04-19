import { useEffect, useRef, useState } from "react";
import { Seed } from "./seeds";
import { getNeighbors, placeSeedOnGrid } from "./util";

const GRID_WIDTH = 500;
const GRID_HEIGHT = 500;
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;
export const GameOfLife = () => {
  const gridRef = useRef<HTMLCanvasElement>(null);
  const canvasCtx = gridRef.current?.getContext("2d");
  const [drawGrid, setDrawGrid] = useState(getInitialGrid);

  useEffect(() => {
    draw();
  }, [drawGrid]);

  useEffect(() => {
    setTimeout(() => {
      const nextGrid = getNextGrid(drawGrid);
      setDrawGrid(nextGrid);
    }, 100);
  });

  function getInitialGrid() {
    const grid = Array(GRID_WIDTH)
      .fill(null)
      .map(() => Array(GRID_HEIGHT).fill(0));
    placeSeedOnGrid(grid, Seed.GLIDER, [0, 0])
    placeSeedOnGrid(grid, Seed.GLIDER, [20, 0]);
    placeSeedOnGrid(grid, Seed.BLINKER, [0, 20]);
    placeSeedOnGrid(grid, Seed.TOAD, [20, 20]);
    placeSeedOnGrid(grid, Seed.BEACON, [10, 10]);

    return grid;
  }

  function getNextGrid(grid: (string | any[])[]) {
    const newGrid = Array(GRID_WIDTH)
      .fill(null)
      .map(() => Array(GRID_HEIGHT).fill(0));

    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid?.[0].length; j++) {
        // Any live cell with two or three live neighbours survives.
        // Any dead cell with three live neighbours becomes a live cell.
        // All other live cells die in the next generation. Similarly, all other dead cells stay dead.
        const neighbors = getNeighbors(grid, i, j);
        if (grid[i][j] === 1 && (neighbors === 2 || neighbors === 3)) {
          newGrid[i][j] = 1;
        } else if (grid[i][j] === 0 && neighbors === 3) {
          newGrid[i][j] = 1;
        } else {
          newGrid[i][j] = 0;
        }
      }
    }
    return newGrid;
  }

  function draw() {
    const drawScale = 10;
    const rectSize = drawScale * 1;
    if (canvasCtx) {
      drawGrid.forEach((vi, i) => {
        vi.forEach((vj, j) => {
          if (vj) {
            canvasCtx.fillStyle = "rgb(0, 255, 0)";
            canvasCtx.fillRect(
              i * drawScale,
              j * drawScale,
              rectSize,
              rectSize
            );
          } else {
            canvasCtx.fillStyle = "rgb(255, 255, 255)";
            canvasCtx.fillRect(
              i * drawScale,
              j * drawScale,
              rectSize,
              rectSize
            );
          }
        });
      });
    }
  }

  return (
    <div>
      <canvas
        id="game-of-life"
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        ref={gridRef}
      />
    </div>
  );
};
function newGrid(newGrid: any) {
  throw new Error("Function not implemented.");
}
