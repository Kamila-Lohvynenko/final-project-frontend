export const parseDateTime = (timeMs) => {
    const ms = Number(timeMs);


    if(!ms || ms < 1 || ms > Date.now())
        return new Date();
    const millisecondsPerYear = 365.25 * 24 * 60 * 60 * 1000;
    const millisecondsInThreeYears = millisecondsPerYear * 3;
    const lowerDate = Date.now() - millisecondsInThreeYears;
    if (lowerDate > ms) return new Date(lowerDate);
    return new Date(ms)
};