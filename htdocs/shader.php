<script class="vertex-shader" type="shader">
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

uniform float time;

void main() {
    vUv = uv;
    vNormal = normal;

    float angle = 2.0;
    vec3 newPosition = position;
    newPosition.z += abs(sin(time - position.x) * angle);
    vPosition = newPosition;
    gl_Position += projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
</script>
<script class="fragment-shader" type="shader">
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

uniform float audio;
uniform float time;
uniform int scroll;
uniform vec2 resolution;
uniform vec2 imageResolution;
uniform vec2 mouse;
uniform sampler2D texture;

const float pi = 3.141592;

bool circle(vec2 position, float radius) {
    if(length(position) <= radius) {
        return true;
    } else {
        return false;
    }
}

bool rect(vec2 position, float width, float height) {
    if(abs(position.x) <= width && abs(position.y) <= height) {
        return true;
    } else {
        return false;
    }
}

void main() {
    vec2 position = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);

    //box-sizing settings
    vec2 normalPosition = gl_FragCoord.xy / resolution.xy;
    vec2 ratio = vec2(min((resolution.x / resolution.y) / (imageResolution.x / imageResolution.y), 1.0), min((resolution.y / resolution.x) / (imageResolution.y / imageResolution.x), 1.0));
    vec2 uv = vec2(normalPosition.x * ratio.x + (1.0 - ratio.x) * 0.5, normalPosition.y * ratio.y + (1.0 - ratio.y) * 0.5);

    //background
    vec4 distColor;
    float color = floor(1.0 - sin((abs(position.x) + abs(position.y)) * audio * 20.0));
    if(color == 0.0) {
        vec4 mainColor = vec4(1.0, 0.0, 0.5, 0.75);
        distColor = (mainColor + (1.0 - abs(position.x)) / 8.0) - 0.75;
    }

    //rect
    float rectW = 0.1;
    float rectH = 0.05;
    vec2 rectP = position * -1.0;
    rectP.x += cos(time);
    rectP.y += rectP.y;
    if(rect(rectP, rectW, rectH)) {
        vec4 inColor = vec4(0.0, 1.0 , 0.5, 1.0);
        distColor = inColor;
    }

    //circle
    float radius = 0.025;
    vec2 circleP = position * -1.0;
    circleP.x += cos(time);
    circleP.y += abs(sin(time)) + radius / 2.0 + rectH / 2.0;
    if(circle(circleP, radius)) {
        vec4 inColor = vec4(1.0);
        distColor = inColor;
    }

    //outColor
    gl_FragColor = (distColor + texture2D(texture, uv)) * vPosition.z;
}
</script>