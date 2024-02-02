# Randomface

Randomface is React component for generating vector face-like figures from SHA-256 hash.

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
npm install randomface-react
```

To generate a random face - SHA-256 hash value is required for input. It should not be a problem to obtain it on any modern platform. If you use Randomface to generate users avatars - we suggest to use unique constant user identifier as a hash input (e.g. user id)

```tsx
import { RandomfaceSVG } from 'randomface-react';

// In the browser, you can use the SubtleCrypto API to create a hash for the given value.
// In NodeJS you can use native "crypto" package. Other open source solutions are available as well.
let hash = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

function MyFace() {
  return (
    <RandomfaceSVG
      sha256hash={hash}
      width={100}
      height={100}
      style={{
        fill: '#ffffff',
      }}
    ></RandomfaceSVG>
  );
}
```
