import {readFile,writeFile} from "node:fs/promises";
import {dirname,resolve} from "node:path";
import {fileURLToPath} from "node:url";

const ids=[
  "wrld_982338bf-95bd-44b3-9835-889b6d5310d0","wrld_d706a367-aac9-4f7a-a0b7-d98cb15f1990","wrld_a0b7a10c-58d0-48cb-b706-cd70f18e6245","wrld_3a5861b6-04fc-4a94-ac12-6e038881779a","wrld_62626af7-42bc-417d-b304-29669956e076","wrld_79f90fef-3a21-456a-91cd-02ba64f8e00b","wrld_8b814e1d-093e-4218-8f56-b76b6f4c257f","wrld_eb587ae2-6b26-48e3-9d28-3afd4ad6f555","wrld_9763c049-00a6-46e4-be9c-22311de62b7e","wrld_5d021b7f-f4ea-4b8c-a367-ea5b64d6db5d","wrld_7bcd3bba-4360-44e8-b7f5-8bef5613d6a0","wrld_46211cba-4b17-4576-aeca-20b83bb3c550","wrld_067a1e12-0854-4926-b923-cbbc36b40b44","wrld_a94f142b-89a0-4c4a-894f-aa5a02d49c48","wrld_cbe3143c-1f66-42fd-a7b3-5bda3e1b8f87","wrld_07100f48-be87-47c9-afa9-6af2c5a1c4f2"
];
const refreshedAt=new Date().toISOString();
const worlds={};
const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");
let previous={};
try{previous=JSON.parse(await readFile(resolve(root,"world-data.json"),"utf8")).worlds||{}}catch{}
for(const id of ids){
  const response=await fetch(`https://api.vrchat.cloud/api/1/worlds/${id}`,{headers:{"User-Agent":"ReeceMartinPortfolio/1.0 contact@reecemartin3d.com"}});
  if(!response.ok)throw new Error(`VRChat returned ${response.status} for ${id}`);
  const w=await response.json(),packages=w.unityPackages||[];
  const old=previous[id]||{},platforms=[...new Set(packages.map(p=>p.platform).filter(Boolean))],unityVersions=[...new Set(packages.map(p=>p.unityVersion).filter(Boolean))];
  worlds[id]={id:w.id,name:w.name,description:w.description,releaseStatus:w.releaseStatus,isLabs:w.publicationDate==="none"||w.tags?.includes("system_labs"),visits:w.visits,favorites:w.favorites,capacity:w.capacity,recommendedCapacity:w.recommendedCapacity,publicationDate:w.publicationDate,labsPublicationDate:w.labsPublicationDate,updatedAt:w.updated_at,version:w.version,tags:(w.tags||[]).filter(t=>t.startsWith("author_tag_")),platforms:platforms.length?platforms:(old.platforms||[]),unityVersions:unityVersions.length?unityVersions:(old.unityVersions||[]),scanPassed:packages.length?packages.some(p=>p.scanStatus==="passed"):Boolean(old.scanPassed),dataUpdatedAt:refreshedAt};
}
await writeFile(resolve(root,"world-data.json"),`${JSON.stringify({updatedAt:refreshedAt,worlds},null,2)}\n`);
console.log(`Updated ${Object.keys(worlds).length} worlds at ${refreshedAt}`);
