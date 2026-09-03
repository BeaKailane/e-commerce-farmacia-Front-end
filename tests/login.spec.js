import { test, expect } from "@playwright/test";

test("Login do usuário", async ({ page }) => {
  await page.goto("http://localhost:5173/login");

  await page.getByLabel("Usuário").fill("beatrizteste@gmail.com");
  await page.getByLabel("Senha").fill("12345678");

  await page.getByRole("button", { name: /entrar/i }).click();

  await expect(page).not.toHaveURL(/login/);
});
