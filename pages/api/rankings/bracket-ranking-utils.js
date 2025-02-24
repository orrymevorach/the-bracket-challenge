export const mapRoundToPoints = {
  1: 10,
  2: 20,
  3: 40,
  4: 80,
};

export function addRank(arr) {
  // Sort the array in descending order based on totalPoints
  arr.sort((a, b) => b.rankData?.totalPoints - a.rankData?.totalPoints);

  // Initialize rank tracking variables
  let rank = 1;
  let tieRank = 1;

  // Loop through the sorted array and assign ranks
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i]?.rankData) {
      arr[i].rankData = { totalPoints: 0 };
    }
    if (
      i > 0 &&
      arr[i].rankData.totalPoints === arr[i - 1].rankData.totalPoints
    ) {
      // If current totalPoints is equal to the previous one, it's a tie, assign the same rank
      arr[i].rankData.rank = tieRank;
    } else {
      // Otherwise, update tieRank to the current rank
      arr[i].rankData.rank = rank;
      tieRank = rank;
    }
    // Increment rank for the next object
    rank++;
  }

  return arr;
}
