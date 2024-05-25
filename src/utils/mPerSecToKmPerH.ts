export  function mPerSecToKmPerH(mPerSec: number): string {
    const kmPerH = mPerSec * 3.6;
    return `${kmPerH.toFixed(0)} km/h`;
}