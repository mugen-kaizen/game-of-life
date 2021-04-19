export function placeSeedOnGrid(grid: number[][], seed: any[], [x,y]: any) {
	seed.forEach((seedCoord) => {
		const [dx,dy] = seedCoord;
		grid[x+dx][y+dy] = 1;
	});
	return grid;
};

export function getNeighbors(grid: (string | any[])[], i: number, j: number) {
	const dx = [-1, 0, 1, -1, 1, -1, 0, 1];
	const dy = [-1, -1, -1, 0, 0, 1, 1, 1];
	let count = 0;
	for (let z = 0; z < dx.length; z++) {
		const x = i + dx[z];
		const y = j + dy[z];
		if (-1 < x && x < grid.length && -1 < y && y < grid[0]?.length) {
			if (grid[x][y] === 1) {
				count++;
			}
		}
	}

	return count;
}