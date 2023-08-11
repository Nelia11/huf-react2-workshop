interface Profile {
    "id": string,
    "owner": string
}

interface License {
    "id": string,
    "name": string,
    "type": string;
}

export interface Project {
    "id": string,
    "owner": string,
    "title": string,
    "description": string,
    "size_used": string,
    "shared": boolean,
    "shared_password": string|null,
    "created_at": string,
    "updated_at": string,
    "sharedUsers": Profile[],
    "licenses": License[]
}