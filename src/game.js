import { Platformer } from "./platformer.js";

const main = document.getElementById('main');
const canvas = document.getElementById('platformer');
const platformer = new Platformer(main, canvas);