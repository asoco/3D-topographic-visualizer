export const fShader = {
    defines: " ",
    header: `
        varying vec2 vUv;
        uniform bool enableGradient;
        uniform vec3 color;
        uniform vec3[17] colors;
        uniform float[17] bounds;
        uniform int len;
        float remap( float minval, float maxval, float curval )
        {
            return ( curval - minval ) / ( maxval - minval );
        } 
        `,
    main: `
        vec4 newColor;
        if (enableGradient == true) {
            //vec3 tmp = vec3(mix(color1, color2, vUv.y));
            float u = vUv.y;
            u = clamp(u, 0.0, 1.0);
            for (int i = 0; i < len - 1; i++) {
                if (u > bounds[i] && u < bounds[i+1])
                    newColor = vec4(mix(colors[i], colors[i+1], remap(bounds[i], bounds[i+1], u)), 1.0);
            }
        }
        else
            newColor = vec4(color, 1.0);   
    `,
}
