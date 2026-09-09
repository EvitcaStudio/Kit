# Kit

**Kit** is a lightweight, extensible 2D framework for game development in the [Vylocity Game Engine](https://www.vylocity.com/). Designed to be simple and modular, Kit empowers developers to build complex projects quickly through a robust plugin-driven architecture.

## Installation

```bash
bun install -g @evitcastudio/kit
```
> **Note:** The `-g` flag ensures the `kit` CLI tool is globally available in your PATH.

## CLI Reference & Usage

Kit includes a CLI tool (`kit`) for scaffolding projects, building game assets, generating plugin boilerplate, and diagnosing your environment.

### Global Options
- `-v, --verbose`: Enables verbose output and detailed debugging logs.
- `-h, --help`: Displays help and usage information for any command.
- `-V, --version`: Displays the installed Kit CLI version.

---

### `kit init [name]`
Initializes a new game project for the Vylocity Game Engine. If run without arguments or flags, an interactive prompt will guide you through project setup.

```bash
# Interactive setup
kit init

# Quick start with flags
kit init my-game --single --install
```

#### Flags & Options:
| Flag / Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `[name]` | `string` | `kit-project` | The name of the project folder to create. |
| `-s, --single` | `boolean` | `false` | Quick-starts a single-player game template. |
| `-m, --multi` | `boolean` | `false` | Quick-starts a multiplayer game template (pass both `-s` and `-m` for both). |
| `-f, --force` | `boolean` | `false` | Overwrites the destination folder if it already exists without aborting. |
| `-i, --install` | `boolean` | `false` | Automatically runs `bun install` inside the new project directory after creation. |

---

### `kit build`
Builds resources and compiles game application code. Automatically detects whether your project is **Singleplayer** or **Multiplayer**, compiles TypeScript entrypoints to `dist/`, copies static web files (`.html`, `.css`, `.ico`, vendor directories), hashes raw assets into unique identifiers (`.vyr`), mirrors custom subdirectories, and exports metadata manifests (`resource.json`, `bounds.json`, `icon-points.json`, and `sizes.json`).

```bash
# Zero-config build (auto-detects project architecture, builds ./src to ./dist)
kit build

# Production ready build (minified, obfuscated identifiers, stripped sourcemaps)
kit build -p

# Watch mode: auto-rebuilds on source or resource changes
kit build --watch

# Build only raw resources with custom directories
kit build -i ./src/resources -o ./dist --no-app

# Save the resource manifest to a custom location
kit build --manifest ./dist/resource.json
```

#### Flags & Options:
| Flag / Option | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `-i, --in <path>` | `string` | No | `./src/resources` | Input directory containing raw game assets (`.vyi`, `.vym`, `.vyint`, audio, etc.). |
| `-o, --out <path>` | `string` | No | `./dist` | Destination directory where processed `resources/` and bundled app files will be written. |
| `-m, --manifest <path>` | `string` | No | `./resource.json` | Path where the resource lookup JSON should be saved. If omitted, defaults to `./resource.json` in the current working directory. |
| `-w, --watch` | `boolean` | No | `false` | Watches the source and resource directories for changes and triggers automatic incremental rebuilds. |
| `-is, --ignore-sound` | `boolean` | No | `false` | Skips processing and copying sound and music files (`.mp3`, `.ogg`, `.wav`, etc.). |
| `-p, --prod` | `boolean` | No | `false` | Production mode: enables full minification, identifier obfuscation/mangling, and strips sourcemaps. |
| `--minify` | `boolean` | No | `false` | Minifies bundled JavaScript syntax, whitespace, and variable names. |
| `--obfuscate` | `boolean` | No | `false` | Mangles and obfuscates identifiers across bundled output. |
| `--sourcemap <mode>` | `string` | No | `linked` (`none` in prod) | Sourcemap mode (`none`, `linked`, `inline`, `external`). |
| `--app` / `--no-app` | `boolean` | No | `true` (auto) | Toggles application code bundling. Enabled automatically if `src/index.ts` or `src/client/index.ts` exists. |

#### What is the Resource Manifest (`resource.json`)?
A manifest is an index or lookup table. `kit build` obfuscates asset names into unique identifiers (`uuid.vyr`) as a security benefit to protect and hide original asset filenames in production. It generates `resource.json` mapping your original human-readable asset names to their engine identifiers:
```json
{
    "icon": [
        {
            "fileName": "player.vyi",
            "resourceIdentifier": "3cf72322-6b92-4ea5-bbca-b96fae1fe440.vyr"
        }
    ],
    "map": [ ... ],
    "sound": [ ... ]
}
```

#### Custom Asset Subdirectories (Automatic Pass-Through)
Any subdirectories inside your resource folder (e.g. `src/resources/images`, `src/resources/fonts`, `src/resources/emitters`, `src/resources/particles`, etc.) are automatically mirrored to `<out>/resources/<folder>/`. Non-engine files remain in their original form.

---

### `kit create <type> <name>`
Scaffolds boilerplate files inside an existing Kit project following standard architectural conventions.

```bash
# Generate a typed plugin
kit create plugin Inventory
```

#### Types:
- `plugin`: Creates a new TypeScript file at `src/plugins/<name>.ts` that subclasses `KitPlugin` with typed lifecycle hooks (`onRegistered()`) ready to extend.

---

### `kit host`
Hosts the game project locally for development and testing.

```bash
# Host the dist folder on port 8090
kit host

# Build before hosting and specify custom port
kit host -b -p 8080
```

#### Options:
- `-p, --port <number>`: Port to bind the server to (default: `8090`).
- `-d, --dir <path>`: Directory containing built files to serve (default: `./dist`).
- `-b, --build`: Trigger a `kit build` before starting the server.

#### Behavior:
- **Singleplayer / Client Projects:** Spawns a lightweight local HTTP server powered by Bun that serves `dist/index.html` and static assets with local and network LAN URLs.
- **Multiplayer Projects:** Automatically launches the backend node server (`dist/server.js`) with configured settings (`dist/settings.json`).

---

### `kit doctor`
Inspects your local environment and current project health.

```bash
kit doctor
```

#### What it checks:
- **Bun Runtime:** Verifies that Bun is installed and detects the version.
- **Git Installation:** Verifies that Git is accessible in your `PATH`.
- **Project Structure:** If executed within a game project, checks `package.json`, `@evitcastudio/kit` framework dependencies, and asset folders (`src/resources`).
- **Project Architecture:** Detects whether the project is **Singleplayer** (`src/index.ts`), **Multiplayer** (`src/client` & `src/server`), or **Dedicated Server**.
- **Build Pipeline:** Verifies that a valid build pipeline is configured (either native `kit build` in `package.json` or legacy `bun-build.ts`).

---

## Runtime Resource Loading

> **Note:** This process is preconfigured for you if you used `kit init`.

`Kit.setResources()` should be called **before** `VYLO.load()`.

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