# Kit

**Kit** is a lightweight, extensible 2D framework for game development in the [Vylocity Game Engine](https://www.vylocity.com/). Designed to be simple and modular, Kit lets you build powerful projects through a plugin-driven architecture.

# Install
```bash
npm i @evitcastudio/kit -g
```

*global flag is so the path is set properly for the CLI tool*

# Resources

This script will locate all Vylocity engine-related files within the specified directory and anonymize them before placing them in the designated resources folder.

```bash
# From the CLI you will build all your resources to the out dir
kit build -i ./<in-dir> -o ./<out-dir>
```

During the execution of this command, a `resource.json` file will be automatically generated within your source directory.
It is recommended to exclude this file from your version control system, as it is considered a build artifact.


> [!IMPORTANT]
This API should be ran BEFORE `VYLO.load()` is called.

> [!WARNING]
Depending on your environment the following [import syntax](https://github.com/EvitcaStudio/Kit/wiki/FAQ#importing-json-resources) for json may not work.


```js
import resourceJSON from 'resource.json';
await Kit.setResources(resourceJSON);
```

# Using Kit with plugins

```ts
import { Plugin } from 'custom-plugin';

// or you can just register one plugin
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