import { test, expect } from '@playwright/test';

// Helper de login
async function login(page) {
  await page.goto('/login');

  await page.getByLabel('Usuário').fill('beatrizteste@gmail.com');
  await page.getByLabel('Senha').fill('12345678');

  await page.getByRole('button', { name: /entrar/i }).click();

  await expect(page).not.toHaveURL(/\/login/);
}


// =====================================================
// CRIAR PRODUTO
// =====================================================

test('Criar produto', async ({ page }) => {
  await login(page);

  await page.goto('/produtos/cadastrar');

  const nomeProduto = `Produto Teste ${Date.now()}`;

  await page.getByLabel('Nome').fill(nomeProduto);

  await page.getByLabel('Descrição').fill(
    'Descrição gerada pelo teste automatizado'
  );

  await page.getByLabel('Marca').fill('Marca de Teste');

  await page.getByLabel('Quantidade').fill('12');

  await page.getByLabel('Preço (R$)').fill('23.99');

  await page.getByLabel('Categoria').selectOption({ index: 2 });

  await page.getByRole('button', {
    name: /cadastrar produto/i
  }).click();

  await expect(page).toHaveURL(/\/produtos$/);

  await expect(
    page.getByRole('heading', { name: nomeProduto })
  ).toBeVisible();
});


// =====================================================
// EDITAR PRODUTO
// =====================================================

test('Editar produto', async ({ page }) => {
  await login(page);

  await page.goto('/produtos/cadastrar');

  const nomeOriginal = `Produto Para Editar ${Date.now()}`;
  const novoNome = `Produto Editado ${Date.now()}`;

  await page.getByLabel('Nome').fill(nomeOriginal);

  await page.getByLabel('Descrição').fill(
    'Descrição do produto para teste de edição'
  );

  await page.getByLabel('Marca').fill('Marca de Teste');

  await page.getByLabel('Quantidade').fill('12');

  await page.getByLabel('Preço (R$)').fill('23.99');

  await page.getByLabel('Categoria').selectOption({ index: 2 });

  await page.getByRole('button', {
    name: /cadastrar produto/i
  }).click();

  await expect(page).toHaveURL(/\/produtos$/);

  const card = page
    .locator('.group')
    .filter({ hasText: nomeOriginal });

  await expect(card).toBeVisible();

  await card.getByRole('link', { name: 'Editar' }).click();

  await expect(page).toHaveURL(/\/produtos\/editar\/\d+$/);

  const campoNome = page.getByLabel('Nome');

  await expect(campoNome).toHaveValue(nomeOriginal, {
    timeout: 10000
  });

  await campoNome.fill(novoNome);

  await page.getByLabel('Descrição').fill(
    `Descrição Editada ${Date.now()}`
  );

  const resposta = page.waitForResponse(
    response =>
      response.request().method() === 'PUT' &&
      /\/produtos\/\d+$/.test(response.url())
  );

  await page.getByRole('button', {
    name: /salvar alterações/i
  }).click();

  const response = await resposta;

  console.log(
    'PUT editar produto:',
    response.status(),
    response.url()
  );

  expect(response.ok()).toBeTruthy();

  await expect(page).toHaveURL(/\/produtos$/, {
    timeout: 10000
  });

  await expect(
    page.getByRole('heading', { name: novoNome })
  ).toBeVisible({
    timeout: 10000
  });
});


// =====================================================
// EXCLUIR PRODUTO
// =====================================================

test('Excluir produto', async ({ page }) => {
  await login(page);

  await page.goto('/produtos/cadastrar');

  const nomeProduto = `Produto Para Excluir ${Date.now()}`;

  await page.getByLabel('Nome').fill(nomeProduto);

  await page.getByLabel('Descrição').fill(
    'Produto criado para teste automatizado de exclusão'
  );

  await page.getByLabel('Marca').fill('Marca de Teste');

  await page.getByLabel('Quantidade').fill('12');

  await page.getByLabel('Preço (R$)').fill('23.99');

  await page.getByLabel('Categoria').selectOption({ index: 2 });

  await page.getByRole('button', {
    name: /cadastrar produto/i
  }).click();

  await expect(page).toHaveURL(/\/produtos$/);

  const card = page
    .locator('.group')
    .filter({ hasText: nomeProduto });

  await expect(card).toBeVisible();

  page.once('dialog', dialog => dialog.accept());

  const resposta = page.waitForResponse(
    response =>
      response.request().method() === 'DELETE' &&
      /\/produtos\/\d+$/.test(response.url())
  );

  await card
    .getByRole('button', { name: /excluir/i })
    .click();

  const response = await resposta;

  console.log(
    'DELETE produto:',
    response.status(),
    response.url()
  );

  expect(response.ok()).toBeTruthy();

  await expect(
    page.getByRole('heading', { name: nomeProduto })
  ).not.toBeVisible({
    timeout: 10000
  });
});
