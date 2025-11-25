export default async function handler(req, res) {
  const { path = "" } = req.query;

  // URL du backend via Ngrok (utilise une variable d'environnement pour la modifier facilement)
  const backendBase = process.env.BACKEND_URL; // ex: https://backendeshopping.ngrok.io

  if (!backendBase) {
    return res.status(500).json({ error: "BACKEND_URL is not configured" });
  }

  // Reconstruire l'URL vers Laravel
  const targetUrl = `${backendBase.replace(/\/$/, "")}/api/${path}`;

  try {
    // Certains hébergeurs/tunnels exigent un premier passage; ici Ngrok n'en a pas besoin.
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        // Forward selected headers if needed:
        // "Authorization": req.headers.authorization || "",
      },
      // Forward body for POST/PUT/PATCH
      body: ["POST", "PUT", "PATCH"].includes(req.method)
        ? JSON.stringify(req.body || {})
        : undefined,
    });

    const contentType = response.headers.get("content-type") || "";
    const status = response.status;

    // Autoriser ton frontend
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    if (contentType.includes("application/json")) {
      const data = await response.json();
      return res.status(status).json(data);
    } else {
      const text = await response.text();
      return res.status(status).send(text);
    }
  } catch (error) {
    return res.status(500).json({ error: "Proxy error", details: error.message });
  }
}
