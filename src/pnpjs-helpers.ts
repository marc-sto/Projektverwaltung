import { WebPartContext } from '@microsoft/sp-webpart-base';
import { spfi, SPFI, SPFx } from '@pnp/sp';
import { LogLevel, PnPLogging } from '@pnp/logging';
import '@pnp/sp/fields';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import '@pnp/sp/batching';
import '@pnp/sp/folders';
import '@pnp/sp/files';

let sp: SPFI = null;
let otherSp: SPFI = null;

const getSP = (ctx?: WebPartContext): SPFI => {
  
  if (sp === null && ctx !== null) {
    console.log("Loading SP Context", ctx)
    sp = spfi().using(SPFx(ctx)).using(PnPLogging(LogLevel.Warning));
    console.log("SP  loaded", sp)
  }
  return sp;
};

export { getSP };
