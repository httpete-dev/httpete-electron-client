'use client'

import { Label } from "@radix-ui/react-label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select";
import { Folder, Globe, Plus, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { SelectGroup, SelectLabel } from "../ui/select";
import LucideSelector from "../icons/LucideSelector";
import { Input } from "../ui/input";
import { Collection } from "@/model";
import { useSearchParams } from "next/navigation";
import { addCollection } from "@/server/collections";

type CollectionDialogPrps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    updateCollections: () => void;
}

const CreateCollectionDialog = (props: CollectionDialogPrps) => {
    const searchParams = useSearchParams();

    const createCollection = () => {
        const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
        console.log('collectionIcon', collectionIcon);
        addCollection({
            name: collectionName,
            description: collectioDescription,
            workspaceId: current.get('ws'),
            organizationId: current.get('orgId'),
            icon: collectionIcon,
        } as Collection).then(res => {
            if (res) {
                props.onOpenChange(false);
                props.updateCollections();
            }
            console.log('res', res);
            // props.onOpenChange(false);
        })
    }

    const [collectionIcon, setCollectionIcon] = useState<string>("Folder");
    const [collectionName, setCollectionName] = useState("New Collection");
    const [collectioDescription, setCollectioDescription] = useState("New Collection Description");

    return (
        <Dialog open={props.open} onOpenChange={props.onOpenChange}>
            <DialogTrigger asChild>
                <Button
                    className="hover:text-red-500 hover:bg-transparent bg-transparent"
                    size="sm" onClick={() => props.onOpenChange(true)} >
                    <Plus className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent style={{ backgroundColor: '#111827' }}>
                <DialogHeader>
                    <DialogTitle>Create New Collection</DialogTitle>
                    <DialogDescription>
                        Enter the details for your new collection.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={collectionName}
                            onChange={(e) => setCollectionName(e.target.value)}
                            className="col-span-3 text-gray-400 bg-gray-800 border-gray-700"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            value={collectioDescription}
                            onChange={(e) => setCollectioDescription(e.target.value)}
                            className="col-span-3 text-gray-400 bg-gray-800 border-gray-700" 
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="icon" className="text-right">
                            Icon
                        </Label>
                        <div className="col-span-3 flex gap-2">
                        <LucideSelector onChange={(icon) => {
                            console.log('setting icon to', icon);
                            setCollectionIcon(icon);
                        }} value={collectionIcon} />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={createCollection}>Create Collection</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default CreateCollectionDialog;