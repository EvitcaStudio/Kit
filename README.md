# Kit

**Kit** is a lightweight, extensible 2D framework for game development in the [Vylocity Game Engine](https://www.vylocity.com/). Designed to be simple and modular, Kit empowers developers to build complex projects quickly through a robust plugin-driven architecture.

## Installation

```bash
npm install -g @evitcastudio/kit
```
> **Note:** The `-g` flag ensures the `kit` CLI tool is globally available in your PATH.

## CLI Core Commands

The `kit build` command locates all Vylocity engine-related resources in your source directory, anonymizes them, and moves them to a deploy-ready output directory.

```bash
kit build -i ./<in-dir> -o ./<out-dir>
```

Executing this command automatically generates a `resource.json` map in your input directory. 
**Best Practice:** Exclude `resource.json` from version control (`.gitignore`), as it is an ephemeral build artifact.

## Runtime Resource Loading

> [!IMPORTANT]
> `Kit.setResources()` should be called **before** `VYLO.load()`.

> [!WARNING]
> Depending on your build environment (e.g., webpack, vite, or bun), you may need specific loaders or assertions to import JSON natively.

```typescript
import resourceJSON from './resource.json';

// Initialize the engine with mapped resources
await Kit.setResources(resourceJSON);
```

## Plugin Architecture

```ts
import { Plugin } from 'custom-plugin';

const plugin = Kit.registerPlugin(Plugin);
```

# Listening for plugin events

```js
const listener = (pEvent: EmitterEvent) => {
    const { data, timestamp } = pEvent;
    // Here you can use the data that the event sent down.
}

// Here you listen for an event from the plugin: `Plugin`, under the event name of `eventName`
Kit.on('Plugin', 'eventName', listener);

// You can also stop listening for an event
Kit.off('Plugin', 'eventName', listener);
```

For more information check out the [wiki](https://github.com/EvitcaStudio/Kit/wiki)