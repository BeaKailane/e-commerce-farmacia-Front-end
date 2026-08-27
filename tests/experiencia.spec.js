import { test, expect } from '@playwright/test';

test('Acessar página de experiência', async ({ page }) => {
  await page.goto('/experiencia');

  await expect(page).toHaveURL(/experiencia/);
});
