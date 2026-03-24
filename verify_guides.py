import asyncio
from playwright.async_api import async_playwright
import os

async def verify():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        slug = "cheapest-1gb-data-south-africa"
        file_path = f"file://{os.getcwd()}/dist/guides/{slug}/index.html"
        await page.goto(file_path)
        await page.wait_for_selector("h1")
        await page.screenshot(path=f"guide_{slug}.png", full_page=True)
        print(f"Captured guide_{slug}.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify())
