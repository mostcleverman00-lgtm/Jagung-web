const { test, expect } = require('@playwright/test');

test('Cek Pemuatan Modul Header dan Tombol Interaktif', async ({ page }) => {
  await page.goto('http://localhost:3000'); // Asumsi web berjalan di port 3000

  // Pastikan komponen header termuat dari fetch()
  const logo = page.locator('.logo');
  await expect(logo).toHaveText('Jagung Nusantara');

  // Pastikan fungsi tombol interaktif bekerja (scroll)
  await page.click('text=Lihat Menu');
  const isVisible = await page.isVisible('#products');
  expect(isVisible).toBeTruthy();
});