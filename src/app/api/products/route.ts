export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");

  let url = "https://dummyjson.com/products";
  if (search) {
    url = `https://dummyjson.com/products/search?q=${search}`;
  }

  const res = await fetch(url);
  const data = await res.json();

  return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch("https://dummyjson.com/products/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), { status: 201 });
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { id, ...updatedData } = body;

  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), { status: 200 });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("محصولی برای حذف مشخص نشده", { status: 400 });
  }

  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), { status: 200 });
}
