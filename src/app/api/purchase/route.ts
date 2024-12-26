import getSession from "@/lib/getSession";
import { lemonsqueezyApiInstance } from "@/utils/axios";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async (req: NextRequest) => {
  try {
    const session = await getSession();
    const userId = session?.user?.id as string;

    if (!session || !userId)
      return Response.json({ message: "Unauthorized" }, { status: 401 });

    const reqData = await req.json();

    if (!reqData.productId)
      return Response.json(
        { message: "Product ID is required" },
        { status: 400 }
      );

    const response = await lemonsqueezyApiInstance.post("/checkouts", {
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: {
            custom: {
              userId: userId,
            },
          },
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: process.env.LEMON_SQUEEZY_STORE_ID,
            },
          },
          variant: {
            data: {
              type: "variants",
              id: reqData.productId.toString(),
            },
          },
        },
      },
    });

    const checkoutUrl = response.data.data.attributes.url;

    console.log("Lemonsqueezy response", response.data);

    return Response.json({ checkoutUrl });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
};
