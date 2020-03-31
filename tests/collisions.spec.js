import { isPlayerCollidesVertically, resolve, ResolveSolution, isPlayerCollidesHorizontally } from "../src/collisions";
import { Platform, Player } from "../src/solids";

describe('Collision', () => {
    it('should detect player on ground', () => {
        expect(isPlayerCollidesVertically(new Player(200, 200), new Platform(0, 220, 300, 50))).toBeTruthy();
    });
    it('should not collide', () => {
        expect(isPlayerCollidesVertically(new Player(20, 5), new Platform(0, 50, 100, 10))).toBeFalsy();
    });

    it('should resolve vertically by top', () => {
        const player = new Player(200, 190);
        player.y = 210;
        const platform = new Platform(0, 220, 300, 50);
        expect(isPlayerCollidesVertically(player, platform)).toBeTruthy();
        resolve(player, platform, ResolveSolution.Y);
    });

    it('should resolve vertically by bottom', () => {
        const player = new Player(100, 100);
        player.y = 15;
        const platform = new Platform(0, 0, 300, 50);
        expect(isPlayerCollidesVertically(player, platform)).toBeTruthy();
        resolve(player, platform, ResolveSolution.Y);
        expect(player.y).toBeGreaterThanOrEqual(20);
    });

    it('should resolve horizontally by left', () => {
        const player = new Player(0, 0);
        player.x = 98;
        player.velX = 5;
        const platform = new Platform(100, 0, 300, 50);
        expect(isPlayerCollidesHorizontally(player, platform)).toBeTruthy();
        resolve(player, platform, ResolveSolution.X);
        expect(player.x).toBeLessThanOrEqual(80);
    });

    it('should resolve horizontally by right', () => {
        const player = new Player(30, 100);
        player.x = 0;
        const platform = new Platform(0, 0, 1, 400);
        expect(isPlayerCollidesHorizontally(player, platform)).toBeTruthy();
        resolve(player, platform, ResolveSolution.X);
        expect(player.x).toBeGreaterThanOrEqual(1);
    });
});