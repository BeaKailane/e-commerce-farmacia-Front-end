import { test, expect } from '@playwright/test';

// Helper de login
async function login(page) {
  await page.goto('/login');

  await page.getByLabel('Usuário').fill('beatrizteste@gmail.com');
  await page.getByLabel('Senha').fill('12345678');

  await page.getByRole('button', { name: /entrar/i }).click();

  await expect(page).not.toHaveURL(/\/login/);
}

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

test('Editar produto', async ({ page }) => {
  await login(page);

  await page.goto('/produtos');

  // Pega o primeiro link Editar
  await page.getByRole('link', { name: 'Editar' }).first().click();

  // Confirma que entrou na tela de edição
  await expect(page).toHaveURL(/\/produtos\/editar\/\d+$/);

  // O formulário carrega os dados do produto via fetch assíncrono (useEffect).
  // Se preenchermos antes disso terminar, o fetch sobrescreve o que digitamos
  // quando ele resolver, e o formulário acaba salvando os dados ANTIGOS.
  // Por isso esperamos o campo "Nome" ter algum valor carregado antes de editar.
  const campoNome = page.getByLabel('Nome');
  await expect(campoNome).not.toHaveValue('', { timeout: 10000 });

  const novoNome = `Produto Editado ${Date.now()}`;
  const novaDescricao = `Descrição Editada ${Date.now()}`;

  await campoNome.fill(novoNome);
  await page.getByLabel('Descrição').fill(novaDescricao);

  // Aguarda a requisição de atualização terminar
  const resposta = page.waitForResponse(
    response =>
      response.request().method() === 'PUT' &&
      response.ok()
  );

  await page.getByRole('button', {
    name: /salvar alterações/i
  }).click();

  await resposta;

  // Deve voltar para a listagem
  await expect(page).toHaveURL(/\/produtos$/, {
    timeout: 10000
  });

  // Aguarda o produto atualizado aparecer
  await expect(
    page.getByRole('heading', { name: novoNome })
  ).toBeVisible({
    timeout: 10000
  });
});

test('Excluir produto', async ({ page }) => {
  await login(page);

  await page.goto('/produtos');

  const primeiroCard = page.locator('.group').first();

  const nomeProduto = await primeiroCard
    .locator('h2')
    .innerText();

  // Intercepta o confirm()
  page.once('dialog', dialog => dialog.accept());

  await primeiroCard
    .getByRole('button', { name: /excluir/i })
    .click();

  // Confirma que o produto foi removido
  await expect(
    page.getByRole('heading', { name: nomeProduto })
  ).not.toBeVisible({
    timeout: 10000
  });
});