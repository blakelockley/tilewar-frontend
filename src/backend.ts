import React, { useState, useEffect } from "react";

function getAuthToken(): string | null {
  return localStorage.getItem("authToken");
}

async function resolveResponse(res: any) {

  if (res.status === 204)
    return Promise.resolve();

  if (200 <= res.status && res.status <= 299)
    return await res.json();

  const text = await res.text();
  let error = text;

  try {
    const json = JSON.parse(text);

    if (json["detail"])
      error = json["detail"];
  } catch { }

  throw new Error(error);
}

function authHeader(): { "Authorization": string } | {} {
  const token = getAuthToken();
  if (!token)
    return {};

  return { "Authorization": `${token}` };
}

export function getData(path: string) {
  return fetch(process.env.REACT_APP_API_ENDPOINT + path, {
    'method': 'GET',
    'headers': {
      'Content-Type': 'application/json',
      ...authHeader(),
    }
  })
    .then(resolveResponse);
}

export function postData(path: string, data: any = {}) {
  return fetch(process.env.REACT_APP_API_ENDPOINT + path, {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json',
      ...authHeader()
    },
    'body': JSON.stringify(data)
  })
    .then(resolveResponse);
}

export function putData(path: string, data: any) {
  return fetch(process.env.REACT_APP_API_ENDPOINT + path, {
    'method': 'PUT',
    'headers': {
      'Content-Type': 'application/json',
      ...authHeader(),
    },
    'body': JSON.stringify(data)
  })
    .then(resolveResponse);
}

export function patchData(path: string, data: any) {
  return fetch(process.env.REACT_APP_API_ENDPOINT + path, {
    'method': 'PATCH',
    'headers': {
      'Content-Type': 'application/json',
      ...authHeader(),
    },
    'body': JSON.stringify(data)
  })
    .then(resolveResponse);
}

export function deleteData(path: string) {
  return fetch(process.env.REACT_APP_API_ENDPOINT + path, {
    'method': 'DELETE',
    'headers': {
      'Content-Type': 'application/json',
      ...authHeader(),
    }
  })
    .then(resolveResponse);
}

export function uploadFile(path: string, file: File) {
  if (path[path.length - 1] === "/") // remove trailing '/'
    path = path.slice(0, -1);

  return fetch(process.env.REACT_APP_API_ENDPOINT + path + `/${file.name}/`, {
    'method': 'PUT',
    'headers': {
      'Content-Type': 'application/json',
      ...authHeader(),
    },
    'body': file
  })
    .then(resolveResponse);
}

// Resource Hooks

/**
 * Shortcut hook to fetch and set a resource.
 *
 * @param path
 * @returns the resource at the provided path.
 */
export function useResource<Type = any>(path: string): Type | null {
  const [resource, setResource] = useState<Type | null>(null);

  useEffect(() => {
    getData(path)
      .then(setResource);
  }, [path]);

  return resource;
};

/**
 * Shortcut hook to fetch and set a resource that can be updated (set) locally.
 *
 * @param path
 * @returns the resource at the provided path plus the setter function.
 */
export function useSettableResource<Type = any>(path: string): [Type | null, React.Dispatch<React.SetStateAction<Type | null>>] {
  const [resource, setResource] = useState<Type | null>(null);

  useEffect(() => {
    getData(path)
      .then(setResource);
  }, [path]);

  return [resource, setResource];
}

/**
 * Shortcut hook to fetch and set a resource that can be easily refetched.
 *
 * @param path
 * @returns the resource at the provided path and a refresh function to refetch the resource.
 */
export function useRefreshableResource<Type = any>(path: string): [Type | null, () => Promise<any>] {
  const [resource, setResource] = useState<Type | null>(null);

  useEffect(() => {
    getData(path)
      .then(setResource);
  }, [path]);

  const refresh = () => {
    return getData(path)
      .then(data => {
        setResource(data);
        return data;
      });
  }

  return [resource, refresh];
}
