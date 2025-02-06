import axios from "axios";
import { Import, X } from "lucide-react";
import { useState } from "react";
import { BaseUrl } from "@/model";
import { ImportDialogProps, PostmanCollection } from "@/model/postman";
import Loading from "../Loading";



export default function ImportDialog(props: ImportDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [importedData, setImportedData] = useState<PostmanCollection | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [importing, setImporting] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const parsedData: PostmanCollection = JSON.parse(content);
          setImportedData(parsedData);
          console.log(parsedData);
        } catch (err) {
          setError("Invalid file format. Please upload a valid Postman export JSON file.");
        }
      };
      reader.readAsText(file);
    }
  };

  const importData = async (workspaceId: number) => {
    const payload = {
      userId: 1, //TODO: Fix 
      userName: "Placeholder Name", //TODO: Fix
      workspaceId: workspaceId,
      data: importedData
    }

    try {
      setImporting(true);
      const res = await axios.post(baseUrl + '/account/import-json', payload);
      // if (session?.user) {
      //   session.user = res.data;
      // }
      setImporting(false);
      setIsOpen(false);
    } catch (err) {
      setError("Failed to import data. Please try again.");
    }
  }

  return (
    <div>
      {/* Trigger Button */}
      <button
        className="px-0 ml-4 py-2 text-white rounded hover:text-red-500"
        onClick={() => setIsOpen(true)}
      >
        <Import/>
      </button>

      {/* Dialog */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-slate-800 border-red-400 border-2 rounded-lg shadow-lg p-6">
        <div className="flex justify-end">
          <button
            className="px-4 py-0 text-gray-700 rounded hover:bg-gray-400"
            onClick={() => setIsOpen(false)}
          >
            <X />
        </button>
        </div>
            <h2 className="text-lg font-semibold mb-4">Upload Postman Data (.json)</h2>
            
            {/* File Input */}
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="block w-full text-sm text-red-300 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-red-400 file:text-white hover:file:bg-blue-100"
            />

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            {/* Imported Data Preview */}
            {importedData && (
              <div className="mt-4 p-3 rounded" style={{maxHeight:'300px', overflowY:'scroll'}}>
                <p className="text-sm font-semibold">Imported Collection: <span className="text-sm text-gray-500">{importedData.info.name}</span></p>                
                <p className="text-sm text-gray-500">{importedData.info.description}</p>
                {importedData.item.map(x=> 
                <div key={x.name} className="m-2 p-0">
                  <div>
                    <span className="text-2xl" >{x.name}</span>
                    {x.item?.map(y => 
                    <div key={y.name} className="ml-2">
                    |.. {y.name}
                    </div>)}
                  </div>
                </div>)}
              </div>
            )}

            {/* Actions */}
            <div className="mt-6 flex justify-end">
              {importing ? <Loading text={"Importing data..."}/> : <button
                className="px-4 py-2 text-red-400 rounded hover:bg-red-400 hover:text-white"
                onClick={() => {
                  const params = new URLSearchParams(props.searchParams);
                  const ws = params.get('ws');

                  importData(parseInt(ws ?? '-1') ).then(res => {
                    window.location.reload();
                  })
                }}
              >
                Import
              </button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}