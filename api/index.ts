import { VercelRequest, VercelResponse } from "vercel";
import app from "../server";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { url = "/" } = req;

  return new Promise((resolve) => {
    const nodeRes = res as any;

    const originalEnd = nodeRes.end;
    nodeRes.end = function (chunk: any, encoding: any, callback: any) {
      originalEnd.apply(this, [chunk, encoding, callback]);
      resolve(undefined);
    };

    const next = () => {
      if (!nodeRes.writableEnded) {
        nodeRes.status(404).json({ message: "Not Found" });
        nodeRes.end();
      }
    };

    const nodeReq = { ...req, url } as any;

    app.handle(nodeReq, nodeRes, next); // now works
  });
}
