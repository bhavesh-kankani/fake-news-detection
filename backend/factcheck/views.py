from rest_framework.decorators import api_view
from link_scraper import scraper

@api_view(["POST"])
def check_link(request):
    url = request.data["url"]
    content = scraper(url)

    # use this content in ml model to fact check

def check_text(request):
    content = request.data["content"]

    # use this content in ml model to fact check
