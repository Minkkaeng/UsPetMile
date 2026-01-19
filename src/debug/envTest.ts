export const key = import.meta.env.VITE_PEXELS_KEY;
console.log("KEY:", key?.slice(0, 4) + "..." + key?.slice(-4));
