import * as three from "three";
export default class Ship {
  mesh: three.Mesh;
  velocity: three.Vector3;
  keys: Set<string>;

  constructor(radius: number = 10, color: number = 10) {
    const geometry = new three.SphereGeometry(radius, 32, 32);
    const material = new three.MeshPhysicalMaterial({
      color: color,
      metalness: 0,
      roughness: 0.4,
    });
    this.mesh = new three.Mesh(geometry, material);
    this.velocity = new three.Vector3(0, 0, 0);

    this.keys = new Set();
    window.addEventListener("keydown", (e) => {
      this.keys.add(e.key);
    });
    window.addEventListener("keyup", (e) => {
      this.keys.delete(e.key);
    });
  }
  update(): void {
    const direction = new three.Vector3(0, 0, 0);
    const speed = 0.1;
    if (this.keys.has("w")) {
      direction.x = 1;
    }
    if (this.keys.has("s")) {
      direction.x = -1;
    }
    if (this.keys.has("d")) {
      direction.z = 1;
    }
    if (this.keys.has("a")) {
      direction.z = -1;
    }
    if (this.keys.has(" ")) {
      direction.y = 1;
    }
    if (this.keys.has("Control")) {
      direction.y = -1;
    }

    if (direction.length() > 0) {
      direction.normalize();
      this.velocity.copy(direction.multiplyScalar(speed));
    } else {
      this.velocity.set(0, 0, 0);
    }

    this.mesh.position.add(this.velocity);
  }
}

//
//
//

// import * as three from "three";

// export default class Ship {
//   mesh: three.Mesh;
//   velocity: three.Vector3;
//   keys: Set<string>;

//   constructor(radius: number = 10, color: number = 0xffffff) {
//     const geometry = new three.SphereGeometry(radius, 32, 32);
//     const material = new three.MeshPhysicalMaterial({
//       color: color,
//       roughness: 0.4,
//       metalness: 0,
//     });
//     this.mesh = new three.Mesh(geometry, material);
//     this.velocity = new three.Vector3(0, 0, 0);
//     this.keys = new Set();

//     window.addEventListener("keydown", (e) => {
//       this.keys.add(e.key);
//     });
//     window.addEventListener("keyup", (e) => {
//       this.keys.delete(e.key);
//     });
//   }
//   update(): void {
//     const direction = new three.Vector3(0, 0, 0);
//     const speed = 0.1;

//     if (this.keys.has("w")) direction.x = 1;
//     if (this.keys.has("s")) direction.x = -1;
//     if (this.keys.has("a")) direction.z = -1;
//     if (this.keys.has("d")) direction.z = 1;
//     if (this.keys.has(" ")) direction.y = 1;
//     if (this.keys.has("Control")) direction.y = -1;

//     if (direction.length() > 0) {
//       direction.normalize()
//       this.velocity.copy(direction.multiplyScalar(speed))
//     } else {
//       this.velocity.set(0,0,0)
//     }
//     this.mesh.position.add(this.velocity)
//   }
// }
