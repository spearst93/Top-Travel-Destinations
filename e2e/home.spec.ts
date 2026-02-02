import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays the main title', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Top 25 Must-See Places');
  });

  test('loads all destination cards', async ({ page }) => {
    const cards = page.locator('.DestinationCard-card');
    await expect(cards).toHaveCount(25);
  });

  test('displays search input', async ({ page }) => {
    const searchInput = page.locator('.Filter-searchBar');
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toHaveAttribute('placeholder', 'Search destinations...');
  });

  test('displays season filter dropdown', async ({ page }) => {
    const seasonFilter = page.locator('.Filter-filterDropdown');
    await expect(seasonFilter).toBeVisible();
  });

  test('filters destinations by search term', async ({ page }) => {
    const searchInput = page.locator('.Filter-searchBar');
    await searchInput.fill('Paris');

    const cards = page.locator('.DestinationCard-card');
    await expect(cards).toHaveCount(1);
    await expect(cards.first()).toContainText('Paris');
  });

  test('filters destinations by season', async ({ page }) => {
    const seasonFilter = page.locator('.Filter-filterDropdown');
    await seasonFilter.selectOption('Spring');

    const cards = page.locator('.DestinationCard-card');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(25);
  });

  test('shows no results message when no matches', async ({ page }) => {
    const searchInput = page.locator('.Filter-searchBar');
    await searchInput.fill('xyznonexistent');

    await expect(page.locator('.DestinationList-noResults')).toContainText('No destinations match');
  });

  test('navigates to destination detail when card is clicked', async ({ page }) => {
    const firstCard = page.locator('.DestinationCard-cardLink').first();
    await firstCard.click();

    await expect(page).toHaveURL(/\/destination\//);
  });

  test('theme toggle button is visible', async ({ page }) => {
    const themeButton = page.locator('.ThemeToggle-button');
    await expect(themeButton).toBeVisible();
  });

  test('trip planner link is visible', async ({ page }) => {
    const tripPlannerLink = page.locator('.App-tripPlannerLink');
    await expect(tripPlannerLink).toBeVisible();
    await expect(tripPlannerLink).toContainText('Trip Planner');
  });
});
