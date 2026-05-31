import { test, expect } from '@playwright/test';

test.describe('Platform E2E Tests', () => {

  test('Landing Page loads correctly and navigates to Dashboard', async ({ page }) => {
    await page.goto('/');
    
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/UAE & Oman E-Invoicing Intelligence Platform/);

    // Verify main heading exists
    await expect(page.locator('h1')).toContainText('Master Middle East E-Invoicing Compliance');

    // Click on Dashboard access link
    await page.click('text=Access Platform');

    // Verify URL changes to /dashboard
    await expect(page).toHaveURL(/.*\/dashboard/);
    
    // Check if the dashboard title renders
    await expect(page.locator('h1')).toContainText('UAE PEPPOL PINT AE');
  });

  test('Sandbox Testing Center generates XML validation successfully', async ({ page }) => {
    await page.goto('/sandbox-testing-center');

    // Verify Sandbox loads
    await expect(page.locator('h1')).toContainText('Interactive Sandbox Builder');

    // Form should have default values
    const supplierInput = page.locator('input#supplierName');
    await expect(supplierInput).toHaveValue('Al-Maktoum Trading LLC');

    // Test form validation by entering invalid data
    await supplierInput.fill('A'); // Too short, min 2 chars
    await page.click('text=Re-generate XML Schema');
    
    // Zod validation message should appear
    await expect(page.locator('text=Supplier name must be at least 2 characters.')).toBeVisible();

    // Fix the error
    await supplierInput.fill('Valid Supplier LLC');
    
    // Set a crazy amount to test formatting
    await page.fill('input#price', '1234.56');
    await page.fill('input#qty', '10');

    // Submit form again
    await page.click('text=Re-generate XML Schema');

    // Wait for validation to pass and completion banner to appear
    await expect(page.locator('text=Module Completed')).toBeVisible();

    // Ensure generated XML contains the updated data
    const xmlOutput = page.locator('pre code');
    await expect(xmlOutput).toContainText('Valid Supplier LLC');
    await expect(xmlOutput).toContainText('12345.60'); // LineExtensionAmount (1234.56 * 10)
  });

  test('Peppol 5-Corner page interactive animation loads', async ({ page }) => {
    await page.goto('/peppol-5-corner');
    
    // Check heading
    await expect(page.locator('h1')).toContainText('PEPPOL 5-Corner Model');

    // Check if animation component is present (LIVE SIMULATION)
    await expect(page.locator('text=LIVE SIMULATION')).toBeVisible();

    // Check that architecture comparison table exists
    await expect(page.locator('th:has-text("Standard 4-Corner Model")')).toBeVisible();
  });

  test('404 Page Works correctly', async ({ page }) => {
    const response = await page.goto('/some-fake-route');
    expect(response?.status()).toBe(404);
    await expect(page.locator('h1')).toContainText('404 - Page Not Found');
  });

});
