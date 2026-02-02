import { test, expect } from '@playwright/test';

test.describe('Theme Toggle', () => {
  test('toggles between light and dark mode', async ({ page }) => {
    await page.goto('/');

    // Initially should be light theme (or check document attribute)
    const themeButton = page.locator('.ThemeToggle-button');
    await themeButton.click();

    // Check that dark theme is applied
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    // Toggle back
    await themeButton.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('theme persists after page reload', async ({ page }) => {
    await page.goto('/');

    // Toggle to dark mode
    const themeButton = page.locator('.ThemeToggle-button');
    await themeButton.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    // Reload the page
    await page.reload();

    // Should still be dark mode
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });
});

test.describe('Favorites', () => {
  test('can add and remove favorites', async ({ page }) => {
    await page.goto('/');

    // Find the first favorite button
    const favoriteButton = page.locator('.FavoriteButton').first();

    // Click to add to favorites
    await favoriteButton.click();

    // Check that it's now favorited (has the active class or aria-pressed is true)
    await expect(favoriteButton).toHaveAttribute('aria-pressed', 'true');

    // Click again to remove
    await favoriteButton.click();
    await expect(favoriteButton).toHaveAttribute('aria-pressed', 'false');
  });

  test('favorites persist after page reload', async ({ page }) => {
    await page.goto('/');

    // Add first destination to favorites
    const favoriteButton = page.locator('.FavoriteButton').first();
    await favoriteButton.click();
    await expect(favoriteButton).toHaveAttribute('aria-pressed', 'true');

    // Reload the page
    await page.reload();

    // Should still be favorited
    const favoriteButtonAfterReload = page.locator('.FavoriteButton').first();
    await expect(favoriteButtonAfterReload).toHaveAttribute('aria-pressed', 'true');
  });
});
