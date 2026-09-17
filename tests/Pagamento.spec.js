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
  await page.getByRole('button', { name: /adicionar ao carrinho/i }).first().click();

  // 3. Ir para o carrinho e finalizar compra
  await page.goto('http://localhost:5173/carrinho');
  await page.getByRole('button', { name: /finalizar compra/i }).click();
  await expect(page).toHaveURL(/checkout/);

  // 4. Preencher dados de entrega
  await page.locator('input[name="nomeCompleto"]').fill('Cliente Teste');
  await page.locator('input[name="email"]').fill('cliente@teste.com');
  await page.locator('input[name="cpf"]').fill('507.545.610-38');
  await page.locator('input[name="endereco"]').fill('Rua Teste, 123');
  await page.locator('input[name="cidade"]').fill('São Paulo');
  await page.locator('input[name="cep"]').fill('01000-000');
  await page.locator('input[name="telefone"]').fill('11999999999');

  // 5. Confirmar pedido
  await page.getByRole('button', { name: /confirmar pedido/i }).click();

  // Aguarda um pouco para o frontend processar a resposta
  await page.waitForTimeout(5000);

  // Mostra para onde o navegador realmente foi
  console.log('URL após confirmar pedido:', page.url());

  // 6. Verifica o redirecionamento
  await expect(page).toHaveURL(/abacatepay\.com/, {
    timeout: 15000
  });
});
