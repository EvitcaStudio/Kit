---
title: Plugins
category: Documents

children:
    - ./network/NETWORK.md
---

# Plugins

Plugins are the heart of Kit.
This is the structure of importing a plugin for use within the framework.
```typescript
import { Kit } from '@evitcastudio/kit';
import { Plugin } from 'custom-plugin';

// If you have more than one plugin, you can register them all at once by passing an array of plugins
const plugin = Kit.registerPlugin(Plugin);

// You can now use the plugin(s)
```