# Kit

**Kit** is a lightweight, extensible 2D framework for game development in TypeScript. Designed to be simple and modular, Kit lets you build powerful projects through a plugin-driven architecture.

**Lightweight and modular**: Core functionality is minimal; plugins add power.  
**Plugin support**: Easily extend Kit with official or third-party plugins.  
**Event system**: Decouple functionality with a robust event-driven API.  
**TypeScript-first**: Full TypeScript support for strong typing and modern workflows.  

# Install
```bash
npm i @evitcastudio/kit -g
```

*global flag is so the path is set properly for the CLI tool*

# Using Kit with plugins

```ts
import { Plugin } from 'custom-plugin';

// Initialize an array of plugins.
Kit.init([Plugin]);

// or you can just register one plugin
Kit.registerPlugin(Plugin);
```

# Listening for plugin events

```js
const listener = (pEvent) => {
    const { data, timestamp } = pEvent;
    // Here you can use the data that the event sent down.
}

// Here you listen for an event from the plugin: `Plugin`, under the event name of `eventName`
Kit.on('Plugin', 'eventName', listener);

// You can also stop listening for an event
Kit.off('Plugin', 'eventName', listener);
```