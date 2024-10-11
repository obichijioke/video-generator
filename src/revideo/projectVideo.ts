import { makeProject } from '@revideo/core';
import scene from './scene';
import sceneTwo from './sceneTwo';
import metadata from './metadata.json';
import './global.css';
/**
 * The final revideo project
 */
export default makeProject({
  scenes: [sceneTwo],
  //variables: metadata,
  settings: {
    shared: {
      size: { x: 1920, y: 1080 },
    },
  },
});
