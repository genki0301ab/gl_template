<script class="vertex-shader" type="shader">
void main() {
    gl_Position = vec4(position, 1.0);
}
</script>
<script class="fragment-shader" type="shader">
uniform float audio;
uniform float time;
uniform int scroll;
uniform vec2 resolution;
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
    vec4 distColor;
    float color = floor(1.0 - sin((abs(position.x) + abs(position.y)) * abs(sin(time) * 20.0)));
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
    gl_FragColor = distColor;
}
</script>