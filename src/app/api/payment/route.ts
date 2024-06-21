import { MercadoPagoConfig, Preference } from "mercadopago";
import { NextRequest } from "next/server";

const client = new MercadoPagoConfig({
  accessToken: "TEST-7267771176619243-060810-6809a8f80ab9b1333b67d5aefbfa1361-194477043",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); 
    const preferenceBody = {
      items: [
        {
          id: body.credits,
          title: body.title, 
          unit_price: body.cost,
          quantity: 1,
          currency_id: "ARS",
        },
      ],
      auto_return: "approved",
      back_urls: {
        success: `https://www.youtube.com/`,
        failure: `https://www.youtube.com/`,
      },
    };

    const preference = new Preference(client);
    const result = await preference.create({ body: preferenceBody });
    return new Response(JSON.stringify({ id: result.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
