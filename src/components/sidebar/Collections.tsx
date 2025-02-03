'use client'

import { EllipsisVertical, FolderCode } from "lucide-react";
import { Collection, BaseUrl, Endpoint } from "@/model";
import CollectionDropdown, { EndpointDropdown } from "../icons/IconDropdown";
import { UrlParams } from "./left-sidebar";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { deleteCollection } from "@/server/collections";
import { addEndpoint } from "@/server/endpoints";



type CollectionsProps = {
    collections: Collection[];
    activeCollection: Collection;
    updateParams: (params: UrlParams) => void;
    setActiveEndpoint: (endpoint: Endpoint) => void;
    deleteEndpoint: (id: number) => void;
    setLoading: (loading: boolean) => void;
    updateCollections: () => void;
    baseUrls: BaseUrl[];
}

const Collections = (props:CollectionsProps) => {
    const searchParams = useSearchParams();

    return (
        <div className="flex flex-col gap-1 mt-1 overflow-auto" style={{ maxHeight: '75vh' }}>

              {props.collections?.map((collection) => (
                <div
                  key={collection?.id}
                  className={`flex flex-col p-4 my-1 mr-2 rounded-lg ${props.activeCollection?.id === collection?.id ? " bg-gray-700" : " bg-gray-700"
                    }`}
                >
                  <div className="flex flex-row justify-between p-2 w-full">
                    <div className="flex">

                      <FolderCode className="scale-150 inline-block mr-4" size={16} />
                      <div className="flex flex-col">
                        <div className="-mt-1 hover:cursor-pointer"
                          onClick={() => {
                            const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
                            current.set('collectionId', collection?.id.toString())
                          }}
                        >{collection.name}
                        </div>
                      </div>



                    </div>
                    <div className="-m-2">

                      <CollectionDropdown deleteCollection={() => {

                        deleteCollection(collection?.id ?? -1).then(res => {
                          if (res) {
                            props.updateCollections();
                          }
                        })

                      }}
                        addEndpoint={() => {
                          addEndpoint(collection?.id ?? -1).then((res: Endpoint) => {
                            if (res) {
                              collection.endpoints?.push({
                                id: -1,
                                name: res.name,
                                baseUrl: props.baseUrls.find(x => x.id === res.baseUrlId),
                                baseUrlId: res.baseUrlId,
                                collectionId: collection?.id ?? -1,
                                url: res.url,
                                method: res.method,
                                headers: res.headers,
                                body: res.body,
                                documentation: res.documentation,
                              } as Endpoint)
                              props.updateParams({ endpointId: (collection?.endpoints?.[0]?.id ?? -1).toString(), collectionId: collection?.id.toString() })
                            }
                          })

                        }}
                      />
                    </div>



                  </div>
                  <div className="flex flex-col p-2">
                    {collection.endpoints?.map(end =>
                      <EndpointEntry key={end.id} endpoint={end} setActiveEndpoint={props.setActiveEndpoint} setLoading={props.setLoading} deleteEndpoint={props.deleteEndpoint} />
                    )}
                  </div>
                </div>

              ))}
            </div>
    )
}

export default Collections;