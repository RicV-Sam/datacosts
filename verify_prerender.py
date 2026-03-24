import asyncio
from playwright.async_api import async_playwright
import os

async def verify():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Verify Home Page
        file_path_home = f"file://{os.getcwd()}/dist/index.html"
        await page.goto(file_path_home)
        await page.screenshot(path="home_page_final.png", full_page=True)
        print("Captured home_page_final.png")

        # Verify USSD Page
        file_path_ussd = f"file://{os.getcwd()}/dist/ussd-codes-south-africa/index.html"
        await page.goto(file_path_ussd)
        await page.screenshot(path="ussd_page_final.png", full_page=True)
        print("Captured ussd_page_final.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify())
