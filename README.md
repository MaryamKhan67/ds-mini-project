## 🧠 Chronic Kidney Disease (CKD) Prediction System

**📋 Project Overview**  
A **machine learning-based web application** that predicts **Chronic Kidney Disease (CKD)** using patient medical data.  
The system employs **ensemble learning techniques** to provide accurate and reliable CKD diagnosis predictions.

---

## 🎯 Key Features
- **Advanced Ensemble Model:** Bagging classifier with 50 decision trees  
- **High Accuracy:** 92.47% overall prediction accuracy  
- **Medical Safety First:** 100% recall rate for CKD detection  
- **Comprehensive Analysis:** 51 medical features analyzed  
- **User-Friendly Interface:** Easy-to-use web interface for predictions  

---

## 📊 Model Performance

| Metric | Base Decision Tree | Bagging Classifier | Improvement |
|--------|-------------------|--------------------|-------------|
| **Accuracy** | 88.55% | 92.47% | +3.92% |
| **CKD Recall** | 94% | 100% | +6% |
| **Cross-validation Stability** | 90.78% ± 4.98% | 92.04% ± 0.49% | +4.49% stability |

---

## 🏗️ Technical Architecture

### 🔹 Data Pipeline
- **Data Collection:** 1,659 patient records with 51 features  
- **Preprocessing:** Handling missing values, encoding categorical variables, feature scaling  
- **Feature Engineering:** Selection of relevant medical parameters  

### 🔹 Model Training
- **Base Model:** Decision Tree Classifier (`max_depth=5`)  
- **Ensemble Model:** Bagging Classifier with 50 estimators  
- **Training Split:** 80% training (1,327 samples), 20% testing (332 samples)  

### 🔹 Key Technologies
- 🐍 **Python**  
  - `pandas`, `numpy` → Data manipulation  
  - `scikit-learn` → Machine learning models  
  - `matplotlib`, `seaborn` → Data visualization  
  - `joblib` → Model serialization  
  - `gradio` → Web interface  

---

## 🩺 Medical Features Analyzed
The model analyzes **51 patient parameters** across three main categories:

### 👥 Demographics & Lifestyle
- Age, Gender, BMI, Smoking status, Alcohol consumption, Physical activity  

### 🩸 Medical History & Vitals
- Family history (Kidney disease, Hypertension, Diabetes)  
- Blood pressure (Systolic/Diastolic)  
- Blood sugar levels (Fasting glucose, HbA1c)  

### 🧪 Blood Tests & Medications
- Kidney function markers (Serum Creatinine, BUN, GFR)  
- Hemoglobin levels  
- Medication usage (ACE Inhibitors, Diuretics, NSAIDs)  

---

## 🚀 Installation & Usage

### 🧩 Prerequisites
```bash
pip install pandas numpy scikit-learn matplotlib seaborn joblib gradio
````
### 🔹 Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/ckd-prediction-system.git
cd ckd-prediction-system
```
### 🔹 Step 2: Create Virtual Environment (Recommended)
```bash
# Windows
python -m venv ckd_env
ckd_env\Scripts\activate

# macOS/Linux
python3 -m venv ckd_env
source ckd_env/bin/activate
```
### 🔹 Step 3: Install Required Packages
```bash
pip install pandas numpy scikit-learn matplotlib seaborn joblib gradio
```

### 🔹 Step 4: Prepare Your Dataset
  - Place your CKD dataset (CSV format) in the dataset/ folder
  - Ensure it contains the required 51 medical features
  - The target variable should be named Diagnosis

### 🔹 Step 5: Run the Training Script
```bash
python train_ckd_model.py
```

### 🔹 Step 6: Launch the Web Interface
```bash
python app.py
```
