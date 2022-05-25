from newspaper import Article

def scraper(url):
    article = Article(url, language="en")
    article.download()
    article.parse()
    article.nlp()

    return article.text