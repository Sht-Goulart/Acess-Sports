from playwright.sync_api import sync_playwright
import time

def verify():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={'width': 430, 'height': 932})

        try:
            page.goto('http://localhost:5173/login')
            time.sleep(3)
            page.screenshot(path='screenshot_login_env.png')
            print("Login page screenshot saved.")
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify()
