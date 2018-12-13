<script class="vertex-shader" type="shader">
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

uniform float time;

void main() {
    vUv = uv;
    vNormal = normal;

    //moveVertex
    vec3 newPosition = position;
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

void main() {
    vec2 position = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
    vec2 mousePosition = (mouse * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
    mousePosition.x = mousePosition.x * -1.0;
    vec2 newPosition = position + mousePosition;

    //background
    vec4 distColor = vec4(0.0);

    //box-sizing settings
    vec2 normalPosition = gl_FragCoord.xy / resolution.xy;
    vec2 ratio = vec2(min((resolution.x / resolution.y) / (imageResolution.x / imageResolution.y), 1.0), min((resolution.y / resolution.x) / (imageResolution.y / imageResolution.x), 1.0));
    vec2 uv = vec2(normalPosition.x * ratio.x + (1.0 - ratio.x) * 0.5, normalPosition.y * ratio.y + (1.0 - ratio.y) * 0.5);

    //texture
    float frequency = 25.0;
    float amplitude = 0.005;
    //float distortion = sin(position.y * frequency) * amplitude;
    float distortion = 0.1 / length(newPosition * 2.0);
    vec4 textureColor = texture2D(texture, vec2(uv.x + distortion, uv.y));

    //outColor
    gl_FragColor = vec4(textureColor.r, textureColor.g, textureColor.b, 1.0) * (1.0 - (length(position) - 0.75)) + distColor;
}
</script>