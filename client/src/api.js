const base = "/api/auth";

async function post(path, body) {
  const res = await fetch(base + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(body),
  });

  let data = null;
  try {
    data = await res.json();
  } catch (e) {
    /* no body */
  }

  if (!res.ok) {
    const err = new Error(data?.error || "Ocurrió un error.");
    err.errors = data?.errors;
    err.status = res.status;
    throw err;
  }
  return data;
}

export const api = {
  signup:  (body) => post("/signup", body),
  login:   (body) => post("/login", body),
  logout:  ()     => post("/logout", {}),
  recover: (body) => post("/recover", body),
  me: () =>
    fetch(base + "/me", { credentials: "same-origin" }).then((r) =>
      r.ok ? r.json() : null,
    ),
};
