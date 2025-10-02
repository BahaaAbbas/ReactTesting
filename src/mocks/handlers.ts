import { http, HttpResponse } from "msw";

// Request body type
interface SignUpRequestBody {
  email: string;
  password: string;
}

export const handlers = [
  http.post("*/api/signup", async ({ request }) => {
    console.log("MSW intercepted /api/signup");
    const { email } = (await request.json()) as SignUpRequestBody;

    if (email === "fail@test.com") {
      return HttpResponse.json(
        { success: false, message: "Email already exists" },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      { success: true, message: "Account created" },
      { status: 200 }
    );
  }),
];
