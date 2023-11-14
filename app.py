import time
from flask import Flask,request, url_for, redirect, render_template
from PIL import Image
import numpy as np
import pickle
import joblib
import cv2
import tensorflow as tf
from flask_cors import CORS, cross_origin
from tensorflow import keras
from keras.models import load_model

import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'



app = Flask(__name__,static_folder='../build', static_url_path='/')

app.config['DEBUG'] = True


@app.route("/",methods=['POST','GET'])

def get_current_time():
    
    return render_template('forest.html',pred="hii")

@app.route("/upload",methods=['POST','GET'])

def update_image():
    List = ["battery",'biological','brown-glass','cardboard','clothes','green-glass','metal','paper','plastic','shoes','trash','white-glass',]
    image_file = request.files["Garbage_image"]
    def resize_image(input_image, target_size=(128, 128)):
          """Resize a PIL Image to the target size."""
          return input_image.resize(target_size)
   
    def resize_and_convert(input_array):
        resized_array = cv2.resize(input_array, (224, 224))
        expanded_array = np.expand_dims(resized_array, axis=0)
        return expanded_array
    image = Image.open(image_file)
    
    resized_image = resize_image(image)

    r_image = resize_and_convert(np.array(resized_image))

    interpreter = tf.lite.Interpreter(model_path='quantized_model.tflite')
    interpreter.allocate_tensors()

# Get input and output details
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()

# Assuming a single input tensor
    input_tensor_index = input_details[0]['index']
    input_tensor_shape = input_details[0]['shape']
    test_data = r_image

# Preprocess the input data to match the model's requirements
# Modify this based on your specific preprocessing steps for the original model
    normalized_data = test_data.astype(np.float32)

# Ensure the input shape matches the model's expected input shape
    assert normalized_data.shape == tuple(input_tensor_shape), "Input shape mismatch"
        
# Set the input tensor
    interpreter.set_tensor(input_tensor_index, normalized_data)

# Run inference
    interpreter.invoke()
    output_data = interpreter.get_tensor(output_details[0]['index'])
    predicted_class = np.argmax(output_data)
    print(List[predicted_class])
    return {"predict" : f" The Garbage is {List[predicted_class]}"}