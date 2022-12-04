# React 3D Experiments

A project to experiment with 3D in a React application, using **three.js** and **React Three Fiber**. The final result can be seen [here](https://react-3d-exp.vercel.app/).

## Available Scenes

The following are the available 3D scenes, with their corresponding url.

### Frigate in the sea `/frigate-3d`

A 17th century frigate in an ocean environment. The ship follows the waves' movement, thanks to this [implementation](https://sbcode.net/threejs/gerstnerwater/) of Gerstner waves, slightly modified.

It is also possible to walk around the ship using `W`, `S` and the mouse. A basic collisions detection system has been created to move around the ship model: the camera moves at a fixed height over a separate geometry used as a walking surface and can't go beyond it.

> [Model](https://sketchfab.com/3d-models/aleksandr-class-archipelago-frigate-f82f40ca04d84a24868a453c4e3a16c2) by "Museovirasto Museiverket Finnish Heritage Agency". The original model's polygon count was too high, so it's been optimized in Blender as much as possible.
