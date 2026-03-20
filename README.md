# Kit

**Kit** is a lightweight, extensible 2D framework for game development in the [Vylocity Game Engine](https://www.vylocity.com/). Designed to be simple and modular, Kit empowers developers to build complex projects quickly through a robust plugin-driven architecture.

## Installation

```bash
bun install -g @evitcastudio/kit
```
> **Note:** The `-g` flag ensures the `kit` CLI tool is globally available in your PATH.

## Scaffolding a New Project

The `kit init` command provides an interactive walkthrough to quickly scaffold a new project for the Vylocity Game Engine.

```bash
# Start the interactive walkthrough
kit init

# Or scaffold a project with flags
kit init <project-name> --single # For single-player
kit init <project-name> --multi  # For multiplayer
```

The command will create a structured directory for your project, including pre-configured `package.json`, essential Vylocity files, and a local development environment.

After scaffolding, follow these steps to get started:
1. `cd <project-name>`
2. `bun install`
3. `bun run build`

## Building the Project

> **Note:** This process is preconfigured for you if you used `kit init`

The `kit build` command locates all Vylocity engine-related resources in your source directory, anonymizes them, and moves them to a deploy-ready output directory.

```bash
kit build -i ./<in-dir> -o ./<out-dir>
```

```bash
# To learn more about this command
kit build --help
```

Executing this command automatically generates a `resource.json` map in your project's directory. 
**Best Practice:** Exclude `resource.json` from version control (`.gitignore`), as it is a build artifact.

## Runtime Resource Loading

> **Note:** This process is preconfigured for you if you used `kit init`

> `Kit.setResources()` should be called **before** `VYLO.load()`.

```typescript
import resourceJSON from 'resource.json';

// Initialize the engine with mapped resources
await Kit.setResources(resourceJSON);
```

## Local Development & Testing

Once your project is scaffolded and dependencies are installed and the project has been built, you can run your game locally.

### Running the Game

```bash
# For Single-Player or Multiplayer games
bun run host
```

### Accessing the Game

The server will be available at the following locations after being hosted:

> **Singleplayer**  
[http://localhost:8090](http://localhost:8090) defined in `./bun-serve.ts`

> **Multiplayer or Singleplayer & Multiplayer**  
[http://localhost:30000](http://localhost:30000) defined in `./src/server/settings.json`


## Plugin Architecture

```ts
import { Plugin } from 'custom-plugin';

// Register a single plugin
const plugin = Kit.registerPlugin(Plugin);
```

```ts
// Register multiple plugins
import { Plugin1 } from 'custom-plugin1';
import { Plugin2 } from 'custom-plugin2';

const plugins = Kit.registerPlugins([Plugin1, Plugin2]);

// After being registered, kit can find the plugin by name.
const plugin1 = Kit.getPlugin('plugin1-name');
const plugin2 = Kit.getPlugin('plugin2-name');
```

### Listening for plugin events

Plugins emit events, this is how they pass relevant data to other plugins or the main thread.
By listening to these events you can act on this data.

```js
const listener = (pEvent: EmitterEvent) => {
    const { data, timestamp } = pEvent;
    // Here you can use the data that the event sent down.
}

// Choose to listen to specific event from a plugin
Kit.on('plugin-name', 'event-name', listener);

// You can also stop listening for an event
Kit.off('plugin-name', 'event-name', listener);
```

For more information check out the [wiki](https://github.com/EvitcaStudio/Kit/wiki)