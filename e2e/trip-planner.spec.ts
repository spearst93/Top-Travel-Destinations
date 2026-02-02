import { test, expect } from '@playwright/test';

test.describe('Trip Planner', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('navigates to trip planner page', async ({ page }) => {
    await page.goto('/');
    await page.click('.App-tripPlannerLink');

    await expect(page).toHaveURL('/trip-planner');
    await expect(page.locator('.TripPlanner-title')).toContainText('Trip Planner');
  });

  test('can create a new trip', async ({ page }) => {
    await page.goto('/trip-planner');

    // Fill in trip name
    const tripNameInput = page.locator('.TripPlanner-input');
    await tripNameInput.fill('My Vacation');

    // Click create button
    await page.click('.TripPlanner-createButton');

    // Should show the empty trip detail view
    await expect(page.locator('.TripDetail')).toBeVisible();
  });

  test('can add destination to trip from home page', async ({ page }) => {
    // First create a trip
    await page.goto('/trip-planner');
    const tripNameInput = page.locator('.TripPlanner-input');
    await tripNameInput.fill('Test Trip');
    await page.click('.TripPlanner-createButton');

    // Go back to home
    await page.goto('/');

    // Click add to trip on first destination
    const addToTripButton = page.locator('.AddToTripButton').first();
    await addToTripButton.click();

    // Navigate to trip planner
    await page.click('.App-tripPlannerLink');

    // Should show the destination in the trip
    const tripItem = page.locator('.TripItem');
    await expect(tripItem).toHaveCount(1);
  });

  test('can remove destination from trip', async ({ page }) => {
    // First create a trip and add a destination
    await page.goto('/trip-planner');
    const tripNameInput = page.locator('.TripPlanner-input');
    await tripNameInput.fill('Test Trip');
    await page.click('.TripPlanner-createButton');

    // Go to home and add a destination
    await page.goto('/');
    const addToTripButton = page.locator('.AddToTripButton').first();
    await addToTripButton.click();

    // Go to trip planner
    await page.click('.App-tripPlannerLink');

    // Remove the destination
    const removeButton = page.locator('.TripItem-remove');
    await removeButton.click();

    // Should show empty state
    await expect(page.locator('.TripDetail-empty')).toBeVisible();
  });

  test('trip data persists after reload', async ({ page }) => {
    // Create a trip
    await page.goto('/trip-planner');
    const tripNameInput = page.locator('.TripPlanner-input');
    await tripNameInput.fill('Persistent Trip');
    await page.click('.TripPlanner-createButton');

    // Reload the page
    await page.reload();

    // Trip should still exist
    await expect(page.locator('.TripPlanner-tripCard')).toBeVisible();
    await expect(page.locator('.TripPlanner-tripInfo h3')).toContainText('Persistent Trip');
  });

  test('back to destinations link works', async ({ page }) => {
    await page.goto('/trip-planner');

    const backLink = page.locator('.TripPlanner-backLink');
    await backLink.click();

    await expect(page).toHaveURL('/');
  });
});
