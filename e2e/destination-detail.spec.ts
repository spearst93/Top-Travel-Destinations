import { test, expect } from '@playwright/test';

test.describe('Destination Detail Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Click on the first destination card
    await page.locator('.DestinationCard-cardLink').first().click();
  });

  test('displays destination details', async ({ page }) => {
    // Should show destination name in heading
    await expect(page.locator('h2').first()).toBeVisible();

    // Should show back link
    const backLink = page.locator('.DestinationDetails-backLink');
    await expect(backLink).toBeVisible();
  });

  test('displays destination image', async ({ page }) => {
    const image = page.locator('.DestinationDetails-image');
    await expect(image).toBeVisible();
  });

  test('displays weather widget', async ({ page }) => {
    // Weather widget should be visible (either loading, error, or with data)
    const weatherWidget = page.locator('.WeatherWidget');
    await expect(weatherWidget).toBeVisible();
  });

  test('displays map', async ({ page }) => {
    // Map container should be visible
    const map = page.locator('.DestinationDetails-map');
    await expect(map).toBeVisible();
  });

  test('back link navigates to home', async ({ page }) => {
    const backLink = page.locator('.DestinationDetails-backLink');
    await backLink.click();

    await expect(page).toHaveURL('/');
  });

  test('has favorite button', async ({ page }) => {
    const favoriteButton = page.locator('.FavoriteButton');
    await expect(favoriteButton).toBeVisible();
  });

  test('has add to trip button', async ({ page }) => {
    const addToTripButton = page.locator('.AddToTripButton');
    await expect(addToTripButton).toBeVisible();
  });
});
