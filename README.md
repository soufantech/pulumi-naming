<div align="center">
  <img src="https://avatars2.githubusercontent.com/u/61063724?s=200&v=4" width="100px">
</div>

<br />

<div align="center">
  <h1>@soufantech/pulumi-naming</h1>
  <p>Library to simplify and efforces resource naming in Pulumi</p>
</div>

<br />

<div align="center">

[![typescript-image]][typescript-url] [![jest-image]][jest-url] [![npm-image]][npm-url]

</div>

## How to install

Execute command below:

```shell
yarn add @soufantech/pulumi-naming
```

Recommended usage is (see more details in [next section](https://github.com/soufantech/pulumi-naming#from-config-namingfromconfig)):

```typescript
import * as aws from '@pulumi/aws';
import n from '@soufantech/pulumi-naming';

// Resulting name is: main-dev
const bucket = new aws.s3.Bucket(n());
```

## How to use

### Basic: naming

This is the basic component.

```typescript
// index.ts
import * as aws from '@pulumi/aws';
import { naming } from '@soufantech/pulumi-naming';

const bucketResourceName = naming(
    {
        radical: 'main',
        suffix: 'dev',
    },
    'icon-bucket'
);

const bucket = new aws.s3.Bucket(bucketName); // main-icon-bucket-dev
```

### Factory: createNaming

```typescript
// index.ts
import * as aws from '@pulumi/aws';
import { createNaming } from '@soufantech/pulumi-naming';

const naming = createNaming({
    radical: 'main',
    suffix: 'dev',
});

const bucket = new aws.s3.Bucket(naming('icon-bucket')); // main-icon-bucket-dev
```

### From config: namingFromConfig

```typescript
// index.ts
import * as aws from '@pulumi/aws';
import { namingFromConfig as naming } from '@soufantech/pulumi-naming';

const bucket = new aws.s3.Bucket(naming('icon-bucket')); // main-icon-bucket-dev
```

```yaml
# Pulumi.dev.yaml
config:
  aws:region: us-east-1
  naming:radical: main
  naming:suffix: dev
```

_*Default export is an alternative to this method_

```typescript
import * as aws from '@pulumi/aws';
import n from '@soufantech/pulumi-naming';

// Resulting name is: main-dev
const bucket = new aws.s3.Bucket(n());
```

## Naming structure

`<radical>-<resource-name>-<suffix>`

- `radical`: project name is a common usage
- `resource-name`: required if more than one resource of the same type is created
- `suffix`: environment name is a common usage

## Options

- `radical`: define radical part of name (default: `pulumi.getProject()`)
- `suffix`: define suffix part of name (default: `undefined`)
- `defaultSuffix`: use `pulumi.getStack()` in suffix part of name (default: `false`)

---

<div align="center">
  <sub>Built with ❤︎ by <a href="https://soufan.com.br">SouFan</a></sub>
</div>

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]: "typescript"

[npm-image]: https://img.shields.io/npm/v/@soufantech/node-ts-lib-boilerplate.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/@soufantech/pulumi-naming "npm"

[jest-image]: https://img.shields.io/badge/tested_with-jest-99424f.svg?style=for-the-badge&logo=jest
[jest-url]: https://github.com/facebook/jest "jest"
