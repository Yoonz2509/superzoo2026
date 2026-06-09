export async function onRequestGet(context) {
  const kv = context.env.SUPERZOO_KV;
  const parts = context.params.key || [];
  const key = Array.isArray(parts) ? parts.join('/') : parts;
  try {
    const val = await kv.get(key);
    return new Response(val || 'null', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store',
      },
    });
  } catch (e) {
    return new Response('null', {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
}

export async function onRequestPost(context) {
  const kv = context.env.SUPERZOO_KV;
  const parts = context.params.key || [];
  const key = Array.isArray(parts) ? parts.join('/') : parts;
  try {
    const body = await context.request.text();
    await kv.put(key, body);
    return new Response(JSON.stringify({ ok: true }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
