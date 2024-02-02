# Randomface

Randomface is JS/TS package for generating vector face-like figures from SHA-256 hash.

<p align="center">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="../../assets/example-faces/randomface-2de32b9.svg">
        <img src="../../assets/example-faces/randomface-2de32b9-dark.svg" width="13%">
    </picture>
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="../../assets/example-faces/randomface-4ebf310.svg">
        <img src="../../assets/example-faces/randomface-4ebf310-dark.svg" width="13%">
    </picture>
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="../../assets/example-faces/randomface-4eabff7.svg">
        <img src="../../assets/example-faces/randomface-4eabff7-dark.svg" width="13%">
    </picture>
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="../../assets/example-faces/randomface-5041747.svg">
        <img src="../../assets/example-faces/randomface-5041747-dark.svg" width="13%">
    </picture>
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="../../assets/example-faces/randomface-9dbf383.svg">
        <img src="../../assets/example-faces/randomface-9dbf383-dark.svg" width="13%">
    </picture>
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="../../assets/example-faces/randomface-f9ceb52.svg">
        <img src="../../assets/example-faces/randomface-f9ceb52-dark.svg" width="13%">
    </picture>
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="../../assets/example-faces/randomface-ba97117.svg">
        <img src="../../assets/example-faces/randomface-ba97117-dark.svg" width="13%">
    </picture>
</p>

## About

Although various random face/avatar generators have existed for a long time, none of them provide genuine randomness in face generation. Many rely on pre-defined images of facial features combined with repetitive patterns, which diminishes the uniqueness and individuality of generated faces.

Randomface takes a different approach by keeping only the positions of facial features fixed while randomizing everything else. This results in a vast range of simple abstract facial expressions, making each face unique and easily distinguishable even in large groups.

And it is lightweight - it doesn't have any external dependencies and outputs a plain SVG. The only requirement is a SHA-256 hash for a face input, which should not be a problem to obtain on any modern platform.

## Basic Usage

Install package from npm:

```
npm install randomface
```

To generate a random face - SHA-256 hash value is required for input. It should not be a problem to obtain it on any modern platform. If you use Randomface to generate users avatars - we suggest to use unique constant user identifier as a hash input (e.g. user id)

```ts
import { RandomfaceSVG } from 'randomface';

// In the browser, you can use the SubtleCrypto API to create a hash for the given value.
// In NodeJS you can use native "crypto" package. Other open source packages are available as well.
let hash = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

const myFace = RandomfaceSVG(hash);

// generated face contains full svg element and svg paths for each face part in case you want to style it and create svg manually

console.log(myFace.svg);
// <svg viewBox='0 0 100 100' {...} </svg>

console.log(myFace.paths.leftEye);
// M 1 11 C 1.8 7.2 {...} Z

console.log(myFace.paths.rightEye);
// M 97 2 C 98.6 2.4 {...} Z

console.log(myFace.paths.nose);
// M 55 40 C 56.2 36.8 {...} Z

console.log(myFace.paths.mouth);
// M 19 80 C 18.8 76 29 {...} Z
```
