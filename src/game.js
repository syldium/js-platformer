import { Platformer } from "./platformer.js";

const canvas = document.getElementById('platformer');
const platformer = new Platformer(canvas);
platformer.tick();