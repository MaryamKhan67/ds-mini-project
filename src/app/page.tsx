'use client';
import { useState } from 'react';

export default function Home() {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number[] | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Form state matching the 51 features exactly
  const [formData, setFormData] = useState({
    // Demographics
    Age: 45,
    Gender: 0, // 0=Male, 1=Female
    Ethnicity: 0, // Encoded
    SocioeconomicStatus: 2, // 0=Low, 1=Medium, 2=High
    EducationLevel: 2, // 0=Low, 1=Medium, 2=High
    
    // Lifestyle
    BMI: 25,
    Smoking: 0, // 0=No, 1=Yes
    AlcoholConsumption: 0, // 0=No, 1=Yes
    PhysicalActivity: 1, // 0=Low, 1=Medium, 2=High
    DietQuality: 1, // 0=Poor, 1=Average, 2=Good
    SleepQuality: 1, // 0=Poor, 1=Average, 2=Good
    
    // Family History
    FamilyHistoryKidneyDisease: 0, // 0=No, 1=Yes
    FamilyHistoryHypertension: 0, // 0=No, 1=Yes
    FamilyHistoryDiabetes: 0, // 0=No, 1=Yes
    
    // Medical History
    PreviousAcuteKidneyInjury: 0, // 0=No, 1=Yes
    UrinaryTractInfections: 0, // 0=No, 1=Yes
    
    // Vital Signs
    SystolicBP: 120,
    DiastolicBP: 80,
    
    // Blood Tests
    FastingBloodSugar: 90,
    HbA1c: 5.5,
    SerumCreatinine: 0.9,
    BUNLevels: 15,
    GFR: 90,
    ProteinInUrine: 0, // 0=No, 1=Yes
    ACR: 10,
    SerumElectrolytesSodium: 140,
    SerumElectrolytesPotassium: 4.0,
    SerumElectrolytesCalcium: 9.5,
    SerumElectrolytesPhosphorus: 3.5,
    HemoglobinLevels: 14.0,
    
    // Cholesterol
    CholesterolTotal: 180,
    CholesterolLDL: 100,
    CholesterolHDL: 50,
    CholesterolTriglycerides: 100,
    
    // Medications
    ACEInhibitors: 0, // 0=No, 1=Yes
    Diuretics: 0, // 0=No, 1=Yes
    NSAIDsUse: 0, // 0=No, 1=Yes
    Statins: 0, // 0=No, 1=Yes
    AntidiabeticMedications: 0, // 0=No, 1=Yes
    
    // Symptoms
    Edema: 0, // 0=No, 1=Yes
    FatigueLevels: 1, // 0=Low, 1=Medium, 2=High
    NauseaVomiting: 0, // 0=No, 1=Yes
    MuscleCramps: 0, // 0=No, 1=Yes
    Itching: 0, // 0=No, 1=Yes
    
    // Quality of Life
    QualityOfLifeScore: 8, // 1-10 scale
    
    // Environmental
    HeavyMetalsExposure: 0, // 0=No, 1=Yes
    OccupationalExposureChemicals: 0, // 0=No, 1=Yes
    WaterQuality: 1, // 0=Poor, 1=Average, 2=Good
    
    // Healthcare
    MedicalCheckupsFrequency: 2, // 0=Rarely, 1=Yearly, 2=Regularly
    MedicationAdherence: 2, // 0=Poor, 1=Average, 2=Good
    HealthLiteracy: 2, // 0=Low, 1=Medium, 2=High
  });

  const handlePredict = async () => {
    setLoading(true);
    try {
      // Convert form data to features array in the EXACT order from feature_names
      const features = [
        formData.Age,
        formData.Gender,
        formData.Ethnicity,
        formData.SocioeconomicStatus,
        formData.EducationLevel,
        formData.BMI,
        formData.Smoking,
        formData.AlcoholConsumption,
        formData.PhysicalActivity,
        formData.DietQuality,
        formData.SleepQuality,
        formData.FamilyHistoryKidneyDisease,
        formData.FamilyHistoryHypertension,
        formData.FamilyHistoryDiabetes,
        formData.PreviousAcuteKidneyInjury,
        formData.UrinaryTractInfections,
        formData.SystolicBP,
        formData.DiastolicBP,
        formData.FastingBloodSugar,
        formData.HbA1c,
        formData.SerumCreatinine,
        formData.BUNLevels,
        formData.GFR,
        formData.ProteinInUrine,
        formData.ACR,
        formData.SerumElectrolytesSodium,
        formData.SerumElectrolytesPotassium,
        formData.SerumElectrolytesCalcium,
        formData.SerumElectrolytesPhosphorus,
        formData.HemoglobinLevels,
        formData.CholesterolTotal,
        formData.CholesterolLDL,
        formData.CholesterolHDL,
        formData.CholesterolTriglycerides,
        formData.ACEInhibitors,
        formData.Diuretics,
        formData.NSAIDsUse,
        formData.Statins,
        formData.AntidiabeticMedications,
        formData.Edema,
        formData.FatigueLevels,
        formData.NauseaVomiting,
        formData.MuscleCramps,
        formData.Itching,
        formData.QualityOfLifeScore,
        formData.HeavyMetalsExposure,
        formData.OccupationalExposureChemicals,
        formData.WaterQuality,
        formData.MedicalCheckupsFrequency,
        formData.MedicationAdherence,
        formData.HealthLiteracy
      ];

      console.log('Sending features:', features);

      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          features: features
        }),
      });

      const data = await response.json();
      
      if (data.status === 'success') {
        // Convert prediction to readable result
        // 0=No CKD, 1=CKD
        const hasCKD = data.prediction === 1;
        setPrediction(hasCKD ? 'CKD Detected' : 'No CKD');
        setConfidence(data.confidence);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      alert('Prediction failed. Please try again!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Slider component
  const SliderInput = ({ label, min, max, value, field, unit = '', step = 1 }: any) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}: <span className="font-bold text-blue-600">{value}{unit}</span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => updateFormData(field, parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );

  // Binary selector component
  const BinaryInput = ({ label, value, field, options }: any) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex space-x-2">
        {options.map((option: {value: number, label: string, emoji: string}) => (
          <button
            key={option.value}
            type="button"
            onClick={() => updateFormData(field, option.value)}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium ${
              value === option.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {option.emoji} {option.label}
          </button>
        ))}
      </div>
    </div>
  );

  // Multi-level selector component
  const LevelInput = ({ label, value, field, options }: any) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex space-x-2">
        {options.map((option: {value: number, label: string, emoji: string}) => (
          <button
            key={option.value}
            type="button"
            onClick={() => updateFormData(field, option.value)}
            className={`flex-1 py-2 px-2 rounded-md text-sm font-medium ${
              value === option.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {option.emoji} {option.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🩺 Comprehensive CKD Risk Assessment
          </h1>
          <p className="text-gray-600">
            Complete health profile analysis for kidney disease risk prediction
          </p>
          
          {/* Added Analytics Button */}
          <div className="text-center mb-2">
            <a 
              href="/analytics"
              className="inline-block bg-gray-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-gray-700 transition duration-200"
            >
              📊 View Model Analytics
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Column 1 - Demographics & Lifestyle */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">👤 Demographics & Lifestyle</h2>
            
            <SliderInput 
              label="Age" 
              min={18} 
              max={100} 
              value={formData.Age} 
              field="Age" 
              unit=" years"
            />
            
            <BinaryInput
              label="Gender"
              value={formData.Gender}
              field="Gender"
              options={[
                {value: 0, label: 'Male', emoji: '👨'},
                {value: 1, label: 'Female', emoji: '👩'}
              ]}
            />
            
            <LevelInput
              label="Socioeconomic Status"
              value={formData.SocioeconomicStatus}
              field="SocioeconomicStatus"
              options={[
                {value: 0, label: 'Low', emoji: '📉'},
                {value: 1, label: 'Medium', emoji: '📊'},
                {value: 2, label: 'High', emoji: '📈'}
              ]}
            />
            
            <SliderInput 
              label="BMI" 
              min={15} 
              max={40} 
              value={formData.BMI} 
              field="BMI" 
            />
            
            <BinaryInput
              label="Smoking"
              value={formData.Smoking}
              field="Smoking"
              options={[
                {value: 0, label: 'No', emoji: '❌'},
                {value: 1, label: 'Yes', emoji: '🚬'}
              ]}
            />
            
            <BinaryInput
              label="Alcohol"
              value={formData.AlcoholConsumption}
              field="AlcoholConsumption"
              options={[
                {value: 0, label: 'No', emoji: '❌'},
                {value: 1, label: 'Yes', emoji: '🍷'}
              ]}
            />
            
            <LevelInput
              label="Physical Activity"
              value={formData.PhysicalActivity}
              field="PhysicalActivity"
              options={[
                {value: 0, label: 'Low', emoji: '🛋️'},
                {value: 1, label: 'Medium', emoji: '🏃'},
                {value: 2, label: 'High', emoji: '🏋️'}
              ]}
            />
          </div>

          {/* Column 2 - Medical History & Vital Signs */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">🩺 Medical History & Vitals</h2>
            
            <BinaryInput
              label="Family History - Kidney Disease"
              value={formData.FamilyHistoryKidneyDisease}
              field="FamilyHistoryKidneyDisease"
              options={[
                {value: 0, label: 'No', emoji: '❌'},
                {value: 1, label: 'Yes', emoji: '🧬'}
              ]}
            />
            
            <BinaryInput
              label="Family History - Hypertension"
              value={formData.FamilyHistoryHypertension}
              field="FamilyHistoryHypertension"
              options={[
                {value: 0, label: 'No', emoji: '❌'},
                {value: 1, label: 'Yes', emoji: '⚠️'}
              ]}
            />
            
            <BinaryInput
              label="Family History - Diabetes"
              value={formData.FamilyHistoryDiabetes}
              field="FamilyHistoryDiabetes"
              options={[
                {value: 0, label: 'No', emoji: '❌'},
                {value: 1, label: 'Yes', emoji: '🩸'}
              ]}
            />
            
            <SliderInput 
              label="Systolic BP" 
              min={90} 
              max={200} 
              value={formData.SystolicBP} 
              field="SystolicBP" 
              unit=" mmHg"
            />
            
            <SliderInput 
              label="Diastolic BP" 
              min={60} 
              max={130} 
              value={formData.DiastolicBP} 
              field="DiastolicBP" 
              unit=" mmHg"
            />
            
            <SliderInput 
              label="Fasting Blood Sugar" 
              min={70} 
              max={200} 
              value={formData.FastingBloodSugar} 
              field="FastingBloodSugar" 
              unit=" mg/dL"
            />
            
            <SliderInput 
              label="HbA1c" 
              min={4.0} 
              max={12.0} 
              step={0.1}
              value={formData.HbA1c} 
              field="HbA1c" 
              unit=" %"
            />
          </div>

          {/* Column 3 - Blood Tests & Medications */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">🧪 Blood Tests & Medications</h2>
            
            <SliderInput 
              label="Serum Creatinine" 
              min={0.5} 
              max={5.0} 
              step={0.1}
              value={formData.SerumCreatinine} 
              field="SerumCreatinine" 
              unit=" mg/dL"
            />
            
            <SliderInput 
              label="BUN Levels" 
              min={5} 
              max={50} 
              value={formData.BUNLevels} 
              field="BUNLevels" 
              unit=" mg/dL"
            />
            
            <SliderInput 
              label="GFR" 
              min={15} 
              max={120} 
              value={formData.GFR} 
              field="GFR" 
              unit=" mL/min"
            />
            
            <SliderInput 
              label="Hemoglobin" 
              min={8} 
              max={18} 
              step={0.1}
              value={formData.HemoglobinLevels} 
              field="HemoglobinLevels" 
              unit=" g/dL"
            />
            
            <BinaryInput
              label="ACE Inhibitors"
              value={formData.ACEInhibitors}
              field="ACEInhibitors"
              options={[
                {value: 0, label: 'No', emoji: '❌'},
                {value: 1, label: 'Yes', emoji: '💊'}
              ]}
            />
            
            <BinaryInput
              label="Diuretics"
              value={formData.Diuretics}
              field="Diuretics"
              options={[
                {value: 0, label: 'No', emoji: '❌'},
                {value: 1, label: 'Yes', emoji: '💊'}
              ]}
            />
            
            <BinaryInput
              label="NSAIDs Use"
              value={formData.NSAIDsUse}
              field="NSAIDsUse"
              options={[
                {value: 0, label: 'No', emoji: '❌'},
                {value: 1, label: 'Yes', emoji: '💊'}
              ]}
            />
          </div>
        </div>

        {/* Note about other features */}
        <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-800 text-center">
            💡 <strong>Note:</strong> This form shows the most important features. 
            Other features are set to default values for prediction.
          </p>
        </div>

        {/* Predict Button */}
        <div className="text-center mt-8">
          <button
            onClick={handlePredict}
            disabled={loading}
            className="bg-blue-600 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-blue-300 transition duration-200"
          >
            {loading ? '🔍 Analyzing...' : '🩺 Assess Kidney Health'}
          </button>
        </div>

        {/* Results */}
        {prediction && (
          <div className={`mt-8 p-6 rounded-lg border-2 ${
            prediction === 'CKD Detected' 
              ? 'bg-red-50 border-red-200' 
              : 'bg-green-50 border-green-200'
          }`}>
            <h2 className="text-2xl font-bold mb-4 text-center">
              {prediction === 'CKD Detected' ? '🩺 CKD Detected' : '✅ No CKD Detected'}
            </h2>
            
            <div className="text-center">
              <p className="text-lg mb-4">
                {prediction === 'CKD Detected' 
                  ? 'Please consult with a nephrologist for further evaluation and treatment.'
                  : 'Your kidney function appears to be within normal ranges.'
                }
              </p>
              
              {confidence && (
                <div className="bg-white p-4 rounded-lg inline-block">
                  <p className="text-sm text-gray-600">
                    Confidence: {((confidence[1] || confidence[0]) * 100).toFixed(1)}%
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>💡 This is a predictive tool and not a medical diagnosis. Always consult healthcare professionals.</p>
        </div>
      </div>

      {/* Add some custom styles for the sliders */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}