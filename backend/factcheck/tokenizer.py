from tensorflow.keras.preprocessing.text import Tokenizer
import preprocess_kgptalkie as ps
import pandas as pd

data = pd.read_csv('./factcheck/datasets/data.csv')
data['text'] = data['text'].apply(lambda x: ps.remove_special_chars(x))
X = [d.split() for d in data['text'].tolist()]
tokenizer = Tokenizer()
tokenizer.fit_on_texts(X)
print('nice')