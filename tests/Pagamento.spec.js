import { test, expect } from '@playwright/test';

test('Fluxo de pagamento via PIX', async ({ page }) => {
  // 1. Login
  await page.goto('/login');

  await page.getByLabel('Usuário').fill('beatrizteste@gmail.com');
  await page.getByLabel('Senha').fill('12345678');

  await page.getByRole('button', { name: /entrar/i }).click();

  await expect(page).not.toHaveURL(/login/);

  // 2. Ir para produtos e adicionar um item ao carrinho
  await page.goto('/produtos');

  await page
    .getByRole('button', { name: /adicionar ao carrinho/i })
    .first()
    .click();

  // 3. Ir para o carrinho
  await page.goto('/carrinho');

  await page
    .getByRole('button', { name: /finalizar compra/i })
    .click();

  await expect(page).toHaveURL(/checkout/);

  // 4. Preencher dados de entrega
  await page
    .locator('input[name="nomeCompleto"]')
    .fill('Cliente Teste');

  await page
    .locator('input[name="email"]')
    .fill('cliente@teste.com');

  await page
    .locator('input[name="cpf"]')
    .fill('507.545.610-38');

  await page
    .locator('input[name="endereco"]')
    .fill('Rua Teste, 123');

  await page
    .locator('input[name="cidade"]')
    .fill('São Paulo');

  await page
    .locator('input[name="cep"]')
    .fill('01000-000');

  await page
    .locator('input[name="telefone"]')
    .fill('11999999999');

  // 5. Aguarda o POST do pagamento antes de clicar
  const respostaPagamento = page.waitForResponse(
    response =>
      response.request().method() === 'POST' &&
      response.url().includes('/pagamentos/pix')
  );

  await page
    .getByRole('button', { name: /confirmar pedido/i })
    .click();

  // 6. Captura a resposta do backend
  const response = await respostaPagamento;

  const corpo = await response.text();

  console.log('========================================');
  console.log('RESPOSTA DO PAGAMENTO PIX');
  console.log('Status:', response.status());
  console.log('URL:', response.url());
  console.log('Body:', corpo);
  console.log('========================================');

  // O backend precisa responder com sucesso
  expect(response.ok()).toBeTruthy();

  // 7. Verifica se existe uma URL de pagamento
  let resultado;

  try {
    resultado = JSON.parse(corpo);
  } catch {
    throw new Error(
      `Resposta do pagamento não é JSON válido: ${corpo}`
    );
  }

  const pagamento = resultado?.data ?? resultado;
  const linkPagamento = pagamento?.url;

  console.log('Link de pagamento:', linkPagamento);

  expect(
    linkPagamento,
    'O backend não retornou a propriedade "url"'
  ).toBeTruthy();

  expect(linkPagamento).toMatch(/https?:\/\//);

  // 8. Aguarda o redirecionamento
  await expect
    .poll(
      () => page.url(),
      {
        timeout: 15000,
        message: 'O frontend não redirecionou para o checkout do pagamento'
      }
    )
    .toMatch(/abacatepay\.com/);
});
