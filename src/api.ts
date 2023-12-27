import { CharacterTracker } from "character-tracker";
import { Datastore } from "datastore";
import { RollWrapper } from "model/rolls";
import { App } from "obsidian";
import { formatOracleBlock } from "oracles/command";

export class ForgedAPI {
  constructor(
    public readonly datastore: Datastore,
    public readonly tracker: CharacterTracker,
  ) {}

  public roll(oracle: string): RollWrapper {
    return this.datastore.roller.roll(oracle);
  }

  public formatOracleBlock(params: {
    question?: string;
    roll: RollWrapper;
  }): string {
    return formatOracleBlock(params);
  }
}

export const getAPI = (app?: App): ForgedAPI | undefined => {
  if (app) return app.plugins.plugins.forged?.api;
  else return window.ForgedAPI;
};

export const isPluginEnabled = (app: App) =>
  app.plugins.enabledPlugins.has("forged");
