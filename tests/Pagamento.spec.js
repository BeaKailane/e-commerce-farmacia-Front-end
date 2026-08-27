import { test, expect } from '@playwright/test';

test('Fluxo de pagamento via PIX', async ({ page }) => {
  // 1. Login
  await page.goto('http://localhost:5173/login');
  await page.getByLabel('Usuário').fill('beatrizteste@gmail.com');
  await page.getByLabel('Senha').fill('12345678');
  await page.getByRole('button', { name: /entrar/i }).click();
  await expect(page).not.toHaveURL(/login/);

  // 2. Ir para produtos e adicionar um item ao carrinho
  await page.goto('http://localhost:5173/produtos');
  // TODO: ajustar este seletor conforme o HTML real do botão
  await page.getByRole('button', { name: /adicionar ao carrinho/i }).first().click();

  // 3. Ir para o carrinho e finalizar compra
  await page.goto('http://localhost:5173/carrinho');
  await page.getByRole('button', { name: /finalizar compra/i }).click();
  await expect(page).toHaveURL(/checkout/);

  // 4. Preencher dados de entrega (selecionados por name, pois os labels
  //    não têm htmlFor/id vinculado ao input)
  await page.locator('input[name="nomeCompleto"]').fill('Cliente Teste');
  await page.locator('input[name="email"]').fill('cliente@teste.com');
  await page.locator('input[name="cpf"]').fill('507.545.610-38');
  await page.locator('input[name="endereco"]').fill('Rua Teste, 123');
  await page.locator('input[name="cidade"]').fill('São Paulo');
  await page.locator('input[name="cep"]').fill('01000-000');
  await page.locator('input[name="telefone"]').fill('11999999999');

  // 5. Confirmar pedido
  await page.getByRole('button', { name: /confirmar pedido/i }).click();

  // 6. O checkout redireciona (window.location.href) para o AbacatePay
  await page.waitForURL(/abacatepay\.com/, { timeout: 15000 });
  await expect(page).toHaveURL(/abacatepay\.com/);
});