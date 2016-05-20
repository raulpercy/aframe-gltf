module AFRAMEGLTF {
  'use strict';

  function init() {
    this.sceneEl.addEventListener('camera-ready', function () {
      scene = this.sceneEl.object3D;
      camera = this.sceneEl.camera;
    }, true);
  }

  function tick() {
    if (scene && camera) {
      THREE.glTFAnimator.update();
      THREE.glTFShaders.update(scene, camera);
    }
  }

  let camera = null,
      scene = null;

  export function System() {
    return {
      init: init,
      tick: tick 
    };
  }
}
