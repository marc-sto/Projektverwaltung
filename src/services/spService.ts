import { getSP } from '../pnpjs-helpers';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export default class spService{

}

export const loadProjectItems =async()=>{
    const sp = getSP();
    const items: any[] = await sp.web.lists.getByTitle("Projekte").items();
    console.log(items);
    return items;
}

export const loadCustomerItems =async()=>{
    const sp = getSP();
    const items: any[] = await sp.web.lists.getByTitle("Kunden").items();
    console.log(items);
    return items;
}
