import os
from flask import Flask, request, jsonify
from imageai.Classification.Custom import CustomImageClassification

# Create Flask application
app = Flask(__name__)

# Set model path
model_path = "/root/AS2_ITS/models/resnet50-traffic_dataset-test_acc_0.91250_epoch-96.pt"
json_path = "/root/AS2_ITS/models/traffic_dataset_model_classes.json"
# Create image classification instance
predictor = CustomImageClassification()
predictor.setModelTypeAsResNet50()

# Load the trained model
predictor.setModelPath(model_path)
predictor.setJsonPath(json_path)
predictor.loadModel()

# Upload folder path
UPLOAD_FOLDER = "/content/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Define image prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():
   if 'file' not in request.files:
       return jsonify({"error": "No file part"}), 400

   file = request.files['file']

   if file.filename == '':
       return jsonify({"error": "No selected file"}), 400

   if file:
       # Save the uploaded file
       file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
       file.save(file_path)

       # Predict using the model
       predictions, probabilities = predictor.classifyImage(image_input=file_path, result_count=2)

       # Return the prediction results
       results = [{"label": prediction, "probability": float(probability)} for prediction, probability in zip(predictions, probabilities)]
       print(results)
       #return jsonify({"error_code":0,"data": {results[0].label:results[0].probability}}), 200

# Run the Flask application
if __name__ == '__main__':
   app.run(host='0.0.0.0', port=5000)
