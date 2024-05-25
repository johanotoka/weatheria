export  function meterToKilometer(numberInMeter: number): string {
    const numberInKilometer = numberInMeter / 1000;
    return `${numberInKilometer.toFixed(0)} km`;
}