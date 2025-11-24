declare module 'vercel' {
  import { IncomingMessage, ServerResponse } from 'http';
  
  export interface VercelRequest extends IncomingMessage {
    query: { [key: string]: string | string[] };
    body: any;
    cookies: { [key: string]: string };
  }

  export interface VercelResponse extends ServerResponse {
    status(code: number): VercelResponse;
    send(body: any): VercelResponse;
    json(jsonBody: any): VercelResponse;
    redirect(statusOrUrl: string | number, url?: string): VercelResponse;
  }
}
