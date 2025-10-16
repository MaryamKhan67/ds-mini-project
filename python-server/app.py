from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import os

app = Flask(__name__)
CORS(app)

print("🚀 Starting Python ML Server...")

def load_model():
    try:
        model_path = os.path.join(os.path.dirname(__file__), '../public/ckd_bagging_model.pkl')
        
        print(f"🔍 Looking for model at: {model_path}")
        print(f"📁 File exists: {os.path.exists(model_path)}")
        
        if not os.path.exists(model_path):
            print("❌ Model file not found!")
            return None
        
        print("✅ Model file found! Loading...")
        
        # FORCE the correct import path for scikit-learn 1.6.1
        try:
            # This should work for scikit-learn 1.6.1
            from sklearn.ensemble import BaggingClassifier
            print("✅ BaggingClassifier imported successfully!")
        except ImportError as e:
            print(f"❌ Import error: {e}")
            return None
        
        # Try loading with joblib first (better compatibility)
        try:
            import joblib
            model = joblib.load(model_path)
            print("✅ Model loaded successfully with joblib!")
            return model
        except Exception as e:
            print(f"❌ Joblib failed: {e}")
            
        # Fallback to pickle
        try:
            with open(model_path, 'rb') as file:
                model = pickle.load(file)
            print("✅ Model loaded successfully with pickle!")
            return model
        except Exception as e:
            print(f"❌ Pickle failed: {e}")
            return None
        
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        return None

model = load_model()

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "model_loaded": model is not None})

@app.route('/debug-model', methods=['GET'])
def debug_model():
    try:
        if model is None:
            return jsonify({"error": "Model not loaded"}), 500
        
        model_info = {
            "type": str(type(model)),
            "is_dict": isinstance(model, dict),
        }
        
        if isinstance(model, dict):
            model_info["keys"] = list(model.keys())
            model_info["key_types"] = {key: str(type(value)) for key, value in model.items()}
            
            # Check for predict method in dictionary values
            for key, value in model.items():
                if hasattr(value, 'predict'):
                    model_info["model_key"] = key
                    model_info["model_type"] = str(type(value))
                    break
        
        return jsonify(model_info)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/model-info', methods=['GET'])
def model_info():
    try:
        if model is None:
            return jsonify({"error": "Model not loaded"}), 500
        
        if isinstance(model, dict) and 'feature_names' in model:
            feature_info = {
                "feature_names": model['feature_names'],
                "feature_count": len(model['feature_names']),
                "target_name": model.get('target_name', 'Unknown'),
                "has_scaler": 'scaler' in model,
                "has_label_encoders": 'label_encoders' in model
            }
            return jsonify(feature_info)
        else:
            return jsonify({"error": "Feature names not available in model"}), 400
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if model is None:
            return jsonify({"error": "Model not loaded", "status": "error"}), 500
            
        data = request.json
        features = data.get('features', [])
        
        print(f"📊 Received features: {features}")
        print(f"🔍 Model type: {type(model)}")
        
        # Check if model is a dictionary and extract the actual model
        actual_model = model
        if isinstance(model, dict):
            print("📁 Model is a dictionary. Looking for model key...")
            print(f"📁 Dictionary keys: {list(model.keys())}")
            
            # Extract the actual model
            if 'model' in model:
                actual_model = model['model']
                print("✅ Found model with key: 'model'")
            else:
                return jsonify({"error": "Could not find model in dictionary", "status": "error"}), 400
        
        # Check if we need to preprocess the features
        if isinstance(model, dict) and 'scaler' in model:
            print("🔧 Preprocessing features with scaler...")
            try:
                # Scale the features
                features_array = np.array(features).reshape(1, -1)
                features_scaled = model['scaler'].transform(features_array)
                print(f"📊 Scaled features: {features_scaled[0]}")
            except Exception as e:
                print(f"❌ Scaling failed: {e}")
                return jsonify({"error": f"Feature scaling failed: {str(e)}", "status": "error"}), 400
        else:
            features_scaled = np.array(features).reshape(1, -1)
        
        # Make prediction
        try:
            prediction = actual_model.predict(features_scaled)
            prediction_proba = actual_model.predict_proba(features_scaled) if hasattr(actual_model, 'predict_proba') else None
            
            result = {
                "prediction": int(prediction[0]),
                "confidence": prediction_proba[0].tolist() if prediction_proba is not None else None,
                "status": "success"
            }
            
            print(f"🎯 Prediction result: {result}")
            return jsonify(result)
            
        except Exception as e:
            print(f"❌ Prediction failed: {e}")
            return jsonify({"error": f"Prediction failed: {str(e)}", "status": "error"}), 400
        
    except Exception as e:
        print(f"❌ Prediction error: {e}")
        import traceback
        print(f"🔍 Full traceback: {traceback.format_exc()}")
        return jsonify({"error": str(e), "status": "error"}), 400

@app.route('/test-scaling', methods=['POST'])
def test_scaling():
    try:
        if model is None or not isinstance(model, dict) or 'scaler' not in model:
            return jsonify({"error": "Scaler not available"}), 400
            
        data = request.json
        features = data.get('features', [])
        
        print(f"📊 Original features: {features}")
        
        # Test scaling
        features_array = np.array(features).reshape(1, -1)
        features_scaled = model['scaler'].transform(features_array)
        
        return jsonify({
            "original": features,
            "scaled": features_scaled[0].tolist(),
            "scaler_type": str(type(model['scaler']))
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("🌐 Starting Flask server on http://localhost:5000")
    app.run(port=5000, debug=True)