'use client'
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { addBaseUrl } from "@/server/baseUrls";
import { useState } from "react";
import { randomInt } from "crypto";
import { Endpoint, BaseUrl, fallbackBaseUrl } from "@/types";

type ManageBaseUrlsDialogProps = {
    setIsDialogOpen: (open: boolean) => void;
    isDialogOpen: boolean;
    activeEndpoint: Endpoint;
    addBaseUrl: (baseUrl: BaseUrl) => void;
    baseUrls: BaseUrl[];
}

const ManageBaseUrlsDialog = (props: ManageBaseUrlsDialogProps) => {
    const [newUrl, setNewUrl] = useState('');
    const [newProtocol, setNewProtocol] = useState('');
    
    const handleDialogConfirm = () => {
        if (newUrl) {
            addBaseUrl({
            protocol: newProtocol,
            value: newUrl,
            workspaceId: props.activeEndpoint.workspaceId ?? JSON.parse(localStorage.getItem('workspaces') ?? '[]')[0]?.id ?? -1, 
          }).then(res => {
            console.log('base url added', res);
            props.activeEndpoint.baseUrlId = res?.id ?? props.activeEndpoint.baseUrlId;
            props.activeEndpoint.baseUrl = res ?? props.activeEndpoint?.baseUrl ?? fallbackBaseUrl;
          }).catch(err => {
            console.log('error adding base url', err);
          }).finally(() => {
            props.setIsDialogOpen(false);
          })
        }
      };
    
      const handleDialogCancel = () => {
        props.setIsDialogOpen(false);
        setNewUrl('');
      };

    return (
      <Dialog open={props.isDialogOpen} onOpenChange={props.setIsDialogOpen}>
  <DialogContent className="bg-slate-800 border-2 border-red-400">
    <DialogHeader>
      <DialogTitle>Manage Base Urls</DialogTitle>
    </DialogHeader>
    {/* Manage current */}
    <div className="p-2 border-gray-900 border-2 rounded-lg">
        <p className="text-lg text-gray-400">Edit</p>
        {props.baseUrls?.map((x, index)=> <>
                <div className="flex flex-row" key={index}>
                <select value={x.protocol}
                onChange={(e) => {
                    //setNewProtocol(e.target.value)
                    x.protocol = e.target.value
                } }
                className="my-1 mx-0 bg-transparent rounded-lg border-2 text-gray-300 border-slate-900 p-2 pr-4">
                <option>HTTP</option>
                <option>HTTPS</option>
                </select>
                <Input
                type="text"
                placeholder="Enter new URL"
                value={x.value}
                onChange={(e) => {
                    x.value = e.target.value
                }}
                className="w-full text-gray-300 bg-slate-700 border-slate-900 m-1 placeholder:text-gray-500" />
            </div>
        </>)}
        
    </div>
    {/* Add new */}
    <div className="p-2 border-gray-900 border-2 rounded-lg">
        <p className="text-lg text-gray-400">Add new</p>
        <div className="flex flex-row ">
            <select value={props.activeEndpoint?.baseUrl?.protocol ?? fallbackBaseUrl.protocol}
            onChange={(e) => {
                setNewProtocol(e.target.value)
            } }
            className="my-1 mx-0 bg-transparent rounded-lg border-2 text-gray-300 border-slate-900 p-2 pr-4">
            <option className="bg-gray-700">HTTP</option>
            <option className="bg-gray-700">HTTPS</option>
            </select>
            <Input
            type="text"
            placeholder="Enter new URL"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            className="w-full text-gray-300 bg-slate-700 border-slate-900 m-1 placeholder:text-gray-500" />
        </div>
    </div>
    <DialogFooter>
      <Button variant="outline" onClick={handleDialogCancel} className="text-black">
        Cancel
      </Button>
      <Button variant="default" onClick={handleDialogConfirm}>
        Confirm
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
    )
} 

export default ManageBaseUrlsDialog;