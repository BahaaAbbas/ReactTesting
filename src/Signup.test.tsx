import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SignUp from "./Signup";

describe("SignUp Component", () => {
  describe("Validation", () => {
    it("should display validation errors for invalid email", async () => {
      render(<SignUp />, { wrapper: MemoryRouter });
      fireEvent.change(screen.getByPlaceholderText("Email"), {
        target: { value: "invalid" },
      });
      fireEvent.change(screen.getByPlaceholderText("Password"), {
        target: { value: "123456" },
      });
      fireEvent.submit(
        screen.getByRole("button", { name: /sign up/i }).closest("form")!
      );
      expect(
        await screen.findByText("Invalid email address")
      ).toBeInTheDocument();
    });
    it("should display validation errors for short password", async () => {
      render(<SignUp />, { wrapper: MemoryRouter });
      fireEvent.change(screen.getByPlaceholderText("Email"), {
        target: { value: "test@test.com" },
      });
      fireEvent.change(screen.getByPlaceholderText("Password"), {
        target: { value: "123" },
      });
      fireEvent.click(screen.getByRole("button", { name: /sign up/i }));
      expect(
        await screen.findByText("Password must be at least 6 characters")
      ).toBeInTheDocument();
    });

    it("should display success message on successful sign-up", async () => {
      render(<SignUp />, { wrapper: MemoryRouter });
      fireEvent.change(screen.getByPlaceholderText("Email"), {
        target: { value: "ok@test.com" },
      });
      fireEvent.change(screen.getByPlaceholderText("Password"), {
        target: { value: "123456" },
      });
      fireEvent.click(screen.getByRole("button", { name: /sign up/i }));
      expect(await screen.findByText("Account created")).toBeInTheDocument();
    });

    it("should display error message on sign-up failure", async () => {
      render(<SignUp />, { wrapper: MemoryRouter });
      fireEvent.change(screen.getByPlaceholderText("Email"), {
        target: { value: "fail@test.com" },
      });
      fireEvent.change(screen.getByPlaceholderText("Password"), {
        target: { value: "123456" },
      });
      fireEvent.click(screen.getByRole("button", { name: /sign up/i }));
      expect(
        await screen.findByText("Email already exists")
      ).toBeInTheDocument();
    });
  });

  describe("Form Interaction", () => {
    it("should enable Sign Up button when form is valid", async () => {
      render(<SignUp />, { wrapper: MemoryRouter });

      const button = screen.getByRole("button", {
        name: /sign up/i,
      }) as HTMLButtonElement;
      expect(button.disabled).toBe(true);

      fireEvent.change(screen.getByPlaceholderText("Email"), {
        target: { value: "test@test.com" },
      });
      fireEvent.change(screen.getByPlaceholderText("Password"), {
        target: { value: "123456" },
      });

      expect(
        (await screen.findByRole("button", {
          name: /sign up/i,
        })) as HTMLButtonElement
      ).not.toBeDisabled();
    });

    it("should disable Sign Up button when form is invalid", async () => {
      render(<SignUp />, { wrapper: MemoryRouter });

      const button = screen.getByRole("button", {
        name: /sign up/i,
      }) as HTMLButtonElement;
      fireEvent.change(screen.getByPlaceholderText("Email"), {
        target: { value: "" },
      });

      expect(
        (await screen.findByRole("button", {
          name: /sign up/i,
        })) as HTMLButtonElement
      ).toBeDisabled();
    });

    it("should update form fields on user input", async () => {
      render(<SignUp />, { wrapper: MemoryRouter });

      const emailInput = screen.getByPlaceholderText(
        "Email"
      ) as HTMLInputElement;
      fireEvent.change(emailInput, { target: { value: "hello@test.com" } });

      expect(emailInput.value).toBe("hello@test.com");
    });

    it("should display success message after signup", async () => {
      render(<SignUp />, { wrapper: MemoryRouter });

      fireEvent.change(screen.getByPlaceholderText("Email"), {
        target: { value: "ok@test.com" },
      });
      fireEvent.change(screen.getByPlaceholderText("Password"), {
        target: { value: "123456" },
      });
      fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

      expect(await screen.findByText("Account created")).toBeInTheDocument();
    });
  });
});
