import * as mongooseHelper from '@boilerz/mongoose-helper';
import type { Resolver, SuperServerPlugin } from '@boilerz/super-server';

const plugin: SuperServerPlugin = {
  async configure(): Promise<void> {
    // Noop
  },

  getResolvers(): Resolver[] {
    return [];
  },

  async setup(): Promise<void> {
    await mongooseHelper.connect(undefined, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },

  async tearDown(): Promise<void> {
    await mongooseHelper.disconnect();
  },
};

export default plugin;
