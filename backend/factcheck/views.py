from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .link_scraper import scraper
from .predict import check
from .tokenizer import tokenizer

from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import load_model

def predict_test(content):
    maxlen = 1000
    loaded_model = load_model('ml_model/model_3.h5')
    content = tokenizer.texts_to_sequences([content.split()])
    content = pad_sequences(content, maxlen=maxlen)
    return ((loaded_model.predict(content) >= 0.5).astype(int))[0][0]

@api_view(["POST"])
def check_link(request):
    url = request.data["url"]
    content = scraper(url)
    return Response({"prediction": check(url)}, status=status.HTTP_200_OK)

@api_view(["POST"])
def check_text(request):
    content = request.data["content"]
    return Response({"prediction": predict_test(content)}, status=status.HTTP_200_OK)
