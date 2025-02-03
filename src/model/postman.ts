import { ReadonlyURLSearchParams } from "next/navigation";

export type PostmanCollection = {
    info: {
        name: string;
        description: string;
        schema: string;
    };
    item: PostmanCollection | PostmanRequest | PostmanRequest[] | PostmanCollection[];
};

type PostmanRequest = {
    name: string;
    request: {
        method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";
        header: PostmanHeader[];
        body?: PostmanBody;
        url: PostmanUrl;
    };
    response: PostmanResponse[];
    item: PostmanRequest | PostmanRequest[];
};

export type PostmanHeader = {
    key: string;
    value: string;
    type?: string;
};

export type PostmanBody = {
    mode: "raw" | "formdata" | "urlencoded" | "file" | "graphql";
    raw?: string; // For raw JSON or text body
    formdata?: { key: string; value: string; type: string }[]; // For form-data
    urlencoded?: { key: string; value: string; type: string }[]; // For URL-encoded form data
};

export type PostmanUrl = {
    raw: string;
    protocol: string;
    host: string[];
    path: string[];
    query?: { key: string; value: string }[]; // For query parameters
};

export type PostmanResponse = {
    name?: string;
    status?: string;
    code?: number;
    body?: string;
    header?: PostmanHeader[];
};

export type ImportDialogProps = {
    searchParams: ReadonlyURLSearchParams;
}