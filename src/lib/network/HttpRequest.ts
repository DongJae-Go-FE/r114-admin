import queryString from "query-string";

export type CommonResponse<T = unknown> = {
  success: boolean;
  code: number;
  message: string;
  data: T;
};

function parseCookie(cookie: string) {
  const map = new Map();
  for (const pair of cookie.split(/; */)) {
    if (!pair) continue;
    const splitAt = pair.indexOf("=");
    if (splitAt === -1) {
      map.set(pair, "true");
      continue;
    }
    const [key, value] = [pair.slice(0, splitAt), pair.slice(splitAt + 1)];
    try {
      map.set(key, decodeURIComponent(value != null ? value : "true"));
    } catch {}
  }
  return map;
}

type Header = HeadersInit & {};

export default class HttpRequest {
  private static baseUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER_API_URL;

  private static credentials = "include" as const;

  static defaultHeaders: Header = {};

  private static async responseToJson<Res = unknown>(response: Response) {
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json);
    }

    return json as CommonResponse<Res>;
  }

  static async get<Res = unknown, Req = unknown>(
    uri: string,
    bodyData?: Req,
    headerData?: Header
  ) {
    const path = `${this.baseUrl}${uri}?${queryString.stringify(
      bodyData as queryString.ParsedQuery,
      { encode: true }
    )}`;

    const response = await fetch(path, {
      method: "GET",
      headers: {
        ...this.defaultHeaders,
        ...headerData,
      },
    });

    return await this.responseToJson<Res>(response);
  }

  static async set<Res = unknown, Req = unknown>(
    method: "POST" | "PUT" | "DELETE" | "PATCH",
    uri: string,
    bodyData?: Req,
    headerData?: Header
  ) {
    const response = await fetch(this.baseUrl + uri, {
      method,
      headers: {
        ...this.defaultHeaders,
        ...headerData,
      },
      body: JSON.stringify(bodyData),
    });

    return await this.responseToJson<Res>(response);
  }

  static async upload<Res = unknown>(
    formData: FormData,
    { uri }: { uri: string }
  ) {
    const response = await fetch(this.baseUrl + uri, {
      method: "POST",
      body: formData,
    });

    return await this.responseToJson<Res>(response);
  }

  static async download(key: string) {
    const response = await fetch(this.baseUrl + "/aws/download/" + key, {
      method: "GET",
      credentials: this.credentials,
      headers: {
        Authorization: `Bearer ${parseCookie(document.cookie).get(
          "accessToken"
        )}`,
      },
    });

    return await this.responseToJson<string>(response);
  }

  static async delete(key: string) {
    const response = await fetch(this.baseUrl + "/aws/upload/" + key, {
      method: "DELETE",
      credentials: this.credentials,
      headers: {
        Authorization: `Bearer ${parseCookie(document.cookie).get(
          "accessToken"
        )}`,
      },
    });

    return await this.responseToJson<string>(response);
  }
}
