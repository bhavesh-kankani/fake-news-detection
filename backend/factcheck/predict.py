import pandas as pd
import tldextract

def check(url):
    src = tldextract.extract(url).domain
    if src in real_sources:
        return 1
    else:
        return 0


real = pd.read_csv("./factcheck/datasets/Real.csv",index_col=0)

real_sources = set(real['source'].to_list())
real_sources.add('thehindu')
real_sources.add('ddnews')
real_sources.add('newsonair')
real_sources.add('indiatoday')
real_sources.add('deccanchronicle')