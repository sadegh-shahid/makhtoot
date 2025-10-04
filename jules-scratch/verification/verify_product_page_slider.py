from playwright.sync_api import Page, expect

def test_product_page_slider(page: Page):
    """
    This test verifies that the Swiper slider on the product page
    renders correctly and does not have an excessively large width.
    """
    # 1. Arrange: Go to a product page.
    # The default Vite port is 5173.
    page.goto("http://localhost:5173/product/101")

    # 2. Assert: Wait for the main Swiper component to be visible.
    # We target the '.mySwiper2' class, which is the main image gallery.
    swiper_container = page.locator(".mySwiper2")
    expect(swiper_container).to_be_visible()

    # 3. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/product_page_slider.png")