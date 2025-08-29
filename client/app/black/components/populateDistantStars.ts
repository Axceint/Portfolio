import * as three from "three";
const populateDistantStars = (count: number = 10000, spread = 10000) => {
  const starGeometry = new three.BufferGeometry();
  const starMaterial = new three.PointsMaterial({
    color: 0xffffff,
    size: 5,
    sizeAttenuation: true,
  });
  const position = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * count;
    const y = (Math.random() - 0.5) * count;
    const z = (Math.random() - 0.5) * count;

    position[i * 3] = x;
    position[i * 3 + 1] = y;
    position[i * 3 + 2] = z;
  }
  starGeometry.setAttribute("position", new three.BufferAttribute(position, 3));
  return new three.Points(starGeometry, starMaterial);
};
export default populateDistantStars

//
//
//
// import * as three from "three";

// const populateDistantStars = (count: number, spread: number) => {
//   const starGeometry = new three.BufferGeometry();
//   const starMaterial = new three.PointsMaterial({
//     color: 0xffffff,
//     size: 5,
//     sizeAttenuation: true,
//   });
//   const positions = new Float32Array(count * 3);
//   for (let i = 0; i < count; i++) {
//     const x = (Math.random() - 0.5) * spread;
//     const y = (Math.random() - 0.5) * spread;
//     const z = (Math.random() - 0.5) * spread;

//     positions[i * 3] = x;
//     positions[i * 3 + 1] = y;
//     positions[i * 3 + 2] = z;
//   }
//   starGeometry.setAttribute(
//     "position",
//     new three.BufferAttribute(positions, 3)
//   );

//   return new three.Points(starGeometry, starMaterial);
// };

// export default populateDistantStars;
