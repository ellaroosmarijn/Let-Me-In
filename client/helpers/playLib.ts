import { Image } from "../../models/image"

// To learn more about the fisher-yates algorithm check the following links
// https://sebhastian.com/fisher-yates-shuffle-javascript/
// https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
export default function shuffleArray(array: Image[]):Image[] {
  const shuffledArray = array
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i+ 1));
    [array[randomIndex], array[i]] = [array[i], array[randomIndex]];
  }
  return shuffledArray
} 