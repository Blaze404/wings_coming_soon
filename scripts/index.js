window.onload = _ => {

    "use strict";

    const rand = (min, max) => Math.random () * (max - min) + min;
    const canvas = {
    elem: document.querySelector ("canvas"),
    init () {
        window.addEventListener ("resize", _ => this.resize (), false);
        this.resize ();
        return this.elem.getContext ("2d");
    },
    resize () {
        const dpr = window.devicePixelRatio ;
        this.width = this.elem.width = this.elem.offsetWidth * dpr;
        this.height = this.elem.height = this.elem.offsetHeight * dpr;
        this.vIsResize = true;
    },
    get isResize () {
        if (this.vIsResize) {
        this.vIsResize = false;
        return true;
        }
        return false;
    }
    }


    const ctx = canvas.init ();
    const flame = document.getElementById ("flameparticle");


    class Particle {
    constructor (x, y, f_width, f_height) {
        this.sx = x;
        this.sy = y;
        this.flame_width = f_width;
        this.flame_height = f_height;
        this.reset ();
        window.addEventListener ("resize", _ => this.resize (), false);
    }
    resize(){
        this.startLifespan = parseInt((window.innerHeight / 768) * 6);
        // alert(this.lifespan);
    }
    reset () {
        this.x = this.sx;
        this.y = this.sy;
        this.vx = 0;
        this.vy = 0;
        this.startLifespan = 6;   // Controls Height
        this.lifespan = this.startLifespan;
        this.decayRate = 0.1
        this.alpha = 1;
        this.angle = rand (0, Math.PI);
    }
    update () {
        this.vx += rand (-0.16, 0.16);
        this.vy -= this.lifespan / 22;
        this.lifespan -= this.decayRate;
        this.x += this.vx;
        this.y += this.vy;
        const life = this.lifespan / this.startLifespan;
        this.alpha = Math.pow (life, 1.5);
        if (this.isDead ()) this.reset ();
    }
    isDead () {
        if (this.lifespan < 0) {
        return true;
        }
        return false
    }
    display () {
        ctx.globalAlpha = this.alpha;
        ctx.save ();
        ctx.translate (this.x, this.y);
        ctx.rotate (this.angle);
        ctx.drawImage (flame, -50, -50, this.flame_width, this.flame_height);
        ctx.restore ();
    }
    }

    const quantity = 90;
    const particles = [];
    let full = false;
    var default_flame_width = 80
    var default_flame_height = 90;
    const animate = _ => {
    requestAnimationFrame (animate);
    ctx.clearRect (0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "lighter";
    if (!full && particles.length < quantity) {
        particles.push (new Particle (canvas.width * 0.5, canvas.height * 0.8, default_flame_width, default_flame_height));
        if (particles.length === quantity) full = true;
    }
    if (canvas.isResize) {
        for (const p of particles) {
        p.sx = canvas.width * 0.5;
        p.sy = canvas.height * 0.8;
        }
    }
    for (const p of particles) {
        p.update ();    
        p.display ();
    }
    }
    window.addEventListener ("resize", _ => outer_resize(), false);
    var outer_resize = _ => {
        default_flame_height = parseInt( 90*(window.innerHeight/768) );
        default_flame_width = parseInt( 90*(window.innerWidth/768) );
    }

    requestAnimationFrame (animate);

    }
    