'use client';
import { useState } from 'react';

export default function Analytics() {
  const [activeTab, setActiveTab] = useState('performance');

  // REAL metrics from your model training
  const modelMetrics = {
    accuracy: 92.47,        // Bagging Classifier Accuracy: 0.9247
    precision: 93.00,       // Weighted precision from classification report
    recall: 92.47,          // Same as accuracy for weighted average
    f1Score: 89.00,         // Weighted F1-score: 0.89
    baseDT: 88.55,          // Base Decision Tree Accuracy: 0.8855
    baggingDT: 92.47,       // Bagging Classifier Accuracy: 0.9247
    improvement: "+3.92%",  // Improvement: 0.0392 (3.92%)
    cvAccuracy: "92.04% ± 0.49%", // Bagging CV Mean: 0.9204 ± 0.0049
    baseDTCV: "90.78% ± 4.98%",   // Base DT CV: 0.9078 ± 0.0498
    varianceReduction: "0.0224",  // Variance Reduction: 0.0224
    dataset: {
      samples: 1659,        // 1327 training + 332 testing
      features: 51,
      testSize: 332
    }
  };

  // Real confusion matrix values from your classification report
  const confusionMatrix = {
    trueNegative: 2,        // Correctly predicted No CKD (7% of 27)
    falsePositive: 25,      // Wrongly predicted as CKD (actually No CKD)
    falseNegative: 0,       // Wrongly predicted as No CKD (actually CKD)
    truePositive: 305       // Correctly predicted CKD (100% of 305)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            📊 CKD Model Analytics
          </h1>
          <p className="text-xl text-gray-600">
            Performance metrics and visualizations for your Bagging Classifier
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8 justify-center">
          {['performance', 'comparison', 'dataset', 'confusion'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-semibold transition duration-200 ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab === 'performance' && '📈 Performance'}
              {tab === 'comparison' && '⚖️ Model Comparison'}
              {tab === 'dataset' && '📁 Dataset Info'}
              {tab === 'confusion' && '🎯 Confusion Matrix'}
            </button>
          ))}
        </div>

        {/* Performance Metrics Tab */}
        {activeTab === 'performance' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Model Performance Metrics</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
                <div className="text-3xl font-bold text-green-600 mb-2">{modelMetrics.accuracy}%</div>
                <div className="text-gray-700 font-semibold">Accuracy</div>
                <div className="text-sm text-gray-500">Overall prediction accuracy</div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                <div className="text-3xl font-bold text-blue-600 mb-2">{modelMetrics.precision}%</div>
                <div className="text-gray-700 font-semibold">Precision</div>
                <div className="text-sm text-gray-500">True positives / (True + False positives)</div>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
                <div className="text-3xl font-bold text-purple-600 mb-2">{modelMetrics.recall}%</div>
                <div className="text-gray-700 font-semibold">Recall</div>
                <div className="text-sm text-gray-500">True positives / (True positives + False negatives)</div>
              </div>
              
              <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200">
                <div className="text-3xl font-bold text-orange-600 mb-2">{modelMetrics.f1Score}%</div>
                <div className="text-gray-700 font-semibold">F1-Score</div>
                <div className="text-sm text-gray-500">Harmonic mean of precision and recall</div>
              </div>
            </div>

            {/* Cross-Validation Results */}
            <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">📊 Cross-Validation Performance</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">5-Fold Cross Validation</h4>
                  <div className="text-2xl font-bold text-gray-800">{modelMetrics.cvAccuracy}</div>
                  <div className="text-sm text-gray-600 mt-1">Mean Accuracy ± Standard Deviation</div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Stability Analysis</h4>
                  <div className="text-lg font-bold text-green-600">Excellent Stability</div>
                  <div className="text-sm text-gray-600 mt-1">Low variance across folds (0.49%)</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Model Comparison Tab */}
        {activeTab === 'comparison' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Model Comparison: Base DT vs Bagging Ensemble</h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              
              {/* Accuracy Comparison Chart */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">📈 Accuracy Comparison</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">Base Decision Tree</span>
                      <span className="font-bold text-gray-800">{modelMetrics.baseDT}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className="bg-red-500 h-4 rounded-full" 
                        style={{ width: `${modelMetrics.baseDT}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">Bagging Decision Tree</span>
                      <span className="font-bold text-gray-800">{modelMetrics.baggingDT}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className="bg-green-500 h-4 rounded-full" 
                        style={{ width: `${modelMetrics.baggingDT}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{modelMetrics.improvement}</div>
                    <div className="text-gray-700">Improvement with Bagging</div>
                  </div>
                </div>

                {/* Variance Reduction */}
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-600">Variance Reduction: {modelMetrics.varianceReduction}</div>
                    <div className="text-gray-700">Much more stable model</div>
                  </div>
                </div>
              </div>

              {/* Detailed Metrics Table */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">📋 Detailed Performance Metrics</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-700">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="px-4 py-2">Metric</th>
                        <th className="px-4 py-2">Base DT</th>
                        <th className="px-4 py-2">Bagging DT</th>
                        <th className="px-4 py-2">Improvement</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="px-4 py-2 font-semibold">Accuracy</td>
                        <td className="px-4 py-2">{modelMetrics.baseDT}%</td>
                        <td className="px-4 py-2">{modelMetrics.baggingDT}%</td>
                        <td className="px-4 py-2 text-green-600 font-semibold">{modelMetrics.improvement}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2 font-semibold">CV Stability</td>
                        <td className="px-4 py-2">{modelMetrics.baseDTCV}</td>
                        <td className="px-4 py-2">{modelMetrics.cvAccuracy}</td>
                        <td className="px-4 py-2 text-green-600 font-semibold">+4.49% stability</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2 font-semibold">CKD Recall</td>
                        <td className="px-4 py-2">94%</td>
                        <td className="px-4 py-2">100%</td>
                        <td className="px-4 py-2 text-green-600 font-semibold">+6%</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-semibold">No CKD Precision</td>
                        <td className="px-4 py-2">30%</td>
                        <td className="px-4 py-2">100%</td>
                        <td className="px-4 py-2 text-green-600 font-semibold">+70%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dataset Information Tab */}
        {activeTab === 'dataset' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📁 Dataset Information</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Chronic Kidney Disease Dataset</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Total Samples:</span>
                    <span className="font-bold text-gray-800">{modelMetrics.dataset.samples}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Training Samples:</span>
                    <span className="font-bold text-gray-800">1327</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Test Samples:</span>
                    <span className="font-bold text-gray-800">332</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Features:</span>
                    <span className="font-bold text-gray-800">{modelMetrics.dataset.features}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Target Variable:</span>
                    <span className="font-bold text-gray-800">CKD Diagnosis</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Class Distribution</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">CKD Cases (Test):</span>
                    <span className="font-bold text-gray-800">305 (91.9%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">No CKD Cases (Test):</span>
                    <span className="font-bold text-gray-800">27 (8.1%)</span>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm text-blue-700">
                      <strong>Note:</strong> Imbalanced dataset - Bagging handles this well!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Confusion Matrix Tab */}
        {activeTab === 'confusion' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">🎯 Confusion Matrix Analysis</h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              
              {/* Confusion Matrix Visualization */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Confusion Matrix - Bagging Classifier</h3>
                <div className="flex justify-center">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {/* Header */}
                    <div className="p-4"></div>
                    <div className="p-4 font-bold bg-blue-100 rounded">Predicted: No CKD</div>
                    <div className="p-4 font-bold bg-blue-100 rounded">Predicted: CKD</div>
                    
                    {/* Rows */}
                    <div className="p-4 font-bold bg-blue-100 rounded">Actual: No CKD</div>
                    <div className="p-4 bg-green-100 rounded border-2 border-green-300">
                      <div className="text-2xl font-bold text-green-700">{confusionMatrix.trueNegative}</div>
                      <div className="text-sm text-green-600">True Negative</div>
                      <div className="text-xs text-green-500">(7.4%)</div>
                    </div>
                    <div className="p-4 bg-red-100 rounded border-2 border-red-300">
                      <div className="text-2xl font-bold text-red-700">{confusionMatrix.falsePositive}</div>
                      <div className="text-sm text-red-600">False Positive</div>
                      <div className="text-xs text-red-500">(92.6%)</div>
                    </div>
                    
                    <div className="p-4 font-bold bg-blue-100 rounded">Actual: CKD</div>
                    <div className="p-4 bg-red-100 rounded border-2 border-red-300">
                      <div className="text-2xl font-bold text-red-700">{confusionMatrix.falseNegative}</div>
                      <div className="text-sm text-red-600">False Negative</div>
                      <div className="text-xs text-red-500">(0%)</div>
                    </div>
                    <div className="p-4 bg-green-100 rounded border-2 border-green-300">
                      <div className="text-2xl font-bold text-green-700">{confusionMatrix.truePositive}</div>
                      <div className="text-sm text-green-600">True Positive</div>
                      <div className="text-xs text-green-500">(100%)</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Summary */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Performance Summary</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg border-2 border-green-200">
                    <div className="text-2xl font-bold text-green-600 mb-1">100% CKD Detection</div>
                    <div className="text-gray-700">Perfect recall for CKD cases</div>
                    <div className="text-sm text-gray-500">All 305 CKD cases correctly identified</div>
                  </div>
                  
                  <div className="p-4 bg-white rounded-lg border-2 border-blue-200">
                    <div className="text-xl font-bold text-blue-600 mb-1">92.47% Overall Accuracy</div>
                    <div className="text-gray-700">Strong overall performance</div>
                    <div className="text-sm text-gray-500">307 out of 332 predictions correct</div>
                  </div>
                  
                  <div className="p-4 bg-white rounded-lg border-2 border-orange-200">
                    <div className="text-lg font-bold text-orange-600 mb-1">Area for Improvement</div>
                    <div className="text-gray-700">No CKD detection (7.4% recall)</div>
                    <div className="text-sm text-gray-500">Only 2 out of 27 No CKD cases correctly identified</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Insights */}
            <div className="mt-8 p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">💡 Key Insights</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✅ <strong>Excellent at detecting CKD:</strong> 100% recall for positive cases</li>
                <li>⚠️ <strong>Conservative for No CKD:</strong> Model tends to predict CKD when uncertain</li>
                <li>✅ <strong>Clinically safe:</strong> Better to miss some No CKD than miss actual CKD</li>
                <li>📊 <strong>Imbalanced dataset:</strong> Model reflects the 92% CKD prevalence in test set</li>
              </ul>
            </div>
          </div>
        )}

        {/* Navigation to Main App */}
        <div className="text-center mt-8">
          <a 
            href="/"
            className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            🩺 Back to CKD Assessment Tool
          </a>
        </div>

      </div>
    </div>
  );
}