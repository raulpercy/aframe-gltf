module AFRAMEGLTF {
  'use strict';

  function init() {
    this.model = null;
  }

  function update() {
    let self = this,
        el = this.el,
        src = this.data.src,
        loop = this.data.loop,
        auto = this.data.auto;

    if (!src) { return; }

    this.remove();

    loader.load(src, function (gltfModel) {
      let i = null,
          len = null,
          animation = null;

      gltf = gltfModel;
      self.model = gltfModel.scene;
      el.setObject3D('mesh', self.model);
      el.emit('model-loaded', {format: 'gltf', model: self.model});

      if (gltf.animations && gltf.animations.length) {
        len = gltf.animations.length;
        for (i = 0; i < len; i++) {
          animation = gltf.animations[i];
          animation.loop = loop;
          if (auto) {
            animation.play();
          }
        }
      }
    });
  }

  function remove() {
    if (!this.model) { return; }
    this.el.removeObject3D('mesh');
  }

  let loader = new THREE.glTFLoader(),
      gltf = null;

  export function Component() {
    return {
      schema: {
        src: {type: 'src'},
        loop: {default: true},
        auto: {default: true}
      },
      init: init,
      update: update,
      remove:remove 
    };
  }
}
