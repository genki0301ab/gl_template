"use strict";
(function(global) {
var object = {}
object.extend = function(self, Object) {
    for(var key in Object) {
        self[key] = Object[key];
    }
};

/*
====================
■ Satge
====================
*/
function Stage(Object) {
    //extend
    object.extend(this, Object);
    //property
    this.width = this.gl.window.width;
    this.height = this.gl.window.height;
    this.camera,
    this.scene,
    this.renderer,
    this.geometry
    this.material
    this.mesh;
    //method
    this.init();
    this.event();
}
Stage.prototype.init = function() { //init
    this.createCamera();
    this.createScene_rednerer();
    this.createObject();
    this.update();
};
Stage.prototype.createCamera = function() { //createCamera
    this.camera = new THREE.Camera();
    this.camera.position.z = 1;
};
Stage.prototype.createScene_rednerer = function() { //createScene_rednerer
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.gl.element.$target.append(this.renderer.domElement);
};
Stage.prototype.createObject = function() { //createObject
    this.geometry = new THREE.PlaneBufferGeometry(2, 2, 200, 200);
    this.material = new THREE.ShaderMaterial({
        uniforms: this.gl.uniform.uniforms,
        vertexShader: this.gl.element.$vs[0].innerHTML,
        fragmentShader: this.gl.element.$fs[0].innerHTML,
        //wireframe: true
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
};
Stage.prototype.rendering = function() { //rendering
    this.renderer.render(this.scene, this.camera);
};
Stage.prototype.update = function() { //update
    var self = this;
    function rendering() {
        self.renderingAnimation = window.requestAnimationFrame(rendering);
        self.gl.audio.getData();
        self.sendShader();
        self.rendering();
    }
    rendering();
};
Stage.prototype.event = function() { //event
    var self = this;
    this.gl.element.$window.resize(function() {
        self.resize();
    });
};
Stage.prototype.resize = function() { //resize
    this.width = this.gl.window.width;
    this.height = this.gl.window.height;
    this.camera.aspect = this.width / this.height;
    this.renderer.setSize(this.width , this.height);
};
Stage.prototype.sendShader = function() { //sendShader
    var normalizeAudio = this.gl.audio.normalize(this.gl.audio.frequencyData);
    this.gl.uniform.uniforms.audio.value = normalizeAudio(this.gl.audio.frequencyData[0]);
    this.gl.uniform.uniforms.time.value += 0.025;
    this.gl.uniform.uniforms.resolution.value.x = this.renderer.domElement.width;
    this.gl.uniform.uniforms.resolution.value.y = this.renderer.domElement.height;
    this.gl.uniform.uniforms.mouse.value.x = this.gl.window.mouse.x;
    this.gl.uniform.uniforms.mouse.value.y = this.gl.window.mouse.y;
};

/*
====================
■ Uniform
====================
*/
function Uniform(Object) {
    //extend
    object.extend(this, Object);
    //property
    this.uniforms = {
        audio: {
            type: "f",
            value: this.gl.audio.frequencyData[0]
        },
        time: {
            type: "f" ,
            value: 0.0
        } ,
        scroll:  {
            type: "i" ,
            value: this.gl.window.scroll
        } ,
        resolution: {
            type: "v2",
            value: new THREE.Vector2()
        },
        imageResolution: {
            type: "v2",
            value: new THREE.Vector2(1920, 1080)
        },
        mouse:  {
            type: "v2" ,
            value: new THREE.Vector2(this.gl.window.mouse.x, this.gl.window.mouse.y)
        },
        texture: {
            type: "t",
            value: new THREE.TextureLoader().load("shared/img/texture.jpg")
        }
    };
}

/*
====================
■ Window
====================
*/
function Audio(Object) {
    //extend
    object.extend(this, Object);
    //property
    this.current = 0;
    this.file = ["shared/audio/music.mp3"];
    this.fftSize = 2048;
    this.flotFrequencyData = new Float32Array(this.fftSize);
    this.floatTimeDomainData = new Float32Array(this.fftSize);
    this.frequencyData = new Uint8Array(this.fftSize);
    this.timeDomainData = new Uint8Array(this.fftSize);
    this.musicDuration,
    this.musicCurrentTime,
    this.audioContext,
    this.audioSrc,
    this.gain,
    this.analyser,
    this.oscillator;
    this.range = {
        min: 0.0,
        max: 1.0
    };
    //method
    this.init();
}
Audio.prototype.init = function() {
    this.setting();
    //this.play();
}
Audio.prototype.setting = function() { //setting
    this.gl.element.$audio.attr("src", this.file[this.current]);
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext || new webkitAudioContext || new mozAudioContext;
    this.audioSrc = this.audioContext.createMediaElementSource(this.gl.element.$audio.get(0));
    this.analyser = this.audioContext.createAnalyser();
    this.audioSrc.connect(this.analyser);
    this.audioSrc.connect(this.audioContext.destination);
}
Audio.prototype.getData = function() { //getData
    this.analyser.getByteFrequencyData(this.frequencyData);
};
Audio.prototype.play = function() { //play
    this.gl.element.$audio[0].play();
}
Audio.prototype.pause = function() { //pause
    this.gl.element.$audio[0].pause();
};
Audio.prototype.normalize = function(domain) { //normalize
    var result = d3.scaleLinear().domain([d3.min(domain), d3.max(domain)]).range([this.range.min, this.range.max, this.range.max]);
    return result;
}

/*
====================
■ Window
====================
*/
function Window(Object) {
    //extend
    object.extend(this, Object);
    //property
    this.scroll = this.gl.element.$window.scrollTop();
    this.width = this.gl.element.$window.width();
    this.height = this.gl.element.$window.height();
    this.mouse = {
        x: null,
        y: null
    };
    //initialize
    this.event();
}
Window.prototype.event = function() { //event
    var self = this;
    this.gl.element.$window.resize(function() {
        self.gl.element.update();
        self.sizeUpdate();
    });
    this.gl.element.$window.scroll(function() {
        self.gl.element.update();
        self.windowScroll();
    });
    this.gl.element.$window.on("mousemove", function(event) {
        self.mouseMove(event.pageX, event.pageY);
    });
};
Window.prototype.sizeUpdate = function() { //sizeUpdate
    this.width = this.gl.element.$window.width();
    this.height = this.gl.element.$window.height();
    this.gl.uniform.uniforms.resolution.value.x = this.width;
    this.gl.uniform.uniforms.resolution.value.y = this.height;
};
Window.prototype.windowScroll = function() { //windowScroll
    this.scroll = this.gl.element.$window.scrollTop();
    this.gl.uniform.uniforms.scroll.value = this.scroll;
};
Window.prototype.mouseMove = function(mouseX, mouseY) { //mouseMove
    this.mouse.x = mouseX;
    this.mouse.y = mouseY;
};

/*
====================
■ Element
====================
*/
function Element(Object) {
    //extend
    object.extend(this, Object);
    //initialize
    this.init();
}
Element.prototype.init = function() { //init
    this.get();
};
Element.prototype.get = function(Object = null) { //get
    //property
    this.$target = $(this.gl.target);
    this.$window = $(window);
    this.$html_$body = $("html, body");
    this.$body = $("body");
    this.$fs = $(".fragment-shader");
    this.$vs = $(".vertex-shader");
    this.$audio = $(".audio");
    //extend
    if(Object != null) {
        object.extend(this, Object);
    }
    return this;
};
Element.prototype.update = function() { //update
    this.init();
};

/*
====================
■ gl_template
====================
*/
function gl_template(element) {
    var self = {};
    self.target = element;
    self.init = function() {
        self.element = new Element({gl: self});
        self.window = new Window({gl: self});
        self.audio = new Audio({gl: self});
        self.uniform = new Uniform({gl: self});
        self.stage = new Stage({gl: self});
    };
    self.init();
    return self;
}
$(function() {
    gl_template(".canvas-wrapper");
});
})(this);