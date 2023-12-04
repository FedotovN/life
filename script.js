const canv = document.getElementsByTagName('canvas')[0],
      cont = canv.getContext('2d');
canv.height = window.innerHeight;
canv.width = window.innerWidth;
const height = canv.height;
const width = canv.width;
const particles = [];
const draw = (x, y, c, dx, dy) => {
    cont.fillStyle = c
    cont.fillRect(x, y, dx, dy);
}
const particle = (x, y, c) => {
    return { x, y, vx: 0, vy: 0, color: c }
}
const rand = lim => Math.random() * lim - 20
const createGroup = (amount, color) => {
    const group = [];
    for (let i = 0; i < amount; i++) {
        const p = particle(rand(width), rand(height), color)
        group.push(p);
        particles.push(p);
    }
    return group;
}
const force = (p1, p2, g) => {
    for (let i = 0; i < p1.length; i++) {
        let fx = 0;
        let fy = 0;
        let a, b, dx, dy;
        for (let j = 0; j < p2.length; j++) {
            a = p1[i];
            b = p2[j];
            dx = a.x - b.x;
            dy = a.y - b.y;
            const d = Math.sqrt(dx*dx + dy*dy);
            if (d > 0 && d < 80) {
                const F = g * 1 / d;
                fx += (F * dx);
                fy += (F * dy);
            }
        }
        a.vx = (a.vx + fx) * .5;
        a.vy = (a.vy + fy) * .5;
        a.x += a.vx;
        a.y += a.vy;
        if(a.x <= 0 || a.x >= width) { a.vx *= -1 }
        if(a.y <= 0 || a.y >= height) { a.vy *= -1 }
    }
}
const y = createGroup(300, '#bebebe');
const x = createGroup(300, '#fefefe');
const z = createGroup(300, '#ff66ee');
update = () => {
    force(z, z, -0.32);
    force(z, x, -.17);
    force(z, y, .34);
    force(x, x, -.1);
    force(x, z, -.34);
    force(y, y, .15);
    force(y, z, -.2);
    cont.clearRect(0, 0, width, height);
    draw(0,0, "black", width, height);
    for (let i = 0; i < particles.length; i++) {
        const { x, y, color } = particles[i];
        draw(x, y, color, 4, 4);
    }
    requestAnimationFrame(update)
}
update();